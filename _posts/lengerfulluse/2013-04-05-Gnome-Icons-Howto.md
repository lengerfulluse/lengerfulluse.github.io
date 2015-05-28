---
layout: post
category: "notes"
tags: [tutorial, linux]
---
{%include JB/setup %}
Change Gnome Start-here Icons Howto.   
This is the basic configuration howto about change the gnome start here icons.  
=================
Common two ways: 

1. to directly replace the original start\-here png with the alternative one you like to do. as following:   

cd /usr/share/icons/gnome/24\*24/places/
mv start\-here.png start\-here.png.bak
cp your\-own\-starticon.png start\-here.png
git\-update\-icons\-cache /usr/share/icons/gnome/

And then, just restart your X window, and Thats all.

2. Another method is to configure the gnome configuration file to add your customize icon path. as following:  
open the **gconf\-editor** tools and then select the apps \-> panel \-> objects \-> object\_3, and just check the **use_costom\_icon**, then edit the key as your icon paths.  Thats all.
