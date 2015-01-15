Smalltalk createPackage: 'App'!
Object subclass: #App
	instanceVariableNames: ''
	package: 'App'!

App class instanceVariableNames: 'main'!

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

setupRouter

	Router
!

setupRoutes

	Router rlite 
		add: '' do: [ :r | Router set: '#/home' ];
		add: '#' do: [ :r | Router set: '#/home' ];
		add: '#/' do: [ :r | Router set: '#/home' ];
		add: '/' do: [ :r | Router set: '#/home' ];
		
		add: 'home' do: [ :r | App main reset ];
		add: 'example' do: [ :r | App main example show ];
		add: 'signout' do: [ :r | console log: 'sign out requested' ];
		yourself
!

start
	
	Flow app: self.

	self publishObjects.
	
	Router processHash
! !

!App class methodsFor: 'initialization'!

initialize

	self setupRouter
! !

TemplateController subclass: #ExampleController
	instanceVariableNames: ''
	package: 'App'!

TemplateController subclass: #MainController
	instanceVariableNames: ''
	package: 'App'!
!MainController commentStamp!
##AppController

The AppController is the main/root controller of your flow-based application.!

!MainController methodsFor: 'accessing'!

example

	^ self ifAbsentAt: #example put: [
		ExampleController 
			for: model
			on: self
			appendingTo: '#example-wrapper' asJQuery ]
! !

!MainController methodsFor: 'initialization'!

initialize

	super initialize.
	
	self 
		when: #onAfterView do: [ self example show ];
		yourself
! !

