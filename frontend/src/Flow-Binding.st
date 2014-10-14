Smalltalk createPackage: 'Flow-Binding'!
TemplateController subclass: #BindingController
	instanceVariableNames: ''
	package: 'Flow-Binding'!
!BindingController commentStamp!
## BindingController is an abstraction
The concrete subclasses of BindingController are users of the two-way data binding mechanism loaded by flow.

Note that BindingController is a subclass of TemplateController so all subclasses of it follow the convention of loading a html template from the server using the keyword of the controller as the name of the template to be found at views/!

!BindingController methodsFor: 'accessing'!

rivets
	"Answers the rivets accessor.
	http://rivetsjs.com/docs/guide/"
	
	"^ require value: 'bower/rivets/dist/rivets.min'."
	^ require value: 'bower/rivets/dist/rivets'
! !

!BindingController methodsFor: 'actions'!

asBindArgument
	"Answers the model and this controller as rivets like it for binding."

	^ #{
	'model' -> self getModelAsArgument.
	'controller' -> self
	}
!

bind
	"Tells rivets.js to bind 
	the model of this controller to its view."
	
	self rivets
		bind: self view 
		to: self asBindArgument
!

configure
	"Sets some configurations for rivets"
	| conf |
	
	conf := self getConfiguration.
	
	self rivets configure: conf
!

configureAndBind

	self configure.
	
	self bind.
!

getConfiguration

	^ HashedCollection new 
		at: #handler put: self getHandler;
		yourself
!

getHandler
	"Answers the custom handler of flow controllers for rivets.
	We need it to be call on binding.model otherwhise 
	rivets would send the html element (target of the event)
	screwing the self instance of this controller"

	<return function( target, event, binding ){
		this.call(binding.model);
	}>
!

getModelAsArgument
	"Returns the model in a way that is appropiate for binding (usable by rivets).
	By default BindingController assumes you are using mapless as controllers model
	so we send their data but subclasses might differ if they please."
	^ model data
!

unbind
	"Tells rivets.js to unbind the view."
	
	view ifNotNil:[ view unbind ]
! !

!BindingController methodsFor: 'reactions'!

onAboutToRemove

	super onAboutToRemove.
	
	self unbind
!

onTemplate: data
	"Receives data once requirejs have received it from the server."

	super onTemplate: data.	
	
	self configureAndBind.
! !

!BindingController class methodsFor: 'testing'!

isAbstract
	"Answers true if the receiver is abstract."
	
	^ self = BindingController
! !

BindingController subclass: #IteratedController
	instanceVariableNames: 'itemControllerClass newItemControllerBlock'
	package: 'Flow-Binding'!
!IteratedController commentStamp!
##IteratedController
Like ListController except it relies on rivets.js to iterate  models' presentation.

It's rivets who triggers the creation, maintenance and destruction of the (sub)controllers of this controller.

[This is how you use it in the template/view](http://rivetsjs.com/docs/reference/#each-[item])!

!IteratedController methodsFor: 'accessing'!

itemControllerClass

	^ itemControllerClass
!

itemControllerClass: aBlock

	itemControllerClass := aBlock
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
	The thing is to treat it like an <ul> full of <li> children."
	parentElement := view := anHtmlElement
! !

!IteratedController methodsFor: 'actions'!

configureAndBind

	self configure.

	self makeCustomBinder.
	
	self bind
!

getCustomBindFor: theEachBind

	<return function(el){
		this.view.onViewCreated = function(view, model){ self._onViewCreated_for_(view, model) };
		this.view.onViewDestroyed = function(view, model){ self._onViewDestroyed_for_(view, model) };
		theEachBind.call(this,el);		
		}>
!

getCustomRoutineFor: theEachRoutine

	<return function(el, collection){
		var results = theEachRoutine.call(this, el, collection);
		self._onRoutine_value_(el, collection);
		return results;
		}>
!

makeCustomBinder
	"Answers the rivetjs configuration needed for this controller to maintain subcontrollers
	in sync with the lifecicly of the elements maintained by rivets via the each-* directive"
	
	| theEachBind theEachRoutine |
	
	self rivets binders 
		at: 'iterated-*'
		put: (self rivets binders at: 'each-*').
		
	theEachBind := (self rivets binders at: 'each-*') at: #bind.
	theEachRoutine := (self rivets binders at: 'each-*') at: #routine.
	
	(self rivets binders at: 'iterated-*') at: #bind put: (self getCustomBindFor: theEachBind).
	(self rivets binders at: 'iterated-*') at: #routine put: (self getCustomRoutineFor: theEachRoutine)
!

newItemControllerOn: aRivetJSView for: aModel
console log: 'creating item controller'.
console log: aRivetJSView.

	^ itemControllerClass isNil
		ifFalse:[ itemControllerClass 
					for: aModel 
					on: self 
					appendingTo: (jQuery value: aRivetJSView els first) ] 
		ifTrue:[ self newItemControllerBlock value: aRivetJSView value: aModel ]
! !

!IteratedController methodsFor: 'reactions'!

onRoutine: anElement value: aValue
	"Rivetjs has executed the routing of the iterated-* binder."

	"no-op"
!

onViewCreated: aRivetJSView for: aModel
	"aRivetJSView was ceated for aModel by rivetsjs iterated-* and 
	we make sure we have a controller for it."
	
	self ifAbsentAt: (aModel at: '_rv')
		put:[ self newItemControllerOn: aRivetJSView for: aModel].
		
	(self controllerAt: (aModel at: '_rv')) render
!

onViewDestroyed: aView for: aModel
	"The view for aModel was revoved by rivetjs, 
	so we make sure we remove the controller as well"
	
	self removeControllerAt: (aModel at: '_rv')
! !

