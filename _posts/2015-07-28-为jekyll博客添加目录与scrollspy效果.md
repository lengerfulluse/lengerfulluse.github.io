---
layout: post
title: 为Jekyll博客添加目录与ScrollSpy效果
category: tutorials
tags: [jekyll, tips]
published: True

---
随着网上利用[Jekyll](http://jekyllrb.com/)＋[Github Pages](https://pages.github.com/)搭建个人静态博客的帖子越来越多，按照教程自己动手搭一个基于Github账户的博客已完全成为一个五分钟速成课程的内容了。网上也随处可见优美的[博客主题](http://jekyllthemes.org/)，且能完全即插即用。但对于一些想要更深入定制化的博主，本文主要集合自己折腾的经验介绍下如何给Jekyll博客添加目录（即Table of Content）以及定制化目录显示的ScrollSpy效果。

<!--more-->

**如下图所示，生成ScrollSpy效果的目录结构主要有三个部分。**

![Toc with ScrollSpy]({{site.cdnurl}}/assets/img/post/toc_of_scrollspy.png)
<hr />

####1 目录生成插件选择
Jekyll官网上的plugins目录下便列出了很多有用的插件，其中关于目录生成的[jekyll-toc-generator](https://github.com/dafi/jekyll-toc-generator)便是官方推荐的。但对于在Github上建站的同学应该知道，Github禁止了很多plugins的自动build，尽管也正在增加一些插件白名单，但貌似这个插件是不能通过源码提交给Github pages自动build的。因此对于不想通过设定.nojekyll 本地build，然后push整个静态代码到Github上的同学，可能一些纯javascript的插件便是首选。
#####1-a 纯JS版本
本文所用的便是纯javascript版的toc插件[jekyll-table-of-contents](https://github.com/ghiculescu/jekyll-table-of-contents). 其README也很详细，照着一步步配即可。  
* 在待添加插件的模板中首先加入`jquery.js`的依赖，然后是把该`toc.js`放在其后。

{% highlight  css  %}
<script src="/javascripts/jquery-2.1.4.min.js" type="text/javascript"></script>
<script src="/javascripts/toc.js" type="text/javascript"></script>
{% endhighlight %}

* 在需要显示目录结构的地方加上如下div。

{% highlight  css  %}
<div id="toc"></div>
{% endhighlight %}

* 把toc.js调用函数放在最后（如`</body>`之前）即可。

{% highlight  javascript  %}
<script type="text/javascript">
$(document).ready(function() {
    $('#toc').toc();
}); </script>
{% endhighlight %}

####2 Markdown实现版本
Toc插件生成目录的原理便是借助markdown为每个header生成一个唯一的id，然后Toc便会寻找这样的header id逐一的构造相应的锚链接，并显示即可。  
常见的Markdown实现如[rdiscount](https://github.com/davidfstr/rdiscount),[kramdown](http://kramdown.gettalong.org/),[redcarpet](https://github.com/vmg/redcarpet)。不同的版本，需要在`_config.yml`文件中进行相应的配置。如对于rdiscount，配置如下：

    markdown: rdiscount
    rdiscount:
      extensions:
        - generate_toc

值得说明的是，我发现rdiscount对每个header会生成相同的id,便导致了Toc插件生成的所有目录都被定向到同一个锚链接。在网上收了下有一些issues谈到这方面的问题，如：  
1. [https://github.com/jekyll/jekyll/issues/110](https://github.com/jekyll/jekyll/issues/110)  
2. [https://github.com/jekyll/jekyll/issues/471](https://github.com/jekyll/jekyll/issues/471)  
3. [https://github.com/ghiculescu/jekyll-table-of-contents/issues/16](https://github.com/ghiculescu/  jekyll-table-of-contents/issues/16)  
所以如果有同学遇到类似的情况，可以用其他的markdown版本，如redcarpet.

对于redcarpet,配置如下：

    markdown: redcarpet
    redcarpet:
      extensions: [with_toc_data]

用redcarpet时同样值得注意的是，对于使用<!--more-->串来做摘要分割符的会发现redcarpet并不能根据其来准确的截取相应的摘要串。原因便是redcarpet会对一些字符如`<,>`进行转义，变成相应的`&lt;,&gt;`。
#####2-a 锚链接缩进问题
当你为网页设置了一个固定位置的导航栏（具有确定的高度），然后你为其他页面内容生成了锚链接（如本文提到的目录结构）。当你点击锚链接时，页面会跳转到相应的锚链接位置，且该锚链接的起始点会缩进到最上方，而部分被导航栏遮住。如下表左表所示：  

      点击：http://foo.com/#bar
      错误 (but the common behavior):         正确:
      +---------------------------------+      +---------------------------------+
      | BAR///////////////////// header |      | //////////////////////// header |
      +---------------------------------+      +---------------------------------+
      | Here is the rest of the Text    |      | BAR                             |
      | ...                             |      |                                 |
      | ...                             |      | Here is the rest of the Text    |
      | ...                             |      | ...                             |
      +---------------------------------+      +---------------------------------+
而你希望的行为则是如右表所示的。对此，可以在toc脚本生成header时为其添加一个div的class,

{% highlight  html %}
<h1><a class="anchor" name="barlink">Bar</a></h1>
{% endhighlight %}

然后在css中设置起式样为：

{% highlight  css %}
/* 具体padding高度可以根据你导航栏的高度来设定 */
.anchor{padding-top: 50px;}
{% endhighlight %}

####3 为目录显示添加scrollspy效果
scrollspy效果即导航栏或目录会随着页面的滑动位置自动显示当前所在的段落所属的导航条目。其主要是基于著名的[bootstrap](http://getbootstrap.com/)来实现的。W3Cschool上有一个设置scrollSpy的简单[教程](http://www.w3schools.com/bootstrap/bootstrap_scrollspy.asp)。但其主要是针对手动设置header id的情况。针对通过toc.js自动生成header id的配置如下：  

* 添加bootstrap式样头和脚本    

{% highlight  html %}
<link rel="stylesheet" href="/stylesheets/bootstrap.min.css">
<script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
{% endhighlight %}

* 在你想要操作的页面范围内（通常是<body>)内设置滚动事件的响应目标（可以是id或是class，此处我们用toc表示目录），如下：

{% highlight  html %}
<body  data-spy="scroll" data-target=".toc" data-offset="20">
{% endhighlight %}

* 设置你的toc div: 

{% highlight  css %}
<div class="toc">
/* 你的scrollSpy目录结构将要显示在这里 */
</div>
{% endhighlight %}

* 在你的toc.js脚本中添加bootstrap中的｀nav nav-pills nav-stacked`类：  

{% highlight  javascript  %}
/* 把 html = settings.title + " <" + settings.listType + ">" 变成如下 */
html = settings.title + " <" + settings.listType + " class = 'nav nav-pills nav-stacked'>";

{% endhighlight %}

So long, and Thanks for all the fish.

####参考
[1]. [jekyll-table-of-contents](https://github.com/ghiculescu/jekyll-table-of-contents).  
[2]. [positionfixed-page-header-and-anchors](http://stackoverflow.com/questions/4086107/html-positionfixed-page-header-and-in-page-anchors).  
[3]. [W3cScholl](http://www.w3schools.com/bootstrap/bootstrap_scrollspy.asp).  
[4]. [Implementing ScrollSpy](http://idratherbewriting.com/2015/01/20/implementing-scrollspy-with-jekyll-to-auto-build-a-table-of-contents/)







