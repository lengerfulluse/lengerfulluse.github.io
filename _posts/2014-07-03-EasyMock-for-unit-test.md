---
layout: post
title: EasyMock for Unit Test
---

{{page.title}}
=============
<p class="meta">03 July 2014 - Beijing</p>
I noticed lot of projects code with **unit test** as a necessary part. Unfortunately that, I didn't have the opportunity to do it myself. Upon coming out from the campus, it naturally become a necessary part of the carel talent of a SDE.  
Common and basic test procedure framework will be [Junit](http://junit.org), which lay the fundation of test. Such as `@Before,@Test,@After` workflow, `Assertions, Test Runners, Ignoring, Rule`. However, when encounter complex and sophisticated system, the dependency of functions may become perplexing. It's impossible to construct all this objects as the input of a to-be tested function. **Mock** conception arise naturally. Well in plain word, could we just mock these dependency objects, give their input parameters and expected behavior or return value. And it just exactly benefit what our test case needed. There are lots of good mock framework, such as [JMock][JMock], [EasyMock][EasyMock]. All roads to Roma. I spent about three days to learn the JMock for a particular unit test code. When I come from JMock to EasyMock, I found that most prior knowledge and experience can be come in handy. I take notes here as a reminder.   
 1. From scratch, I just know a little about junit. If I want to write tests for a class, the meta element for test is functions. So I need to construct the context for a function test, such as the corresponding main class, the input parameters for a test, external dependency objects need to construct. also the purpose of test, do we need to `Assertions`? and so on.  
 2. with these in mind, we need to test the functionality of the methods. Is it a `AssertEqual()`,`AssertTrue()`,`Expected Exception`? How could we guarantee the coverage?  
 3. How to mock the external dependency object. This is definitely a long story. Simplify by three steps, expect what the behavior and result, replay the workflow, verify the result.   




**Reference**    
1. [JMock Website][JMock]  
2. [EasyMock Official][EasyMock]   
3. [EasyMock Control Tutorial][EasyMock Control]   
4. [JMock Tutorial][Tamas Gyorfi]    

[JMock]: http://jmock.org "JMock Official"
[EasyMock]: http://easymock.org "EasyMock official"
[EasyMock Control]: http://michaelminella.com/testing/mock-controls-with-easymock.html "EasyMock Control Tutorial"
[Tamas Gyorfi]: http://tamasgyorfi.wordpress.com/2011/04/21/mocking-tutorial-part-1-jmock "JMock Tutorial"
