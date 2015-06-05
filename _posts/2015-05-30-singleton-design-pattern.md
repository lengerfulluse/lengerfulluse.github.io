---
layout: post
title: Singleton Design Pattern
category: design-pattern
tags: [ headfirst, tools ]
published: True
---

Singleton模式看似简单，却有很多值得注意的地方。下面给出一个经典的多线程安全的简单例子，然后NOTE下值得注意的几点：

{% highlight java %}

    package org.josepheng.design_pattern.singleton;
    public class ConnectionManager {
      private static volatile ConnectionManager uniqConnctor;
      private ConnectionManager() {
          // private constructor.
      }
      /**
        * Global access point of obtain unqiue object instance.
        */
      public static ConnectionManager getInstance() {
          if (uniqConnctor == null) {
              synchronized (ConnectionManager.class){
                  if (uniqConnctor == null) {
                      uniqConnctor = new ConnectionManager();
                  }
              }
          }
          return uniqConnctor;
      }
  }
{%  endhighlight %}

**Watch Out**:

1. 构造函数是private,防止了外部对象创建类instance,同时保证不能够通过继承来创建。
2. 全局唯一的access point便是通过getInstance的**_static_**方法来实现。因为方法本身是静态的，所以该方法中的uniqConnctor也需要声明为**_static_**的变量。
3. 为了处理多线程的情况，getInstance通常需要加上synchronize的线程锁。但考虑到应用实际，性能需求的情况，可以有以下不同的实现：
    a. 直接 synchronize 整个getInstance函数，这样最简单，但对于uniqConnector是否为空，都要synchronize,性能严重下降。
    b. 直接在uniqConnector声明时进行初始化，就省略了getInstance中非空的检测。
    c. 就是上面代码所示的double checking lock。
