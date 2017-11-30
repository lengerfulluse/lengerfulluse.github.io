---
layout: post
title: "GitHub账户设置多个SSH Keys"
category: tutorials
tags: [tips]
published: True
date: "2017-11-29 03:59:18 -0800"
---
---
针对不同的git代码库配置不同的的git name, email, 以及相应的ssh公私钥。满足同一台电脑或是同一个git 账户的不同用户提交。尤其适用于在公用电脑（比如公司电脑）上提交自己GitHub代码库。如果想直接查看代码，请直接跳转到[How](#how)。也可以查看使用场景是否跟你的一致，第二节原理篇则介绍这些命令背后的逻辑，均可忽略。

<!--more-->

### What-场景
玩GitHub的往往都不是freelancer，而是经常需要用公司的电脑在业余时间做些自己的事，但很多时候公司的code repository也有自己的configuration，比如Git email, ssh的配置public key的配置都是private的，不可能直接用于提交自己的GitHub项目代码。因此配置多个git config便显得很有必要了。

比如我希望在工作的时候，用的是公司的代码库进行日常coding，git commit 的message如下：  

```
commit blabalasdf77232 (HEAD -> master, origin/master)
Author: Wei Heng <weheng@mynux.cn>
Date:   Thu Nov 23 23:32:27 2017 -0800
```
然后当我在GitHub上折腾自己的repository时，提交的message是这样的：

```
commit 9932e91626beb6a262ee456ab8058a0ec1159233 (HEAD -> master, origin/master)
Author: jj <jj@hengwei.me>
Date:   Tue Nov 28 04:11:54 2017 +0800
```
### Why-原因
要实现如上的使用场景，需要做两个配置，用git config来配置commit的message username，email。用ssh的config来配置相应ssh的访问权限，具体原理如下：
#### git config
git commit username和email可以通过config来设置，git config的[级别如下](https://www.atlassian.com/git/tutorials/setting-up-a-repository/git-config)：

**git config 级别**
> --local, 即repository-specific

针对每一个Git库进行设置，设置后的config文件在相应库下的.git/config中。默认的git config命令就是设置的当前库。

> --global，即user-specific

针对每一个系统用户的Git进行设置，设置后的config文件在~/.gitconfig中。可以通过命令`git config --global`进行设置。

> --system, 即machine-specific

针对整个机器上的用户Git进行设置，设置后的config文件在/etc/gitconfig中。可以通过命令`git config --system`进行设置。

#### ssh config
比如当你在GitHub上创建一个项目，想clone到本地进行代码pull，push时，可能会看见下面的ssh clone选项：  

![github-ssh-clone]({{site.cdnurl}}/assets/img/post/github-ssh-key-config.png)

因为GitHub默认为每一个库都配置了安全权限，只有经过授权的ssh key才具有pull，push的权限。通过`ssh-keygen`命令来产生默认的ssh key可以参考这篇文章[connecting-to-github-with-ssh](https://help.github.com/articles/connecting-to-github-with-ssh/)。
如果想要实现[What](#what)场景所述的多个ssh keys配置，则需要修改`~/.ssh/config`文件。

__需要针对公司的git配置生成一个默认的ssh key，相应的`.ssh`目录下rsa keypair 为`id_rsa`和`id_rsa.pub`。
针对自己的github账户，生成另外一个ssh key，相应的`.ssh`目录下rsa keypair 为`id_rsa_for_jj`和`id_rsa_for_jj.pub`__

### How-代码
比如对两个用户jj(jj@hengwei.me),weheng(weheng@mynux.cn)配置代码如下：

#### 针对公司的账户weheng

**git config**

```
git config --global user.name "weheng"
git config --global user.email "weheng@mynux.cn"
```
**ssh config**

```
# generate rsa 配置 ~/.ssh/id_rsa和~/.ssh/id_rsa.pub
ssh-keygen -t rsa -C "weheng@mynux.cn"
```
**[Optional]**修改`.ssh/config`文件增加如下行

```
host mynux.cn
	HostName mynux.cn
	User git
	IdentityFile ~/.ssh/id_rsa
```
#### 针对自己的github账户jj
**git config**

```
git config user.name "jj"
git config user.email "jj@hengwei.me"
```
**ssh config**

```
# generate rsa 配置 ~/.ssh/id_rsa_for_jj和~/.ssh/id_rsa_for_jj.pub
ssh-keygen -t rsa -C "jj@hengwei.me"
```
修改`.ssh/config`文件增加如下行:

```
host github.com
	HostName github.com
	User git
	IdentityFile ~/.ssh/id_rsa_for_jj
```
So long, and thanks for all the fish.   
###参考  
