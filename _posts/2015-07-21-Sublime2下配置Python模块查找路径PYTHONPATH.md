---
layout: post
title: Sublime2下配置Python模块查找路径PYTHONPATH
category: tutorials
tags: [tips]
published: True

---

最近在搞[sclearn kit](http://scikit-learn.org/stable/auto_examples/classification/plot_classifier_comparison.html)库，用命令行build太麻烦，就直接用Sublime2来build，但发现build时总是出现sclearn模块找不到的情况，但的确已经通过pip install 了相关包，最后发现是sublime2里配置的Python setting 路径也需要配置**PYTHONPATH**变量来指出module的路径。

<!--more-->

####问题场景
按照sclearn安装页的指示，安装了必要的package后，在sublime2中通过｀cmd + B`来build后出现了如下错误：  

	Traceback (most recent call last):
  	File "/Users/weiheng/Documents/personal/demo/scikit/plot_classifier_comparison.py", line 34, in <module>
    from sklearn.cross_validation import train_test_split
	ImportError: No module named sklearn.cross_validation

但我用python命令行import是没问题的。
####原因分析
需要在_Python.sublime-build_中设置**env**变量。Google了一些可能的答案，发现上面的错误是由于sublime2中默认的python模块的路径中找不到sclearn模块，而控制模块查找路径的则是$PYTHONPATH变量而非$PATH变量。且sublime2 GUI是通过自己的python设置文件查找变量的，很多建议在_.profile_， _.zshrc_等命令行配置文件中加上PYTHOINPATH变量的其实是不能工作的。solution则是：Click Sublime2 Text 2菜单，进入_Preference／Browse Packages／Python_文件夹，编辑_Python.sublime-build_文件在其中加上：  

	"env":
	{
    	"PYTHONPATH":"/usr/local/lib/python:/usr/local/lib/python2.7/site-packages"
	},

保存即可。贴一个build之后生成的分类器比较照片，对于理解不同分类器很有帮组。 ![classifier comparision]({{site.cdnurl}}/assets/img/post/classification_comparison.png) 

####参考
**[1]** [Stackoverflow](http://stackoverflow.com/questions/8574919/sublime-text-2-custom-path-and-pythonpath)  
**[2]** [How to specify which Python version ](http://robinwragg.tumblr.com/post/55364315373/how-to-specify-which-python-version-sublime-text-2#notes)  

