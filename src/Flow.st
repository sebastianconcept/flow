Smalltalk createPackage: 'Flow'!
Object subclass: #AbsrtactGenerator
	instanceVariableNames: ''
	package: 'Flow'!

!AbsrtactGenerator class methodsFor: 'actions'!

scaffold: anObject
	"Scaffold what's relevnt to this generator"
	
	^ self subclassResponsibility
! !

AbsrtactGenerator subclass: #CRUDGenerator
	instanceVariableNames: ''
	package: 'Flow'!

AbsrtactGenerator subclass: #MaplessGenerator
	instanceVariableNames: ''
	package: 'Flow'!

MaplessGenerator class instanceVariableNames: 'api'!

!MaplessGenerator class methodsFor: 'accessing'!

api

	^ api ifNil:[ api := RESTfulAPI new ]
!

command

	^ '/mapless'
!

parentClass

	^ Mapless
!

url

	^ window location asString,Mapless basePath,'/generate',self command,'/'
! !

!MaplessGenerator class methodsFor: 'actions'!

backendScaffold: aString do: aBlock onError: anErrorBlock

	self api
		post: self url  
		data: aString
		do: aBlock
		onError: anErrorBlock
!

frontendScaffold: aString
	
	self parentClass 
		subclass: aString 
		instanceVariableNames: '' 
		package: Flow generator packageName
!

scaffold: aString
	"Scaffold what's relevnt to this generator"
	
	self backendScaffold: aString 
		do:[ :res | self frontendScaffold: aString ]
		onError:[ :res | 
			self error: res responseText ]
! !

MaplessGenerator subclass: #ModelGenerator
	instanceVariableNames: ''
	package: 'Flow'!

!ModelGenerator class methodsFor: 'accessing'!

command

	^ '/model'
!

parentClass

	^ MaplessModel
! !

Object subclass: #Flow
	instanceVariableNames: ''
	package: 'Flow'!

!Flow class methodsFor: 'accessing'!

gen

	^ self generate
!

generate

	^ self generator
!

generator

	^ Generator
! !

Object subclass: #Generator
	instanceVariableNames: ''
	package: 'Flow'!

Generator class instanceVariableNames: 'packageName'!

!Generator class methodsFor: 'accessing'!

crudGenerator

	^ CRUDGenerator
!

maplessGenerator

	^ MaplessGenerator
!

modelGenerator

	^ ModelGenerator
!

packageName

	^ packageName
!

packageName: aString

	packageName := aString
! !

!Generator class methodsFor: 'actions'!

crud: aMaplessClassOrName

	^ self crudGenerator scaffold: aMaplessClassOrName
!

mapless: aMaplessName

	^ self maplessGenerator scaffold: aMaplessName
!

model: aModelName

	^ self modelGenerator scaffold: aModelName
! !

!Boolean class methodsFor: '*Flow'!

asRemoteReferenceFor: anObject
	"Answers anObject (copy) or an appropiate reference (can't be copied) for 
	traveling over the wire and still referring to this receiver"

	^ anObject
! !

!CharacterArray methodsFor: '*Flow'!

asRemote
	"Answers a new Remote instance based in the id represented in this string"
	
	^ Remote for: self
! !

!CharacterArray class methodsFor: '*Flow'!

asRemoteReferenceFor: anObject
	"Answers anObject (copy) or an appropiate reference (can't be copied) for 
	traveling over the wire and still referring to this receiver"

	^ anObject
! !

!Date class methodsFor: '*Flow'!

asRemoteReferenceFor: anObject
	"Answers anObject (copy) or an appropiate reference (can't be copied) for 
	traveling over the wire and still referring to this receiver"

	^ anObject
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

!JSObjectProxy methodsFor: '*Flow'!

asRemoteReference
	"Answers the object appropiate for 
	traveling over the wire and still referring to this receiver"
	
	^ self class asRemoteReferenceFor: self
! !

!JSObjectProxy class methodsFor: '*Flow'!

asRemoteReferenceFor: anObject
	"Answers anObject (copy) or an appropiate reference (can't be copied) for 
	traveling over the wire and still referring to this receiver"

	"Subclasses differ you can check on them.
	The default is not be copied, so..."

	^ RR new
! !

!MessageNotUnderstood methodsFor: '*Flow'!

printOn: aStream

	super printOn: aStream.
	
	aStream nextPutAll: '(',self receiver asString, '>>',self message selector asString,')'
! !

!Metaclass methodsFor: '*Flow'!

asRemoteReferenceFor: anObject
	"Answers anObject (copy) or an appropiate reference (can't be copied) for 
	traveling over the wire and still referring to this receiver"

	"Subclasses differ you can check on them.
	The default is not be copied, so..."

	^ RR new
! !

!Number class methodsFor: '*Flow'!

asRemoteReferenceFor: anObject
	"Answers anObject (copy) or an appropiate reference (can't be copied) for 
	traveling over the wire and still referring to this receiver"

	^ anObject
! !

!Object methodsFor: '*Flow'!

asRemote
	"Answers this object in a way that is appropriate 
	for a remote end to do something with it"
	
	#todo. "return a proxy so it gets actually useful"
	^ self asString
!

asRemoteReference
	"Answers the object appropiate for 
	traveling over the wire and still referring to this receiver"
	
	^ self class asRemoteReferenceFor: self
!

isRemote
	"Answers true if this object is remote"
	
	^ false
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

!Object class methodsFor: '*Flow'!

asRemoteReferenceFor: anObject
	"Answers anObject (copy) or an appropiate reference (can't be copied) for 
	traveling over the wire and still referring to this receiver"

	"Subclasses differ you can check on them.
	The default is not be copied, so..."

	^ RR new
! !

!ProtoObject methodsFor: '*Flow'!

isNil
	^ false
!

isRemoteReference

	^ false
!

notNil
	^ self isNil not
! !

!UndefinedObject class methodsFor: '*Flow'!

asRemoteReferenceFor: anObject
	"Answers anObject (copy) or an appropiate reference (can't be copied) for 
	traveling over the wire and still referring to this receiver"

	^ anObject
! !

