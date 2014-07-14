Smalltalk createPackage: 'Flow-Core'!
Widget subclass: #Controller
	instanceVariableNames: 'model'
	package: 'Flow-Core'!

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
	package: 'Flow-Core'!
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
	instanceVariableNames: 'session'
	package: 'Flow-Core'!

!FlowAppController methodsFor: 'accessing'!

session

	^ session ifNil:[ session := Session new ]
! !

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
	
	self session open
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
	package: 'Flow-Core'!

Mapless subclass: #Model
	instanceVariableNames: ''
	package: 'Flow-Core'!

Model subclass: #User
	instanceVariableNames: ''
	package: 'Flow-Core'!

Object subclass: #Router
	instanceVariableNames: ''
	package: 'Flow-Core'!
!Router commentStamp!
This router observes changes in the URI and reacts accordingly.

The strategy is to ignore what should be rote where in advance by collaborating intensively with controllers that understands #isValidFor: 
That way this router will flexibly route thigs with a pontentially complex URI!

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
	instanceVariableNames: 'id user social api'
	package: 'Flow-Core'!

!Session methodsFor: 'accessing'!

api

	^ api ifNil:[ api := Client new ]
!

asJSONString

	^ HasedCollection new
		at: 'id' put: self id;
		at: 'userId' put: self user id;
		asJSONString
!

open

	self api connect
! !

