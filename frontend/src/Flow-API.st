Smalltalk createPackage: 'Flow-API'!
Object subclass: #APIClient
	instanceVariableNames: 'rest ws'
	package: 'Flow-API'!
!APIClient commentStamp!
## APIClient

This is a client to the backend API

Provides access to the expected REST and WebSocket API at the backend side. 

This client also has knows which objects are being published locally so they can be used remotely!

!APIClient methodsFor: 'accessing'!

rest

	^ rest ifNil:[ rest := RESTfulAPI new ]
!

ws

	^ ws ifNil:[ self initializeWs ]
! !

!APIClient methodsFor: 'actions'!

answerLocallyFor: aWebSocketCommand

	self ws answerLocallyFor: aWebSocketCommand
!

connect

	self ws connect
!

remoteAnswerFor: aWebSocketCommand

	self ws remoteAnswerFor: aWebSocketCommand
!

remoteExceptionFor: aWebSocketCommand
	"Answers the local error handler for aWebSocketCommand"

	^ self ws remoteExceptionFor: aWebSocketCommand
! !

!APIClient methodsFor: 'initialization'!

initializeWs
	"Initializes the WebSocket API"

	^ ws := WebSocketAPI new
				when: 'commandReceived:' do:[ :cmd | self onCommand: cmd ];
				yourself
! !

!APIClient methodsFor: 'reactions'!

onCommand: aCommand
	"There is aCommand being received here.
	It could be from a remote initiative or 
	a response of something sent from this end."
	
	"no-op"
! !

Error subclass: #APIError
	instanceVariableNames: 'subject'
	package: 'Flow-API'!
!APIError commentStamp!
## APIError

This exception is used when flow finds issues while communicating with the backend!

!APIError methodsFor: 'accessing'!

subject

	^ subject
!

subject: anObject

	subject := anObject
! !

!APIError methodsFor: 'actions'!

printOn: aStream

	super printOn: aStream.
	
	aStream nextPutAll: '(',subject asString,')'
! !

!APIError methodsFor: 'initialization'!

initializeOn: anObject

	subject := anObject.
! !

!APIError class methodsFor: 'actions'!

for: anObject

	^ self new
		initializeOn: anObject;
		yourself
! !

APIError subclass: #APIRemoteException
	instanceVariableNames: ''
	package: 'Flow-API'!

Object subclass: #APIStrategy
	instanceVariableNames: 'uri apiPath'
	package: 'Flow-API'!
!APIStrategy commentStamp!
## APIStrategy is an abstraction

See concrete subclasses of API for concrete backend interaction!

!APIStrategy methodsFor: 'accessing'!

apiPath

	^ apiPath ifNil:[ self initializeAPIPath ]
!

apiPath: aString

	apiPath := aString
!

uri

	^ uri ifNil:[ self initializeURI ]
!

uri: aString

	uri := aString
! !

!APIStrategy methodsFor: 'testing'!

isSSL
	"Answers true if all this is going over SSL."
	
	^ self class isSSL
! !

!APIStrategy class methodsFor: 'accessing'!

isSSL
	"Answers true if all this is going over SSL."
	
	^ window location protocol = 'https:'
! !

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
				ifTrue: [ aBlock value: res responseText ]
				ifFalse: [ errorBlock value: res ] ]
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
				ifTrue: [ aBlock value: res responseText ]
				ifFalse: [ errorBlock value: res responseText ] ]
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
				ifTrue: [ aBlock value: res responseText ]
				ifFalse: [ errorBlock value: res ] ]
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
				ifTrue: [ aBlock value: res responseText ]
				ifFalse: [ errorBlock value: res ] ]
	}
! !

!RESTfulAPI methodsFor: 'initialization'!

initializeAPIPath

	^ apiPath := 'api/1.0'
!

initializeURI

	^ window location hostname = 'localhost' 
		ifTrue:[ uri := self class protocol,'//',window location hostname,':',self class port asString,'/', self apiPath]
		ifFalse:[ uri := self class protocol,'//',window location hostname, '/', self apiPath]
! !

!RESTfulAPI class methodsFor: 'accessing'!

protocol

	^ self isSSL
		ifTrue:[ 'https:' ]
		ifFalse:[ 'http:' ]
! !

APIStrategy subclass: #WebSocketAPI
	instanceVariableNames: 'socket onOpenBlock onCloseBlock onMessageBlock onErrorBlock counter localAnswers localErrors published'
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

localErrorFor: aWebSocketCommand
	"Returns the local error handler (or complain about the lack of one).
	Removes both, the error handler and the normal callback."
	
	| callback |
	
	callback := self localErrors  
		at: aWebSocketCommand fId
		ifAbsent:[ self error: 'No error callback found for "', aWebSocketCommand asString,'"' ].

	self localErrors 
		removeKey: aWebSocketCommand fId
		ifAbsent:[ nil ].
		
	self localAnswers 
		removeKey: aWebSocketCommand fId
		ifAbsent:[ nil ].
		
	^ callback
!

localErrors
	"Returns the dictionary of callbacks that are waiting for
	its commands' answer reacting when (and if) they are an exception.
	The convention is to use the ids provided by the counter in the keys
	and the callbacks in the values."
	
	^ localErrors ifNil:[ localErrors := Dictionary new ]
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

published
	"Answers the dictionary holding the published objects 
	in 'this smalltalk' environment.
	Keys can be the instance's hash, a Mapless UUID, etc.
	Values are the instances receiving messages from remote."
	^ published ifNil:[ published := Dictionary new ]
!

socket

	^ socket ifNil:[ self initializeSocket ]
! !

!WebSocketAPI methodsFor: 'actions'!

answerLocallyFor: aWebSocketCommand
	"Executes the callback waiting for this command's answer.
	Or, executes the error handler if an exception happens."
		
	[ self basicAnswerLocallyFor: aWebSocketCommand ]
		on: Error
		do:[ :x | self onError: x for: aWebSocketCommand ]
!

basicAnswerLocallyFor: aWebSocketCommand
	"Executes the callback waiting for this command's answer.
	It's done by evaluating the callback waiting for aWebSocketCommand.
	It also removes it from the dictionary because is not pending for it anymore."
		
	aWebSocketCommand onAboutToAnswer.
	
	(self localAnswers 
		at: aWebSocketCommand fId
		ifAbsent:[ ^ nil ]) value: aWebSocketCommand.

	self localAnswers 
		removeKey: aWebSocketCommand fId
		ifAbsent:[ ]
!

connect
	"Makes a connection.
	Remarks:
	1. if connected already, it will do nothing
	2. it will disconnect if there is an unconnected socket."

	self isConnected ifTrue:[ ^self ].
	
	self initializeSocket.
!

disconnect
	"Disconnects the web socket.
	No fail if there is none"
	
	self hasSocket ifTrue:[
		socket close.
		self reset]
!

errorAbout: anException

	^ anException signal
!

newBadCommandOn: aWebSocketEvent  
	"Answers a new instance of BadCommand based on aWebSocketEvent."

	^ BadCommand new
		problematic: aWebSocketEvent data;
		yourself
!

newWebSocketOn: anUri

	<return new WebSocket(anUri)>
!

nextId
	"Increments the counter and answers the value."
	
	^ counter := self counter + 1
!

publish: anObject 
	"Holds anObject among those exposed to receive remote messages."
	^ self publish: anObject at: anObject id
!

publish: anObject at: anId
	"Holds anObject among those exposed to receive remote messages."
	^ self published at: anId put: anObject
!

remoteAnswerFor: aWebSocketCommand
	"Sends aWebSocketCommand to the other end."
	
	self sendCommand: aWebSocketCommand
!

remoteAnswerFor: aWebSocketCommand onError: aBlock
	"Sends aWebSocketCommand to the other end."
	
	self sendCommand: aWebSocketCommand onError: aBlock
!

remoteReferenceFor: anObject
	"Answers a remote reference for anObject in this API or
	a copy if the object is simple enough to travel as copy.
	If reference, it'll keep it among those published."

	| ref |	

	self nextId.
	
	ref := anObject asRemoteReference.
	ref isRemoteReference ifTrue:[ | anId |
		anId := self published keyAtValue: anObject ifAbsent: [ nil ].
		anId isNil 
			ifTrue:[
				ref id: self counter.		
				self publish: anObject at: ref id ]
			ifFalse:[ ref id: anId ] ].
		
	^ ref
!

reset
		
	socket := nil
!

sendCommand: aWebSocketCommand
	"Sends aWebSocketCommand to the other side of the wire.
	Will throw an APIError if an exception happens"
	
	^ self 
		sendCommand: aWebSocketCommand
		onError:[ :x | self errorAbout: x ]
!

sendCommand: aCommand do: aBlock
	"Sends aCommand to the other side of the wire.
	Evaluates aBlock when the answer arrives."
	
	^ self 
		sendCommand: aCommand 
		do: aBlock
		onError: [ :x | self errorAbout: x ]
!

sendCommand: aWebSocketCommand do: anAnswerBlock onError: aBlock
	"Sends aWebSocketCommand to the other side of the wire.
	Registers anAnswerBlock to be evaluated later when the answer arrives.
	Evaluates aBlock if there is an exception while doing it."
	
	aWebSocketCommand isFromBackend ifFalse:[ 
		self nextId.
		"Marks the commandwith a frontend's id."
		aWebSocketCommand fId: self counter.
		self localAnswers at: self counter put: anAnswerBlock.
		self localErrors at: self counter put: aBlock ].
	
	[ aWebSocketCommand onAboutToSend.
	self socket send: aWebSocketCommand asJSONString.
	aWebSocketCommand onAfterSent ]
		on: Error
		do:[ :x | self onError: x for: aWebSocketCommand ]
!

sendCommand: aCommand onError: aBlock
	"Sends aCommand to the other side of the wire.
	Evaluates aBlock if there is an exception while doing it."
	
	^ self 
		sendCommand: aCommand 
		do: [ "ignoring answer" ] 
		onError: aBlock
!

sendMessage: aMessage on: aRemoteObject
	"Sends aMessage to aRemoteObject."

	self 
		sendCommand: (RMS to: aRemoteObject id send: aMessage selector withAll: aMessage arguments)
		do: [ :ans | aRemoteObject future resolve: ans ]
		onError: [ :x | (aRemoteObject future at: 'fail') value: x ].
		
	^ aRemoteObject
! !

!WebSocketAPI methodsFor: 'initialization'!

initialize

	super initialize.
	
	window onbeforeunload:[
		self reset ]
!

initializeAPIPath

	^ apiPath := 'ws'
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

	^ window location hostname = 'localhost' 
		ifTrue:[ uri := self class protocol,'//',window location hostname,':',self class port asString,'/',self apiPath ]
		ifFalse:[ uri := self class protocol,'//',window location hostname, '/',self apiPath ]
! !

!WebSocketAPI methodsFor: 'reactions'!

onError: anException for: aWebSocketCommand
	"Reacts to anException with the callback that is 
	registered for aWebSocketCommand."

	| callback |
	
	callback := self localErrors  
		at: aWebSocketCommand fId
		ifAbsent:[ self error: 'No error callback found for "', aWebSocketCommand asString,'"' ].

	self localErrors 
		removeKey: aWebSocketCommand fId
		ifAbsent:[ nil ].
		
	self localAnswers 
		removeKey: aWebSocketCommand fId
		ifAbsent:[ nil ].

	callback value: anException
!

onMessage: anEvent

	| command |

	Transcript cr; show: anEvent data.
	command := WebSocketCommand for: anEvent.
	command ifNil:[ command := self newBadCommandOn: anEvent ].

	self trigger: 'commandReceived:' with: command.
	command receivedOn: self
! !

!WebSocketAPI methodsFor: 'testing'!

hasSocket

	^ socket notNil
!

isConnected

	^ self hasSocket and:[
	socket readyState = 1 ]
!

isDisconnected

	^ self hasSocket or:[
	socket readyState ~= 1 ]
! !

!WebSocketAPI class methodsFor: 'accessing'!

port

	^ 3333
!

protocol

	^ self isSSL
		ifTrue:[ 'wss:' ]
		ifFalse:[ 'ws:' ]
! !

Mapless subclass: #RR
	instanceVariableNames: ''
	package: 'Flow-API'!
!RR commentStamp!
##RR alias of RemoteReference 

Instances of RemoteReference are used when you cannot send as copy an object that is the answer of some remote command.

The remote end will be able to use aRemoteReference asRemote and send a message remotely to it.

The reason for the short name instead of the long explicit one is merely bandwith optimization!

!RR methodsFor: 'testing'!

isRemoteReference

	^ true
! !

ProtoObject subclass: #Remote
	instanceVariableNames: 'id future'
	package: 'Flow-API'!
!Remote commentStamp!
## RemoteObject

Is a Proxy to an instance in the other side of the wire

Instances of RemoteObject route messages and answers to the instance at the destination!

!Remote methodsFor: 'accessing'!

future
	"Answers the jQuery future
	http://api.jquery.com/category/deferred-object/"
	
	^ future ifNil:[ future := jQuery Deferred ]
!

id

	^ id
!

initializeOn: aString

	id := aString
! !

!Remote methodsFor: 'actions'!

doesNotUnderstand: aMessage
	"Route aMessage to the client so it gets sent to the receiver in the other end.
	It assumes that all reactions (like done, onError, etc) are properly pre-set"
	
	future ifNil:[ self initializeFuture ].
	
	^ self class client sendMessage: aMessage on: self
!

inspectOn: anInspector
	| variables |
	variables := Dictionary new.
	variables at: '#self' put: self.
	self class allInstanceVariableNames do: [ :each |
		variables at: each put: (self instVarAt: each) ].
	anInspector
		setLabel: self printString;
		setVariables: variables
!

printOn: aStream

	super printOn: aStream.
	
	aStream nextPutAll: '(',id asString,')'
! !

!Remote methodsFor: 'initialization'!

initializeFuture
	
	future := jQuery Deferred.
	
	future fail: [ :x | x signal ].
	
	^ future
! !

!Remote methodsFor: 'testing'!

isRemote
	"Answers true if this object is remote"

	^ true
! !

Remote class instanceVariableNames: 'client'!

!Remote class methodsFor: 'accessing'!

client
	"Answers the client that RemoteObject instances should use for 
	accessing the destination instances in the other end."

	^ client ifNil:[ client := 'app session api ws' ]
!

client: aClient

	client := aClient
! !

!Remote class methodsFor: 'actions'!

for: aString
	"Answer a new RemoteObject instance based on the id aString"
	
	^ self new
		initializeOn: aString;
		yourself
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
	
	[ self processOn: anAPIClient ]
		on: Error 
		do:[ :x | 
				self
					isException: true;
					answer: x asString ].
					
	self remoteAnswerOn: anAPIClient
!

localAnswerOn:  anAPIClient
	"Tells the API to perform whatever is pending
	in the local answer of this command"
	
	(self isException notNil and:[
	self isException ]) ifTrue:[
		^ (anAPIClient localErrorFor: self) value: (APIRemoteException for: self) ].
	
	anAPIClient answerLocallyFor: self
!

printOn: aStream

	super printOn: aStream.
	
	(self isException notNil and:[
	self isException ]) ifTrue:[
		aStream nextPutAll: '(',self answer printString,')' ]
!

processOn: anAPIClient
	"Executes this command comming from anAPIClient
	loading the answer in it."
	
	self subclassResponsibility
!

receivedOn: anAPIClient
	"This command has been received by anAPIClient.
	Time to react depending in this being an answer or not..."
	
	self isAnswer 
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
	
	anAPIClient remoteAnswerFor: self
! !

!WebSocketCommand methodsFor: 'reactions'!

onAboutToAnswer
	"This command is about to execute its answer callback."
	
	"no-op"
!

onAboutToSend
	"This command is about to be sent to the remote end."
	
	"no-op"
!

onAfterSent
	"This command was just sent to the remote end."
	
	"no-op"
!

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
	"Answers true if this command has an answer at all."

	^ self answer notNil
!

isAnswer
	"Answers true if this command is an answer."

	^ self hasAnswer
!

isFromBackend
	"Answers true if this command was originated at the backend side."
	
	^ self bId notNil
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

!Echo methodsFor: 'actions'!

processOn: anAPIClient
	"Executes this command comming from anAPIClient
	loading the answer in it."
	
	self answer: #{ #echoes -> self content }
! !

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

!Ping methodsFor: 'actions'!

processOn: anAPIClient
	"Executes this command comming from anAPIClient
	loading the answer in it."
	
	self answer: #{ #pongOn -> Date now }
! !

WebSocketCommand subclass: #RMS
	instanceVariableNames: ''
	package: 'Flow-API'!
!RMS commentStamp!
##RMS alias RemoteMessageSend

Is a command to send a message to a remote object published in the backend.

Or..

The command received from the backend to send a message to an object published here in the frontend.

RemoteMessageSends have @answer set before responding to the sender side and if an exception happens they set @isException in true and a print of the exception.

The reason for the short name instead of the long explicit one is merely bandwith optimization!

!RMS methodsFor: 'actions'!

getReceiverOn: anAPIClient
	"Returns the published at anAPIClient corresponding to the receiver of this message send."
	
	^ anAPIClient published 
		at:	self receiverId
		ifAbsent:[ nil ]
!

printOn: aStream

	super printOn: aStream.
	
	self answer notNil
		ifTrue:[ aStream nextPutAll: '(',self answer asString,' #',self selector asString,')' ]
		ifFalse:[ aStream nextPutAll: '(#',self selector asString,')' ]
!

processOn: anAPIClient
	"Executes this command comming from anAPIClient
	loading the answer in it."
	
	| ans |
	
	ans := (self getReceiverOn: anAPIClient)
					perform: self selector
					withArguments: self arguments.

	self answer: (anAPIClient remoteReferenceFor: ans)
! !

!RMS class methodsFor: 'actions'!

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

