Smalltalk createPackage: 'App'!
Object subclass: #App
	instanceVariableNames: ''
	package: 'App'!

!App class methodsFor: 'actions'!

publishObjects

	Flow session api ws
		publish: Flow app at: 'app';
		publish: Transcript current at: 'Transcript';
		publish: console at: 'console';
		publish: [ :sent | sent ] at: 'echo';
		publish: [ :ping | #pong ] at: 'ping';		
		publish: [ :a :b | a + b ] at: 'sum';	
		yourself
!

start

	Flow start.
	
	Flow app: self.
	Flow session visitor: AppVisitor new.
	self publishObjects.
	
	Router refresh
! !

MaplessModel subclass: #AppVisitor
	instanceVariableNames: ''
	package: 'App'!

ConfirmController subclass: #ConfirmNameController
	instanceVariableNames: ''
	package: 'App'!
!ConfirmNameController commentStamp!
##AppController

The AppController is the main/root controller of your flow-based application.!

!ConfirmNameController methodsFor: 'initialization'!

initialize

	super initialize.
	
	self 
		title: 'Please confirm';
		rejectButtonLabel: 'Mmmm, I''d have to think about it';
		acceptButtonLabel: 'Of course I can!!';
		yourself.
! !

TemplateController subclass: #HomeController
	instanceVariableNames: ''
	package: 'App'!
!HomeController commentStamp!
##AppController

The AppController is the main/root controller of your flow-based application.!

!HomeController methodsFor: 'actions'!

highlightTitle

	(view asJQuery find: 'h1') effect: 'highlight'
! !

!HomeController methodsFor: 'initialization'!

initialize

	super initialize.
	
	self 
		when: #onAfterView do: [ self highlightTitle ];
		yourself
! !

!HomeController class methodsFor: 'testing'!

isValidFor: anURI
	"Answers true if this controller is the right route for anURI"
	
	^ (anURI match: '^/$') or: [
	(anURI match: '^home&') or: [
	(anURI match: '^$')]]
! !

TemplateController subclass: #Section1Controller
	instanceVariableNames: ''
	package: 'App'!
!Section1Controller commentStamp!
##AppController

The AppController is the main/root controller of your flow-based application.!

!Section1Controller class methodsFor: 'testing'!

isValidFor: anURI
	"Answers true if this controller is the right route for anURI"
	
	^ anURI match: '^section1$'
! !

BindingController subclass: #Section2Controller
	instanceVariableNames: ''
	package: 'App'!
!Section2Controller commentStamp!
##AppController

The AppController is the main/root controller of your flow-based application.!

!Section2Controller methodsFor: 'actions'!

confirm
	"Sets a fresh message and opens the modal"

	(self controllerAt: #nameModal) 
		message: (model firstName asString,' are you sure you can handle this?');
		open
!

confirmAgain

	model firstName: ''.
	model isConfirmed: false.
	
	self  updateCanConfirm
!

ensureModal

	self ifAbsentAt: #nameModal put: [
		ConfirmNameController 
			for: Flow session visitor
			on: self
			appendingTo: '#confirmName' asJQuery ].
			
	(self controllerAt: #nameModal) 
		acceptBlock: [ 
			model isConfirmed: true.
			(self controllerAt: #nameModal) close ];
		rejectBlock: [ 
			model isConfirmed: false.
			(self controllerAt: #nameModal) close ];
		refresh
!

updateCanConfirm
		
	self 
		basicAt: #canConfirm 
		put: (model firstName notNil and: [
				model firstName notEmpty ])
! !

!Section2Controller methodsFor: 'initialization'!

initialize

	super initialize.
	
	self 
		when: #onAfterView 
		do: [ 
			self updateCanConfirm.
			self ensureModal ]
! !

!Section2Controller methodsFor: 'reactions'!

onFirstNameBlur

	self updateCanConfirm
! !

!Section2Controller class methodsFor: 'testing'!

defaultModel

	^ Flow session visitor
!

isValidFor: anURI
	"Answers true if this controller is the right route for anURI"
	
	^ anURI match: 'section2'
! !

