---
layout: post
category: interview
tags: [java, interview]
---
{%include JB/setup %}

###Java 面试题小结 ###   
**1. Java String 类的基础知识**   
Q1: String 类到底创建几个对象？    

    String str = "Hello, World";
    String str2 = "Hello, World";
    String str3 = new String("Hello,World");
    String str4 = new String("Hello, World");    
A1: String 构造时，如果是常量赋值的话，首先会去常量**Pool**中查找是否已经存在常量，如存在则直接把常量字符串的引用赋值便可，如果不存在则需要在常量池中创建新的常量引用在赋值给变量的引用;而如果是new操作的化，则是在堆中创建，且每次都会新创建一个常量池中的对象，然后在把这个对象用过new构造函数赋值给其在堆中的新对象。所以**答案**为：    

    1
    1
    2
    2

Q2:  String 中的== 和 equals操作符含义？
    
     str == str2 ?
     str equals str2 ?
     str3 == str4 ?
     str3 equals str4 ?

A2: 通常对于字符串内容的比较我们通过**equals\(\)**函数来进行，而==运算符则是比较两个字符串引用是否指向同一个对象。两者的区别用下面[stackoverflow](http://stackoverflow.com/questions/767372/java-string-equals-versus)上的回答：     
![java equals method source code]({{site.url}}/assets/img/java_equals.png) 因此**答案**为：    

    true
    true
    false
    true

**2. Synchronized 类线程安全和效率的比较**    
Q1: ArrayList, Vector and LinkedList 三者之间的区别？     
A1: 可以从两方面来比较，首先对于ArrayList和Vector其底层都是通过Array的连续存储空间实现，可以按位快速存取，但是当出入值时需要顺序后移，因此效率较低，而LinkedList则是用过链表的方式因此其插入效率很高，但查找效率降低。 然后，如果单从线程安全的角度来看，Vector是实现synchronized，因此是线程安全，但是却会因此降低了其效率。引用[JavaRanch](http://www.coderanch.com/t/409421/java/java/Difference-ArrayList-LinkedList-Vector)上的一个回答：     
![ArrayList, Vector LinkedList difference]({{site.url}}/assets/img/java_synchronized.png)    

Q2: HashMap 和 HashTable的区别？     
A2: 可以从两方面来回答。首先是线程安全的角度;其次是是否允许空值的角度。而HashTable都可以看作是对HashMap的限制和提高。因此HashMap是非线程安全的，且是允许一个null键和多个null值的，而HashTable是线程安全的，且是不允许null值和键的。最后可以从扩展性上来看，如果想要默认插入顺序的，可以选择**LinkedHashMap**，如果想要线程安全的可以使用**ConcurrentHashMap**，更详细的解答，仍旧是看[stackoverflow](http://stackoverflow.com/questions/40471/differences-between-hashmap-and-hashtable/40483#40483)上的解答：     
![difference between HashMap and HashTable]({{site.url}}/assets/img/java_hashmap_hashtable_difference.png)     

**3. Overloading vs override in Java**    
Q1: Overloading 和 Override之间有什么区别？    
A1: Overloading称之为重载，通常是同一个功能的函数，为了实现不同的输入参数个数和类型等需要，在一个对象中定义的多个函数。而Override则通常是存在与父类和子类中的，同一个函数，其参数类型和个数都相等，在子类中对其重新实现，且覆盖了原先的方法。而Overriding通常有两种，一种是*vitual*函数的overriding，另一种是非*virtual*函数的overriding。前者是一种动态的绑定，而后者是一种静态的。 具体区别如下：     
![difference between overloading and override]({{site.url}}/assets/img/java_overloading_override.png)

    
