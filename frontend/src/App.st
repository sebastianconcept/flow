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

TemplateController subclass: #Example1Controller
	instanceVariableNames: ''
	package: 'App'!
!Example1Controller commentStamp!
##AppController

The AppController is the main/root controller of your flow-based application.!

!Example1Controller methodsFor: 'actions'!

observeEvents

	(view asJQuery find: 'a#browse-example1') on: 'click' do: [ Example1Controller browse ].
	(view asJQuery find: 'a#browse-template') on: 'click' do: [ TemplateController browse ]
! !

!Example1Controller methodsFor: 'initialization'!

initialize

	super initialize.
	
	self 
		when: #onAfterView do: [ self observeEvents ];
		yourself
! !

!Example1Controller class methodsFor: 'testing'!

isValidFor: anURI
	"Answers true if this controller is the right route for anURI"
	
	^ anURI match: '^example1$'
! !

BindingController subclass: #Example2Controller
	instanceVariableNames: ''
	package: 'App'!
!Example2Controller commentStamp!
##AppController

The AppController is the main/root controller of your flow-based application.!

!Example2Controller methodsFor: 'actions'!

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

observeEvents

	(view asJQuery find: 'a#inspect-example2') on: 'click' do: [ self inspect ].
	(view asJQuery find: 'a#browse-binding') on: 'click' do: [ BindingController browse ]
!

updateCanConfirm
		
	self 
		basicAt: #canConfirm 
		put: (model firstName notNil and: [
				model firstName notEmpty ])
! !

!Example2Controller methodsFor: 'initialization'!

initialize

	super initialize.
	
	self 
		when: #onAfterView 
		do: [ 
			self updateCanConfirm.
			self ensureModal.
			self observeEvents ]
! !

!Example2Controller methodsFor: 'reactions'!

onFirstNameBlur

	self updateCanConfirm
! !

!Example2Controller class methodsFor: 'testing'!

defaultModel

	^ Flow session visitor
!

isValidFor: anURI
	"Answers true if this controller is the right route for anURI"
	
	^ anURI match: '^example2$'
! !

TemplateController subclass: #Example3Controller
	instanceVariableNames: ''
	package: 'App'!
!Example3Controller commentStamp!
##AppController

The AppController is the main/root controller of your flow-based application.!

!Example3Controller methodsFor: 'actions'!

ensureSubControllers

	self ifAbsentAt: #subexample put: [
		Example1Controller 
			for: nil "We don't need to set any particular model for it"
			on: self  "with this we are saying 'self is going to be your parent controller' (check implementors of #for:on:appendingTo:)"
			appendingTo: '#subexample-wrapper' asJQuery ].
			
	(self controllerAt: #subexample) refresh
!

observeEvents

	(view asJQuery find: 'a#inspect-this') on: 'click' do: [ self inspect ]
! !

!Example3Controller methodsFor: 'initialization'!

initialize

	super initialize.
	
	self 
		when: #onAfterView 
		do: [ 
			self ensureSubControllers.
			self observeEvents ]
! !

!Example3Controller class methodsFor: 'testing'!

isValidFor: anURI
	"Answers true if this controller is the right route for anURI"
	
	^ anURI match: '^example3$'
! !

TemplateController subclass: #Example4Controller
	instanceVariableNames: ''
	package: 'App'!
!Example4Controller commentStamp!
##AppController

The AppController is the main/root controller of your flow-based application.!

!Example4Controller methodsFor: 'accessing'!

potentialNames

	^ #(
	Einstein
	Heisemberg
	Bohr
	Schrodinger
	Plank
	Neumann
	DeBroglie
	)
! !

!Example4Controller methodsFor: 'actions'!

addThing

	^ (self controllerAt: #things) model add: (Thing new name: #( Wave Particle) atRandom; yourself)
!

ensureList
	"Makes sure we have a controller for #thigns and 
	make it fresh and visible with a refresh"
	
	self ifAbsentAt: #things put: [
		ListController 
			for: self getListModel
			on: self
			appendingTo: '#things-wrapper' asJQuery ].
	
	(self controllerAt: #things) 
		itemControllerClass: ThingRowController;
		refresh
!

getListModel
	"Answers the list model of thigns"

	| things |
	 
	"Load them from the local storage"
	things := ListModel localFindId: 'samples'.
	
	things ifNil: [ 
		"Oh, not found? then create and save some..."
		things := self newListModel.
		things do: [ :e | e localSave ].
		things localSave ].
	
	^ things
!

newListModel
	"Answers a newly created list model of thigns (Thing sample instances)."
	
	^ ListModel new
		list: (self potentialNames shuffled collect: [ :aName |  
					Thing new 
						name: aName;
						yourself]);
		yourself
!

removeThing

	^ (self controllerAt: #things) model removeLast
! !

!Example4Controller methodsFor: 'initialization'!

initialize

	super initialize.
	
	self when: #onAfterView do: [ self ensureList ]
! !

!Example4Controller class methodsFor: 'testing'!

isValidFor: anURI
	"Answers true if this controller is the right route for anURI"
	
	^ anURI match: '^example4$'
! !

TemplateController subclass: #MainController
	instanceVariableNames: ''
	package: 'App'!
!MainController commentStamp!
##AppController

The AppController is the main/root controller of your flow-based application.!

!MainController methodsFor: 'actions'!

highlightTitle

	(view asJQuery find: 'h1') effect: 'highlight'
!

observeEvents

	(view asJQuery find: 'a#inspect-main') on: 'click' do: [ self inspect ]
! !

!MainController methodsFor: 'initialization'!

initialize

	super initialize.
	
	self 
		when: #onAfterView do: [ 
			self highlightTitle.
			self observeEvents ];
		yourself
! !

!MainController class methodsFor: 'testing'!

isValidFor: anURI
	"Answers true if this controller is the right route for anURI"
	
	^ (anURI match: '^/$') or: [
	(anURI match: '^home&') or: [
	(anURI match: '^$')]]
! !

TemplateController subclass: #ThingDetailController
	instanceVariableNames: ''
	package: 'App'!

TemplateController subclass: #ThingRowController
	instanceVariableNames: ''
	package: 'App'!

