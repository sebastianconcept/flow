Smalltalk createPackage: 'App'!
FlowAppController subclass: #AppController
	instanceVariableNames: ''
	package: 'App'!
!AppController commentStamp!
##AppController

The AppController is the main/root controller of your flow-based application.!

!AppController methodsFor: 'reactions'!

onOpen
	"All is loaded, ready to rock!!"
	
	super onOpen.
	
	"Time for the app to do its own particular thigns..."
	
	"do this
	and
	that"

	self session api ws
		publish: app at: 'app';
		publish: Transcript current at: 'Transcript';
		publish: console at: 'console';
		publish: [ :sent | sent ] at: 'echo';
		publish: [ :ping | #pong ] at: 'ping';		
		publish: [ :a :b | a + b ] at: 'sum';	
		yourself
!

tellMe

	^ 'again how cool this is'
!

you

	^ self
! !

