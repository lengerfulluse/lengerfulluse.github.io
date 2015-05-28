---
layout: post
category: "work"
tags: [note, git]
---
{% include JB/setup %}
In the age of open source and could computer, it become very necessary for us to work together ou the cloud with an 
share projects. [**Bitbucket**](http://bitbucket.org) provides an possibility for our needs.  this article is aim to 
give an simple introduction about how to share and collaborate on a project.   
Generally speacking, it mainly contains the following configurationn steps\(I'll assume that your os is 
windows\):  
####Some Basic Configuration Steps####
**1.**  Install [**git for windows**](msysgit.github.com). just as the common way of install software on Windows, 
click 
all the way.  
**2.**  After installing, you need to do a simple configure of git for your name and emails:  

	git config --global user.name "Your Name"
	git config --global user.email "Name@example.com"  

also you can configure for you favorite editor or diff tools\(optional\):  

	git config --global core.editor "vim"  

and you can configure your git to display with color:

	git config --global color.ui true  

**3.** then, you need configure ssh key for pull and push on the bitbucket repository. here, I already configure it 
for 
you, and I will send to you by email, with usage attached. so just skip if you would care the configure details. 
otherwise, a tutorial [here](https://help.github.com/articles/generating-ssh-keys).  
**4.** now, it time to pull the repository down, just copy the following command, and execute it:  

	git clone git@bitbucket.org:lengerfulluse/acl-multiling.git  

after the pull completement, you will find the directory *acl\-multiling* in your current working directory. That's 
the repository on the cloud.  
*Notice: you run the `git clone` command just for the first time you pull a repository. After that, every time you 
work on the existed repository, the first step is to run the `git pull` to ensure that your repository
 is the already up\-to\-date*.      
**5.** you can work on your local repository now, for example do some modify or add a file to the directory, after 
that you can check  what *files* you have modify or create:  

	git status  

**6.** then you add the file and commit it:  

	git add <file you modified>  
	git commit -m "message you want to say about this commit"  

**7.** you can continue to work on the local repository and do the loop as *step 5* and *step 6*. you can also now 
push 
your current commit to bitbucket repository.  Also before the `push` step, you'd better do the `pull` operation again 
to ensure the newest status of your local repository. so you should do:  

	git pull  

if there doen't exist some emerge conflict, then:  

	git push  

That's all, it simply contains normal workflow loop. It is strongly recommended to read the great arts [**Pro 
Git**](http://www.google.com/search?q=pro+git).  
Also we can do a simple demonstration together. Any prolem feel free to contact me any time.  
#### Some Conflict Screenshot and Howto Emerge Conflict ####
- **git push failure**  
  ![push failure](/assets/img/git/push-conflict.png) 
- **git pull to emerge**
  ![pull emerge](/assets/img/git/pull-emerge-conflict.png)
- **content in a conflict file**
  ![cotent](/assets/img/git/conflict-content.png)

####Reference####
**\[1\]** [**Generating SSH keys**](https://help.github.com/articles/generating-ssh-keys)     
**\[2\]** [**\_config.yml**](http://jekyllrb.com) 

   
