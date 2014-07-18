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
	instanceVariableNames: 'socket uri onOpenBlock onCloseBlock onMessageBlock onErrorBlock counter toAnswer'
	package: 'Flow-API'!

!WebSocketAPI methodsFor: 'accessing'!

counter
	"Answers the counter used in the ids the commands (instead of less compact UUIDs)"

	^ counter ifNil:[ counter := 1 ]
!

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

toAnswer
	"Answers the dictionary of commands pending for an answer.
	The convention is to use the ids provided by the counte as keys
	and the callbacks on the values."
	
	^ toAnswer ifNil:[ toAnswer := Dictionary new ]
!

uri

	^ uri ifNil:[ self initializeURI ]
!

uri: aString

	uri := aString
! !

!WebSocketAPI methodsFor: 'actions'!

answerOn: aWebSocketCommand
	"Evluates the callback waiting for aWebSocketCommand using it
	and removes it from the dictionary because 
	is not pending for it anymore."
	
	(self toAnswer 
		at: aWebSocketCommand id
		ifAbsent:[ ^ nil ]) value: aWebSocketCommand.

	self toAnswer 
		removeKey: aWebSocketCommand id
		ifAbsent:[ ]
!

connect
	"Makes a connection.
	Remarks:
	1. if connected already, it will do nothing
	2. it will disconnect if there is an unconnected socket."

	self isConnected ifTrue:[ ^self ].
	
	self disconnect.
	self initializeSocket.
!

disconnect
	"Disconnects the web socket.
	No fail if there is none"
	
	self hasSocket ifTrue:[
		socket close.
		self reset]
!

newWebSocketOn: anUri

	<return new WebSocket(anUri)>
!

nextId
	"Increments the counter and answers the value."
	
	^ counter := self counter + 1
!

reset
		
	socket := nil
!

send: aString
	"Sends aString to the other side of the wire."
	
	^ self  
		send: aString
		onError:[ :x | APIError signal: x asString ]
!

send: aString onError: aBlock
	"Sends aString to the other side of the wire.
	Evaluates aBlock if an exception happnes."

	[ self socket send: aString ]
		on: Error
		do:[ :x | aBlock value: x ]
!

sendCommand: aCommand
	"Sends aCommand to the other side of the wire.
	Will throw an APIError if an exception happens"
	
	^ self 
		sendCommand: aCommand
		onError:[ :x | APIError signal: x asString ]
!

sendCommand: aCommand do: aBlock
	"Sends aCommand to the other side of the wire.
	Evaluates aBlock when the answer arrives."
	
	^ self 
		sendCommand: aCommand 
		do: aBlock
		onError: [ :x | 
			APIError signal: x asString ]
!

sendCommand: aCommand do: anAnswerBlock onError: aBlock
	"Sends aCommand to the other side of the wire.
	Registers anAnswerBlock to be evaluated later when the answer arrives.
	Evaluates aBlock if there is an exception while doing it."
	
	self nextId.
	aCommand id: self counter.
	self toAnswer at: self counter put: anAnswerBlock.

	^ self 
		send: aCommand asJSONString
		onError: aBlock
!

sendCommand: aCommand onError: aBlock
	"Sends aCommand to the other side of the wire.
	Evaluates aBlock if there is an exception while doing it."
	
	^ self 
		sendCommand: aCommand 
		do: [ "ignoring answer" ] 
		onError: aBlock
! !

!WebSocketAPI methodsFor: 'initialization'!

initialize

	super initialize.
	
	window onbeforeunload:[
		self reset ]
!

initializeSocket
	
	^ socket := (self newWebSocketOn: self uri)
					onopen: self onOpenBlock;
					onclose: self onCloseBlock;
					onmessage: self onMessageBlock;
					onerror: self onErrorBlock;
					yourself
!

initializeURI

	^ uri := 'ws://',window location hostname,':21004/'
! !

!WebSocketAPI methodsFor: 'reactions'!

onMessage: anEvent

	self trigger: 'messageReceived:' with: anEvent
! !

!WebSocketAPI methodsFor: 'testing'!

hasNotSocket
	^ socket = nil
!

hasSocket
	^ self hasNotSocket not
!

isConnected

	^ self hasSocket and:[
	socket readyState = 1 ]
!

isDisconnected

	^ self hasSocket or:[
	socket readyState ~= 1 ]
! !

Error subclass: #APIError
	instanceVariableNames: ''
	package: 'Flow-API'!

Object subclass: #Client
	instanceVariableNames: 'rest webSocket published'
	package: 'Flow-API'!

!Client methodsFor: 'accessing'!

published
	"Answers the dictionary holding the published objects 
	in 'this smalltalk' environment.
	Keys can be the instance's hash, a Mapless UUID, etc.
	Values are the instances receiving messages from remote."
	^ published ifNil:[ published := Dictionary new ]
!

rest

	^ rest ifNil:[ rest := RESTfulAPI new ]
!

webSocket

	^ webSocket ifNil:[ self initializeWebSocket ]
! !

!Client methodsFor: 'actions'!

connect

	self webSocket connect
!

newBadCommandOn: aWebSocketEvent  
	"Answers a new instance of BadCommand based on aWebSocketEvent."

	^ BadCommand new
		problematic: aWebSocketEvent data;
		yourself
!

publish: anObject 
	"Holds anObject among those exposed to receive remote messages."
	^ self publish: anObject at: anObject id
!

publish: anObject at: anId
	"Holds anObject among those exposed to receive remote messages."
	^ self published at: anId put: anObject
!

send: aSelector to: aRemoteObjectId
	"Sends the message to the remote object and
	evaluates aBlock when the answer arrives."
	
	self send: aSelector 
		withAll: Array new
		to: aRemoteObjectId 
		do: [ :ans | "ignoring it..." ]
		onError: [ :x | APIError signal: x asString ]
!

send: aSelector to: aRemoteObjectId do: anAnswerBlock
	"Sends the message to the remote object and
	evaluates aBlock when the answer arrives."
	
	self send: aSelector 
		withAll: Array new
		to: aRemoteObjectId 
		do: anAnswerBlock 
		onError: [ :x | APIError signal: x asString ]
!

send: aSelector with: anArgument to: aRemoteObjectId
	"Sends the message to the remote object and
	evaluates aBlock when the answer arrives."
	
	self send: aSelector 
		withAll: (Array with: anArgument)
		to: aRemoteObjectId 
		do: [ :ans | "ignoring it..." ]
		onError: [ :x | APIError signal: x asString ]
!

send: aSelector with: anArgument to: aRemoteObjectId do: anAnswerBlock
	"Sends the message with an argument to the remote object and
	evaluates aBlock when the answer arrives."
	
	self send: aSelector 
		withAll: (Array with: anArgument) 
		to: aRemoteObjectId 
		do: anAnswerBlock 
		onError: [ :x | APIError signal: x asString ]
!

send: aSelector withAll: someArguments to: aRemoteObjectId do: anAnswerBlock
	"Sends the message with arguments to the remote object and
	evaluates aBlock when the answer arrives."
	
	self send: aSelector 
		withAll: someArguments 
		to: aRemoteObjectId 
		do: anAnswerBlock 
		onError: [ :x | APIError signal: x asString ]
!

send: aSelector withAll: someArguments to: aRemoteObjectId do: anAnswerBlock onError: anErrorBlock
	"Sends the message with arguments to the remote object and
	evaluates anAnswerBlock when the answer arrives."
	
	self webSocket 
		sendCommand: (RemoteMessageSend to: aRemoteObjectId send: aSelector withAll: someArguments)
		do: anAnswerBlock
		onError: anErrorBlock
! !

!Client methodsFor: 'initialization'!

initializeWebSocket 

	^ webSocket := WebSocketAPI new
					when: 'messageReceived:' do:[ :ev :args | self onMessage: ev with: args ];
					yourself
! !

!Client methodsFor: 'reactions'!

onMessage: anEvent with: aWebSocketEvent 
	"This client is receiving anEvent 
	with a message comming from the server."
	
	| command |
	command := WebSocketCommand for: aWebSocketEvent.

	command ifNil:[ command := self newBadCommandOn: aWebSocketEvent ].
	command receivedOn: self
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

answerOn:  aClient
	"Answers the API callback waiting for this command's answer."
	
	aClient webSocket answerOn: self
!

receivedOn: aClient
	"This command generated somewhere was received in this end, time to react to it."
	
	self answerOn: aClient
! !

!WebSocketCommand class methodsFor: 'actions'!

for: anEvent
	"Answers a new instance of a command corresponding to
	the message comming in anEvent or nil."

	| parsed |

	[ parsed := Mapless fromJSONString: anEvent data ]
		on: Error
		do:[ :x | parsed := nil ].
	^ parsed
! !

WebSocketCommand subclass: #BadCommand
	instanceVariableNames: ''
	package: 'Flow-API'!

!BadCommand methodsFor: 'actions'!

receivedOn: aClient
	"This command generated somewhere was received in this end, time to react to it."

	super answerOn: aClient.

	APIError signal: self asJSONString
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

WebSocketCommand subclass: #RemoteMessageSend
	instanceVariableNames: ''
	package: 'Flow-API'!

!RemoteMessageSend methodsFor: 'actions'!

receivedOn: aClient
	"This command generated somewhere was received in this end, time to react to it."
				
	self answerOn: aClient.
	
	(self isException notNil and:[
	self isException ]) ifTrue:[ console error: self answer ]
! !

!RemoteMessageSend class methodsFor: 'actions'!

to: aReceiverId send: aSelector withAll: someArguments
	"Answers a new instance of a RemoteMessageSend so it's
	ready to be sent to the remote object reachable with aReceiverId
	with the message aSelector with someArguments."
	
	^ self new
		receiverId: aReceiverId;
		selector: aSelector;
		arguments: someArguments asArray;
		yourself
! !

