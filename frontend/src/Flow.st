Smalltalk createPackage: 'Flow'!
Object subclass: #AbsrtactScaffolder
	instanceVariableNames: ''
	package: 'Flow'!

AbsrtactScaffolder class instanceVariableNames: 'api'!

!AbsrtactScaffolder class methodsFor: 'accessing'!

api

	^ api ifNil:[ api := RESTfulAPI new ]
!

url

	^ window location asString,Mapless basePath,'/scaffold',self command,'/'
! !

!AbsrtactScaffolder class methodsFor: 'actions'!

scaffold: anObject
	"Scaffold what's relevnt to this scaffolder"
	
	^ self subclassResponsibility
! !

AbsrtactScaffolder subclass: #CRUDScaffolder
	instanceVariableNames: ''
	package: 'Flow'!

!CRUDScaffolder class methodsFor: 'accessing'!

command

	^ '/crud'
! !

!CRUDScaffolder class methodsFor: 'actions'!

scaffold: aString 

	Transcript cr; show: 'CRUD scaffolding ', aString,'...'.

	self api
		post: self url  
		data: aString
		do: [ :res | Transcript cr; show: ' ...done']
		onError: [ :res | self error: res responseText ]
! !

AbsrtactScaffolder subclass: #MaplessScaffolder
	instanceVariableNames: ''
	package: 'Flow'!

!MaplessScaffolder class methodsFor: 'accessing'!

command

	^ '/mapless'
!

parentClass

	^ Mapless
! !

!MaplessScaffolder class methodsFor: 'actions'!

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
		package: Flow scaffolder packageName
!

scaffold: aString
	"Scaffold what's relevnt to this scaffolder"
	
	self backendScaffold: aString 
		do:[ :res | self frontendScaffold: aString ]
		onError:[ :res | 
			self error: res responseText ]
! !

MaplessScaffolder subclass: #ModelScaffolder
	instanceVariableNames: ''
	package: 'Flow'!

!ModelScaffolder class methodsFor: 'accessing'!

command

	^ '/model'
!

parentClass

	^ MaplessModel
! !

Object subclass: #Flow
	instanceVariableNames: ''
	package: 'Flow'!

Flow class instanceVariableNames: 'app session'!

!Flow class methodsFor: 'accessing'!

activeController 
	"Returns the controller that is currently active"
	
	^ Router active
!

app 

	^ app
!

app: anApplication 

	app := anApplication
!

scaffold

	^ self scaffolder
!

scaffolder

	^ Scaffolder
!

session

	^ session ifNil:[ self initializeSession ]
!

session: aSession

	session := aSession
! !

!Flow class methodsFor: 'actions'!

start
	"Makes the foundation of a flow app to be ready for action."

	window at: 'flow' put: self.

	"Make the router be sensible to URI changes"
	Router observeHash
! !

!Flow class methodsFor: 'initialization'!

initializeSession
	
	^ session := Session new
! !

Object subclass: #Scaffolder
	instanceVariableNames: ''
	package: 'Flow'!

Scaffolder class instanceVariableNames: 'packageName'!

!Scaffolder class methodsFor: 'accessing'!

crudScaffolder

	^ CRUDScaffolder
!

maplessScaffolder

	^ MaplessScaffolder
!

modelScaffolder

	^ ModelScaffolder
!

packageName

	^ packageName
!

packageName: aString

	packageName := aString
! !

!Scaffolder class methodsFor: 'actions'!

crud: aMaplessClassOrName

	^ self crudModel: aMaplessClassOrName
!

crudMapless: aMaplessClassOrName

	self mapless: aMaplessClassOrName.

	^ self crudScaffolder scaffold: aMaplessClassOrName
!

crudModel: aMaplessClassOrName

	self model: aMaplessClassOrName.

	^ self crudScaffolder scaffold: aMaplessClassOrName
!

mapless: aMaplessName

	^ self maplessScaffolder scaffold: aMaplessName
!

model: aModelName

	^ self modelScaffolder scaffold: aModelName
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

changed

	self trigger: #changed
!

isRemote
	"Answers true if this object is remote"
	
	^ false
!

off
	"Unwires the observation of this object to the occurrence of all events.
	All handlers will stop reacting"

	<$(self).off()>
!

off: anEventName 
	"Unwires the observation of this object to the occurrence of anEventName.
	All handlers will stop reacting"

	<$(self).off(anEventName, aReactionBlock)>
!

promise: onDoneBlock
	
	^ (jQuery value: self) promise done: onDoneBlock
!

trigger: anEventName 
	"Triggers anEventName in this object.
	There you have it, it happened. 
	Hey World, do something about this!!"
	
	<return $(self).trigger(anEventName)>
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

	<return $(self).trigger( anEventName, someArguments )>
!

when: anEventName do: aReactionBlock
	"Wires the observation of this object to the occurrence of anEventName.
	When (and if) anEventName happens, aReactionBlock will take place. 
	Based on this feature: http://forum.jquery.com/topic/triggering-custom-events-on-js-objects
	Beware some objects wont fire (anArray for example).
	Godspeed!!"

	<$(self).on(anEventName, aReactionBlock)>
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

!SequenceableCollection methodsFor: '*Flow'!

shuffled
	"Answers a copy of this collection with the same elements but randomly positioned."
	
	| shaked source | 
	
	shaked := self class new.
	source := self copy.
	
	1 to: self size do: [ :i | 
		shaked add: (source remove: source atRandom) ].
		
	^ shaked
! !

!UndefinedObject class methodsFor: '*Flow'!

asRemoteReferenceFor: anObject
	"Answers anObject (copy) or an appropiate reference (can't be copied) for 
	traveling over the wire and still referring to this receiver"

	^ anObject
! !

