---
layout: post
category: "work"
tags: [fluxbox, aterm]
---
{% include JB/setup %}

It's an amazing thing to conquer the aterm, and make it stick on desktop obediently.  
The core of the entire process comes from how to make the aterm windows size on the desktop correctly. And I just find that It aways make me confused when I find the **fluxbox** options about the size of the windows on desktop cannot work.  Ok, let's get the whole process from scratch.   
#### Install the Aterm terminal and Edit the .Xdefaults file ####     

    equo install x11-term/aterm or emerge x11-term/aterm

and make your own .Xdefaults configuration files.  

    aterm*geometry:  80x60
    aterm*color1: #ff23
    and etc...

#### Cofnigure Fluxbox app file to make the aterm sticky on desktop ####   

    [app](aterm)
    [sticky]{yes}
    [layer]{12}
    [Hidden]{yes}
    [Dimensions]{900 710}
    [Position](TopLeft){5 5}
    [Deco]{NONE}
    [end]

Common options like above. all these seems so easy done well.  
Ok, That's all, you reload your fluxbox, and run the **aterm**, you will find the beatiful things on your desktoop. Yes, you are right.  

But, when you open the a large file which more than one page with **vim** editor like, the unfortunately things happens, the border of your aterm windows seems appearence. why? and How?  
#### Some small cares and tricky ####    
1.  if you set the \[Dimensions\] options in the app file, you'd better comment your geometry setting in your *.Xdefaults* file.  
