Smalltalk createPackage: 'Flow-API'!
Object subclass: #API
	instanceVariableNames: ''
	package: 'Flow-API'!

API subclass: #RESTfulAPI
	instanceVariableNames: ''
	package: 'Flow-API'!

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
	package: 'Flow-API'!

Object subclass: #Client
	instanceVariableNames: 'rest webSocket'
	package: 'Flow-API'!

