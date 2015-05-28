---
layout: post
category: translation
title: Add Comment to Jekyll Blog with Disqus
---

{{page.title}}
=============
<p class="meta">09 Aug 2014 - Beijing</p>


####Blogging with personal domain, Github hosted, Jekyll themes   
If you are tired of common blogging with Wordpress, Pager like, and want to try some cool things of DIY, Just take a look at these combination: 
Buy a personal domain on [Godaddy](http://godaddy.com), hosted on [Github](http://github.com), and setting you blog template with the help of
[Jekyll](http://jekyllrb.com). It's not a fresh thing when I write this article. So what I am aimed is to introduce a common way to add comments
to your jekyll theme. [Disqus](https://disqus.com) Here.    
####Comments with Disqus
 It's actually a lot simpler than you might think. The main process just contains following steps:   
 1. Register an account on [Disqus](https://disqus.com/admin/create/). After register of disqus account, 
 you could go next step to register your website, such as your personal domain blog website. The whole register process is very self explanation,
 so I will take no more explanation here.    
 2. Generate code for your jekyll powered blog. The last and crucial step is to select the type of install instruction. You will see a lot of common
 blogger platforms. What we choose here is **Universal Code** here. And once you selected, Disqus will automatically generate a bit of code that look 
 like this:    
 {% highlight html %}
    <div id="disqus_thread"></div>
    <script type="text/javascript">
        /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
	// required: replace example with your forum shortname
        var disqus_shortname = '<accountname>'; 
  
        /* * * DON'T EDIT BELOW THIS LINE * * */
        (function() {
            var dsq = document.createElement('script');
	    dsq.type = 'text/javascript';
	    dsq.async = true;
           dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
           (document.getElementsByTagName('head')[0] 
                || document.getElementsByTagName('body')[0]).appendChild(dsq);
       })();
   </script>
   <noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">
       comments powered by Disqus.</a></noscript>
   <a href="http://disqus.com" class="dsq-brlink">blog comments powered by
       <span class="logo-disqus">Disqus</span></a>
 {% endhighlight %}
 Now what you need to do is just putting them into the proper layout html template, post layout for example.     
 4.  Noted that, most situation we need to test our Jekyll in local. In order for Disqus to work on your local, you need to tell it that you are working in 
 development mode. If you don't do this, then you will get an message stating it can't reach the server. All you need to do is add a new variable with a value
 of *1*.    
 {% highlight html %}
  <script type="text/javascript">
      /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
      // required: replace example with your forum shortname
      var disqus_shortname = '<shortname>'; 
      var disqus_developer = 1; // This turns developer mode on
                                // Make sure you remove this before you push this
                                // to your live site.
  
      /* * * DON'T EDIT BELOW THIS LINE * * */
      (function() {
       var dsq = document.createElement('script'); 
       dsq.type = 'text/javascript'; 
       dsq.async = true;
       dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';
       (document.getElementsByTagName('head')[0] 
           || document.getElementsByTagName('body')[0]).appendChild(dsq);
     })();
   </script>
   <noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">
       comments powered by Disqus.</a></noscript>
   <a href="http://disqus.com" class="dsq-brlink">blog comments powered by 
   <span class="logo-disqus">Disqus</span></a>
{% endhighlight %}

Once you have these set up, everything worked perfectly.     
####Reference    
+ [Adding Disqus Comments](http://http://schmidt-happens.com/articles/2011/09/26/adding-disqus-comments.html)     


