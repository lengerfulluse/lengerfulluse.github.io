---
layout: post
title: Java 异常处理实践
category: programming
tags: [language, tips]
published: True

---

Java中的异常处理一直是困扰着我。比如catch并throw一个异常的best practice是什么？checked和unchecked异常的区别和使用，异常和错误该如何处理。最近在工作中连续出现了一些与异常相关的一些issues，才发现需要进行一些整理和总结了。

<!--more-->

####Exception的层次结构
如图所示，java错误，异常类都是源于一个叫做Throwable的基类，只有该类及其子类的实例对象才可以被JVM进行`throw`操作。且也只有该类及其子类能作为`catch`语句的输入参数。![层次](/assets/img/post/java_exception.png).