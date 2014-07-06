Smalltalk createPackage: 'Flow'!
Widget subclass: #Controller
	instanceVariableNames: 'model'
	package: 'Flow'!

!Controller methodsFor: 'accessing'!

jQueryElement

	^ '#content' asJQuery
! !

!Controller methodsFor: 'actions'!

render
	
	self jQueryElement empty.
	
	self renderOn: (HTMLCanvas onJQuery: self jQueryElement)
!

renderOn: html

	html h1: self class name
! !

Controller subclass: #RouteableController
	instanceVariableNames: ''
	package: 'Flow'!
!RouteableController commentStamp!
## This is an abstraction. 

*Concrete subclasses know* if they are valid for a given URI so the app can be routed to them.

A typical web app might have:
1. home
2. sign up
3. sign in
4. many other app-specific controllers!

!RouteableController class methodsFor: 'accessing'!

keyword
	"Answers the name of the class in lowercase without 
	the 'Controller' sufix so it can, for example, be used for friendly URI.
	Subclasses are expected to follow the naming convention *Controller like
	ThisNameController, ThatOtherNameController, AnyNameController, etc"

	^ (self name reversed copyFrom: 'Controller' size + 1 to: self name size) reversed asLowercase
! !

!RouteableController class methodsFor: 'actions'!

routeFor: anURI
	"Answers the subclass that is a good fit to route anURI."
	
	^ self allSubclasses
		detect:[ :each | each isValidFor: anURI ]
		ifNone:[ NotFoundController ]
! !

!RouteableController class methodsFor: 'testing'!

isAbstract
	"Answers true if the receiver is abstract."
	
	^ self = RouteableController
!

isValidFor: anURI
	"Answers true if this controller is the right route for anURI"
	
	"the default policy is reject"
	^ false
! !

RouteableController subclass: #FlowAppController
	instanceVariableNames: ''
	package: 'Flow'!

!FlowAppController methodsFor: 'initialization'!

initialize

	super initialize.
	
	"Handy reference"
	window at: 'app' put: self
! !

!FlowAppController methodsFor: 'reactions'!

onOpen

	self render.
	
	'#loader' asJQuery hide.
	
	window document title: self class name.
	
	Router observeHash.
! !

!FlowAppController class methodsFor: 'actions'!

open
	"The foundation is ready, time to start this app!!"

	^ self new onOpen
! !

!FlowAppController class methodsFor: 'testing'!

isAbstract
	"Answers true if the receiver is abstract."
	
	^ self = FlowAppController
!

isValidFor: anURI
	"Answers true if this controller is the right route for anURI"
	
	^ self isAbstract not and:[
	anURI isEmpty ]
! !

RouteableController subclass: #NotFoundController
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

Object subclass: #Flow
	instanceVariableNames: ''
	package: 'Flow'!

MaplessModel subclass: #Model
	instanceVariableNames: ''
	package: 'Flow'!

Object subclass: #Router
	instanceVariableNames: ''
	package: 'Flow'!
!Router commentStamp!
This router observes changes in the URI and reacts accordingly.

The strategy is to collaborate intensively with controllers that understands #isValidFor: to flexibly know what to do with a pontentially complex URI!

!Router class methodsFor: 'accessing'!

route
	"Answers the current route."
	
	^ self uri replace: '^#/' with: ''
!

uri

	^ window location hash
! !

!Router class methodsFor: 'actions'!

observeHash

	window onhashchange:[ self onHashChanged ].
	self onHashChanged
! !

!Router class methodsFor: 'reactions'!

onHashChanged
	
	self trigger: 'aboutToRoute'.
	
	(RouteableController routeFor: self route) new render.
	
	self trigger: 'afterRouting'
! !

Object subclass: #Session
	instanceVariableNames: 'user client'
	package: 'Flow'!

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

