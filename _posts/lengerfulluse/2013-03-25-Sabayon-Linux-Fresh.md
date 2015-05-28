---
layout: post
category: "work"
tags: [note, linux]
---
{% include JB/setup %}

When [**Gentoo**](http://www.gentoo.org) beckons to you, follows him. Though his ways are hard and steep.   
Thanks for the instruction from **Ryan Li** at *RedHat* Co.td during my internship, I stepped on a nice 
journal companied by **Gentoo** linux distribution. `If it moves, Just compiles it`. All the way, I finally understand the reason
why lots of guys are so addicted by the linux, by gentoo linux respecially. Althought the journal is full of uncetain hardships, The exciting 
of achievement is beyond all these things. When you came over all the way, I can have fruitness harvest which are not only the knowledge or 
some cool skills you got, But another most important things in your life,  the courage to conquer every things, the belief to complete tasks 
efficiently and perfectly. If we compare life to be a war, It is the wapean that determines the success or failure. Similarly, proper tools 
for our daily work is extremly improtant, I used to be curious about every linux distribution, for instance, **Ubuntu**, **OpenSuse**, 
**FreeBSD**, **Backtrack**, **ArchLinux**, all for the desktop environment too, **Gnome**, **KDE**, **Xfce**, **Awesome** etc. not to say a 
lot of application tools, shell and so much others. However, it's just to be dispointed that I just cannot stop my step to get further on some 
particular useful tools. Exactly, I was always too shallow.   
One of my shortcomings is that I cannot pay attention on the same things for a long time. Bla bla bla, yea, you are right, it's just like a 
child, right? To be honesly, this habits frustrates me all the time. In the other hand, it's the necessary quality for the exploiters. It's 
because of this, that I have the opportunity to explore a lot of amazing zones of the linux world.  
Yes, it is the first time I encounter the sabayon linux distribution. yesterday, I miss the **Gentoo** so much, so I logged into my Google 
plus account, and enter the search bar to find some interest news about the gentoo, It's amzing that the second result of my query is sabayon, 
I was very curous about what a kind of distribution it is How can it display here?

#### What distinguish a different distribution for me ####
I admit that what a linux actually attracts me is just about two aspects:
- *theme&appearence* You may think that this is a so shallow point, yes, it does. I come contacted with linux since when I was a freshman in 
[**NUPT**](www.njupt.edu.cn). What attracted me a lot lies in that the compize's cool cubic destkop effects. However, I don't like it's theme 
appearence, So in the next tries, I try other linux distribution mentioned above.
- *mirror source&package manager* It means that how convient it bring to you. Imagine that when you want to install a software for your work,  

#### Some basic configure for Sabayon installation ####

- Git configure and SSh protocol configure:  
>  	git config --global core.editor "nano"  
>  	git config --global user.name "Joseph Heng"  
>  	git config --global user.email "lengerfulluse@gmail.com"  
>  	git completion bash. we add it in .bashrc with command `source ~/.git-completion.sh`  
>	copy the private, public keys and known_hosts to the ~/.ssh directory.  
- Select the faster mirror for the package update and source download, first you should know where the repositories list lie in:  
>	/etc/entropy/repositories.conf  
  then to test the connection speed of these repositories, and then choose the faster.  
>	equo repo mirrorsort sabayonlinux.org   \# for Daily reportory  
>	equo repo mirrorsort sabayon-weekly     \# for Weekly reportory  
>	equo repo mirrorsort sabayon-limbo      \# as limbo implied, the test reportory. Be careful to use!!!  

- Equo Update and install:  
>	equo update  
>	equo install entropy rigo  
- Keyboard Shortcut:  
>	bind the *Alt+T* to open a terminal  
>	bind the *Alt+J* to switch the terminal to previous tab  
>	bind the *ALt+K* to switch the termianl to next tab  
>	bind the *Meta+D* to display the desktop.  
- Be familar some basic package manager tools:  
>	equo [search install ...]   
>	rigo GUI entropy manager tools.  
>	eselect  
>	emerge  

#### Migrate from Gnome to Fluxbox ####
Occasionally, I find the install bugs during my sabayon installation, the results is that my **Gnome** 3.6 version cannot function well. To be disspointed, the *System* menu just gone. and some menu panel and desktop background missing too. Hey, hey, hey! A sound reminds me that I still have another default selectioon for desktop windows manager: **Fluxbox**, It's Great!  
The core configure directory directory is ~/.fluxbox, and that's all.
