---
layout: post
category: languages
tags: [work, python, gui]
---
{% include JB/setup %}

For a part of project, the demands for the gui interface enforce me to find a simple and flexibile toolkit-like to develop a desktop programming. the two main choices are the **Swing** and **wxPython**. The java things bores me a lot in before. So I decide to try something new, since I have a lot of interest in python recently.  
#### Modules introduction #####
wxPython is a cross platform toolkit for creating desktop GUI applications. the principal author is **Robin Dunn**. wxPython consists of the five basic modules.  

	.
	|-- Controls: provides the common widgets, such as Button, Toolbar.
	|-- Core: consists of elementary classes. Object, Sizers, Events.
	|-- GDI: used for drawing onto the widgets.
	|-- Misc: various other classes and modules. logging, configuration.
	|-- Windows: consists of various windows. Panel, Dialog, Frame etc. 


Widgets are called controls in windows. GUI programming is a tedious project, the main reason lies in that the inner logical flow troubles me a lot. such as when you try to create a menuitem, you should first contruct a MenuBar object, then a Menu object, and then construct a menuitem, finnally append the menu object to the menubar object. Also you should bing the event to the itemmenu object. 
#### Sizer ####
The programmer specifies the position and the size of each widget in pixels. when you use the absolute positions, you should understand several things:
- when you resize the window, the size and the position of widgets do not change.
- applications look different on various platforms.
- changing fonts might spoiled the layout.
- it's difficult to redo the layout.

Sizer address all those issues, we can choose among these sizers:  
	.
	|-- wx.BoxSizer enable us to put several widgets into row or column.
	|-- wx.GridSizer lays out widgets in two dimensional table, each cell has the same size.
	|-- wx.FlexGridSizer all cells have same height in a row.
	|-- wx.BagSizer the most complicated sizer.

#### Events ####
Events are integral part of every GUI application. All GUI application are event-driven.  
**Event object** is an object associated with the event. It is usually a window. **Event type** is a unique event, that has been generated. **Event binder** is an object, that binds an event type with an event handler.  
#### Widgets ####
- wx.Button
- wx.ToggleButton
- wx.StaticLine
- wx.StaticText
- wx.StaticBox it is used to logically group various widgets.
- wx.ComboBox a single line text field, a button with a down arrow image and a listbox.
- wx.CheckBox notice that, like the togglebox, it has two states.
- wx.StatusBar 
- wx.RadioButton
- wx.Gauge It has an indicator to show the current state of a task.
- wx.Slider
- wx.SpinCtrl


##### *reference* ######
*\[1\]:* **[wxPython tutorial](http://zetcode.com/wxpython/) ** 

