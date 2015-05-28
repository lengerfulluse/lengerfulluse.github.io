---
layout: post
title:	Builder Design Pattern 
---

{{page.title}}
=============
<p class="meta">31 July 2014 - Beijing</p>

####At First Sight of Builder Pattern
The first time I encountered the Builder Pattern would date back to the beautiful internship time in Red Hat. What inspired me a lot is its strange setter way.    
{% highlight java linenos %}
class PeopleBuilder {
    private String name = "Joseph"
    private int age = 24;
    private String talent = "programming"; 

    public PeopleBuilder setName(String name) {
	this.name = name;
	return this;
    }
    public PeopleBuilder setAge(int age) {
        this.age = age;
	return this;
    }
    public PeopleBuilder setTalent(String talent) {
	this.talent = talent;
	return this;
    }
}
{% endhighlight linenos %}
The function will return object itself, in setter methods. Also these setter methods can avoid too many parameters in a function invocation process, such as:   
{% highlight java linenos %}
    PeopleBuilder peopleBuilder = new PeopleBuilder();
    /*
     * Common definition for the doWork() function:
     */
    public void doWork(String workName, int age, String talent) {
	if(age < 18) {
	    log.error("Can not employee cirtical labour!");
	    throw new IllegalAgeException("age litter than 18");
        }
	doTalent(talent);
        log.info(String.format("Name:[%s], Talent:[%s]", workName, talent));
    }
    /*
     * define function with PeopleBuilder object as the only parameters.
     */
    public void doWork(peopleBuilder.setAge(19).setName("Heng")
	.setTalent("programming")) {
	if(peopleBuilder.getAge() < 18) {
	    log.error("Can not employee cirtical labour!");
	    throw new IllegalAgeException("age litter than 18");
        }
	doTalent(peopleBuilder.getTalent());
	log.info(String.format("Name:[$s], Talent:[%s]", peopleBuilder.getName()
		, peopleBuilder.getTalent());
    }

{% endhighlight linenos %}

**At the first glance** of the above ***Builder Pattern*** usage, it resoved the too many parameters problem. However, when `doWork()` function invoke the `PeopleBuilder` class, it looks really strange and weild. Now the PeopleBuilder looks more like a POJO but a Builder. The `get` methods in Builder really strange. So the most important thing to do is to just figure out what the adventages and disadvantages do the builder pattern suit:     
1. *if you find that there are too many parameters in a function invocation, you could take a consideration: could it be encapsulated into a Java Bean Object. and with necessary ***get***, ***set*** methods*.   
2. *Still, you find that the encapsulated class could not satify with your requirement. some construct parameters are necessary for you and some a optional. But all they could only be assigned value at first construct stage of the object. The object become read only, and be immutable.*  
3. *Then, Builder Pattern is becoming your first choice.*  

####An Example of Classical Builder Pattern.   
**mail sender builder**
{% highlight java linenos %}
    Class EmailSender {
	/*
	 * required parameters for send a email.
	 */
	private final String subject;
	private final String from;
	private final String to;
	/*
	 * optional parameters.
	 */
	private final String cc;
	private final String body;

	/*
	 * private construct function with EmailSenderBuilder.
	 */
	private EmailSender(EmailSenderBuilder emailBuilder) {
	    this.subject = emailBuilder.subject;
	    this.from = emailBuilder.from;
	    this.to = emailBuilder.to;
	    this.cc = emailBuilder.cc;
	    this.body = emailBuilder.body;
	}
	/**
	 * noted the static class accessor.
	 */
   	 public static EmailSenderBuilder {
   	     private final String subject;
   	     private final String from;
   	     private final String to;
   	     private String cc;   /* non-final statement compared to EmailSender */
   	     private String body; /* non-final statement compred to EmailSender */
   	     public EmailSenderBuilder(String subject, String from, String to) {
   	         this.subject = subject;
   	         this.from = from;
   	         this.to = to;
	     }
   	     /**
   	      * fluent interface idiom .
   	      */
   	     public subject(String subject) {
   	         this.subject = subject;
   	         return this;
   	     }
   	     public from(String from) {
   	         this.from = from;
   	         return this;
   	     }
   	     public to(String to) {
   	         this.to = to;
   	         return this;
   	     }
   	     /**
   	      * It's definitely cool! Also you can implement the logic 
	      * condition in build according to your requirement.
   	      */
   	     public EmailSender build() {
   	         return new EmailSender(this);
   	     }
   	 }
    } 

{% endhighlight %}
So long and thanks for all the fish!   
####Reference
* [The builder pattern in practice](http://www.javacodegeeks.com/2013/01/the-builder-pattern-in-practice.html).
* [Builder Pattern](http://en.wikipedia.org/wiki/Builder_pattern).
