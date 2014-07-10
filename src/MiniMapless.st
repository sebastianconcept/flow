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

	| selector expects object|

	selector := #createdOn.
	expects := Date.

	object := self at: selector asString.
	object ifNil:[^nil].

	(object isKindOf: expects) ifTrue:[^object].

	^ self at: selector asString put: (self dateAndTimeAt: selector).
!

createdOn: aDate

	self at: #createdOn put: aDate
!

data

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
	"Answers the reified submodel (instantiating if necessary)."
	
	| subModelData modelClass |

	subModelData := data at: aSelector.
	subModelData ifNil:[^nil].
	
	modelClass := subModelData at: 'modelClass'.
	modelClass ifNil:[^nil].
	modelClass := Smalltalk current at: modelClass.

	modelClass ifNil:[^self error: 'Cannot find ',aSelector asString,'''s class for this metadata'].
	
	^ modelClass fromReified: subModelData
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

	^ self createDo:[nil]
!

createDo: aBlock

	jQuery ajax: #{
		'url' -> self path.
		'type' -> 'POST'.
		'cache' -> false.
		'data' -> self asJSONString.
		'success' -> [:x| self onAfterCreate: x done: aBlock].
		'fai' -> [:x| ModelCreateError signal: 'Could not create ', self class name,':  ', x responseText].
		'error' -> [:x| ModelCreateError signal: 'Could not create ', self class name,':  ', x responseText]}.

	^ self
!

delete

	self deleteDo:[nil]
!

deleteDo: aBlock

	jQuery ajax: #{ 
		'url' -> (self path, '?id=',self id asString).
		'type' -> 'DELETE'.
		'cache' -> false.
		'data' -> self asJSONString.
		'success' -> [:x| self onAfterDelete: x done: aBlock].
		'fail' -> [:x| self onDeleteFail: x].
		'error' -> [:x| self onDeleteFail: x]}
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

get: anAttribute from: aPart
	
	<return aPart[anAttribute]>
!

localDelete

	self class localDelete: self
!

localSave

	self class localSave: self
!

newJSObject
	<return Object>
!

refresh
	"Re-read this model's state."

	self refreshDo:[nil]
!

refreshDo: aBlock
	"Re-read this model's state."

	jQuery ajax: #{ 
		'url' -> (self path, '?id=',self id asString).
		'type' -> 'GET'.
		'cache' -> false.
		'success' -> [:x| self onAfterRefresh: x done: aBlock].
		'fail' -> [:x| self onRefeshFail: x].
		'error' -> [:x| self onRefreshFail: x]}
!

remoteSaveDo: aBlock

	jQuery ajax: #{ 
		'url' -> self path.
		'type' -> 'PUT'.
		'cache' -> false.
		'data' -> self asJSONString.
		'success' -> [:x| self onAfterSave: x done: aBlock].
		'fail' -> [:x| self onSaveFail: x].
		'error' -> [:x| self onSaveFail: x]}
!

save
	^ self saveDo:[nil]
!

saveDo: aBlock

	self localSave.
	self remoteSaveDo: aBlock
!

syncFrom: someJson

	^ self syncWith: (self class reify: someJson)
!

syncWith: aReifiedJSON
	"Sync the current values in this model 
	with the ones coming in aReifiedJSON."

	aReifiedJSON ifNil:[ ^ nil ].

	((aReifiedJSON at: 'modelClass') isNil or:[
	(aReifiedJSON at: 'modelClass') ~= self class name ]) ifTrue:[
		self error: 'This JSON does not fit here' ].

	data := aReifiedJSON
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
	"This model is about to be stringified in JSON.
	All inst var values that are expected to be model objects, need to be stringify friendly after this."
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

onAfterCreate: x done: aBlock

	data := self class reify: x.

	self trigger: 'afterCreated'.
	
	aBlock value: self
!

onAfterDelete: x done: aBlock
	
	self trigger: 'afterDeleted'.

	aBlock value: self
!

onAfterRefresh: x done: aBlock

	self syncWith: (self class reify: x).
	self trigger: 'afterRefeshed'.
	aBlock value: self
!

onAfterSave: x done: aBlock
	
	self trigger: 'afterSaved'.

	aBlock value: self
!

onDeleteFail: x

	self error: 'Could not delete ', self class name
!

onRefreshFail: x

	self error: 'Could not refresh ', self class name
!

onSaveFail: x

	self error: 'Could not save ', self class name
! !

!Mapless methodsFor: 'testing'!

= anObject

	^ (anObject respondsTo: #id) and:[
	self id = anObject id]
!

isKeyword: aSelector

	^ aSelector asString includes: ':'
!

isObjectPart: aPart
	<return typeof part=='object'>
!

isUnary: aSelector

	^ (aSelector asString includes: ':') not
!

isUndefinedPart: aPart
	<return aPart=='undefined'>
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

	^ self new syncFrom: someJSON
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
	
	modelClass := Smalltalk current globals at: modelClass.
	
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
	aBlock value: reified.
	^ reified
! !

