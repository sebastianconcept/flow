Smalltalk createPackage: 'Flow-API'!
Object subclass: #API
	instanceVariableNames: ''
	package: 'Flow-API'!

API subclass: #RESTfulAPI
	instanceVariableNames: ''
	package: 'Flow-API'!

!RESTfulAPI methodsFor: 'actions'!

delete: anURLString do: aBlock onError: errorBlock

	self trigger: 'aboutToAJAX'.

	jQuery ajax: anURLString options: #{
		'type' -> 'DELETE'.
		'contentType' -> 'text/json'.
		'complete' -> [:res |
			self trigger: 'afterAJAX'.
			res status = 200
				ifTrue: [aBlock value: res responseText]
				ifFalse: [errorBlock value: res]]
	}
!

get: anURLString do: aBlock onError: errorBlock

	self trigger: 'aboutToAJAX'.

	jQuery ajax: anURLString options: #{
		'type' -> 'GET'.
		'contentType' -> 'text/json'.
		'complete' -> [:res |
			self trigger: 'afterAJAX'.
			res status = 200
				ifTrue: [aBlock value: res responseText]
				ifFalse: [errorBlock value: res responseText]]
	}
!

post: anURLString data: aDataString do: aBlock onError: errorBlock

	self trigger: 'aboutToAJAX'.

	jQuery ajax: anURLString options: #{
		'type' -> 'POST'.
		'contentType' -> 'text/json'.
		'data' -> aDataString.
		'complete' -> [:res |
			self trigger: 'afterAJAX'.
			res status = 200
				ifTrue: [aBlock value: res responseText]
				ifFalse: [errorBlock value: res]]
	}
!

put: anURLString data: aDataString do: aBlock onError: errorBlock

	self trigger: 'aboutToAJAX'.

	jQuery ajax: anURLString options: #{
		'type' -> 'PUT'.
		'contentType' -> 'text/json'.
		'data' -> aDataString.
		'complete' -> [:res |
			self trigger: 'afterAJAX'.
			res status = 200
				ifTrue: [aBlock value: res responseText]
				ifFalse: [errorBlock value: res]]
	}
! !

API subclass: #WebSocketAPI
	instanceVariableNames: 'socket uri onOpenBlock onCloseBlock onMessageBlock onErrorBlock'
	package: 'Flow-API'!

!WebSocketAPI methodsFor: 'accessing'!

onCloseBlock

	^ onCloseBlock ifNil:[ onCloseBlock := [ self reset ] ]
!

onCloseBlock: aBlock

	onCloseBlock := aBlock
!

onErrorBlock

	^ onErrorBlock ifNil:[ onErrorBlock := [ :x | x signal ] ]
!

onErrorBlock: aBlock

	onErrorBlock := aBlock
!

onMessage: anEvent

	self trigger: 'messageReceived:' with: anEvent
!

onMessageBlock

	^ onMessageBlock ifNil:[ onMessageBlock := [:anEvent | self onMessage: anEvent ] ]
!

onMessageBlock: aBlock

	onMessageBlock := aBlock
!

onOpenBlock

	^ onOpenBlock ifNil:[ onOpenBlock := [ self trigger: 'webSocketConnected' ] ]
!

onOpenBlock: aBlock

	onOpenBlock := aBlock
!

socket

	^ socket ifNil:[ self initializeSocket ]
!

uri

	^ uri ifNil:[ self initializeURI ]
!

uri: aString

	uri := aString
! !

!WebSocketAPI methodsFor: 'actions'!

connect

	self initializeSocket.
!

disconnect

	socket ifNotNil:[
		socket close.
		self reset]
!

makeSocketOn: anUri

	<return new WebSocket(anUri)>
!

reset
		
	socket := nil
!

send: aString

	^ self socket send: aString
!

send: aString onError: aBlock

	^ [ self socket send: aString ]
		on: Error
		do:[ :x | aBlock value: x ]
! !

!WebSocketAPI methodsFor: 'initialization'!

initialize

	super initialize.
	
	window onbeforeunload:[
		self reset ]
!

initializeSocket
	
	^ socket := (self makeSocketOn: self uri)
					onopen: self onOpenBlock;
					onclose: self onCloseBlock;
					onmessage: self onMessageBlock;
					onerror: self onErrorBlock;
					yourself
!

initializeURI

	^ uri := 'ws://',window location hostname,':21004/'
! !

Object subclass: #Client
	instanceVariableNames: 'rest webSocket'
	package: 'Flow-API'!

!Client methodsFor: 'accessing'!

rest

	^ rest ifNil:[ rest := RESTfulAPI new ]
!

webSocket

	^ webSocket ifNil:[ self initializeWebSocket ]
! !

!Client methodsFor: 'actions'!

connect

	self webSocket connect
! !

!Client methodsFor: 'initialization'!

initializeWebSocket 

	^ webSocket := WebSocketAPI new
					when: 'messageReceived:' do:[ :ev | self onMessage: ev ];
					yourself
! !

!Client methodsFor: 'reactions'!

onMessage: anEvent
	"This client is receiving anEvent 
	with a message comming from the server."
	
	| command |
	
	command := WebSocketCommand for: anEvent data.
	command react
! !

Mapless subclass: #WebSocketCommand
	instanceVariableNames: ''
	package: 'Flow-API'!
!WebSocketCommand commentStamp!
A WebSocketCommand is an abstraction.

Subclasses are concrete objects that easily travel 

1. from the frontend to the backend and/or 

2. come from the backend to the frontend.

They have the concrete knowledge of how to react or who to delegate behaviour.

They also carry any information necessary to achieve some reaction at their destination.

Note: they are Mapless only as convenience for traveling over the wire. You can if you like to but, originally, they are not meant to be persisted.!

!WebSocketCommand methodsFor: 'actions'!

processOn: aClient
	"This command has arrived, time to process it."
	
	self subclassResponsibility
! !

WebSocketCommand subclass: #Echo
	instanceVariableNames: ''
	package: 'Flow-API'!
!Echo commentStamp!
##WebSocketEcho

Is a command that will send content to the server and the server will send back!

!Echo class methodsFor: 'actions'!

for: aString

	^ self new
		content: aString;
		yourself
! !

WebSocketCommand subclass: #Ping
	instanceVariableNames: ''
	package: 'Flow-API'!

!Ping methodsFor: 'actions'!

processOn: aClient
	"This command has arrived, time to process it."
	
	self halt
! !

