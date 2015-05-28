---
layout: post
category: "work"
tags: [linux, note]
---
{% include JB/setup %}

What's locale? basically, locale is all the information about your geography postion, such as which country you are? what language you use? 
and of course contains date time format, moneny currency format and so much information. With the tendy of software internationalize, the 
specific localize for specific local users become urgent and necessary. All above is what locale is responsible for.  Ok, let's get start.

#### Locale Type and Environment Variables ####
The introduction part generally describe some aspects about what particular a lcoale seems contains. and As we know, all these have their 
standard definition, context and content details. For the locale, the ISO files have the regular and comprehensive definition. It may contain 
the following aspects and in unix-like system, It's demonstrated as Locale Environment Variables.   
- *LANG* the default definition for all local settings at once. while allowing the further individual customization via LC\_\* settings 
belows.  
- *LC_CTYPE* define the character handling properties for the system. *The determines which characters are seen as part of alphabet, numberic 
and so on*, This also determine teh character set used, if applicable.  
- *LC_COLLATE* define the alphabetical ordering of strings. This effects *eg.* output of sorted directory listing.  
- *LC_MESSAGE* Programs' localization for applications use message based localization.  
- *LC_MONETARY* define curry units and formatting of currency type, numberic values.
- *LC_NUMBERIC* define formatting of numberic values which are not monetary.  
- *LC_TIME* define formatting of data and time.  
- *LC_...* main contains other setting.  
- *LC_ALL* A special value to overriding all the above settings.  
The linux system self provide a lot of locale for almost all of the countries and regions. the specific locale directory is 
`/usr/share/locale/`, which provide the locale resource files. By default, all kinds of locale contained Here.  

#### Setting locale ####
The first step of settings is to know what locale our system current use. Here we need the `locale` command. which is used for get 
locale-specific informations.   
If we want to know what current locale our system support now, we should add the `-a` options for the `locale` 
command. If you find that there doesn't exist the locale you wanted , you should generate the locale by yourself. which contain two steps:  
1. edit the `/etc/locale.gen` configure file to add the locale you want.  
2. run the command `locale-gen` to generate the locale.  

Now, since we have generate the locale we need, we need to setting the locale. Like common linux configure sytles, almost every configure 
settings have the different apply range. namely the system-wide and personal user settings. and no exception for the locale. there are two 
choice to setting the locale. if you want to settingt the system-wide, you can edit two setting files.  
	/etc/env.d/02locale --> LANG="en_US.UTF-8" for instance.
	/etc/profile --> export LANG="en_US.UTF-8" for instance.
and for user specified range.  
	$HOME/.bash_profile --> LANG="en_US.UTF-8" for instance.

Of course the above just simple give a simple example, you can give a specified setting for LC\_\* Variables for yourself.  


