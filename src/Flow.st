Smalltalk createPackage: 'Flow'!
Object subclass: #API
	instanceVariableNames: ''
	package: 'Flow'!

API subclass: #RESTfulAPI
	instanceVariableNames: ''
	package: 'Flow'!

!RESTfulAPI methodsFor: 'actions'!

delete: aString  do: aBlock onError: errorBlock

	'.loader' asJQuery show.

	jQuery ajax: aString options: #{
		'type' -> 'DELETE'.
		'contentType' -> 'text/json'.
		'complete' -> [:res |
			'.loader' asJQuery hide.
			res status = 200
				ifTrue: [aBlock value: res responseText]
				ifFalse: [errorBlock value: res]]
	}
!

get: aString  do: aBlock onError: errorBlock

	'.loader' asJQuery show.

	jQuery ajax: aString options: #{
		'contentType' -> 'text/json'.
		'complete' -> [:res |
			'.loader' asJQuery hide.
			res status = 200
				ifTrue: [aBlock value: res responseText]
				ifFalse: [errorBlock value: res responseText]]
	}
!

post: aString data: aString2 do: aBlock onError: errorBlock

	'.loader' asJQuery show.

	jQuery ajax: aString options: #{
		'type' -> 'POST'.
		'contentType' -> 'text/json'.
		'data' -> aString2.
		'complete' -> [:res |
			'.loader' asJQuery hide.
			res status = 200
				ifTrue: [aBlock value: res responseText]
				ifFalse: [errorBlock value: res]]
	}
!

put: aString data: aString2 do: aBlock onError: errorBlock

	'.loader' asJQuery show.

	jQuery ajax: aString options: #{
		'type' -> 'PUT'.
		'contentType' -> 'text/json'.
		'data' -> aString2.
		'complete' -> [:res |
			'.loader' asJQuery hide.
			res status = 200
				ifTrue: [aBlock value: res responseText]
				ifFalse: [errorBlock value: res]]
	}
! !

API subclass: #WebSocketAPI
	instanceVariableNames: ''
	package: 'Flow'!

Object subclass: #Client
	instanceVariableNames: 'rest webSocket'
	package: 'Flow'!

Widget subclass: #Controller
	instanceVariableNames: 'model'
	package: 'Flow'!

Controller subclass: #RouteableController
	instanceVariableNames: ''
	package: 'Flow'!
!RouteableController commentStamp!
## This is an abstraction. 

*Concrete subclasses know* if they are valid for a given URI so the app can be routed to them.

A typical web app might have:
1. home
2. sign up
3. sign in
4. many other app-specific controllers!

RouteableController subclass: #FlowApp
	instanceVariableNames: ''
	package: 'Flow'!

!FlowApp methodsFor: 'initialization'!

initialize

	super initialize.
	
	"Handy reference"
	window at: 'app' put: self
! !

!FlowApp methodsFor: 'reactions'!

onOpen

	self render.
	
	'#loader' asJQuery hide.
	
	window document title: self class name.
	
	Router observeHash.
! !

!FlowApp class methodsFor: 'actions'!

open
	"The foundation is ready, time to start this app!!"

	^ self new onOpen
! !

Object subclass: #Flow
	instanceVariableNames: ''
	package: 'Flow'!

MaplessModel subclass: #Model
	instanceVariableNames: ''
	package: 'Flow'!

Object subclass: #Router
	instanceVariableNames: ''
	package: 'Flow'!
!Router commentStamp!
This router observes changes in the URI and reacts accordingly.

The strategy is to collaborate intensively with controllers that understands #isValidFor: to flexibly know what to do with a pontentially complex URI!

!Router class methodsFor: 'accessing'!

route
	"Answers the current route."
	
	^ self uri replace: '^#/' with: ''
!

uri

	^ window location hash
! !

!Router class methodsFor: 'actions'!

observeHash

	window onhashchange:[ self onHashChanged ].
	self onHashChanged
! !

!Router class methodsFor: 'reactions'!

onHashChanged

	self trigger: 'aboutToRoute'.

	(RouteableController routeFor: self route) new render.
	
	self trigger: 'afterRouting'
! !

Object subclass: #Session
	instanceVariableNames: 'user client'
	package: 'Flow'!

!Object methodsFor: '*Flow'!

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
	
	^ (jQuery value: self) 
			trigger: anEventName 
			with: anArgument
!

when: anEventName do: aReactionBlock
	"Wires the observation of this object to the occurrence of anEventName.
	When (and if) anEventName happens, aReactionBlock will take place. 
	Godspeed!!"
	
	^ (jQuery value: self) 
		on: anEventName 
		do: aReactionBlock
! !

