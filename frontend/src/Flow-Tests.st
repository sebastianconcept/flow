Smalltalk createPackage: 'Flow-Tests'!
TestCase subclass: #FlowTest
	instanceVariableNames: ''
	package: 'Flow-Tests'!

!FlowTest methodsFor: 'tests'!

testConnect

	self shouldnt:[
		window app session api ws connect ] raise: Error.
	
	["The >>valueWithTimeout: is there because connecting a ws takes time" 
	self assert: window app session api ws hasSocket.
	self assert: window app session api ws isConnected.

	self shouldnt:[
		window app session api ws connect ] raise: Error.

	self assert: window app session api ws socket == window app session api ws socket.
	self assert: window app session api ws isConnected ] valueWithTimeout: 1000
!

testCustomEventWithNoArgument

	| observed |

	observed := Dictionary new.
	
	observed when: #something do:[ observed at: #something put: #happen ].
	
	observed trigger: #something
	
	self assert: (observed includesKey: #something).	
	self assert: (observed at: #something) = #happen.
!

testCustomEventWithOneArgument

	| observed thing |

	observed := Dictionary new.
	thing := FlowTest new.
	
	observed when: #something: do:[ :argument | observed at: #something: put: argument ].
	
	observed trigger: #something: with: thing.
	
	self assert: (observed includesKey: #something).	
	self assert: (observed at: #something) == thing.
!

testEcho

	| echo |

	self assert: window app session api ws hasSocket.
	self assert: window app session api ws isConnected.

	echo := Echo for: 'Do you follow?'.
	
	self assert: echo content = 'Do you follow?'.
	self assert: echo answer isNil.
	
	window app session api ws 
		sendCommand: echo
		do:[ :ans | 
			self assert: ans answer notNil.
			self assert: ans answer echoes notNil.
			self assert: ans answer echoes = 'Do you follow?' ]
!

testErrorHandlingAfterResponded

	| faulty |

	self assert: window app session api ws hasSocket.
	self assert: window app session api ws isConnected.

	faulty := WillFailAfterResponded new.
	
	self assert: faulty answer isNil.
	
	window app session api ws 
		sendCommand: faulty
		do:[ :ans | 
			self assert: ans answer notNil.
			self assert: ans answer ]
		onError:[ :x | 
			self assert: (x messageText = 'Failing just after the answer') ]
!

testErrorHandlingAfterSent

	| faulty |

	self assert: window app session api ws hasSocket.
	self assert: window app session api ws isConnected.

	faulty := WillFailAfterSent new.
	
	self assert: faulty answer isNil.
	
	window app session api ws 
		sendCommand: faulty
		do:[ :ans | 
			self assert: ans answer notNil.
			self assert: ans answer ]
		onError:[ :x | self assert: (x messageText = 'Failing just after sent') ]
!

testErrorHandlingBeforeSend

	| faulty |

	self assert: window app session api ws hasSocket.
	self assert: window app session api ws isConnected.

	faulty := WillFailBeforeSend new.
	
	self assert: faulty answer isNil.
	
	
	window app session api ws 
		sendCommand: faulty
		do:[ :ans | 
			self assert: ans answer isNil ]
		onError:[ :x | self assert: (x messageText = 'Failing just before sending') ]
!

testPing

	| ping |

	self assert: window app session api ws hasSocket.
	self assert: window app session api ws isConnected.

	ping := Ping new.
	
	self assert: ping answer isNil.
	
	window app session api ws 
		sendCommand: ping
		do:[ :ans | 
			self assert: ans answer notNil.
			self assert: ans answer pongOn notNil ]
! !

TestCase subclass: #RemoteReferenceTest
	instanceVariableNames: ''
	package: 'Flow-Tests'!

!RemoteReferenceTest methodsFor: 'tests'!

testBoolean

	self deny: true asRemoteReference isRemoteReference.
	self assert: true asRemoteReference.

	self deny: false asRemoteReference isRemoteReference.
	self assert: false asRemoteReference isBoolean.
!

testClass

	self assert: Class asRemoteReference isRemoteReference.
	self assert: #() class asRemoteReference isRemoteReference.
	self assert: 42 class asRemoteReference isRemoteReference.
!

testFloat

	self deny: 4.2 asRemoteReference isRemoteReference.
	self assert: 4.2 asRemoteReference = 4.2
!

testInteger

	self deny: 42 asRemoteReference isRemoteReference.
	self assert: 42 asRemoteReference = 42
!

testMetaclass 

	self assert: Metaclass asRemoteReference isRemoteReference
!

testUndefinedObject 

	self deny: nil asRemoteReference isRemoteReference.
	self assert: nil asRemoteReference = nil
! !

WebSocketCommand subclass: #WillFailAfterResponded
	instanceVariableNames: ''
	package: 'Flow-Tests'!

!WillFailAfterResponded methodsFor: 'reactions'!

onAboutToAnswer
	"This command is about to execute its answer callback."
		
	self error: 'Failing just after the answer'
! !

WebSocketCommand subclass: #WillFailAfterSent
	instanceVariableNames: ''
	package: 'Flow-Tests'!

!WillFailAfterSent methodsFor: 'reactions'!

onAfterSent
	"This command was just sent to the remote end."
	
	self error: 'Failing just after sent'
! !

WebSocketCommand subclass: #WillFailBeforeSend
	instanceVariableNames: ''
	package: 'Flow-Tests'!

!WillFailBeforeSend methodsFor: 'reactions'!

onAboutToSend
	"This command is about to be sent to the remote end."
	
	self error: 'Failing just before sending'
! !

WebSocketCommand subclass: #WillFailRemotely
	instanceVariableNames: ''
	package: 'Flow-Tests'!

