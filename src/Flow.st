Smalltalk createPackage: 'Flow'!
Object subclass: #Flow
	instanceVariableNames: ''
	package: 'Flow'!

RouteableController subclass: #TemplateController
	instanceVariableNames: ''
	package: 'Flow-Templates'!
!TemplateController commentStamp!
## TemplateController is an abstraction
The concrete subclasses of TemplateController follow the convention of loading html from the server.
This convention uses the keyword of the controller as the name of the template to be found at views/!

!TemplateController methodsFor: 'rendering'!

renderOn: html

	require 
		value:(Array with: 'bower_components/text/text!!views/',self class keyword,'.html')
		value:[	:template | 
			self jQueryElement html: template]
! !

!TemplateController class methodsFor: 'testing'!

isAbstract
	"Answers true if the receiver is abstract."
	
	^ self = TemplateController
! !

TemplateController subclass: #HelloWorldController
	instanceVariableNames: ''
	package: 'Flow-Templates'!

!HelloWorldController class methodsFor: 'testing'!

isValidFor: anURI
	"Answers true if this controller is the right route for anURI"
	
	^ self isAbstract not and:[
	anURI notEmpty and:[
	anURI = self keyword ] ]
! !

!Object methodsFor: '*Flow'!

trigger: anEventName 
	"Triggers anEventName in this object.
	There you have it, it happened. 
	Hey World, do something about this!!"
	
	^ (jQuery value: self) trigger: anEventName
!

trigger: anEventName with: anArgument
	"Triggers anEventName in this object.
	There you have it, it happened. 
	Hey World, do something about this!!"
	
	^ (jQuery value: self) 
			trigger: anEventName 
			with: anArgument
!

when: anEventName do: aReactionBlock
	"Wires the observation of this object to the occurrence of anEventName.
	When (and if) anEventName happens, aReactionBlock will take place. 
	Godspeed!!"
	
	^ (jQuery value: self) 
		on: anEventName 
		do: aReactionBlock
! !

