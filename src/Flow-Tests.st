Smalltalk createPackage: 'Flow-Tests'!
TestCase subclass: #FlowTest
	instanceVariableNames: ''
	package: 'Flow-Tests'!

!FlowTest methodsFor: 'tests'!

testConnect

	self shouldnt:[
		window app session api webSocket connect ] raise: Error.
	
	["The >>valueWithTimeout: is there because connecting a ws takes time" 
	self assert: window app session api webSocket hasSocket.
	self assert: window app session api webSocket isConnected.

	self shouldnt:[
		window app session api webSocket connect ] raise: Error.

	self assert: window app session api webSocket socket == window app session api webSocket socket.
	self assert: window app session api webSocket isConnected ] valueWithTimeout: 1000
!

testEcho

	| echo |

	self assert: window app session api webSocket hasSocket.
	self assert: window app session api webSocket isConnected.

	echo := Echo for: 'Do you follow?'.
	
	self assert: echo content = 'Do you follow?'.
	self assert: echo echoes isNil.
	
	window app session api webSocket 
		sendCommand: echo
		do:[ :ans | self assert: ans echoes = 'Do you follow?' ]
!

testPing

	| ping |

	self assert: window app session api webSocket hasSocket.
	self assert: window app session api webSocket isConnected.

	ping := Ping new.
	
	self assert: ping pongOn isNil.
	
	window app session api webSocket 
		sendCommand: ping
		do:[ :ans | self assert: ans pongOn notNil ]
! !

