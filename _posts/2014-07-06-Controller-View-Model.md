---
layout: post
title: Controller-View-Model
---

{{page.title}}
=============
<p class="meta">06 July 2014 - Beijing </p>  

Models represent knowledge. A view is a \(visual\) representation of its model. It is thus acting as a presentation filter. A view is attached to its model or model part and get the data necessary for the presentation from the model by asking quetions. It may also update the model by sending appropriate messages. A controller is the link between a user and system. It provides the user with input by arranging for relavant views to present themselves in appropriate places on the screen. The controller receives such user output, translate it into the appropriate messages and pass these messages on to one or more of the views.   

Model  
: Data only. Get methods, set methods, etc. It is isolated. It knows nothing about View, or the controlls.   
View  
: UI only. Only show what you tell it to, and never  performs any transformation or validation logic. It always forwards input via an event/callback system. It is isolated, knows nothing about the Model nor the Controller.  
Controller  
: Sits between Model and View. Does any data transformation\(bussiness logic\) that is necessary to get the data from the Model to the View. Does most data validation on input. It knows about both the View and Model. 
