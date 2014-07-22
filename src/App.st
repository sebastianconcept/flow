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
	
	self session api publish: Transcript
! !

