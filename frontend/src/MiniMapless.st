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

	modelClass ifNil:[ ^ MaplessError signal: 'Cannot find ',aSelector asString,'''s class for this metadata'].
	
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
	^ self createDo:[ :res | self onAfterCreate: res ]
!

createDo: aBlock
	"Creates this mapless using the remote API"

	self onAboutToCreate.

	jQuery ajax: #{
		'url' -> self path.
		'type' -> 'POST'.
		'cache' -> false.
		'contentType'-> 'application/json; charset=utf-8'.
		'dataType'-> 'json'.
		'data' -> self asJSONString.
		'complete' -> [ :res | aBlock value: res ]
	}.
!

delete
	"Delete this mapless using the remote API"
	self deleteDo:[ :res | self onAfterDelete: res ]
!

deleteDo: aBlock
	"Delete this mapless using the remote API"

	self onAboutToDelete.

	jQuery ajax: #{ 
		'url' -> self uri.
		'type' -> 'DELETE'.
		'cache' -> false.
		'data' -> self asJSONString.
		'complete' -> [ :res | aBlock value: res ]
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
		isUndefined := self isJavaScriptUndefined: part.
		isUndefined ifTrue:[^nil].

		"Is accessing an array of (sub)Mapless?"
		(self isSubMaplessArrayFor: key on: part) ifTrue:[
			^ data 
				at: key
				put: (self getSubMaplessAt: key from: part) ].

		isObject := self isJavaScriptObject: part.
		"console log: 'is object'.
		console log: part."
		
		"is part an empty js object? (would be nil for JSON eyes)"
		"isObject ifTrue:[	
			obj := self newJSObject.
			obj := JSObjectProxy on: obj.
			(obj keys: part) isEmpty ifTrue:[
				data at: key asString put: nil.
				^nil]]."

		subModel := self get: 'modelClass' from: part.
		"If there is no modelClass in it, then is a direct value in the property"
		subModel ifNil:[ ^part].

		subModel := Smalltalk globals at: subModel.
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
	self freshDo:[ :res | self onAfterFresh: res ]
!

freshDo: aBlock
	"Re-read this mapless' state from the remote API."

	self onAboutToFresh.

	jQuery ajax: #{ 
		'url' -> self uri.
		'type' -> 'GET'.
		'cache' -> false.
		'complete' -> [ :res | aBlock value: res ]
	}
!

get: anAttribute from: aPart
	"Answers what aPart has at anAttribute."
	<return aPart[anAttribute]>
!

getSubMaplessAt: aKey from: someObjects
	"Returns the submapless on aKey for this mapless based on someObjects."
	
	"Are they already mapless?"
	(someObjects anySatisfy:[ :e | 
		(self isJavaScriptUndefined: e class) not and:[
		e class ~= JSObjectProxy and:[
		e isKindOf: Mapless ] ] ]) ifTrue:[ ^ someObjects ].
		
	"So they are probably reified JSON.."
	
	"Do they have @data?"
	(someObjects anySatisfy:[ :e | 
		(e at: 'data') notNil ]) ifTrue:[
			^ someObjects collect:[ :each | Mapless fromReified: each data ] ].

	"Do they have modelClass directly in it?"
	(someObjects anySatisfy:[ :e | 
		(e at: 'modelClass') notNil ]) ifTrue:[
			^ someObjects collect:[ :each | Mapless fromReified: each ] ].
	
	self error: 'Unknown case :('
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

onAboutToFresh

	self trigger: 'aboutToFresh:' with: self
!

save
	"Saves this mapless (upserts it)"
	^ self saveDo:[ :res | self onAfterSave: res ]
!

saveDo: aBlock
	"Saves this mapless using the remote API"

	self onAboutToSave.
	
	jQuery ajax: #{ 
		'url' -> self path.
		'type' -> 'PUT'.
		'cache' -> false.
		'contentType'-> 'application/json; charset=utf-8'.
		'dataType'-> 'json'.
		'data' -> self asJSONString.
		'complete' -> [ :res | aBlock value: res ]
	}
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
		MaplessError signal: 'This JSON does not fit in this ', self asString ].

	data := aReifiedJSON
!

update
	"Updates this mapless using the remote API"
	self updateDo:[ :res | self onAfterUpdate: res ]
!

updateDo: aBlock
	"Updates this mapless using the remote API"

	self onAboutToUpdate.
	
	self localSave.

	jQuery ajax: #{ 
		'url' -> self uri.
		'type' -> 'PUT'.
		'cache' -> false.
		'contentType'-> 'application/json; charset=utf-8'.
		'dataType'-> 'json'.
		'data' -> self asJSONString.
		'complete' -> [ :res | aBlock value: res ]
	}
! !

!Mapless methodsFor: 'initialization'!

initialize

	super initialize.

	data := HashedCollection new.
	self modelClass: self class name.
!

initializeCreatedOn

	self createdOn: Date now
!

initializeInstanceVersion	

	self v: 1
! !

!Mapless methodsFor: 'reactions'!

onAboutToCreate

	self trigger: 'aboutToCreate:' with: self
!

onAboutToDelete

	self trigger: 'aboutToDelete:' with: self
!

onAboutToJSON
	"This mapless is about to be stringified as JSON.
	All inst var with mapless objects will be stringify-friendly after this.
	Note: Mapless currently support composition of Mapless and composition with many Mapless"
	
	| obj keys |

	obj := self newJSObject.
	obj := JSObjectProxy on: obj.
	keys := obj keys: data. 

	keys do:[ :key | | value |
	
		"In case the value is the usual stringifiable object"
		value := data at: key.
		(value class ~= Array and:[
		value class ~= JSObjectProxy ] ) ifTrue:[
			value := self perform: key asSymbol ].

		"In case the value is a (sub)Mapless"
		( value class ~= JSObjectProxy and:[
		value isKindOf: Mapless ] ) ifTrue:[
			value onAboutToJSON.
			value := value data ].

		"In case the value is a collection of (sub)Mapless"
		( value class = Array and:[
		value notEmpty and:[
		value anySatisfy:[ :e | 
			e class ~= JSObjectProxy and:[
			e isKindOf: Mapless ] ] ] ] ) ifTrue:[
				value := (value collect:[ :e | e onAboutToJSON data ] ) ].
		
		data at: key put: value ]
!

onAboutToSave

	self trigger: 'aboutToSave:' with: self
!

onAboutToUpdate

	self trigger: 'aboutToUpdate:' with: self
!

onAfterCreate: aResponse 
	"This mapless got created.
	To keep things consistent, if the server was okay, then we locally save too but if
	the API said it wasn't saved, then we make sure this mapless is not in local either
	and raise the exception."
		
	aResponse status ~= 201 ifTrue:[
		self localDelete.
		^ MaplessError signal: 'Could not create ', self asString,':  ', aResponse responseText ].
	
	self localSave.
	
	self trigger: 'afterCreated'
!

onAfterDelete: aResponse 
	"This mapless got deleted.
	To keep things consistent, if the server was okay, then we locally remove it too but if
	the API said it wasn't saved, then we make sure this mapless is not removed from local
	and raise the exception."

	aResponse status ~= 200 ifTrue:[
		^ MaplessError signal: 'Could not delete ', self asString,':  ', aResponse responseText ].
	
	self localDelete.
	
	self trigger: 'afterDeleted'.
!

onAfterFresh: aResponse 
	"This mapless got re-freshed.
	To keep things consistent, if the server was okay, then we sync this mapless state with the response, but
	if the API said it coudn't read (any different than 200), then we restore this mapless state from local
	and raise the exception"

	aResponse status ~= 200 ifTrue:[
		self localFresh.
		^ MaplessError signal: 'Could not read ', self asString,':  ', aResponse responseText ].

	self syncFromJSON: aResponse responseText.

	self trigger: 'afterFresh'.
!

onAfterSave: aResponse
	"This mapless got saved.
	To keep things consistent, if the server was okay, then we locally save too but if
	the API said it wasn't saved, then we restore this mapless state from local
	and raise the exception."
	
	aResponse status ~= 200 ifTrue:[
		self localFresh.
		^ MaplessError signal: 'Could not save ', self asString,':  ', aResponse responseText ].
		
	self localSave.

	self trigger: 'afterSaved'.
!

onAfterUpdate: aResponse 
	"This mapless got updated.
	To keep things consistent, if the server was okay, then we locally save too but if
	the API said it wasn't saved (any different than 200), then we restore this mapless state from local
	and raise the exception"
	
	aResponse status ~= 200 ifTrue:[
		self localFresh.
		^ MaplessError signal: 'Could not update ', self asString,':  ', aResponse responseText ].

	self localSave.

	self trigger: 'afterUpdated'.
! !

!Mapless methodsFor: 'testing'!

= anObject

	^ (anObject respondsTo: #id) and:[
	self id = anObject id]
!

isJavaScriptObject: anObject
	"Answers true if aPart is a javascript object (as opposed to javascript 'other types')"
	<return typeof anObject=='object'>
!

isJavaScriptUndefined: anObject
	"Answers true if anObject is javascript's undefined"
	<return anObject=='undefined'>
!

isKeyword: aSelector
	"Answers true if aSelector is for a keyword kind of message"
	^ aSelector asString includes: ':'
!

isSubMaplessArrayFor: aKey on: someObjects
	"Answers true if someObjects are some case of submapless."
	
	^ (self isUnary: aKey) and:[
	someObjects class = Array and:[
	someObjects anySatisfy:[ :e |
		(e at: 'modelClass') notNil or:[
		(e data at: 'modelClass') notNil ] ] ] ]
!

isUnary: aSelector
	"Answers true if aSelector is for an unary kind of message."
	^ (aSelector asString includes: ':') not
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

find: aQueryString

	self find: aQueryString do: [ :res | self onAfterReadSome: res ]
!

find: aQueryJSONString do: aBlock
	"Finds some mapless using the remote API to resolve aQueryJSONString"

	jQuery ajax: #{
		'url' -> (self path,'/query').
		'type' -> 'POST'.
		'cache' -> false.
		'contentType'-> 'application/json; charset=utf-8'.
		'dataType'-> 'json'.
		'data' -> aQueryJSONString.
		'complete' -> [:res| aBlock value: res ]
	}
!

findAll

	self findAllDo: [ :res | self onAfterReadAll: res ]
!

findAllDo: aBlock

	jQuery ajax: #{ 
		'url' -> self path.
		'type'-> 'GET'.
		'cache'-> false.
		'complete'-> [ :res | aBlock value: res ]
	}
!

findId: anId

	self findId: anId do: [ :res | self onAfterRead: res ]
!

findId: anId do: aBlock

	jQuery ajax: #{ 
		'url' -> (self path, '/',anId).
		'type'-> 'GET'.
		'cache'-> false.
		'complete'-> [ :res | aBlock value: res ]
	}
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
	
	json class = Array ifTrue:[ ^ self fromManyJSON: json].
	
	modelClass := json at: 'modelClass' ifAbsent:[ ^nil ].
	
	modelClass := Smalltalk globals at: modelClass ifAbsent:[  ].
	
	^ modelClass notNil
		ifTrue:[ modelClass new syncWith: json ]
		ifFalse:[ self error: 'The class "', modelClass,'" was not found' ]
!

fromManyJSON: anArrayOfJSONObjects
	"Answers a new instance of this mapless
	based on anArrayOfJSONObjects."

	^ anArrayOfJSONObjects collect:[ :someJSON |
		self fromReified: someJSON ]
!

fromReified: aReifiedJSON
	"Answers a new instance of this mapless and returns it
	in sync with aReifiedJSON."

	| modelClass |

	modelClass := aReifiedJSON at: 'modelClass' ifAbsent:[ ^nil ].
	
	modelClass := Smalltalk globals at: modelClass ifAbsent:[ nil ].
	
	^ modelClass new syncWith: aReifiedJSON
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

manyFromJSON: someJSONString

	^ (JSON parse: someJSONString) collect:[ :each |
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

onAfterRead: aResponse

	self trigger: 'afterRead'.

	aResponse status ~= 200 ifTrue:[
		MaplessError signal: 'Could not read ', self name,':  ', aResponse responseText].
		
	^ self fromJSON: aResponse responseText
!

onAfterReadAll: aResponse

	aResponse status ~= 200 ifTrue:[
		MaplessError signal: 'Could not read all ', self name,':  ', aResponse responseText].
		
	^ self manyFromJSON: aResponse responseText
!

onAfterReadSome: aResponse

	aResponse status ~= 200 ifTrue:[
		MaplessError signal: 'Could not read all ', self name,':  ', aResponse responseText].
		
	^ self manyFromJSON: aResponse responseText
! !

Mapless subclass: #MaplessModel
	instanceVariableNames: ''
	package: 'MiniMapless'!

!MaplessModel methodsFor: 'initialization'!

initialize

	super initialize.

	self initializeInstanceVersion.
	self id: self class newUUID.
! !

!MaplessModel methodsFor: 'reactions'!

onAboutToDelete

	super onAboutToDelete.
	
	self deletedOn: Date now
!

onAboutToSave

	super onAboutToSave.
	
	self updatedOn: Date now
!

onAboutToUpdate

	super onAboutToUpdate.
	
	self updatedOn: Date now
! !

Error subclass: #MaplessError
	instanceVariableNames: ''
	package: 'MiniMapless'!

