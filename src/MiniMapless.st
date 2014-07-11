Smalltalk createPackage: 'MiniMapless'!
Object subclass: #Mapless
	instanceVariableNames: 'data'
	package: 'MiniMapless'!
!Mapless commentStamp!
MaplessModel is the same kind of aggregate you'll found in Mapless in Pharo but here in the frontend.
The concrete subclasses' instances of these aggregates are very friendly to be sent and received to and from the backend.

For more on Mapless visit:
http://sebastianconcept.github.io/Mapless!

!Mapless methodsFor: 'accessing'!

at: aKey

	^ data at: aKey
!

at: aKey put: anObject

	data at: aKey put: anObject.

	^ anObject
!

createdOn 

	| selector expectsInstanceOf object |

	selector := #createdOn.
	expectsInstanceOf := Date.

	object := self at: selector asString.
	object ifNil:[^nil].

	(object isKindOf: expectsInstanceOf) ifTrue:[^object].

	^ self at: selector asString put: (self dateAndTimeAt: selector).
!

createdOn: aDate

	self at: #createdOn put: aDate
!

data
	"Answers the raw content of this mapless.
	Warning: NOT meant to be overriden by subclasses."
	^ data
!

dateAndTimeAt: aSelector

	^ Date fromString: (self at: aSelector)
!

id

	^ data at: #id
!

id: aString

	data at: #id put: aString
!

path 

	^ self class path
!

subModelAt: aSelector
	"Answers the reified submmapless (instantiating when necessary)."
	
	| subMaplessData modelClass |

	subMaplessData := data at: aSelector.
	subMaplessData ifNil:[^nil].
	
	modelClass := subMaplessData at: 'modelClass'.
	modelClass ifNil:[^nil].
	
	modelClass := SmalltalkImage current globals at: modelClass ifAbsent:[ nil ].

	modelClass ifNil:[ ^ MaplessReificationError signal: 'Cannot find ',aSelector asString,'''s class for this metadata'].
	
	^ modelClass fromReified: subMaplessData
!

uri 
	"Answers the URI corresponding to this particular mapless"
	^ self path,'/',self id
!

url

	^ self path,'/',self id asString
! !

!Mapless methodsFor: 'actions'!

asJSONString

	self onAboutToJSON.

	^ JSON stringify: data
!

at: aKey ifAbsent: aBlock

	^ data at: aKey ifAbsent: aBlock
!

create
	"Creates this mapless using the remote API"
	^ self createDo:[nil]
!

createDo: aBlock
	"Creates this mapless using the remote API"

	jQuery ajax: #{
		'url' -> self path.
		'type' -> 'POST'.
		'cache' -> false.
		'contentType'-> 'application/json; charset=utf-8'.
		'dataType'-> 'json'.
		'data' -> self asJSONString.
		'success' -> [:x| self onAfterCreate: x done: aBlock].
		'fai' -> [:x| MaplessCreateError signal: 'Could not create ', self asString,':  ', x responseText ].
		'error' -> [:x| MaplessCreateError signal: 'Could not create ', self asString,':  ', x responseText ]
	}.
!

delete
	"Delete this mapless using the remote API"

	self deleteDo:[nil]
!

deleteDo: aBlock
	"Delete this mapless using the remote API"

	jQuery ajax: #{ 
		'url' -> self uri.
		'type' -> 'DELETE'.
		'cache' -> false.
		'data' -> self asJSONString.
		'success' -> [:x| self onAfterDelete: x done: aBlock].
		'fail' -> [:x| MaplessDeleteError signal: 'Could not delete ', self asString,':  ', x responseText ].
		'error' -> [:x| MaplessCreateError signal: 'Could not delete ', self asString,':  ', x responseText ]
	}
!

doesNotUnderstand: aMessage
	"The idea behind this DNU is to use the selector as setters or getter 
	delegating to data (aJsonObject)"
	
	| key part subModel isUndefined isObject obj keys |

	key := aMessage selector asSymbol.

	(self isUnary: key) ifTrue: [
		(data class == HashedCollection)
			ifTrue:[part := data at: key asString ifAbsent:[nil]]
			ifFalse:[part := data at: key asString].
		part ifNil:[^nil].
		isUndefined := self isUndefinedPart: part.
		isUndefined ifTrue:[^nil].
		isObject := self isObjectPart: part.
		isObject ifTrue:[
			"is part an empty js object? (would be nil for JSON eyes)"
			obj := self newJSObject.
			obj := JSObjectProxy on: obj.
			(obj keys: part) isEmpty ifTrue:[
				data at: key asString put: nil.
				^nil]].

		subModel := self get: 'modelClass' from: part.
		"If there is no modelClass in it, then is a direct value in the property"
		subModel ifNil:[ ^part].

		subModel := Smalltalk current at: subModel.
		subModel ifNil:[part inspect. self error: 'this should have a ',subModel,' modelClass no?'].
		subModel := subModel fromReified: part.
		data at: key asString put: subModel.
		^ subModel].
 
	^ ((self isKeyword: key) and: [
	(key asString occurrencesOf: ':') = 1])
		ifTrue: [key := key allButLast.
				data at: key asString put: aMessage arguments first]
		ifFalse: [super doesNotUnderstand: aMessage]
!

fresh
	"Re-read this mapless' state."

	self freshDo:[nil]
!

freshDo: aBlock
	"Re-read this mapless' state from the remote API."

	jQuery ajax: #{ 
		'url' -> self uri.
		'type' -> 'GET'.
		'cache' -> false.
		'success' -> [:x| self onAfterFresh: x done: aBlock].
		'fail' -> [:x| MaplessReadError signal: 'Could not read ', self asString,':  ', x responseText ].
		'error' -> [:x| MaplessReadError signal: 'Could not read ', self asString,':  ', x responseText ]
	}
!

get: anAttribute from: aPart
	"Answers what aPart has at anAttribute."
	<return aPart[anAttribute]>
!

localDelete

	self class localDelete: self
!

localFresh
	"Answers the receiver loaded with a fresh version the contents regarding to the localStorage."

	^ self syncFromJSON: (window localStorage getItem: self id)
!

localSave

	self class localSave: self
!

newJSObject
	<return Object>
!

save
	^ self saveDo:[nil]
!

saveDo: aBlock

	self localSave.
	self updateDo: aBlock
!

syncFromJSON: someJSONString
	"Sync the current values in this model 
	with the ones coming in someJSONString."

	^ self syncWith: (self class reify: someJSONString)
!

syncWith: aReifiedJSON
	"Sync the current values in this model 
	with the ones coming in aReifiedJSON."

	aReifiedJSON ifNil:[ ^ nil ].

	((aReifiedJSON at: 'modelClass') isNil or:[
	(aReifiedJSON at: 'modelClass') ~= self class name ]) ifTrue:[
		MaplessReificationError signal: 'This JSON does not fit in this ', self asString ].

	data := aReifiedJSON
!

updateDo: aBlock
	"Updates this mapless using the remote API"

	jQuery ajax: #{ 
		'url' -> self uri.
		'type' -> 'PUT'.
		'cache' -> false.
		'data' -> self asJSONString.
		'success' -> [:x| self onAfterUpdate: x done: aBlock].
		'fail' -> [:x| MaplessUpdateError signal: 'Could not update ', self asString,':  ', x responseText ].
		'error' -> [:x| MaplessUpdateError signal: 'Could not update ', self asString,':  ', x responseText ]
	}
! !

!Mapless methodsFor: 'initialization'!

initialize

	super initialize.

	data := HashedCollection new.
	self modelClass: self class name.
	self initializeInstanceVersion.
	self id: self class newUUID.
!

initializeCreatedOn

	self createdOn: Date now
!

initializeInstanceVersion	

	self v: 1
! !

!Mapless methodsFor: 'reactions'!

onAboutToJSON
	"This mapless is about to be stringified as JSON.
	All inst var with mapless objects will be stringify-friendly after this."
	
	| obj keys |

	obj := self newJSObject.
	obj := JSObjectProxy on: obj.
	keys := obj keys: data. 

	keys do:[:key| |value|
		value := data at: key.
		value := self perform: key asSymbol.

		(value isKindOf: MaplessModel) ifTrue:[
			value onAboutToJSON.
			value := value data].
		data at: key put: value].
!

onAfterCreate: aResponse done: aBlock

	self trigger: 'afterCreated'.
	
	aBlock value: aResponse
!

onAfterDelete: aResponse done: aBlock
	
	self trigger: 'afterDeleted'.

	aBlock value: aResponse
!

onAfterFresh: aResponse done: aBlock

	self trigger: 'afterRefeshed'.

	aBlock value: aResponse
!

onAfterUpdate: aResponse done: aBlock
	
	self trigger: 'afterUpdated'.

	aBlock value: aResponse
! !

!Mapless methodsFor: 'testing'!

= anObject

	^ (anObject respondsTo: #id) and:[
	self id = anObject id]
!

isKeyword: aSelector
	"Answers true if aSelector is for a keyword kind of message"
	^ aSelector asString includes: ':'
!

isObjectPart: aPart
	"Answers true if aPart is a javascript object (as opposed to javascript 'other types')"
	<return typeof part=='object'>
!

isUnary: aSelector
	"Answers true if aSelector is for an unary kind of message."
	^ (aSelector asString includes: ':') not
!

isUndefinedPart: aPart
	"Answers true if aPart is javascript's undefined"
	<return aPart=='undefined'>
! !

!Mapless class methodsFor: 'accessing'!

basePath
	"Answers the base URI for remote mapless"
	
	^ 'api/1.0'
!

path
	"Answers the path for this kind of mapless"
	
	^ self basePath, '/',self pluralName
!

pluralName
	"Answers the string expected in a nicely designed API.
	Any subclass can override its own custom name.
	The default plural name is the singular name 
	in lower case plus an 's' so beware of irregular nouns."
	
	^ self singularName,'s'
!

singularName
	"Answers the string expected in a nicely designed API.
	Any subclass can override its own custom name.
	The default name is the class name in lowercase."
	
	^ self name asLowercase
! !

!Mapless class methodsFor: 'actions'!

findId: anId

	self findId: anId do: [nil]
!

findId: anId do: aBlock

	jQuery ajax: #{ 
		'url' -> (self path, '?id=',anId).
		'type'-> 'GET'.
		'cache'-> false.
		'success'-> [:x| self onAfterRead: x done: aBlock].
		'fail' -> [:x| self error: 'Could not read ', self name,':  ', x responseText].
		'error'-> [:x| self error: 'Could not read ', self name,':  ', x responseText]}
!

fromJSON: someJSON
	"Answers a new instance of this mapless
	based on someJSON."

	^ self new syncFromJSON: someJSON
!

fromJSONString: someJSONStringOrNil
	"Answers a new instance of this mapless and returns it
	in the state dictated by someJSONStringOrNil.
	Returns nil when thigns do not fit."

	| json modelClass |
	someJSONStringOrNil ifNil:[ ^nil ].
	
	json := self reify: someJSONStringOrNil.
	json ifNil:[ ^nil ].
	
	modelClass := json at: 'modelClass' ifAbsent:[ ^nil ].
	
	modelClass := Smalltalk current globals at: modelClass ifAbsent:[  ].
	
	^ modelClass notNil
		ifTrue:[ modelClass new syncWith: json ]
		ifFalse:[ self error: 'The class "', modelClass,'" was not found' ]
!

fromReified: aReifiedJSON
	"Answers a new instance of this mapless and returns it
	in sync with aReifiedJSON."

	^ self new syncWith: aReifiedJSON
!

localDelete: aMapless

	window localStorage removeItem: aMapless id
!

localFindId: anId

	^ self fromJSONString: (window localStorage getItem: anId)
!

localSave: aMapless

	window localStorage
		setItem: aMapless id
		value: aMapless asJSONString
!

manyFromJSON: someJSON

	^ (JSON parse: someJSON) collect:[ :each |
		 self fromReified: each ]
!

newUUID
	^ self uuidGenerator value
!

reify: jsonString
	"Returns a simple javascript object created using jsonString."

	^ JSON parse: jsonString
!

uuidGenerator
	"Taken from:
	http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript"

<return function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
}>
! !

!Mapless class methodsFor: 'reactions'!

onAfterRead: someJSON done: aBlock

	| reified |
	
	reified := self fromJSON: someJSON.
	^ aBlock value: reified.
! !

Error subclass: #MaplessError
	instanceVariableNames: ''
	package: 'MiniMapless'!

MaplessError subclass: #MaplessCreateError
	instanceVariableNames: ''
	package: 'MiniMapless'!

MaplessError subclass: #MaplessDeleteError
	instanceVariableNames: ''
	package: 'MiniMapless'!

MaplessError subclass: #MaplessReadError
	instanceVariableNames: ''
	package: 'MiniMapless'!

MaplessError subclass: #MaplessReificationError
	instanceVariableNames: ''
	package: 'MiniMapless'!

MaplessError subclass: #MaplessUpdateError
	instanceVariableNames: ''
	package: 'MiniMapless'!

