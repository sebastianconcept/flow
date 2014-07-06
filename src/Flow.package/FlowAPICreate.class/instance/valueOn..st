actions
valueOn: aHandler 
	"Executes this command for aHandler and the request ."
		
	^ self databaseDo: [ | objectSent foundOrNil |
		objectSent := CQBid fromJSONString: self request contents.
		foundOrNil := CQBid findAt: objectSent id.
		foundOrNil 
			ifNil: [ 
				objectSent save.
				ZnResponse ok: (ZnStringEntity text: true asJSONString) ]
			ifNotNil:[ ZnResponse serverError: 'Id already in use. No object was created.' ] ]
	 