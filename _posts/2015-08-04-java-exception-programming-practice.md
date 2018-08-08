---
layout: post
title: Java 异常处理实践
category: programming
tags: [language, tips]
published: True

---

Java中的异常处理一直是困扰着我。比如catch并throw一个异常的best practice是什么？checked和unchecked异常的区别和使用，异常和错误该如何处理。最近在工作中连续出现了一些与异常相关的一些issues，才发现需要进行一些整理和总结了。  

<!--more-->
####I- Exception的层次结构  
如图所示，java错误，异常类都是源于一个叫做Throwable的基类，只有该类及其子类的实例对象才可以被JVM进行`throw`操作。且也只有该类及其子类能作为`catch`语句的输入参数。![throwable classes]({{site.cdnurl}}/assets/img/post/java_exception.png)    
**一个Error类及其子类表明一个合理设计的应用不需要，也不应该catch的一些严重问题。**多数时候这些错误是来自一些异常情况。如AnnotationFormatError，当一个Annotation解析器试图读取一个类文件的Annotation时发现其是malformed而throw的Error。LinkageError则是指当一个类依赖的一些类在compile阶段之后有了一些非兼容性的改变，然后导致依赖其的类出现链接错误，NoClassDefFoundException便是其一个子类。当然还有经典的VirtualMachineError，其一般在java虚拟机broken或是没有足够的资源供其运行时throw。   
从编译时异常检测的角度，Error类时unchecked异常。通畅其表明环境或是程序设计的一个严重bug。  
**另外一个Throwable的子类是Exception类。**其是所有异常类的父类。跟Error相对应，Exception类通常指一个合理设计的应用可能需要catch的。  
从编译时异常检测的角度，大多数的Exception类都是可检测异常，除了RuntimeException及其子类。一些常见的运行时异常，如NullPointerException，当一个应用试图使用本该是一个实例对象，而实际为null值时抛出（例如，调用一个null对象的方法，域值）。NoSuchElementException，当一个应用调用枚举类型中nextElement方法，在没有更多元素时抛出。IllegalArgumentException则表明一个方法传入了非法或者不合适的参数。其他常见的还有CastClassException，ArithmeticException等。如除数是0时，ArithmeticException便会抛出。    
####II- Checked vs UnChecked异常   
* Checked Exception通常可以用来声明哪些在程序运行过程中可以预见的，又不可避免的异常，但对程序本身来说却是一定程度上可以恢复的。如文件不存在异常。虽然程序本身尽可能的去检测传入参数的合理性。但文件不存在这类异常是不可能避免的，我们通过什么这样一个checked 异常来提醒调用者，他们需要考虑到这种情况。这便是其不可避免的地方。而另外文件找不到可以通过告诉调用者输入新的文件名，或是等待调用者改变文件路径等方式来合理的恢复。而通畅Unchecked异常是由于程序方法的编程逻辑漏洞的原因是不可恢复的。  
* 准确的把握这两者的抽象层次。  

####III- 一些best practise  
1. If an exception can be properly handled then it should be caught, otherwise, it should be thrown.  
2. When deciding on checked exceptions vs. unchecked exceptions, ask yourself, "What action can the client code take when the exception occurs?"  
3. Never let implementation-specific checked exceptions escalate to the higher layers. For example, do not propagate SQLException from data access code to the business objects layer. Business objects layer do not need to know about SQLException.  
4. Try not to create new custom exceptions if they do not have useful information for client code.  
5. Log exceptions just once. Logging the same exception stack trace more than once can confuse the programmer examining the stack trace about the original source of exception. So just log it once.  


####IV- 参考  
[1.] [Oracle Java API](http://docs.oracle.com/javase/7/docs/api/).  
[2.] [Top 10 questions about Java Exception](http://www.programcreek.com/2013/10/top-10-questions-about-java-exceptions/).  
[3.] [Checked Exception Practise](http://programmers.stackexchange.com/questions/121328/is-it-good-practice-to-catch-a-checked-exception-and-throw-a-runtimeexception)  
[4.] [Oreilly.com](http://archive.oreilly.com/pub/a/onjava/2003/11/19/exceptions.html).  
[5.] [Howtodoinjava](http://howtodoinjava.com/2013/04/04/java-exception-handling-best-practices/)

So long, and thanks for all the fish.  
