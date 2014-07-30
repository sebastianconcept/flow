Smalltalk createPackage: 'Flow'!
Object subclass: #Flow
	instanceVariableNames: ''
	package: 'Flow'!

!CharacterArray methodsFor: '*Flow'!

asRemote
	"Answers a new Remote instance based in the id represented in this string"
	
	^ Remote for: self
! !

!Error methodsFor: '*Flow'!

printOn: aStream

	| content |
	
	super printOn: aStream.

	(messageText notNil and:[
	messageText notEmpty ]) ifTrue:[
		content := messageText ].
	
	self isSmalltalkError ifFalse:[ content := self jsStack ].
	
	content isNil ifTrue:[ ^ self ].
	
	aStream nextPutAll: '(',content printString,')'
! !

!MessageNotUnderstood methodsFor: '*Flow'!

printOn: aStream

	super printOn: aStream.
	
	aStream nextPutAll: '(',self receiver asString, '>>',self message selector asString,')'
! !

!Object methodsFor: '*Flow'!

asRemote
	"Answers this object in a way that is appropriate 
	for a remote end to do something with it"
	
	#todo. "return a proxy so it gets actually useful"
	^ self asString
!

promise: onDoneBlock
	
	^ (jQuery value: self) promise done: onDoneBlock
!

trigger: anEventName 
	"Triggers anEventName in this object.
	There you have it, it happened. 
	Hey World, do something about this!!"
	
	^ (jQuery value: self) trigger: anEventName
!

trigger: anEventName with: anArgument
	"Triggers anEventName in this object.
	There you have it, it happened. 
	Hey World, do something about this!!"
	
	^ self trigger: anEventName withAll: (Array with: anArgument)
!

trigger: anEventName withAll: someArguments
	"Triggers anEventName in this object.
	There you have it, it happened. 
	Hey World, do something about this!!"
	
	^ (jQuery value: self) 
			trigger: anEventName 
			withAll: someArguments
!

when: anEventName do: aReactionBlock
	"Wires the observation of this object to the occurrence of anEventName.
	When (and if) anEventName happens, aReactionBlock will take place. 
	Godspeed!!"
	
	^ (jQuery value: self) 
		on: anEventName 
		do: aReactionBlock
! !

!ProtoObject methodsFor: '*Flow'!

isNil
	^ false
!

notNil
	^ self isNil not
! !

