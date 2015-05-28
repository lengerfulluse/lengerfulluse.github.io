---
layout: post
category: "work"
tags: [note, Xorg]
---
{% include JB/setup %}
In this article, we focus on some basic and foundational introduction about the X11 related topics in our linux experience.  
####Xorg Server ####
There are mainly two sub\-sections in the Xorg Server section. firstly, I will conduct some introduction and explanation about the history and roles Xorg take in our hole GUI system. secondly, I'll give a practical example to show the process of problem trackback and solved. 

#### Login Manager or Display Manager ####
To some kinds, when you setup the xorg server and install the Window manager or Desktop Environment you could start the X11 system with just a command `start x`. But if you want the show the GUI graphic system all the way, and you won't want to start the x system in console, you need the help of **Login manger**, the default login manager for the Gnome is gdm. and correspondly, for Fluxbox, the slim is an ideal choice. Just with these simple line, you could use it.  
	
	equo install x11-misc/slim
	vim /etc/conf.d/xdm
and the make the change of the following:, which is the core of choice.

	---
	DISPLAYMANAGER="slim"
	---
finally, you should add the xdm to default run\-levels.

	rc-update add xdm default
After finish the basic configure for the slim, and set the 
/etc/conf.d/xdm variable, we should be able to login our personal Xsession with the default themes in the /usr/share/slim/theme.
However, we should notice that the /etc/slim.conf configure script file will automatically read the /etc/X11/Sessions/ directory to 
find the default multiply Session, so when you login in with the slim, you could select your particular session with a simple F1 key.  
Otherwise, if you want to set the default session environment, the simplest way is just:  

	ln -s /etc/X11/Sessions/fluxbox ~/.xsession

And let's conclude the above process. Simplely, if we want to create a X window system with Xorg server, what exactly methods we need to do
contains only three steps:  

1. Install the Xorg server related source and config for them.

  * Setting the kernel support for the input and video driver 
support. here we should notice that there exists some problems compatiable 
problem related to the lagecy video drivers with the KMS\(Kernel ModSet tenique\), so we should first disable all of the driver for the video. 
and then select the proper "nouveau" or "nvidia" drivers. and the "endev" input driver.
     * Istall the related driver as listed above and set the 
corresponding support for the KMS technique.
		
	equo install ${qlist -CI x11-drivers}
     * Install the Xorg server, and further configure manually.
	equo install xorg-server
     * configure the /etc/X11/Xorg.conf.d/ directory files. for the 
keyboard and Screen resulations.
     * Verify the successful installation of the xorg with command 
`startx`, for abvious and essy test setting, you can first install 
simple *xterm* and *twm* to test the xorg's installation and configuration.

2.  Install a window manager or desktop environment. After you can 
validate the success of xorg server, the next thing you should complete is to 
arrange a slave for the xorg\-server boss. And the xorg just assigns lots of dirty and hardship work to it's slave, namely window manager, or 
more functional Desktop environment. Formally, window manager is a kind of programs which are reponsible for the arrangement, sechdule and 
position of the GUI programms. Here I will just install the most famous lightweight, **Fluxbox**.  

	equo install fluxbox

and after its installation, you can just configure it's behaves accroding to the conf.d in \$HOME directory ~/.fluxbox. such as you can 
setting the global keyboard shortcuts, the menu content, the wallpaper, the slit and of course the applet widget in the taskbar slit.

3.  Choose your favirate Login manager. Yes, don't take it for grant, 
allthough there will be no any problems if you type the command `startx` 

and following by the command `startfluxbox`. or more simplely to edit the .xinitrc file in your home directory to add the 'startfluxbox' 
command in this. however, leave no consideration for the issues of security from the terminal, if you just do your daily work in X window 
envrioment, it becomes naturally that there is no necessary for the intermediate steps for execute all this command in console. That's where 
the Login Manager benifits for.  the configure step has just been demonstrated above, we'll leave no more words here.  


####Xorg Troubleshotings ####
One of the most important reasons that Xorg server confuse people is that its huge and compliated contents and terminology conceptions, which 
all are almost divert us away. also the whole installation process is automatically done, so once there encounters some problems, It's just 
terrible, and in most situation, people would select install the whole system. ^\_^. I am at least. I always wonder that when I could resolve 
this problem myself, here today, I came over a startx failure, and after some dianostic, I finish it eventually.  Here I note some basic and 
important steps:  
- You're aim to solve the problems: the first and the only step is to analyze current problem. What's the symptoms of the problems, is 
there some log or error output? how many possible reasons for this/these symptoms? what's the most possible one? 
- Be careful and most selective for the search keywords when Google, also you should first finish some basic background knowledge learnint to 
have a better understanding of the problem.
- Do necessary backup work. when you attempt to some possible solutions for the problems, you're experiment on the system, back up the 
original version files or programs, before you do every dangerous things!! 
