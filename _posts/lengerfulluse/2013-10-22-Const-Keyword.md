---
layout: post
category: languages 
tags: [interview, cpp]
---

{% include JB/setup %}

`const` 关键词在C/CPP中也是一个类似于[static](http://lengerfulluse.com/research/2013/10/20/%E8%99%9A%E5%87%BD%E6%95%B0/)一样，经常出现，且作用往往不止一种，在面试中经常被问及的关键词。我们从其修饰的对象角度来分析。     
###修饰变量或者指针###    

    int d = 4;
    const int a = 5;   /* the content of variable cannot be change */
    int * const b = &d; /* the variable pointer itself cannot be change */
    const int * const c = &d; /* the content and the pointer both cannot be changed */

    int * const b = &a  /*Compiler Error: a is const variable, while b is not, cannot 
                         convert from const int to int */

此处有一点值得提及，当用`const`修饰变量或指针时，赋值时只能从非const变量向const变量进行，而如果把const量赋值为非const量，则会发生编译错误。    
###修饰函数###     
1\. 当用const放在末尾修饰类成员函数时，其表明该函数不能够改变类成员的值，如下：     
         
    #include<iostream>
    using namespace std;
    class A {
        public:
            A(int a) {
                e = a;
            }
            int e;
            void const_fun(int a) const;
    };
     
    void A::const_fun(int a) const {
        cout<<"I am const function, cannot change variable content"<<endl;
        e = a;  /* Compiler Error: cannot change value of member variable */   
    }
        
    int main() {
        return 0;
    }
    
2\. 当用于修饰成员函数返回值时，则表示该函数范围值不能用于*左值*，如下例所示：    
    
    const classA operator*(const classA& a1,const classA& a2);
    (a * b) = c;  /* cannot assigned to the return value of * operator */




