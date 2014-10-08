Smalltalk createPackage: 'Flow-Templates-Tests'!
BindingController subclass: #StuffController
	instanceVariableNames: ''
	package: 'Flow-Templates-Tests'!
!StuffController commentStamp!
StuffController is a Controller composed by ThingControllers that are created based in the model's content.

Stuff has a collection of Thing(s)!

!StuffController methodsFor: 'accessing'!

inspiration
	"Answers a collection to inspire a name for something."
	
	^ #(
	so 
	many 
	cool 
	things 
	here 
	wow 
	great 
 	sweet 
	groovy 
	)
! !

!StuffController methodsFor: 'actions'!

addThing
	
	self model things add: self newThing.
	self model trigger: #changed
!

newThing

	^ Thing new
		name: self inspiration atRandom;
		yourself
!

refreshList
	"Makes sure all the Things in the model have its own controller.
	Nothing less and nothing more."
	
	| items |
	
	"Remove absences"
	self controllers keys 
		with: self model things 
		do:[ :e | (self model things includes: e) ifFalse:[
					self removeControllerAt: e ] ].
	
	self model things do:[ :e | | added |
		self controllerAt: e ifAbsentPut:[ 
			added := ThingController 
				for: e 
				on: self 
				appendingTo: '.things' asJQuery ].
		added ifNotNil:[ 
			added render ] ]
!

removeThing
	
	self model things removeLast.
	self model trigger: #changed
! !

!StuffController methodsFor: 'initialization'!

initialize

	super initialize.
! !

!StuffController methodsFor: 'reactions'!

onAfterModel
	"The model of this controller just have been set."

	super onAfterModel.
	
	self model when: #changed do:[ self onStuffChanged ].

	self hasView ifTrue:[
		self onStuffChanged ].
		
	"Customize the model"
	self model name: 'Hey... this stuff is new!!'.
	"Silently add something so by default it isn't empty."
	self model things add: self newThing; add: self newThing.
!

onStuffChanged

	self refreshList
!

onTemplate: data

	super onTemplate: data.
	
	self onStuffChanged
! !

!StuffController class methodsFor: 'accessing'!

defaultModel

	^ Stuff new
!

viewPath
	"Returns the path where the template of the view should be found"
	
	^ 'bower_components/text/text!!views/demo/'
! !

BindingController subclass: #StuffUsingEachController
	instanceVariableNames: ''
	package: 'Flow-Templates-Tests'!
!StuffUsingEachController commentStamp!
StuffController is a Controller composed by ThingControllers that are created based in the model's content.

Stuff has a collection of Thing(s)!

!StuffUsingEachController methodsFor: 'accessing'!

inspiration
	"Answers a collection to inspire a name for something."
	
	^ #(
	so 
	many 
	cool 
	things 
	here 
	wow 
	great 
 	sweet 
	groovy 
	)
! !

!StuffUsingEachController methodsFor: 'actions'!

addThing
	
	self model things add: self newThing
!

newStuff

	^ Stuff new
		name: 'Hey... this stuff is new!!';
		yourself
!

newThing

	^ Thing new
		name: self inspiration atRandom;
		yourself
!

removeThing
	
	self model things removeLast
! !

!StuffUsingEachController methodsFor: 'initialization'!

initialize

	super initialize.
	
	self model: self newStuff.
	self addThing; addThing
! !

!StuffUsingEachController class methodsFor: 'accessing'!

defaultModel

	^ Stuff new
!

viewPath
	"Returns the path where the template of the view should be found"
	
	^ 'bower_components/text/text!!views/demo/'
! !

StuffUsingEachController subclass: #StuffComposedUsingEachController
	instanceVariableNames: ''
	package: 'Flow-Templates-Tests'!

!StuffComposedUsingEachController methodsFor: 'actions'!

getConfiguration

	^ super getConfiguration
		at: #adapter put: ( #{
 		   		#subscribe -> [ :obj :keypath :callback | 
					obj on: 'change:',keypath do: callback].
    			#unsubscribe -> [ :obj :keypath :callback | obj off: 'change:',keypath do: callback].
    			#read -> [ :obj :keypath | 
					obj get keypath ].
    			#publish -> [ :obj :keypath :value | obj set: keypath val: value ]});
		yourself
! !

BindingController subclass: #ThingController
	instanceVariableNames: ''
	package: 'Flow-Templates-Tests'!

!ThingController class methodsFor: 'accessing'!

viewPath
	"Returns the path where the template of the view should be found"
	
	^ 'bower_components/text/text!!views/demo/'
! !

