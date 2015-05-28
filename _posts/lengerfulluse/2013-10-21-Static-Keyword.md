---
layout: post
category: languages 
tags: [interview, cpp]
---
{% include JB/setup %}

几乎在所有的面试笔试题中都有**static**变量的身影，其涉及到变量内存分配空间，变量生命周期等。最终我们可以从其**作用域**的角度来对其进行较为详细的分析与介绍。    
###函数体内的static关键字###    
静态成员变量的内存分配空间是和全局变量的分配空间一样的，都是在静态存储区。所以变量的生命周期一直保持到程序的结束。但由于该静态变量的作用域仍然是在函数体内，所以在函数体外调用该变量会引起编译错误。    
###在一个文件中的全局static关键字###     
实现了一种类似类封装的效果，在该文件中成员可以访问该static变量或是函数，但是文件之外是不可以访问的。     
###在类中的static关键字###    
> 1. static 成员变量:在类的作用域中是全局可见的，且是唯一一份拷贝的。     
> 2. static 函数： 也是为类所有，而非类对象所有，且其只能访问static变量成员。
> 此处在类中的静态成员变量和成员函数的初始化也是非常值得注意的：非`const static` 类型成员变量必须在类体外初始化。且在类外初始化时，不需要再加static关键词。而对于类中的成员函数而言，`static function`可以在类体中初始化。   可以看下面一个简短的编译通过的例子：     

    
    #include<iostream>
    using namespace std;
    class A {
        public:
            const static int a;
            const static int b = 4;
            static int c;
            static void print();
            
            static void print_() {
                cout<<"I am non static"<<endl;
            }
    };
    
    const int A::a = 3;
    int A::c = 5;
    void A::print() {
        cout<<"I am static" <<endl;
    }
    
    int main() {
        return 0;
    }
    
从作用域的角度来理解static变量，便能够更加准确的把握其多层意义，并在其中找出之间的联系。   

