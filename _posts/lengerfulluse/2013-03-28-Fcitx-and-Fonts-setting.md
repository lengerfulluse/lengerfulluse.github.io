---
layout: post
category: "notes"
tags: [linux, fcitx]
---
{% include JB/setup %}

The purpose of this note is to analyze the steps for setting chinese 
input method [**Fcitx**](http://www.fcitx-im.org) in an English system 
environment. 
####English Environment for Fcitx####
If you just Google the articles about installing the fcitx, almost most 
of them we noted that, you must setting the LC\_CTYPE to zh\_CN.UTF\-8 
locale as the prerequisite. Unfortunately, it is wrong, or partly wrong. 
Allthough fcitx cannot run on POSIX and C locale, But, it can run on the 
en\_US.UTF\-8 locale settings. And it can provide you the same english 
enrionment.   
#### Fcitx Environment Varibles ####
There are mainly three important environment variables, they are:  
- XMODIFIERS it connects only to the im module. and common setting as 
this `XMODIFIERS="@im=fcitx"`  
- GTK\_IM\_MODULE setting the im select for gtk programs. notice that 
only your fcitx compile USE flag contains gtk, gtk3, you should set it: 
`GTK_IM_MODULE=fcitx`, otherwise for common gtk2 programs, 
`GTK_IM_MODULE=xim`.  
- QT\_IM\_MODULE setting the im select for qt programms. the same from 
the above, you should set `QT_IM_MODULE=fcitx` only you USE the qt4 
flag. and common situation is `QT_IM_MODULE=xim`.

Yes, All about this, for startx command, you should putting the above 
environment variables in .xinitrc. if you use Slim, you could put it in 
the xsessions files.  Provided that You locale is not POSIX or C, it 
will works.  

#### Install fonts on Sabayon\(Gentoo\) manual####
First you should copy the fonts into a system fonts directory or 
user self-definition directory.  And if you use the self-definition 
directory, you should add the FontPaths directory in the xorg.conf 
directory.  
Second, you need to enter the font directory, and construct the 
fonts.scale and fonts.dir files for indexing of fonts. with the 
following commands. 
`mkfontscale`
`mkfontdir`  
Finally, we need to reconstruct the fonts cached with command  
`fc-cached -fv`  
After you reboot the X system, you could use the command `fc-list | grep 
-i font-name`  

And that's all. 
