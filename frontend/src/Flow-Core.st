Smalltalk createPackage: 'Flow-Core'!
Widget subclass: #Controller
	instanceVariableNames: 'controllers model view parent parentElement'
	package: 'Flow-Core'!
!Controller commentStamp!
## This is an abstraction. 

*Concrete subclasses* are controllers with some degree of specialization. Here we concentrate in the commons and foundatinos for all of them.

A typical controller might have:

1. a model
2. some (sub)controllers
3. minimal common behavior!

!Controller methodsFor: 'accessing'!

controllerAt: aKey 

	^ self controllers 
		at: aKey 
		ifAbsent:[ self error: 'Controller not found: ', aKey asString ]
!

controllerAt: aKey ifAbsent: aBlock

	^ self controllers 
		at: aKey 
		ifAbsent: aBlock
!

controllerAt: aKey ifAbsentPut: aBlock

	^ self controllers 
		at: aKey 
		ifAbsent:[ self controllerAt: aKey put: aBlock value ]
!

controllerAt: aKey put: aController

	^ self controllers at: aKey put: aController
!

controllers
	
	^ controllers ifNil:[ self initializeControllers ]
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

view
	"Answers the DOM element who is the root of this controller's view"
	^ view
!

view: aHtmlElement

	view := aHtmlElement
! !

!Controller methodsFor: 'actions'!

ifAbsentAt: aKey put: aBlock
	"Answers the controller already present at aKey or,
	if absent, puts the one expected to be created during aBlock and returns it."
	
	^ self controllerAt: aKey ifAbsentPut: aBlock
!

ifAbsentAt: aKey put: aBlock andDo: aPostAddingBlock
	"Answers the controller already present at aKey or,
	if absent, puts the one expected to be created during aBlock,
	evaluates aPostAddingBlock using it and finally returns it"
	
	^ self 
		controllerAt: aKey 
		ifAbsent: [ | newController |
			newController := aBlock value.
			self controllerAt: aKey put: newController.
			aPostAddingBlock value: newController.
			newController ]
!

refresh

	self render
!

remove
	
	self onAboutToRemove.
	
	self view remove.
!

removeControllerAt: aKey 

	| controller |
	
	controller := self controllerAt: aKey ifAbsent:[ nil ].
	
	controller ifNotNil:[
		controller remove ].
		
	self controllers removeKey: aKey ifAbsent: [ nil ]
!

render
	
	self onAboutToRender.
	
	self renderOn: (HTMLCanvas onJQuery: self parentElement)
!

renderOn: html
	"This is a silly default only useful to dev because provides quick feedback ans sets the view.
	Subclasses do interesting thigns intead"
	
	view := (html h1: self class name) asJQuery
! !

!Controller methodsFor: 'initialization'!

initializeControllers
	
	^ controllers := Dictionary new
! !

!Controller methodsFor: 'reactions'!

onAboutToRemove
	"This controller is about to be removed."
	
	"no-op"
!

onAboutToRender
	"This controller is just about to be rendered."

	"Empty the contents of the root element of this controller.
	This would work as long as the view of this controller is the
	only thing supossed to be child in that element"
	self parentElement ifNotNil:[
		self parentElement empty ].
!

onAfterModel
	"The model of this controller just have been set."
!

onBeforeModel
	"The model of this controller is about to be set."
! !

!Controller methodsFor: 'testing'!

hasView
	"Answers true if this controller has a view"
	
	^ view notNil
!

isRendered
	"Answers true if this controller is rendered."
	
	^ self hasView and:[
	self view children length > 0 ]
! !

!Controller class methodsFor: 'accessing'!

defaultHtmlElement

	^ '#content' asJQuery
!

defaultModel

	^ nil
! !

!Controller class methodsFor: 'actions'!

for: aModel 
	"Answers a new instance of this controller dedicated to aModel,
	with no parent and meant to be appended to the default html element,
	expected to be <div id=#content></div>."
	
	^ self for: aModel on: nil appendingTo: self defaultHtmlElement
!

for: aModel on: aParentControllerOrNil
	"Answers a new instance of this controller dedicated to aModel,
	child of aParentControllerOrNil and meant to be appended to 
	the default html element, expected to be <div id=#content></div>."
	
	^ self for: aModel on: aParentControllerOrNil appendingTo: self defaultHtmlElement
!

for: aModel on: aParentControllerOrNil appendingTo: aHtmlElement
	"Answers a new instance of this controller dedicated to aModel,
	child of aParentControllerOrNil and meant to be appended to aHtmlElement."

	^ self new
		model: aModel;
		parent: aParentControllerOrNil;
		parentElement: aHtmlElement;
		yourself
!

on: aParentControllerOrNil appendingTo: aHtmlElement
	"Answers a new instance of this controller using the default model,
	child of aParentControllerOrNil and meant to be appended to aHtmlElement."
	
	^ self for: self defaultModel on: aParentControllerOrNil appendingTo: aHtmlElement
! !

Controller subclass: #ListController
	instanceVariableNames: 'getItemsBlock itemControllerClass newItemControllerBlock listView'
	package: 'Flow-Core'!
!ListController commentStamp!
## ListController

ListControllers know how to deal with lists of things. It needs to know how you want to create subcontrollers for its items and it needs to know how to get those items. It will also allow you to customize the subcontrollers with a callback when they are instantiated.!

!ListController methodsFor: 'accessing'!

getItems
	"Answers the items using the custom getItemsBlock on its model"
	
	^ self getItemsBlock value: model
!

getItemsBlock

	^ getItemsBlock
!

getItemsBlock: aBlock

	getItemsBlock := aBlock
!

itemControllerClass

	^ itemControllerClass
!

itemControllerClass: aBlock

	itemControllerClass := aBlock
!

listView
	"Answers the html element from where the item controllers are going to be appended.
	Usually a <ul>"
	^ listView
!

listView: aHtmlElement

	listView := aHtmlElement
!

newItemControllerBlock

	^ newItemControllerBlock
!

newItemControllerBlock: aBlock

	newItemControllerBlock := aBlock
!

newItemControllerFor: anItem

	^ itemControllerClass isNil
		ifFalse:[ itemControllerClass 
					for: anItem 
					on: self 
					appendingTo: self view ] 
		ifTrue:[ self newItemControllerBlock value: anItem ]
!

parentElement: anHtmlElement
	"Sets the parent elment for the list.
	It can be anything but, in the case of lists, the parent element usually is a <ul>
	The thing is to treat it like an <ul> full of <li> children."
	parentElement := view := anHtmlElement
! !

!ListController methodsFor: 'actions'!

refresh
	"Makes sure all the items in the model have its own controller.
	Nothing less and nothing more. So it will add lazily 
	the missing controllers and remove those who's model isn't present."
	
	| items |
	
	"Remove absences"
	self controllers keys 
		with: self getItems 
		do:[ :e | (self getItems includes: e) ifFalse:[
					self removeControllerAt: e ] ].
	
	"Add novelties"
	self getItems do:[ :e | | added |
		self controllerAt: e ifAbsentPut:[ 
			added := self newItemControllerFor: e ].
		added ifNotNil:[ 
			added render ] ]
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

initialize

	super initialize.
	
	"The convention for routeable controllers is 
	to have only one element with id='content' in index.html 
	and all the rest of the app goes from that controller"
	parentElement := '#content' asJQuery
! !

!RouteableController class methodsFor: 'accessing'!

controllerFor: anURI
	"Answers the subclass that is a good fit to route anURI."
	
	^ self allSubclasses
		detect:[ :each | each isValidFor: anURI ]
		ifNone:[ NotFoundController ]
!

keyword
	"Answers the name of the class in lowercase without 
	the 'Controller' sufix so it can, for example, be used for friendly URI.
	Subclasses are expected to follow the naming convention *Controller like
	ThisNameController, ThatOtherNameController, AnyNameController, etc"

	^ (self name reversed copyFrom: 'Controller' size + 1 to: self name size) reversed
! !

!RouteableController class methodsFor: 'actions'!

forURI: anURI

	^ self for: (self modelFor: anURI) on: nil appendingTo: self defaultHtmlElement
!

modelFor: anURI
	"Answers the model that corresponds to anURI."

	"The default is just to return the default model"
	^ self defaultModel
!

routeFor: anURI
	"Answers a new controller suited to anURI."
	
	^ (self controllerFor: anURI) forURI: anURI
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
	
	window document title: self class name.
	
	Router observeHash.
	
	self session open.
	
	"Handy reference"
	window at: 'app' put: self
! !

!FlowAppController class methodsFor: 'actions'!

open
	"The foundation is ready, time to start this app!!"

	^ (self for: nil on: nil appendingTo: '#content' asJQuery) onOpen
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

MaplessModel subclass: #Model
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

Router class instanceVariableNames: 'active'!

!Router class methodsFor: 'accessing'!

active

	^ active
!

route
	"Answers the current route."
	
	^ self uri replace: '^#/' with: ''
!

uri

	^ window location hash
! !

!Router class methodsFor: 'actions'!

observeHash

	window onhashchange:[ self onHashChanged ]
! !

!Router class methodsFor: 'reactions'!

onHashChanged
	
	self refresh
!

refresh
	
	self trigger: 'aboutToRoute'.
	
	active ifNotNil:[ active remove ].
	active := RouteableController routeFor: self route.

	active render.
	
	self trigger: 'afterRouting'
! !

Mapless subclass: #Session
	instanceVariableNames: ''
	package: 'Flow-Core'!

!Session methodsFor: 'accessing'!

api

	super api ifNil:[ 
		self api: APIClient new ].
		
	^ super api
! !

!Session methodsFor: 'actions'!

open

	self api connect
! !

