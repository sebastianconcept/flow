actions
valueOn: aHandler 
	"Executes this command for aHandler and the request ."
		
	^ self databaseDo: [ | objectSent foundOrNil |
		objectSent := self apiObjectClass fromJSONString: self request contents.
		foundOrNil := objectSent class findAt: objectSent id.
		foundOrNil 
			ifNil: [ 
				objectSent save.
				ZnResponse ok: (ZnStringEntity text: true asJSONString) ]
			ifNotNil:[ ZnResponse serverError: 'Id already in use. No ',objectSent class name,' was created.' ] ]
	 