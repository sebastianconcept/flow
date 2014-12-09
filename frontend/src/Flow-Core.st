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

	self trigger: #onBeforeModel.
	model := aModel.
	self trigger: #onAfterModel.
!

parent
	"Answers the parent controller of this controller."

	^ parent
!

parent: aParentControllerOrNil

	self trigger: #onBeforeParent.
	parent := aParentControllerOrNil.
	self trigger: #onAfterParent.
!

parentElement

	^ parentElement
!

parentElement: aHtmlElement

	self trigger: #onBeforeParentElement.
	parentElement := aHtmlElement.
	self trigger: #onAfterParentElement.
!

silentView: aHtmlElement

	view := aHtmlElement
!

view
	"Answers the DOM element who is the root of this controller's view"
	^ view
!

view: aHtmlElement

	self trigger: #onBeforeView.
	self silentView: aHtmlElement.
	self trigger: #onAfterView.
! !

!Controller methodsFor: 'actions'!

destroy

	self remove
!

hide 

	self view ifNil: [ ^ self ].
	
	self view hide
!

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

	self remove; render
!

remove
	
	self trigger: #onBeforeRemove.

	self silentRemove.
	
	self trigger: #onAfterRemove.
!

removeControllerAt: aKey 

	| controller |
	
	controller := self controllerAt: aKey ifAbsent:[ nil ].
	
	controller ifNotNil:[
		controller remove ].
		
	self controllers removeKey: aKey ifAbsent: [ nil ]
!

render
	
	self trigger: #onBeforeRender.
	self renderOn: (HTMLCanvas onJQuery: self parentElement).
	self trigger: #onAfterRender.
!

renderOn: html

	self silentRenderOn: html
!

show

	self view ifNil: [ ^ self ].
	
	self view show
!

silentRefresh

	self silentRemove; silentRender
!

silentRemove
	
	view ifNotNil:[ | exView |
		exView := view.
		exView off.
		view := nil.
		exView remove ].
!

silentRender
	
	self silentRenderOn: (HTMLCanvas onJQuery: self parentElement).
!

silentRenderOn: html
	"This is the actual render implementation in a silly default only useful to development 
	It provides quick feedback ans sets a view for easy visual identification.
	Subclasses implement the interesting real renders.
	TemplateController or BindingController are good examples of this."
	
	self silentView: (html h1: self class name) asJQuery.
! !

!Controller methodsFor: 'initialization'!

initializeControllers
	
	^ controllers := Dictionary new
! !

!Controller methodsFor: 'testing'!

hasModel
	"Answers true if this controller has a model"
	
	^ model notNil
!

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

for: aModel on: aParentControllerOrNil view: aHtmlElement
	"Answers a new instance of this controller dedicated to aModel,
	child of aParentControllerOrNil and with the already created aHtmlElement as its view."

	^ self new
		model: aModel;
		parent: aParentControllerOrNil;
		view: aHtmlElement;
		yourself
!

on: aParentControllerOrNil appendingTo: aHtmlElement
	"Answers a new instance of this controller, child of aParentControllerOrNil 
	and meant to be appended to aHtmlElement.
	Using this contructor will make the model to stay nil."

	^ self new
		parent: aParentControllerOrNil;
		parentElement: aHtmlElement;
		yourself
! !

Controller subclass: #ListController
	instanceVariableNames: 'getItemsBlock itemControllerClass newItemControllerBlock listView'
	package: 'Flow-Core'!
!ListController commentStamp!
## ListController

ListControllers know how to deal with lists of things. It needs to know how you want to create subcontrollers for its items and it needs to know how to get those items. It will also allow you to customize the subcontrollers with a callback when they are instantiated.!

!ListController methodsFor: 'accessing'!

getItemsBlock

	^ getItemsBlock ifNil: [ getItemsBlock := [ :listModel | listModel list ] ]
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

	self trigger: #onBeforeListView.
	listView := aHtmlElement.
	self trigger: #onAfterListView.
!

newItemControllerBlock

	^ newItemControllerBlock
!

newItemControllerBlock: aBlock

	newItemControllerBlock := aBlock
!

parentElement: anHtmlElement
	"Sets the parent elment for the list.
	It can be anything but, in the case of lists, the parent element usually is a <ul>
	The 'normal' thing is to treat it like an <ul> full of <li> children."
	super parentElement: anHtmlElement.
	self view: anHtmlElement
! !

!ListController methodsFor: 'actions'!

getItems
	"Answers the items using the custom getItemsBlock on its model"
	
	^ self getItemsBlock value: model
!

newItemControllerFor: anItem

	^ itemControllerClass isNil
		ifFalse:[ itemControllerClass 
					for: anItem 
					on: self 
					appendingTo: self view ] 
		ifTrue:[ self newItemControllerBlock value: anItem ]
!

observeList
	"Observe the model for changes and react to them with a refresh."

	self model when: #changed do: [ self refresh ]
!

refresh
	"Makes sure all the items in the model have its own controller.
	Nothing less and nothing more. So it will add lazily 
	the missing controllers and remove those who's model isn't present."
	
	| items |
	
	"Remove absences"
	self controllers keys 
		with: self getItems 
		do:[ :e | (self getItems anySatisfy:[ :each | each == e]) ifFalse:[
					self removeControllerAt: e ] ].
	
	"Add novelties"
	self getItems do:[ :e | | added |
		self controllerAt: e ifAbsentPut:[ 
			added := self newItemControllerFor: e ].
		added ifNotNil:[ 
			added render ] ]
! !

!ListController methodsFor: 'initialization'!

initialize

	super initialize.
	
	self when: #onAfterModel do: [ self observeList ]
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
	self parentElement: '#content' asJQuery
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

RouteableController subclass: #NotFoundController
	instanceVariableNames: ''
	package: 'Flow-Core'!

MaplessModel subclass: #Model
	instanceVariableNames: ''
	package: 'Flow-Core'!

Model subclass: #ListModel
	instanceVariableNames: ''
	package: 'Flow-Core'!

!ListModel methodsFor: 'accessing'!

first

	^ self list first
!

last

	^ self list last
!

list: aCollection

	super list: aCollection.
	
	self changed
!

size

	^ self list size
! !

!ListModel methodsFor: 'actions'!

add: anObject

	self list add: anObject.
	
	self changed
!

remove: anObject

	self list remove: anObject.
	
	self changed
!

remove: anObject ifAbsent: aBlock

	self list remove: anObject ifAbsent: aBlock.
	
	self changed
!

removeFirst

	self remove: self first
!

removeLast

	self remove: self last
! !

!ListModel methodsFor: 'testing'!

includes: anObject

	^ self list includes: anObject
!

isEmpty

	^ self list isEmpty
!

notEmpty

	^ self list notEmpty
! !

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

parameterAt: aKey
	"Answers the value found in the parameter aKey found in the current URL.
	Returns nil if there is no parameter at aKey."
	
	^  self parameterAt: aKey in: window location href
!

parameterAt: aKey in: anURL
	"Answers the value found in the parameter aKey found in anURL.
	Returns nil if there is no parameter at aKey."

	<var re = new RegExp('.*[?&]' + aKey + '=([^&]+)(&|$)');
    var match = anURL.match(re);
    return(match ? decodeURIComponent(match[1]) : nil);>
!

route
	"Answers the current route."
	
	^ self uri replace: '^#/' with: ''
!

uri

	^ window location hash
! !

!Router class methodsFor: 'actions'!

goBack
	"Makes the browser go back one page in its navigation history.
	Same effect as user pressing back button"

	window history go: -1
!

observeHash

	window onhashchange:[ self onHashChanged ]
!

refresh
	
	self trigger: #beforeRouting.
	
	active ifNotNil:[ active remove ].
	active := RouteableController routeFor: self route.

	active refresh.
	
	self trigger: #afterRouting.
! !

!Router class methodsFor: 'reactions'!

onHashChanged
	
	active ifNotNil:[ active destroy ].	
	self refresh
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

