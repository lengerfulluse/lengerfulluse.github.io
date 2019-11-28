---
title: Isso Commenting System Setup Guide
layout: post
category: Notes
tags: [tips, tools]
published: True
---

基于Markdown的blog系统如今依旧盛行不止，但国内用户一直苦于没有一个比较完善的评论系统，Disqus就经常性加载不出来（背墙），多说之类的已经面临倒闭。对于只想安静的写写东西的轻博客er，wordpress之类的基于mysql的又比较重。之前也介绍过利用[反向代理翻墙Disqus](http://t.hengwei.me/post/disqus-on-jekyll-%E4%B9%8B%E7%BF%BB%E5%86%85%E7%AF%87.html)的实例，但是其不稳定，且配置复杂不支持跨域https之类的。本文引入的Isso评论系统，基于轻量级文件DB的本地评论系统恰恰满足了我的基本要求。

<!--more-->

Isso一个最好的地方应该就是可定制性，不仅轻量级，而且css都可以定制，有时间折腾的话还是非常好的。TODO一下

### 1. Configuration
client configuration没有什么区别，只要按照isso的官网来就行。 

*https://posativ.org/isso/docs/configuration/client/*

Server端配置主要是设置默认的DB目录，以及对于本地server的理解，我用//在下面标注了基本的comments。


```java
[general]
; database location, check permissions, automatically created if not exists
dbpath = /var/www/isso/data/comments.db

; your website or blog (not the location of Isso!)
; host = http://example.tld/
; you can add multiple hosts for local development
; or SSL connections. There is no wildcard to allow
; any domain.
host = XXX
notify = smtp //有评论是通知方式，基本两种，stdout或者邮件。
reply-notifications=true  // 是否作者回复时notify评论者

[server]
listen = http://localhost:9000/ // Isso的本地端口。

[moderation]
enabled = true // 是否进行评论审核，防止垃圾评论。
purge-after = 30d

[smtp]
username = lengerfulluse@gmail.com 
password = XXX
host = smtp.gmail.com // SMTP地址
port = 465 // ssl port，当前isso不支持tls协议端口
security = ssl
to = lengerfulluse@gmail.com
from = "饮 水"<isso@hengwei.me>
timeout = 10
```
### 2. Troubleshooting
其实基本的搭建和client/server端配置很容易，也能很快实现，但是很多人都发现比如如果基于Gmail的话会经常连不上SMTP服务器。报的错误是：

```shell
SMTPAuthenticationError: (534, '5.7.14
<https://accounts.google.com/ContinueSignIn?sarp=1& scc=1&plt=stsnlll\n5.7.14
...
j4_5F      kw> Please log in via your web browser and then try again.\n5.7.14
Learn more at https://s upport.google.com/mail/bin/answer.py?answer=787\n5.7.14
23 d26d88119.25 - gsmtp')
```

如果你确认用户名密码没有输入错误的话，你需要确认你没有使用2-factor authentication，然后Disable CAPTCHA。

1 . 登录gmail邮箱  
2 . **点击[DisplayUnlockCaptcha](http://www.google.com/accounts/DisplayUnlockCaptcha)页面**  
3 . 点击Continue，会看见下面的message  

   >Account access enabled Please try signing in to your Google account again from your new device or application.  

4 . 重新启动`isso -c isso.cfg run`  

### 参考
[1] [Isso Official Documentation](https://posativ.org/isso/docs/).    
[2] [Python SMTP Troubleshooting](http://joequery.me/guides/python-smtp-authenticationerror/).
