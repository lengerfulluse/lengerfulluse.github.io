---
layout: post
category: languages 
tags: [interview, cpp]
---
{%include JB/setup %}

###虚函数的作用####
虚函数是为了实现多态性而实现的，更准确的说，是为了实现运行时多态，即dynamic binding的方法。如下例所示：    

    #include<iostream>
    using namespace std;
    
    /* a simple example show the difference between the dynamic binding
     * and static binding. And common function override is a static 
     * binding which aims to implement a common function in different 
     * class. However, the virtual function is just aimed at interface-like 
     * function. It implement the dynamic binding.
     */
    class shape {
    public:
        shape() { };
        virtual void draw() {
            cout<<"Draw shoap"<<endl;
        }
    };
    
    class rectangle: public shape {
    public:
        rectangle() {};
        void draw() {
            cout<<"Draw rectangle"<<endl;
        }
    };
    
    class round: public shape {
    public:
        round() {};
        void draw() {
            cout<<"Draw round"<<endl;
        }
    };
    
    int main() {
        shape* s;
        s = new rectangle();
        s->draw();
    
        s = new round();
        s->draw();
        return 0;
    }
    
如果不用虚函数实现，派生类中对于*draw*函数的overriding是在编译时根据所调用的类指针类决定，并不能实现根据运行时指向的实际对象来进行调用。而正是虚函数使得通过基类指针，便能实现动态绑定。因此，上例的运行结果为：     

    Draw rectangle
    Draw round

###进化一： 纯虚函数###
这种动态绑定的属性使得我们仅通过基类的指针便可以访问其派生类的某种方法，因此在设计对象继承模式时便很常见了。但是，我们发现对于这种依靠基类来进行动态绑定的方法中，某些基类的某种方法我们并不能实现，如下面的例子：      

    /* Declaration from:
     * http://www.learncpp.com/cpp-tutorial/126-pure-virtual-functions-abstract-base-classes-and-interface-classes/ 
     */
    
    #include <string>
    class Animal
    {
    protected:
        std::string m_strName;
    
        /* We're making this constructor protected because
         * we don't want people creating Animal objects directly,
         * but we still want derived classes to be able to use it.
         */
        Animal(std::string strName)
            : m_strName(strName)
        {
        }
    
    public:
        std::string GetName() { return m_strName; }
        virtual const char* Speak() { return "???"; }
    };
    
    class Cat: public Animal
    {
    public:
        Cat(std::string strName)
            : Animal(strName)
        {
        }
    
        virtual const char* Speak() { return "Meow"; }
    };
    
    class Dog: public Animal
    {
    public:
        Dog(std::string strName)
            : Animal(strName)
        {
        }
    
        virtual const char* Speak() { return "Woof"; }
    };

此处我们提及两点：    
>    1. 对于*Animal*这种类型，我们无法对其的virtual方法Speak给出实现，当用户定义一个Animal对象时，如果调用其Speak方法，我们无法实现这样一个方法，或是只能空函数体，则得到的是空结果，或是非用户想要的结果，则在某种程度是一种很不好的设计模式。    
>    2. 对于*Animal*类，在某种抽象程度上，对象本身是不具有意义的，往往是一个抽象的个体罢了，从语言理解的层面，其往往是一个具有抽象概念的东西。因此，我们不应该允许其实例化。故上面的代码对于其构造函数使用了Protected控制符。     
上面的两种情况，都可以利用纯虚函数的概念来解决。其定义方法为：     

    virtual const char* Speak() = 0;

而存在纯虚函数的类成为了抽象类，不允许构造对象实例。如此便进一步解决了这种抽象类中，虚函数无法实现，且抽象类不具有实际定义对象必要的情况。     
###进化二： 接口类###    
严格意义上来，C++中并没有一个**Interface**关键词，来提供这样一种接口功能，但我们可以通过抽象类来定义。通常而言，接口类只提供一种操作原型的声明，把具体实现指派到派生类。从抽象的角度，接口通常不含有具体的数据成员。
