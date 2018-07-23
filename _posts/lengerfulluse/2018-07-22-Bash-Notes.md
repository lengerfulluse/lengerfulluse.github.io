---
layout: post
title: Shell常用tips汇总
category: work
tags: [tools]
published: True

---
近期的migration项目接近尾声，再一次深刻的验证了[Pareto's Principal](https://en.wikipedia.org/wiki/Pareto_principle)，基本前面的80%的工作用20%的efforts就搞定了，而剩下的20%的事则花费80%的时间，而且往往吃力不讨好。才发现功能的migration往往还算比较容易的，而真正的难点在于on-flying case的数据迁移。闲话扯太多，其实是想记录下近期用到的非常有用的shell命令。



<!--more-->

#### 1. 统计数目
```bash
awk '{ tot[$0]++ } END { for (i in tot) printf("%s\t%s\n", i,tot[i]) }'
sort file | uniq -c
```
#### 2. 用back-reference提取多个字符串
```bash
sed 's/\[http-/\n&/g; s/userid":/\n&/g;s/recmid":"/\n&/g;s/[^\n]*\nuserid":\([[:digit:]]*\)[^\n]*/\1 /g;s/.$//'
```
#### 3. shell里hash的使用
http://www.artificialworlds.net/blog/2012/10/17/bash-associative-array-examples/

#### 4. 按照pattern插入一个新行
```bash
echo foo | perl -pe 's/(.*)/\n$1/'
```

#### 5. Awk版Hash。
```bash
awk '
BEGIN{
   FS=OFS=","
   while ( (getline line < "lookup_file.txt") > 0 ) {
      split(line,f)
      map[f[1]] = f[2]
   }
}
{ $3 = map[$3]; print }
' data.txt

# another simple example: 
# first loop over ledger-email-part1.done file, and store into hash named 'h', and 
# iterate over prod-customerID.part1 file, do some operations via 'h'.
awk 'NR==FNR {h[$1] = $2; next} {print h[$2]}' ledger-email-part1.done prod-customerID.part1
```

#### 6. Find & Exec 
```bash
find . -exec cmd {} \;
```

#### 7. VIM 操作
```bash
# merge偶数(even)行到奇数(odd)行
:global/^/join

#删除空行
:global/^$/d

#全局替代某个pattern的value
:1,$ s/pattern/replace/g
```
#### 8. Sed usage with regex
```bash
cat ledger-gc-part1.done | sed -n -e 's/^.*customer:\(.*\) with amount:\(.*\) for gcId:\(.*\), via.*$/\1,\2,\3/p'

### Sed的非贪婪匹配
### Non greedy match with [^/]* instead of .*?, eg:
sed 's|\(http://[^/]*/\).*|\1|g'

```


#### Reference
[1. Advanced Bash-Scripting Guide](http://tldp.org/LDP/abs/html/)  
[2. Common Used Bash Command](https://gist.github.com/lengerfulluse/a7eb46b1e4138bb7ba2176ded06b3869)
