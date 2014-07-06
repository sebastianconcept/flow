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

MaplessModel subclass: #APIObject
	instanceVariableNames: ''
	package: 'Flow'!
!APIObject commentStamp!
## This is an abstraction.

*API Objects* can travel easily between backend and frontend over the wire (either for the RESTful API or reactively via WebSockets)!

APIObject subclass: #APICommand
	instanceVariableNames: ''
	package: 'Flow'!
!APICommand commentStamp!
## This is an abstraction.

*API Commands* will perform actions *on this side or the other side*

Concrete subclasses are concrete actions.!

APIObject subclass: #Model
	instanceVariableNames: ''
	package: 'Flow'!
!Model commentStamp!
## This is an abstraction.

*Models* store the valuable information maniplated by the app.

Typically they can be stored locally and/or remotelly in a non-transient, persistent, way.!

Object subclass: #Client
	instanceVariableNames: 'rest webSocket'
	package: 'Flow'!

Widget subclass: #Controller
	instanceVariableNames: 'model'
	package: 'Flow'!

!Controller methodsFor: 'actions'!

jQueryElement
	"Answers the jQuery element this controller must render contents in."

	"Isn't the controller's class name a good intuitive default?"
	^ self class name asJQuery
!

render
	"Renders the controller."

	self renderOn: (HTMLCanvas onJQuery: self jQueryParent)
!

renderOn: html
	"Renders this controller in the html canvas."
	
	"As default we render a big text with the class name
	so developers have feedback fast to move on and customize
	in concrete subclasses."
	html h1: self class name
! !

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

