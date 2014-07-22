Smalltalk createPackage: 'Flow-API'!
Object subclass: #APIClient
	instanceVariableNames: 'rest webSocket published'
	package: 'Flow-API'!
!APIClient commentStamp!
## APIClient

This is a client to the backend API

Provides access to the expected REST and WebSocket API at the backend side. 

This client also has knows which objects are being published locally so they can be used remotely!

!APIClient methodsFor: 'accessing'!

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

!APIClient methodsFor: 'actions'!

connect

	self webSocket connect
!

localAnswerOn: aWebSocketCommand

	self webSocket localAnswerOn: aWebSocketCommand
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

remoteAnswerOn: aWebSocketCommand

	self webSocket remoteAnswerOn: aWebSocketCommand
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

!APIClient methodsFor: 'initialization'!

initializeWebSocket 

	^ webSocket := WebSocketAPI new
					when: 'messageReceived:' do:[ :ev :args | self onMessage: ev with: args ];
					yourself
! !

!APIClient methodsFor: 'reactions'!

onMessage: anEvent with: aWebSocketEvent 
	"This client is receiving anEvent 
	with a message comming from the server."
	
	| command |
	command := WebSocketCommand for: aWebSocketEvent.
	command ifNil:[ command := self newBadCommandOn: aWebSocketEvent ].
	command receivedOn: self
! !

Error subclass: #APIError
	instanceVariableNames: ''
	package: 'Flow-API'!
!APIError commentStamp!
## APIError

This exception is used when flow finds issues while communicating with the backend!

Object subclass: #APIStrategy
	instanceVariableNames: ''
	package: 'Flow-API'!
!APIStrategy commentStamp!
## APIStrategy is an abstraction

See concrete subclasses of API for concrete backend interaction!

APIStrategy subclass: #RESTfulAPI
	instanceVariableNames: ''
	package: 'Flow-API'!
!RESTfulAPI commentStamp!
## RESTfulAPI

This API follows the typical REST on http style!

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

APIStrategy subclass: #WebSocketAPI
	instanceVariableNames: 'socket uri onOpenBlock onCloseBlock onMessageBlock onErrorBlock counter localAnswers'
	package: 'Flow-API'!
!WebSocketAPI commentStamp!
## WebSocketAPI

This API is WebSockets based (so is full-duplex)!

!WebSocketAPI methodsFor: 'accessing'!

counter
	"Answers the counter used in the ids the commands (instead of less compact UUIDs)"

	^ counter ifNil:[ counter := 1 ]
!

localAnswers
	"Returns the dictionary of callbacks that are waiting for its commands' answer.
	The convention is to use the ids provided by the counter in the keys
	and the callbacks in the values."
	
	^ localAnswers ifNil:[ localAnswers := Dictionary new ]
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

uri

	^ uri ifNil:[ self initializeURI ]
!

uri: aString

	uri := aString
! !

!WebSocketAPI methodsFor: 'actions'!

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

localAnswerOn: aWebSocketCommand
	"Executes the callback waiting for this command's answer.
	It's done by evaluating the callback waiting for aWebSocketCommand.
	It also removes it from the dictionary because is not pending for it anymore."
	
	(self localAnswers 
		at: aWebSocketCommand fId
		ifAbsent:[ ^ nil ]) value: aWebSocketCommand.

	self localAnswers 
		removeKey: aWebSocketCommand fId
		ifAbsent:[ ]
!

newWebSocketOn: anUri

	<return new WebSocket(anUri)>
!

nextId
	"Increments the counter and answers the value."
	
	^ counter := self counter + 1
!

remoteAnswerOn: aWebSocketCommand
	"Sends aWebSocketCommand to the other end."
	
	self sendCommand: aWebSocketCommand
!

remoteAnswerOn: aWebSocketCommand onError: aBlock
	"Sends aWebSocketCommand to the other end."
	
	self sendCommand: aWebSocketCommand onError: aBlock
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

sendCommand: aWebSocketCommand
	"Sends aWebSocketCommand to the other side of the wire.
	Will throw an APIError if an exception happens"
	
	^ self 
		sendCommand: aWebSocketCommand
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

sendCommand: aWebSocketCommand do: anAnswerBlock onError: aBlock
	"Sends aWebSocketCommand to the other side of the wire.
	Registers anAnswerBlock to be evaluated later when the answer arrives.
	Evaluates aBlock if there is an exception while doing it."
	
	self nextId.
	"Marks the commandwith a frontend's id."
	aWebSocketCommand fId: self counter.
	
	self localAnswers at: self counter put: anAnswerBlock.

	^ self 
		send: aWebSocketCommand asJSONString
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

Mapless subclass: #WebSocketCommand
	instanceVariableNames: ''
	package: 'Flow-API'!
!WebSocketCommand commentStamp!
## A WebSocketCommand is an abstraction.

Subclasses are concrete objects that easily travel 

1. from the frontend to the backend and/or 

2. come from the backend to the frontend.

They have the concrete knowledge of how to react or who to delegate behaviour.

They also carry any information necessary to achieve some reaction at their destination.

It's a convention that commands without @answer are yet to be executed, and all executed commands have an answer set (they're an exception if they need to)

Note: they are Mapless only as convenience for traveling over the wire. You can if you like to but, originally, they are not meant to be persisted.!

!WebSocketCommand methodsFor: 'actions'!

executeOn: anAPIClient
	"Executes this command comming from anAPIClient
	and performs the remote answer."
	
	[ self
		processOn: anAPIClient;
		remoteAnswerOn: anAPIClient ]
			on: Error 
			do:[ :x |
				self
					isException: true;
					answer: x asString;
					remoteAnswerOn: anAPIClient ]
!

localAnswerOn:  anAPIClient
	"Tells the API to perform whatever is pending
	in the local answer of this command"
	
	anAPIClient localAnswerOn: self
!

processOn: anAPIClient
	"Executes this command comming from anAPIClient
	loading the answer in it."
	
	self subclassResponsibility
!

receivedOn: anAPIClient
	"This command has been received by anAPIClient.
	Time to react depending in this being an answer or not..."
	
	self hasAnswer 
		ifTrue:[ 
			"Is backend's answer of a previous command"
			self onAnsweredBy: anAPIClient ]
		ifFalse:[ 
			"Is the backend taking initiative"
			self onCommandFrom: anAPIClient ]
!

remoteAnswerOn:  anAPIClient
	"Tells the API to respond to the backend 
	with this command (assumes it's loading the answer already)"
	
	anAPIClient remoteAnswerOn: self
! !

!WebSocketCommand methodsFor: 'reactions'!

onAnsweredBy: anAPIClient
	"This command arrived with an answer"

	self localAnswerOn: anAPIClient
!

onCommandFrom: anAPIClient
	"This command arrived from anAPIClient, time to execute and answer it"
	
	self executeOn: anAPIClient
! !

!WebSocketCommand methodsFor: 'testing'!

hasAnswer
	"Answers true if this command has any answer.
	Note: having an answer means it's a response to some command previously sent"
	^ self answer notNil
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
!BadCommand commentStamp!
## BadCommand 

This command useful when there is trouble during the reception/processing of a remote command.

Meant more for production than for development.!

WebSocketCommand subclass: #Echo
	instanceVariableNames: ''
	package: 'Flow-API'!
!Echo commentStamp!
##Echo

Is a command that will send content to the server and the server will send back (in @echoes)!

!Echo class methodsFor: 'actions'!

for: aString

	^ self new
		content: aString;
		yourself
! !

WebSocketCommand subclass: #Ping
	instanceVariableNames: ''
	package: 'Flow-API'!
!Ping commentStamp!
##Ping

Is a command that, when all goes smooth, will receive a Date set by the server @pongOn!

WebSocketCommand subclass: #RemoteMessageSend
	instanceVariableNames: ''
	package: 'Flow-API'!
!RemoteMessageSend commentStamp!
## RemoteMessageSend

Is a command to send a message to a remote object published in the backend.

Or..

The command received from the backend to send a message to an object published here in the frontend.

RemoteMessageSends have @answer set before responding to the sender side and if an exception happens they set @isException in true and a print of the exception.!

!RemoteMessageSend methodsFor: 'actions'!

getReceiverOn: anAPIClient
	"Returns the published at anAPIClient corresponding to the receiver of this message send."

	^ anAPIClient published 
		at:	self receiver
		ifAbsent:[ nil ]
!

processOn: anAPIClient
	"Executes this command comming from anAPIClient
	loading the answer in it."
	
	self answer: ((self getReceiverOn: anAPIClient)
					perform: self selector
					withArguments: self arguments) asRemote
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

