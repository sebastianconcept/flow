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
! !

!StuffController methodsFor: 'initialization'!

initialize

	super initialize.
	
	self model: self newStuff.
	self addThing; addThing
! !

!StuffController class methodsFor: 'accessing'!

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
! !

!StuffUsingEachController methodsFor: 'initialization'!

initialize

	super initialize.
	
	self model: self newStuff.
	self addThing; addThing
! !

!StuffUsingEachController class methodsFor: 'accessing'!

viewPath
	"Returns the path where the template of the view should be found"
	
	^ 'bower_components/text/text!!views/demo/'
! !

BindingController subclass: #ThingController
	instanceVariableNames: ''
	package: 'Flow-Templates-Tests'!

!ThingController class methodsFor: 'accessing'!

viewPath
	"Returns the path where the template of the view should be found"
	
	^ 'bower_components/text/text!!views/demo/'
! !

