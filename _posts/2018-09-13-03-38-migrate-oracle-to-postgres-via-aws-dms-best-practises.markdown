---
layout: post
title: Migrate Oracle to Postgres via AWS DMS Best Practises
category: work
tags: [tips, tools]
published: True
---

记得前段时间还有个[CNBC的报道](https://www.cnbc.com/2018/08/01/amazon-plans-to-move-off-oracle-software-by-early-2020.html)说是我司准备2020年之前在整个公司范围内去Oralce化，然后Oracle的Larry Ellison在一个电话会议上说Oracle顶呱呱，Amazon离不开它，这个季度还给我们交了五千万刀的保护费呢，想去Oracle，他们没这个能力，blabla。。

但确实很有幸，从头到尾完成了一个Oracle DB的迁移，从Oracle迁移到AWS的RDS（PostgreSQL），目前来看，一切运行良好，但迁移过程着实不太顺利，遂把一些tips记录下来，希望对刚入坑的同行有用。

<!--more--> 



#### 1. AWS SCT
Schema转换这种累活还是交给AWS SCT(Schema Conversion Tools)来解决吧，目前对于大多数DB，基本的table，index, constrains还是能够一步转换的，但是不太好弄的就是trigger的转换，尤其是一些postgres当前还不支持的trigger。SCT提供了一份pre-convert report，通过它你可以清楚地看到那些是能够自动转换，那些是需要手动在postgres创建的。生成报告的过程如下

![sct report creation]({{site.cdnurl}}/assets/img/post/aws-sct.gif)

当然正常的情况下，大多数的index, constrains都可以无缝迁移，但是有一些oracle audit的trigger, 具有[partition的表](https://aws.amazon.com/cn/blogs/database/strategy-for-migrating-partitioned-tables-from-oracle-to-amazon-rds-postgresql-and-amazon-aurora-postgresql/)，以及较大的[CLOB/BLOB数据类型](https://aws.amazon.com/cn/blogs/database/migrating-blob-and-clob-tables-from-oracle-to-postgresql-using-ora2pg-and-aws-dms/)在用DMS迁移是往往有很多需要注意的地方，如果你的表中有这些数据，建议仔细看下AWS相关的docs。

山人在使用SCT工具的时候遇到的坑如下：

- **1.Q** 配置OracleDB的连接，由于SCT是一个UI工具，通常在Engineer的laptop上运行，而大多数企业的DB都是在企业防火墙的线上机器。往往两者直接的网络是完全不通的，因此如果直接连接，永远连接不上有么有。
- **1.A** 解决办法是看看能不能让公司security给加个whitelist啥的（虽然通常sec那帮人肯定不愿意），或者通过ssh隧道通过堡垒机来解决，然后SCT连接的地址直接改成localhost，端口号就用这里的portNo：  
`ssh -L portNo:oracle-db-dns:portNo security-bastion-address`
<hr>
- **2.Q** 当你在左边的oracle schema列表create schema之后，按照aws教程直接在右边的postgres DB上点apply后，把整个schema里的table, index, FK, PK，trigger等都一并在postgres创建了。然后当你登录到postgres上，用`\dt`想看看创建了哪些表时，你可能会遇到*[no relations found](https://stackoverflow.com/questions/40865564/why-command-dt-gives-no-relations-found)*的错误，你以为是sct不working了
- **2.A** 其实是你没有在postgres设置search_path造成的。可以run下面类似的命令，schemaName就是你转换的schema，user就是你的postgres的用户名  
`GRANT ALL ON SCHEMA schemaName TO user;`
<hr>

当我看到在postgres里建了和oracle一样schema的table, index, PK, FK, trigger等以后，以为大功告成了，可以使用DMS工具了，其实坑才刚刚开始。

#### 2. DMS via AWS CLI
值得高兴的是DMS在AWS China已经上线了(cn-north-1)，整个操作过程和global的应该是一样的。Database Migration Service(DMS)的有三个基本概念。

1. **Endpoint** DMS复制的source（oracle DB的地址）和target（RDS DB的地址），DMS配置完endpoint之后可以test connection命令来测试连接。
2. **Replication Instance** 真正的DMS复制实例，就是他复制连接source 和target DB完成真正的复制任务。
3. **Replication Task** 复制的任务定义。基本的项包括设置复制的schema和table mapping，以及控制复制的task设置。

来个AWS console上直观的图：

![dms overview]({{site.cdnurl}}/assets/img/post/aws-dms.gif)

当然还是建议使用[DMS 的AWS CLI](https://docs.aws.amazon.com/cli/latest/reference/dms/index.html)来完成DMS的创建和配置。记录下基本的配置过程：
##### **2.1 基本环境变量设置**

```bash
# AWS Config File https://docs.aws.amazon.com/cli/latest/topic/config-vars.html
export AWS_CONFIG_FILE=/tmp/aws-cli-profile-weheng 
export AWS_DEFAULT_REGION=cn-north-1
export teamname=mynux
export env=prod
export region=cn-north-1 
export SRC_DB_NAME=oracle.hengwei.map
export subnet_group=dms-subnet-prod
export rep_instance_class=dms.c4.xlarge
export instance_storage=256

# Configuration for source database
export src_passwd=${password}
export src_endpoint_type=source
export src_db_user=${username}
export src_server_name=${ip address}
export src_db_port=63118
export src_database_name=${source_database_name}
export src_db_type=ora
src_db_name=$(echo $src_database_name|cut -d '.' -f1)

# Configuration for target database
export trg_db_user=${username}
export trg_passwd=${password}
export trg_endpoint_type=target
export trg_server_name=${trg_server_name}
export trg_db_port=8200
export trg_database_name=${trg_database_name}

# Configuration for replication tasks.
export schema_name=vbs
export load_type=fullload
export migration_type=full-load
export task_owner=sg$(/bin/date +\%Y\%m\%d)
```

##### **2.2 创建Endpoint**

**Source Endpoint**  

```bash
# describe 当前可用的endpoint信息
aws dms describe-endpoints --query "Endpoints[:].EndpointIdentifier"
# 创建endpoint
aws dms create-endpoint --endpoint-identifier ${teamname}-${env}-${src_endpoint_type}-${src_db_name}-${src_db_type} --endpoint-type ${src_endpoint_type} --engine-name oracle --username ${src_db_user} --password ${src_passwd} --kms-key-id $AWS_DMS_KEY_ARN --server-name=${src_server_name} --port=${src_db_port} --database-name ${src_database_name} --region ${region} --tags Key=$team_tag_Key,Value=$team_tag_value --extra-connection-attributes \"addSupplementalLogging=Y archivedLogDestId=1\"
```
基本的参数配置应该问题不大，其中有几个值得注意，password如果含有特殊字符，需要[使用{}来转移](https://forums.aws.amazon.com/thread.jspa?messageID=812257)；如果是此时源oracle DB是线上的DB，需要配置`extra-connection-attributes`来使用CDC（Change Data Capture）
<label for="sn-1" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-1" class="margin-toggle"/>
<span class="sidenote">
    在DMS端enable了CDC属性还不够，还需要找你的oracle DBA看下，oracle那边CDC log有没有enable起来。可以通过run下面sql，如果结果是YES的化就说明enable了。
    ```sql
    SELECT force_logging, supplemental_log_data_min FROM v$database;
    FOR SUPPLEME
	--- --------
	YES YES
    ```
</span>

创建完之后你可以根据source endpoint的ARN（Amazon Resource Name)来查看当前endpoint的信息
```bash
aws dms describe-endpoints --filters Name=endpoint-arn,Values=${src_endpoint_arn}
```

**Target Endpoint**

```bash
# 创建 target endpoint
aws dms create-endpoint --endpoint-identifier ${teamname}-${env}-${trg_endpoint_type}-${trg_database_name}-${trg_db_type} --endpoint-type ${trg_endpoint_type} --engine-name postgres --username ${trg_db_user} --password ${trg_passwd}  --server-name=${trg_server_name} --port=${trg_db_port} --database-name ${trg_database_name} --region ${region} --tags Key=$team_tag_Key,Value=$team_tag_value --ssl-mode require
```

同样的，这里的环境变量都依赖于开始部分的设置，如果报`usage: aws [options] <command>...`之类的错误，check下是不是某个变量是空；其中Source和Target endpoint都用到了一个参数叫做`--tags`，check resource的tags的方法：
<label for="sn-1" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-1" class="margin-toggle"/>
<span class="sidenote">
tags按照AWS的说法，是一种细粒度的存取控制策略，比如可以按照公司内部的组的概念分配相应的tags授权，来达到不同资源间的访问控制。
</span>`aws dms list-tags-for-resource --resource-arn ${src_endpoint_arn}`。
另外，最后一个参数`ssl-mode`为了安全起见，建议设置成*require*。毕竟公司DB的数据是公司的核心资产，容不得半点泄露。

##### **2.3 创建Replication Instance**

当endpoint配置完了，就可以配置replication instance了。类似的安全设置参数`--no-publicly-accessible`来尽可能保证数据安全。

```bash
# Create Replication Instance
aws dms create-replication-instance --replication-instance-identifier ${teamname}-${env}-${SRC_DB_NAME}-inst --replication-instance-class ${rep_instance_class} --allocated-storage ${instance_storage}  --replication-subnet-group-identifier=${subnet_group} --no-publicly-accessible --tags Key=$team_tag_Key,Value=$team_tag_value
```

创建的instance信息可以通过如下命令来查看

```bash
aws dms describe-replication-instances --filters Name=replication-instance-arn,Values=${replication_instance_arn} --query 'ReplicationInstances[:].ReplicationInstanceStatus'
```

```json
{
    "ReplicationInstance": {
        "MultiAZ": false,
        "PubliclyAccessible": false,
        "ReplicationInstanceArn": "arn:aws-cn:dms:cn-north-1:blablabla:rep:SFAFAFAWEFVMAFQWF",
        "ReplicationInstanceClass": "dms.c4.xlarge",
        "ReplicationSubnetGroup": {
            "ReplicationSubnetGroupDescription": "BJS PROD-VPC",
            "Subnets": [
                {
                    "SubnetStatus": "Active",
                    "SubnetIdentifier": "subnet-2asf2qwfaw",
                    "SubnetAvailabilityZone": {
                        "Name": "cn-north-1a"
                    }
                },
                {
                    "SubnetStatus": "Active",
                    "SubnetIdentifier": "subnet-2qefqweff",
                    "SubnetAvailabilityZone": {
                        "Name": "cn-north-1b"
                    }
                }
            ],
            "VpcId": "vpc-772erwfw",
            "SubnetGroupStatus": "Complete",
            "ReplicationSubnetGroupIdentifier": "dms-subnet-prod"
        },
        "AutoMinorVersionUpgrade": true,
        "ReplicationInstanceStatus": "creating",
        "VpcSecurityGroups": [
            {
                "Status": "active",
                "VpcSecurityGroupId": "sg-52fqwafa"
            }
        ],
        "AllocatedStorage": 256,
        "EngineVersion": "2.4.3",
        "ReplicationInstanceIdentifier": "mynux-prod-hengwei-inst",
        "PreferredMaintenanceWindow": "mon:06:28-mon:06:58",
        "PendingModifiedValues": {}
    }
}
```

##### **2.4 测试复制实例和source/target的连接**

```bash
# 测试连接
aws dms test-connection --replication-instance-arn ${replication_instance_arn} --endpoint-arn ${src_endpoint_arn}
# 查看测试结果
aws dms describe-connections --filter Name=endpoint-arn,Values=${src_endpoint_arn}
```
比如下面的结果就表示连接失败了：|

```json
{
    "Connections": [
        {
            "Status": "failed",
            "ReplicationInstanceArn": "arn:aws-cn:dms:cn-north-1:blablabla:rep:SFAFAFAWEFVMAFQWF",
            "LastFailureMessage": "Error Details: [errType=ERROR_RESPONSE, status=1022305, errMessage=ORA-12545: Connect failed because target host or object does not exist   OCI connection failure., errDetails=]",
            "EndpointArn": "arn:aws-cn:dms:cn-north-1:935219088151:endpoint:EYSFCMGUZFUPTX233UBFUY5JSI",
            "ReplicationInstanceIdentifier": "mynux-prod-hengwei-inst",
            "EndpointIdentifier": "mynux-prod-source-hengwei-ora"
        }
    ]
}
```
各种公司内网防火墙，各种security组的配置，VPC的安全设置，都会让这个步骤非常frustration，山人的感觉就是如果这步做完，你的数据库迁移任务至少完成了50%。至于为什么失败，一千个SDE，有一千个苦逼。山人只能帮你到这了，请自行Google，或者找公司的security、网络工程师帮忙。

如果幸运的你成功的找到了原因，可以通过modify命令来修改endpoint配置，重新连接

```bash
# Modify endpoint信息
aws dms modify-endpoint --username dms_user --password dms_user_vbs1cn --endpoint-arn arn:aws-cn:dms:cn-north-1:935219088151:endpoint:EYSFCMGUZFUPTX233UBFUY5JSI --server-name 10.107.144.191
```

##### **2.5 创建Replication Tasks**

```bash
# 创建Task
aws dms create-replication-task --replication-task-identifier ${teamname}-${env}-${src_db_name}-${trg_database_name}-${schema_name}-${load_type}-${task_owner}-${trg_db_user} --source-endpoint-arn ${src_endpoint_arn} --target-endpoint-arn ${trg_endpoint_arn} --replication-instance-arn ${replication_instance_arn} --migration-type ${migration_type} --table-mappings 'file://Mappings.json' --replication-task-settings 'file://TaskSettings.json' --tags Key=$team_tag_Key,Value=$team_tag_value
```

值得注意的是当前的DMS task有三种`--migration-type`：

1. **fullload** 通常是用于oracle数据已经没有change了的整体备份，底层通过postgres的insert来快速复制。亲测通网络几乎1G/2s。 
2. **cdc** 即Change Data Capture；根据oracle的supplement log复制从设定的某个时间点之后update的change，如果使用这个选项，需要结合` —cdc-start-time`使用。
3. **fullloadandcdc** 是把1和2自动结合，是推荐的复制方法。

另外一个参数`--table-mapping`是配置源oracle的schema，table，columns到目标postgres db的schema 名字的转换。此处山人开始没有太在意，后来调入坑中差点没爬出来。基本的配置如下：

```xml
{
	"rules": [
		{
			"rule-type": "selection",
			"rule-id": "1",
			"rule-name": "1",
			"object-locator": {
				"schema-name": "EPPS_PROD_USER",
				"table-name": "%"
			},
			"rule-action": "include"
		},
		{
			"rule-type": "transformation",
			"rule-id": "2",
			"rule-name": "2",
			"rule-target": "schema",
			"object-locator": {
				"schema-name": "EPPS_PROD_USER"
			},
			"rule-action": "convert-lowercase"
		},
		{
			"rule-type": "transformation",
			"rule-id": "3",
			"rule-name": "3",
			"rule-target": "table",
			"object-locator": {
				"schema-name": "EPPS_PROD_USER",
				"table-name": "%"
			},
			"rule-action": "convert-lowercase"
		},
		{
			"rule-type": "transformation",
			"rule-id": "4",
			"rule-name": "4",
			"rule-target": "column",
			"object-locator": {
				"schema-name": "EPPS_PROD_USER",
				"table-name": "%",
				"column-name": "%"
			},
			"rule-action": "convert-lowercase"
		}
	]
}
```

注意这里的所有schema，table, column名字都是指你的源oracle DB里的名字而不是postgres里的名字。**如果你的Oracle Schema，Table，Column跟我一样都是大写的话，上面配置里的transformation一定要加上，一定要加上，一定要加上！** 因为postgres默认是case insensitive的，默认显示的都是小写的，如果没没有transformation选项，你会发现有各种奇怪的现象，如果你真的遇到了记得一定要给我留言，让我也乐一乐。
<label for="sn-1" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-1" class="margin-toggle"/>
<span class="sidenote">
	好吧，如果你不想让我也乐乐，你可能需要在fullload做完后，把table, column由大写改成小写。
</span>

```sql
alter table schema_name.TABLE_NAME rename to to TABLE_NAME_old;
alter table schema_name."TABLENAME" rename to TABLE_NAME;
```

还有一个参数`--replication-task-settings`便是真正设置task的基本属性：

```xml
{
	"TargetMetadata": {
		"TargetSchema": "",
		"SupportLobs": false,
		"FullLobMode": false,
		"LobChunkSize": 64,
		"LimitedSizeLobMode": true,
		"LobMaxSize": 32
	},
	"FullLoadSettings": {
		"FullLoadEnabled": true,
		"ApplyChangesEnabled": true,
		"TargetTablePrepMode": "DO_NOTHING",
		"CreatePkAfterFullLoad": false,
		"StopTaskCachedChangesApplied": false,
		"StopTaskCachedChangesNotApplied": false,
		"ResumeEnabled": true,
		"ResumeMinTableSize": 100000,
		"ResumeOnlyClusteredPKTables": true,
		"MaxFullLoadSubTasks": 4,
		"TransactionConsistencyTimeout": 3600,
		"CommitRate": 10000
	},
	"Logging":{
	 	"EnableLogging": true,
		 "LogComponents": [{
	     	"Id": "SOURCE_UNLOAD",
	     	"Severity": "LOGGER_SEVERITY_DEFAULT"
		 },{
		     "Id": "SOURCE_CAPTURE",
		     "Severity": "LOGGER_SEVERITY_DEFAULT"
		 },{
		     "Id": "TARGET_LOAD",
		     "Severity": "LOGGER_SEVERITY_DEFAULT"
		 },{
		     "Id": "TARGET_APPLY",
		     "Severity": "LOGGER_SEVERITY_INFO"
		 },{
		     "Id": "TASK_MANAGER",
		     "Severity": "LOGGER_SEVERITY_DEBUG"
		 }]
	}
}
```

最重要的四个参数：

1. **FullLoadEnabled** true则表示启动fullload
2. **ApplyChangesEnabled** true表示启动cdc
3. **TargetTablePrepMode** 有三个选择：*DO_NOTHING*-表存在就复制，不存在就忽略；*TRUNCATE_AND_CREATE*-表存在就把表数据truncate之后开始job；*DROP_AND_CREATE*-表存在就把表连同shema直接删掉，然后重新建表。
4. **CreatePkAfterFullLoad** 默认false。true则表示等fullload job执行完之后见主键，这样有利于提供性能。

**注意#1和#2有四种组合，但前面说过我们的migration-type只有三种。也即两者不能都为false。**

创建完task之后便可以启动task了

```bash
# Start task
aws dms start-replication-task --replication-task-arn arn:aws-cn:dms:cn-north-1:935219088151:task:CXQ6WEZ2KSMLJFWWFAHVECXKUQ --start-replication-task-type start-replication

aws dms start-replication-task --replication-task-arn arn:aws-cn:dms:cn-north-1:935219088151:task:DFE4CW7R6JWMRTFYH67HTZH47M --start-replication-task-type reload-target

aws dms start-replication-task --replication-task-arn arn:aws-cn:dms:cn-north-1:935219088151:task:DFE4CW7R6JWMRTFYH67HTZH47M --start-replication-task-type  resume-processing

# Stop task
aws dms stop-replication-task --replication-task-arn arn:aws-cn:dms:cn-north-1:935219088151:task:CXQ6WEZ2KSMLJFWWFAHVECXKUQ

```

这里的`--start-replication-task-type`有三个选项，正常第一次创建的task使用的是`start-replication`。然后如果你发现replication有问题，修改了前面提到过的mapping-setting或是task-setting，则可以选择`reload-target`。第三种对于fullloadandcdc更常见的应用场景是，启动fulload之后，先停止task，然后开始建index,PK,FK，这些建好了之后使用`resume-processing`来恢复task使用cdc。

#### 3. Trouble Shotting

- **1.Q** 如果你开始忘记了使用fulloadadncdc 的type而是只用了fullload，那可能有数据丢失的风险。
- **1.A** 那么则需要你fullload做完后重新建一个cdc的job，且该cdc开始的时间要早于fullload开始的时间，才能保证你的数据都同步过来。
<hr>

- **2.Q** 如果你开启cdc only的task时遇到如下错误

```java
-19462699: 2018-09-06T06:13:34 [SOURCE_CAPTURE ]E: ORA-08180: no snapshot found based on specified time ORA-06512: at "SYS.TIMESTAMP_TO_SCN", line 1 [1022307] (oracdc_merger.c:683) 
-19462699: 2018-09-06T06:13:34 [SOURCE_CAPTURE ]E: Failed to convert local timestamp 2018-08-31 10:03:08 to SCN [1022307] (oracdc_merger.c:685)
```
- **2.A** 其表示oracle的该时间点的timestamp已经不存在了。因为oracle默认保存的undo记录**只有5天，只有5天，只有5天**。 

>we keep about 5 days of uptime work of timestamps to SCN's. If you go beyond that, we might not be able to map the timestamp to an SCN. 
Flashback query based on undo (not total recall in 11g) has a theoretical limit of a few days (like five days would be A LOT - a ridiculous amount actually). 
If you want to flashback further in the past AND you still have the undo - then you can use the SCN based approach instead of a timestamp. 

<hr>

*So long, and thanks for all the fish.*

#### 参考  

[1] [AWS DMS CLI Reference](https://docs.aws.amazon.com/cli/latest/reference/dms/index.html).  