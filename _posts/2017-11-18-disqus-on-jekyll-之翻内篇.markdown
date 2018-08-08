---
layout: post
title: Disqus On Jekyll 之翻内篇
category: tutorials
tags: [tips, jekyll]
published: True

---
在自建Jekyll类静态博客上搭建轻量级评论系统是一个大抵都走过这几步：  

1. 从最初按照[Disqus On Jekyll](https://disqus.com/admin/install/platforms/jekyll/)的标准教程搭建Disqus原生评论系统。
2. 发现在天朝经常加载不起来，或者匿名评论系统比较隐蔽，放弃disqus，转投类WordPress自建评论系统或者国内成熟的评论系统，比如多说、畅言。
3. 发现国内系统不好用或者不好看，或者不稳定（比如多说系统关闭了），一部分人开始停止折腾，转投WordPress博客，或者直接不使用评论系统了
4. 然后就没有然后了

<!--more--> 

最近发现有篇不错的文章，介绍怎么通过反向代理调用在墙内使用Disqus评论系统，目前来看比较成熟的应该是[fooleap](http://blog.fooleap.org/use-disqus-correctly.html)的这篇博客上提到的方法，即通过中间一个能翻墙的VPS来整一个反向代理server，把对Disqus的API调用通过该服务器来访问，并把结果返回。

![Disqus Reverse Proxy]({{site.cdnurl}}/assets/img/post/disqus-reverse-proxy.png)  
作者还维护了一个[GitHub repository](https://github.com/fooleap/disqus-php-api)，update和bug fix都很active，山人也试了下发现非常好用，代码写的也很规范，尤其适合前端小白搭建自用。GitHub 上的readme还是稍微有点省略，在此Mark下从0开始的搭建过程，也同时帮忙推广这个project
<label for="sn-1" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-1" class="margin-toggle"/> 
<span class="sidenote">
也有些基于该project的repositoreis，比如把原生的PHP代理sever换成[nodejs](https://github.com/ciqulover/disqus-proxy)的。
</span>。

### STEP 0  
**当然是有一个境外的VPS主机，香港，新加坡，日本或是欧美的都行呐。**也不贵一般正常5$/mon的，比如山人用了三年多的[Digital Ocean](http://digitalocean.com/)的VPS，平时翻墙Google，油管看视频完全没问题。可以点此[推荐链接](https://m.do.co/c/5883203aace7)直接申请。除却给Disqus用作反向代理，还可以通过shadowsocks实现科学上网，自建博客当然也没问题的。一举三得。当然如果你没有VPS，博客访问量不大的化，可以几个人共用一个VPS也未尝不可。

### STEP 1  
基本的搭建过程为如下几步：  

1. 根据安装好的VPS操作系统，比如Ubuntu，安装基本的Nginx和php服务器，配置nginx reverse proxy。
2. 部署 [disqus反向代理](https://github.com/fooleap/disqus-php-api)，并修改server端配置。
3. 修改Disqus代理client端配置。

#### 1.1 安装Nginx和PHP服务  
Ubuntu上安装nginx直接apt一键完成：

```
sudo apt-get update
sudo apt-get install nginx
```

接下来安装PHP：

```
# for ubuntu 16.04
sudo apt-get install php-fpm php-mysql
# for ubuntu 14.04
sudo apt-get install php
```

处于安全考虑，接下来配置PHP processor cgi默认安全配置

```
# 修改php.ini文件
sudo nano /etc/php/7.0/fpm/php.ini
# 搜索cgi.fix-pathinfo，把默认值改为1
cgi.fix_pathinfo=0
# 重启PHP server即可
sudo systemctl restart php7.0-fpm
```

然后就是配置NGINX，把相应的serverip指定使用PHP processor

```
sudo nano /etc/nginx/sites-available/default
```

把default文件改成如下类似配置即可<label for="sn-1" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-1" class="margin-toggle"/> 
<span class="sidenote">
	NGINX支持把多个子域名映射到同一个VPS上的。比如可以对Disqus反向代理自建一个子域名disqus.hengwei.me，相应的配置会略有不同，比如我们的server_name需要改成disqus.hengwei.me，根目录root，需要改成相应子域名目录，如/var/www/disqus.hengwei.me。
</span>。

```
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;
    index index.php index.html index.htm index.nginx-debian.html;

    server_name server_domain_or_IP;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php7.0-fpm.sock;
    }

    location ~ /\.ht {
        deny all;
    }
}
```

修改完之后，可以通过如下命令测试语法是否正确：

```
sudo nginx -t
```

如果没有问题，reload下NGINX：

```
sudo systemctl reload nginx
```

测试安装PHP是否成功

```
sudo nano /var/www/html/info.php
```

添加如下内容：

```
<?php
phpinfo();
```

保存关闭文件，打开网址`http://server_domain_or_IP/info.php`查看正确看到PHP页面。如果可以，删掉测试页面

```
sudo rm /var/www/html/info.php
```

然后我们就可以进入正题，配置服务器端Disqus PHP 代理的代码。
#### 1.2 配置Disqus服务器端代码 
进入GitHub [disqus-php-api](https://github.com/fooleap/disqus-php-api.git) repository 页面，clone代码到VPS服务器目录下，如home目录下

```
cd /home/hengwei/
git clone https://github.com/fooleap/disqus-php-api.git
```

其中**api/**目录下为服务器端代码，我们只要把该目录下代码拷贝到上文nignx配置文件中所示的root目录路径`/var/www/html`即可。

```
cp -r /home/hengwei/disqus-php-api/api/* /var/www/html/
```

进入该目录：

```
cd /var/www/html
```

其中config.php为链接disqus所需的配置文件，打开，主要修改如下字段，具体修改config.php里注册写的已经非常详细了，还有问题可以直接[blog.fooleap.org](http://blog.fooleap.org)留言，或者直接问山人也可以。修改完保存即可。

```
define('DISQUS_PUBKEY', 'E8Uh5l5fHZ6gD8U3KycjAIAk46f68Zw7C6eW8WSjZvCLXebZ7p0r1yrYDrLilk2F');
define('DISQUS_USERNAME', 'willheng');
define('DISQUS_EMAIL', 'jj@hengwei.me');
define('DISQUS_PASSWORD', 'password');
define('DISQUS_WEBSITE', 'http://t.hengwei.me');
define('DISQUS_SHORTNAME', 'shortname');
define('DISQUS_APPROVED', true);
```

####1.3 配置Jekyll上的Disqus反向代理

**添加原生Disqus评论**  

如果你之前已经部署好了自己的Disqus，只是在天朝没法访问，请直接跳转过此步。如果在自己的Jekyll上没有部署过Disqus，细节可以参照这篇[博客](http://www.perfectlyrandom.org/2014/06/29/adding-disqus-to-your-jekyll-powered-github-pages/)，具体过程我就不再赘述，网上代码到处都是。当按照各种教程在post下方添加好Disqus的评论插件后，如果你也想在文章首页或者在标题的某个地方显示每篇文章的评论数，那下面这段代码可能对你有用：

```javascript
<script type="text/javascript">
  /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
  var disqus_shortname = 'perfectlyrandom'; // required: replace example with your forum shortname
  // var disqus_developer = 1; // Comment out when the site is live

  /* * * DON'T EDIT BELOW THIS LINE * * */
  (function () {
    var s = document.createElement('script'); s.async = true;
    s.type = 'text/javascript';
    s.src = 'http://' + disqus_shortname + '.disqus.com/count.js';
    (document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
  }());
</script>
```
然后在你想要显示评论数的地方，比如像山人这种在博客首页和文章标题旁显示的，就可以在相应的HTML里加上下面这行，然后当你点击评论数的超链接时，就会自动调到Disqus评论线程去了。

```javascript
<a href="{{ post.url }}index.html#disqus_thread" data-disqus-identifier="{{post.url}}"></a>
```

原生的配置完了，我们就可以再次基础上使用反向代理技术来科学的在墙内使用Disqus了。

**科学使用Disqus篇**  

相比较其他的反向代理的Disqus评论，比较推崇fooleap的原因就在于其设计初衷是简单简化迁移过程，尽可能做到和Disqus原生代码的透明迁移。修改起来也很简单  

**IMPORT css/js** 

把[1.2](#1-2-disqus)中我们下载下来的[disqus-php-api](https://github.com/fooleap/disqus-php-api.git)文件中**dist**文件夹下的iDisqus.min.js, iDisqus.min.css文件导入到自己博客的相应目录，如路径`/assets/js/iDisqus.min.js`和`/assets/css/iDisqus.min.css`，然后在相应的HTML文件头中import进来即可。

```javascript
<script type="text/javascript" src="/assets/js/iDisqus.min.js"></script>  
<link rel="stylesheet" type="text/css" href="/assets/css/iDisqus.min.css" />
```

接下来，在把原来加入的Disqus评论JavaScript，类似这样的：

```javascript
<div id="disqus_thread"></div>
<script type="text/javascript">
    /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
    var disqus_shortname = 'perfectlyrandom'; // required: replace example with your forum shortname
    // var disqus_developer = 1; // Comment out when the site is live
    var disqus_identifier = "{{ page.url }}";

    /* * * DON'T EDIT BELOW THIS LINE * * */
    (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
</script>
```

直接替换成如下：

```javascript
<div id="comment"></div>
<script type="text/javascript">
  $(document).ready(function () {
    var disq = new iDisqus('comment', {
        forum: 'lengerfulluse',
        api: 'http://disqus.hengwei.me',
        site: 'http://t.hengwei.me',
        url: location.pathname,
        mode: 1,
        timeout: 2000,
        init: true,
        badge: "山人"
      });
    disq.count();
  });
</script>
```

如此，打完收工。

So long, and thanks for all the fish.   

###参考  
**1.** [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-linux-nginx-mysql-php-lemp-stack-in-ubuntu-16-04)  
**2.** [Disqus-php-api](https://github.com/fooleap/disqus-php-api).  
**3.** [科学使用Disqus](http://blog.fooleap.org/use-disqus-correctly.html).  