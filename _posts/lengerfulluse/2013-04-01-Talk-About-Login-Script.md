---
layout: post
category: "work"
tags: [explore, shell]
---
{% include JB/setup %}
It seems to be an unfinished wanted. From the begining of learning the computer language programmings, it is naturally to be taughted about 
the story of great computer hackers. Among all of the cabaility owned by them , the most important one is to crawl on the complex and wideless 
internet. So the automatic robot which wander freely on the internet become the greatest things for all the hacker. No matter how beautiful 
and effective a hacker's code, It stills an sallow pain if they haven't implements a internet robot programming, namely crawls.  Maybe the 
topics about crawl will continue in the next sections because of the recently two important projects. \(yes, I just assumed that you have 
known them ^\_^, all right, exactly it just lie on my [GitHub:byr\-crawler](http://github.com:lengerfulluse/byr-crawler.git).\).  Now, let 
start our 
talking from the most basic and important, How to write an simple login script.  
####HTTP related protocol You should know ####
To make my clarification more clear and systemic, maybe the current first thing is to know, what's login script? why needs login script? how 
we write a login script?  
####Some Practical Clues You Should Gain From a Particular Gateway ####
1. the login and logout gateway. The core of login script is to send the http request. Therefore, the http address provide the object we send 
to. and because there often exist some different between the login and logout address. So you should first identify the correct address.  
2. the particular send data required from the vertification server for the login and logout. to more accuracy, the format of the date is the 
key to implement the login/logout. Unfortunately, I haven't konw the tricy to gain all this information, maybe the most efficient way is to 
view the post information from the browsers in a login request.  commonly, the username and passwd is neccessary, and the password often needs 
to do the *md5sum* process. also the entire connection strings is litte OPAC.  
3. the text process from the return http response informations. And in the situation of shell script implement, it cannot used some 
high\-level data structure such as XML or JASON parser. the simple and effective method is text process, such as extraction, filtering, and so 
on. to get the success\failure informations returned from the response. 

####Reference####
[BYR LOGIN SCRIPT](http://bbs.byr.cn)
