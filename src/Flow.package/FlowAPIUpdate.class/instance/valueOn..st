actions
valueOn: aHandler 
	"Executes this command for aHandler and the request ."
		
	^ self databaseDo: [ | objectSent foundOrNil |
		objectSent := CQBid fromJSONString: self request contents.
		foundOrNil := CQBid findAt: objectSent id.

		foundOrNil 
			ifNil:[ ZnResponse serverError: 'No object found for updating at ', objectSent id ]
			ifNotNil:[
				objectSent save.
				ZnResponse ok: (ZnStringEntity text: true asJSONString) ] ]
