---
layout: post
title: 也谈MCMC方法与Gibbs抽样
categoriy: [机器学习]
tags: [research]
published: True

---
MCMC，即传说中的Markov Chain Mento Carlo方法。其主要用于统计推理中的进行模拟抽样，尤其在贝叶斯推理中有着非常广泛的应用。如算法模型的后验参数估计问题，很多情况下其后验概率分布没有确定性的解析解，或者解析解计算起来非常复杂，便可以通过MCMC模拟抽样，根据大数定律，参数的期望便可以通过对抽样样本的求均值来评估。

<!--more--> 
山人第一次见到MCMC兄还是在研究僧阶段，那时候以Latent Direichlet Allocation([LDA](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=5&cad=rja&uact=8&ved=0ahUKEwiZ34zX68nJAhXRpIMKHdjgDe8QFgg-MAQ&url=http%3A%2F%2Fai.stanford.edu%2F~ang%2Fpapers%2Fnips01-lda.pdf&usg=AFQjCNEeh0sXSiuNUSgK03cxjPm91Rh2ug&sig2=CM-yjXRM0yNryVZrNUcYDQ&bvm=bv.108538919,d.amc))为代表的[Blei先生](http://www.cs.columbia.edu/~blei/)的一系列主题模型算法还很火，甚至你还能看见Andrew Ng的身影。于是导师欣然的把其另一篇层次主题模型的论文，Hierarchical LDA(hLDA)甩给我们。拍着我们的肩膀，语重心长的说，好好干，会很有前景的。于是当我看到上面的MCMC时，我的表情是这样的：   
![](/assets/img/post/john-nash.jpg)  

