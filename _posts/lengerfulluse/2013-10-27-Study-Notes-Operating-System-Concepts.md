---
layout: post
category: notes
tags: [os, interview]
---
{% include JB/setup %}

刚好最近在准备找工作面试，无奈之前的基础知识已经遗忘殆尽，值得在重新复习一下，便做了关于操作系统方面的笔记，书采用的是[Operating System Concepts, 9th Edition](http://www.amazon.com/Operating-System-Concepts-9th-Edition-ebook/dp/B00APSZCEQ)，采用边看边做笔记的形式来记录下，以便以后遗忘时可以随时查验。全篇将近有1000页不可能全部看完，只得分批来看，今天主要看进程模块。     
### Process\(进程\)###     
**程序的组成主要包括一下几个部分**:   
* **text section**: it contains the program code, program counter and registers information.     
* **stack section**: it contains the temporary data, such as function parameter, return address, local variables.   
* **data section**: contains the global variables.   
* **heap section**: for dynamically memory allocations during the process run.   

Also the following figure show the common program structure in memory.   ![process in memory](/assets/img/process_in_memory.png)     

**进程状态和进程控制块\(Process Control Block\)**     
进程主要有如下几种状态，分别为：    
* **New**: the process is being created.    
* **Ready**: the process is waiting to be assigned to the processor.   
* **Running**: Instructions are being executed.   
* **Terminated**: the process has finished execution.    
* **Wait**: The process is waiting for some event to occur \(such as an I/O completion or reception of a signal\).   
And the following figure show the work flow of process state.     
![process_state](/assets/img/process_state.png)     

**进程的创建**     
子进程创建继承父进程的资源信息，接下来可以利用`exec()`函数来覆盖父进程的进程空间，执行自己的进程，也可以保持父进程的执行空间，使的父子进程同时执行。一个经典的创建多进程的实例如下：     
{% highlight c linenos=table %}

#include <sys/types.h>
#include <stdio.h>
#include <unistd.h>
int count = 0;
int main()
{
    pid_t pid;
    /* fork a child process */
    pid = fork();
    while(count < 10) {
        if (pid < 0) { /* error occurred */
            fprintf(stderr, "Fork Failed");
            return 1;
        }
        else if (pid == 0 && (count%2 == 0)) { /* child process */
            printf("Child Execute: %d\n", count);
        }
        else if (pid > 0 && (count % 2 == 1)){ /* parent process */
        /* parent will wait for the child to complete */
            printf("Parent Execute: %d\n", count);
        }
        count++;
    }
    return 0;
}
{%  endhighlight %}

**进程间通信**   
主要有两种常见的进程间通信的方式，Shared Memory 和 Messaging Pass。
