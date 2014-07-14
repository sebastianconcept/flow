Smalltalk createPackage: 'Flow-Tests'!
TestCase subclass: #FlowTest
	instanceVariableNames: ''
	package: 'Flow-Tests'!

!FlowTest methodsFor: 'tests'!

testConnect

	self shouldnt:[
		window app session client webSocket connect ] raise: Error.
	
	self assert: window app session client webSocket socket notNil
! !

