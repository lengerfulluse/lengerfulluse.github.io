---
layout: post
title: TensorFlow基本操作(二)
category: 机器学习
tags: [tips, deep-learning]
published: True
---
前一篇主要对TensorFlow的常量，如简单的scalar, vector, matrix等Tensor，以及线性序列(Sequence)，基本的抽样函数做了介绍，本篇主要介绍TensorFlow中的变量，数据类型，基本的数学操作，并结合TensorBoard,来介绍一些变量依赖的组织。  

搞机器学习或是数值计算程序的人估计都了解[NumPy](http://www.numpy.org/)，或者整个python-based的数理科学计算的生态系统,[SciPy](https://www.scipy.org/)。

<!--more-->

### 数据类型
TensorFlow的基本数据类型在借鉴[NumPy](http://lagrange.univ-lyon1.fr/docs/numpy/1.11.0/reference/arrays.dtypes.html)（且当前对NumPy的类型几乎完全兼容）的基础上，也有些自己原生的一些数据类型，完整的数据类型列表可以参见[官网](https://www.tensorflow.org/api_docs/python/tf/DType)，下表给出一些基本的数据类型：

| Data Type | Python type | Description                |
|-----------|-------------|----------------------------|
| DT_FLOAT  | tf.float32  | 32 bits floating point     |
| DT_DOUBLE | tf.float64  | 64 bits floating point     |
| DT_INT32  | tf.int32    | 32 bits signed int         |
| DT_INT64  | tf.int64    | 64 bits signed int         |
| DT_STRING | tf.string   | Variable length byte array |
| DT_BOOL   | tf.bool     | Boolean                    |

因为TensorFlow数据类型保持了跟NumPy的无缝集成，大多数时候你可以把NumPy的数据类型当成TensorFlow的来用，但通常的practice是如果可以用TensorFlow原生数据类型的地方，我们就直接用原生的。一方面是谁也不知道现在的版本是兼容的，以后会不会久不兼容了呢？最重要的是，原生的数据类型对TensorFlow的build-in函数，求导优化计算等都有天然的优势。

### 变量
前一篇我们介绍了常量，常量跟变量的区别自然不必赘述，就跟任何语言类似。其存储的地方也不同，比如Java中的常量是放在堆区，而变量是在栈区。在TensorFlow里，常量和变量也是分开存储的。常量的值是放在graph的definition里的，在分布式环境下，每个节点上整个graph都是replicated的，相应的常量也会replicated一份。对于TensorFlow而言，Graph的definition用protocol buffer来表述：

```python
import tensorflow as tf
vector = tf.constant([2.0, 8], name="vector")
print tf.get_default_graph().as_graph_def()
```

而变量则不同，往往是放在一些独立的集群上<label for="sn-1" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-1" class="margin-toggle"/>
<span class="sidenote">
即我们通常所说的Parameter Server，是目前主流的分布式机器学习框架，[原始论文参见](https://pdfs.semanticscholar.org/30e9/4e24d67994c5a8e2f20f852a51d28a720de2.pdf)
</span>，其需要和worker节点进行跨网络或者RPC通信。

#### 变量声明
和一般的面向对象语言一样，声明一个变量就是创建一个`tf.Variable`类的实例。和常量不同的是，我们用`tf.constant`来声明一个常量。前者是一个Class，而后者是一个operator（可以看作是一个类里的方法），一个`tf.Variable`类里可以有多个operator。

```python
import tensorflow as tf
# use InteractiveSession
sess = tf.InteractiveSession()
cons = tf.constant(8, name="consant")
var = tf.Variable(8, name="Variable")
# ==> Tensor("consant:0", shape=(), dtype=int32)
print cons  
# ==> <tf.Variable 'Variable:0' shape=() dtype=int32_ref>
print var
```
#### 变量初始化
在使用一个变量之前，必须先初始化变量，如果使用了一个未初始化的变量，会报一个`FailedPreconditionError`的错误，如下所示。值得注意的时，和一般的面向对象语言不同的是，第3行中，`tf.Variable(8, name="Variable")`，虽然第一个参数是8，似乎是做了初始化，其实不然。前面我们说过，TensorFlow作为一门工具语言，一个鲜明的特点便是函数（这里是Graph）的定义和执行是分开的。初始化函数也需要显示的声明和执行。

**全局初始化函数**

```python
import tensorflow as tf
cons = tf.constant(8, name="consant")
var = tf.Variable(8, name="Variable")
init = tf.global_variables_initializer()  ## 全局初始化函数声明
with tf.Session() as sess:
    sess.run(init) # 执行全局初始化
    print sess.run(cons)  # OK, result is 8
    # 未初始化： FailedPreconditionError: Attempting to use uninitialized value Variable_2
    # 初始化：result is 8.
    print sess.run(var)

```

**选择性初始化**

```python
import tensorflow as tf
var1 = tf.Variable(8, name="var1")
var2 = tf.Variable(8, name="var2")

init = tf.variables_initializer([var1]) ## 初始化var1
with tf.Session() as sess:
    sess.run(init) # 执行全局初始化
    # OK, result is 8
    print sess.run(var1)
    # 未初始化： FailedPreconditionError: Attempting to use uninitialized value var2_2
    print sess.run(var2)
```

**单个变量初始化**

```python
import tensorflow as tf
var2 = tf.Variable(8, name="var1")
with tf.Session() as sess:
    sess.run(var2.initializer)
    print sess.run(var2) # OK, result is 8.
```

####变量评估和赋值

**赋值函数assign()**

变量声明之后，我们可以通过在Session中的`sess.run()`来查看一个变量的值，还有一个`eval()`函数也可以实现该功能。变量的赋值则是通过`assign()`函数来实现，值得注意的是这里的赋值是非引用式的，函数返回赋值后的值，但该变量的值不会改变。

```python
import tensorflow as tf
var1 = tf.Variable(8, name="var1")
var1.assign(100) # 变量赋值，var1 任然是8
init = tf.variables_initializer([var1])
with tf.Session() as sess:
    print var1.eval() # OK, result is 8.
```

值得注意的是在使用了赋值函数后，**我们并没有对`var2`进行初始化却可以正确使用。** 查看源码会发现，其实是`assign()`函数替我们做了。当我们通过赋值函数声明一个变量，但这个变量依赖于另外一个变量时，情况便变得很有趣了。如下所示：

```python
import tensorflow as tf
var1 = tf.Variable(8, name="var1")

var2 = var1.assign(var1*2)

init = tf.global_variables_initializer()
with tf.Session() as sess:
    sess.run(var1.initializer)
    print var2.eval() # result is 16
    print var2.eval() # result is 32
    print var2.eval() # result is 64
```
var2被assign的不是一个值，而是一个`assign`的operator，因此在Session里，每次run时就会做一次评估，这就好比C语言中的宏扩展。

**自增和自减函数**
TensorFlow提供了`assign_add()`和`assgin_sub()`函数来实现函数的自增自减功能。**和assign()函数会自动帮你初始化变量不同，自增、自减函数并不会帮你赋值，你需要自己赋值** 原因其均依赖于当前的值做assign，因此需要对`var1`和`var2`都要做初始化。

### TensorBoard
数据可视化在ML里一直是被忽视但又非常重要的一部分。记得Andrew Ng最常说的一句话便是在做任何数据分析处理之前一定要对数据有个直观的sense，数据可视化便是重要的方法，因为其对模型，参数选择都至关重要。[TensorFlow Dev Summit 2017](https://youtu.be/eBbEDRsCmv4)中用很大的篇幅介绍了TensorBoard，如MNIST手写辨识的demo中长这样

![mnist_tensorboard]({{site.cdnurl}}/assets/img/post/mnist_tensorboard.png)

用Google自己的话说，

>"The computations you'll use TensorFlow for -like training a massive deep neural network - can be complex and confusing. To make it easier to understand, debug, and optimize TensorFlow programs, we've included a suite of visualization tools call TensorBoard".

更详尽的介绍和使用将根据具体的的机器学习的例子来介绍更具有直观性。最简单的使用仅两步：首先在Session里首行加上，

```python
writer = tf.summary.FileWriter('./graphs', sess.graph)
```

然后在shell里run如下命令。打开浏览器，`http://localhost:6006`，就可以看见针对当前Session的TensorFlow可视化效果。

```python
tensorboard --logdir="./graphs"
```


###参考  
[2] [Tensorflow for Deep Learning Research](https://web.stanford.edu/class/cs20si/syllabus.html).  
