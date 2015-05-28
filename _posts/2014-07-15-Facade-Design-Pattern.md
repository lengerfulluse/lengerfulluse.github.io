---
layout: post
title: Facade Design Pattern
---

{{page.title}}
=============
<p class="meta">15 July 2014 - Beijing</p>
**Facade pattern** provides a simplified interface to a set of interfaces within a system and thus it hides the complexities of the subsystem from the client. It creates a layer to abstract and unify the related interfaces in the application and define an entry point to each subsystem level and thus make them communicate only through their faces.   
To simplify the interaction process, we introduce the facade layer. Facade expose a simplified interface\(in this case a single interface to perform that multi\-step process\) and internally it interacts with those components and gets job done for you **one way**.  Common representation are dipicted as followings:  
![facade_pattern](/images/facade_pattern_example.jpg)  
####Common Mistakes   
1. Layered architecture is good but assess the need for every layer. Just naming a class as ABCDFacade\.java doesn't really make it a facade.  
2. facade is focus on process flow, but the bussniess logic. Controller is not a facade.  
3. facade helps to reduce the complexity of subsystem clients interacts to. But if there is only one or two lines of code, just avoids the facade pattern. Clients can invoke it directly.   
4. Subsystems are not aware of facade and there should be no reference for facade in subsystem. it's a one way communication between the facade and subsystem. Anonther common pattern, **Mediator** pattern adapt two way communication.    


####Summary of Facade Pattern   
+ Facade provides a single interface.  
+ Programmers comfort is a main purpose of facade.  
+ Facade is used for promoting subsystem independence and portability.  
+ Translating data to suit the interface of a subsystem is done by the facade.  

**Reference**     
+ [JavaCodeGeeks][javacodegeeks]   
+ [Javapaper][javapaper]  


[javacodegeeks]: http://www.javacodegeeks.com/2012/11/facade-design-pattern-design-standpoint.html  
[javapaper]: http://javapapers.com/design-patterns/facade-design-pattern/   
