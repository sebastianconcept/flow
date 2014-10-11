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

	"console log: self getConfiguration."
	
	self rivets configure: self getConfiguration
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
		self._onBinded_event_handler_view_( target, event, binding );
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

onBinded: aTarget event: anEvent handler: aHandler view: aBindedView
	"The custom handler to bind on this controller is reacting"
	
	"no-op"
!

onTemplate: data
	"Receives data once requirejs have received it from the server."

	super onTemplate: data.	
	
	self configure.

	self bind.
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

configure
"Transcript open.
	self getConfiguration inspect."
	
	| previousBinder |
	
	super configure.
	
	previousBinder := (self rivets binders at: 'each-*') at: #bind.
	
	(self rivets binders at: 'each-*')
		at: #bind
		put: (self getBinderUsing: previousBinder)
!

getBinder
	| previous |
	
	previous := (self rivets binders at: 'each-*') at: #bind.
	^ self getBinderUsing: previous
!

getBinderUsing: aBinder

	<return function (el){
		console.info(el);
		aBinder.call( this, el );
		}>
!

getRoutine
	"Answers the custom routine for the 'each-*' binder so we
	get the newly created views."

	<return function(el, collection){
		console.info('on geRoutine');
		console.log( el, collection );
		require('bower/rivets/dist/rivets').binders['each-*'].routine
	}>
!

newItemControllerFor: anItem
self halt.
	^ itemControllerClass isNil
		ifFalse:[ itemControllerClass 
					for: anItem 
					on: self 
					appendingTo: self view ] 
		ifTrue:[ self newItemControllerBlock value: anItem ]
!

renderOn: html

	self configure.

	self bind.
! !

!IteratedController methodsFor: 'reactions'!

onBinded: aTarget event: anEvent handler: aHandler view: aBindedView
	"The custom handler to bind on this controller is reacting"

	super onBinded: aTarget event: anEvent handler: aHandler view: aBindedView.
!

onRoutine: anElement value: aValue

	<console.log( anElement, aValue );
	require('bower/rivets/dist/rivets').binders['iterated-controller'].routine.call( 
		this 
		, anElement
		, function(e){ aValue.call( this, e ) } )>
! !

