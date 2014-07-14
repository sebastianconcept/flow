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
	instanceVariableNames: 'socket uri onOpenBlock onErrorBlock'
	package: 'Flow-API'!

!WebSocketAPI methodsFor: 'accessing'!

onErrorBlock

	^ onErrorBlock ifNil:[ onErrorBlock := [ :x | x signal ] ]
!

onErrorBlock: aBlock

	onErrorBlock := aBlock
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

	self initializeSocket
!

makeSocketOn: anUri

	<return new WebSocket(anUri)>
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

initializeSocket
	
	^ socket := (self makeSocketOn: self uri)
					onopen: self onOpenBlock;
					onclose: self onCloseBlock;
					onmessage:[:anEvent | self onMessage: anEvent ];
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

onMessage: anEvent
	"This client is receiving anEvent 
	with a message comming from the server."
	
	| command |
	
	command := WebSocketCommand for: anEvent data.
	command react
!

rest

	^ rest ifNil:[ rest := RESTfulAPI new ]
!

webSocket

	^ webSocket ifNil:[ webSocket := WebSocketAPI new ]
! !

!Client methodsFor: 'actions'!

connect

	self webSocket connect
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

