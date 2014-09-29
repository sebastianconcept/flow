Smalltalk createPackage: 'Flow-Core'!
Widget subclass: #Controller
	instanceVariableNames: 'controllers model jQueryElement parent parentElement'
	package: 'Flow-Core'!
!Controller commentStamp!
## This is an abstraction. 

*Concrete subclasses* are controllers with some degree of specialization. Here we concentrate in the commons and foundatinos for all of them.

A typical controller might have:

1. a model
2. some (sub)controllers
3. minimal common behavior!

!Controller methodsFor: 'accessing'!

controllers
	
	^ controllers ifNil:[ self initializeControllers ]
!

controllersAt: aKey 

	^ self controllers 
		at: aKey 
		ifAbsent:[ self error: 'Controller not found: ', aKey asString ]
!

controllersAt: aKey ifAbsentPut: aBlock

	^ self controllers 
		at: aKey 
		ifAbsent:[ self controllersAt: aKey put: aBlock value ]
!

controllersAt: aKey put: aController

	^ self controllers at: aKey put: aController
!

jQueryElement
	"Answers the DOM element who is the root of this controller's view"
	^ jQueryElement ifNil:[ self initializeJQueryElement ]
!

jQueryElement: aHtmlElement

	jQueryElement := aHtmlElement
!

model
	
	^ model
!

model: aModel

	self onBeforeModel.
	
	model := aModel.
	
	self onAfterModel
!

parent
	"Answers the parent controller of this controller."

	^ parent
!

parent: aParentControllerOrNil

	parent := aParentControllerOrNil
!

parentElement

	^ parentElement
!

parentElement: aHtmlElement

	parentElement := aHtmlElement
!

removeControllerAt: aKey 

	^ self controllers 
		removeKey: aKey 
		ifAbsent:[ nil ]
! !

!Controller methodsFor: 'actions'!

isRendered
	"Answers true if this controller is rendered."
	
	^ self jQueryElement children length > 0
!

render
	
	self jQueryElement empty.
	
	self renderOn: (HTMLCanvas onJQuery: self jQueryElement)
!

renderOn: html

	html h1: self class name
! !

!Controller methodsFor: 'initialization'!

initializeControllers
	
	^ controllers := Dictionary new
!

initializeJQueryElement
	^ jQueryElement := '.content' asJQuery
!

initializeParentElement

	^ parentElement := '.content' asJQuery
! !

!Controller methodsFor: 'reactions'!

onAfterModel
	"The model of this controller just have been set."
!

onBeforeModel
	"The model of this controller is about to be set."
! !

!Controller class methodsFor: 'actions'!

for: aModel on: aParentControllerOrNil appendingTo: aHtmlElement
	"Answers a new instance of this controller dedicated to aModel,
	child of aParentControllerOrNil and meant to be appended to aHtmlElement."
	
	^ self new
		model: aModel;
		parent: aParentControllerOrNil;
		parentElement: aHtmlElement;
		yourself
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

!RouteableController methodsFor: 'initialization'!

initializeJQueryElement
	"Initializes who is the DOM element that will be the root of this controller's view"
	
	"The convention for routeable controllers is 
	to have only one element with id='content' in index.html 
	and all the rest of the app goes from that controller"
	^ jQueryElement := '#content' asJQuery
! !

!RouteableController class methodsFor: 'accessing'!

keyword
	"Answers the name of the class in lowercase without 
	the 'Controller' sufix so it can, for example, be used for friendly URI.
	Subclasses are expected to follow the naming convention *Controller like
	ThisNameController, ThatOtherNameController, AnyNameController, etc"

	^ (self name reversed copyFrom: 'Controller' size + 1 to: self name size) reversed
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

console

	^ console
!

session

	^ session ifNil:[ session := Session new ]
! !

!FlowAppController methodsFor: 'actions'!

hideLoader
	"Hides the loader bar/spinner"
	
	'#loader' asJQuery hide.
! !

!FlowAppController methodsFor: 'reactions'!

onOpen
	"All is loaded."

	self hideLoader.

	self render.
	
	window document title: self class name.
	
	Router observeHash.
	
	self session open.
	
	"Handy reference"
	window at: 'app' put: self
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
	
	| controller |
	self trigger: 'aboutToRoute'.
	
	controller := (RouteableController routeFor: self route) new.
	window at: #current put: controller.
	controller render.
	
	self trigger: 'afterRouting'
! !

Object subclass: #Session
	instanceVariableNames: 'id user social api'
	package: 'Flow-Core'!

!Session methodsFor: 'accessing'!

api

	^ api ifNil:[ api := APIClient new ]
!

asJSONString

	^ HasedCollection new
		at: 'id' put: self id;
		at: 'userId' put: self user id;
		asJSONString
! !

!Session methodsFor: 'actions'!

open

	self api connect
! !

