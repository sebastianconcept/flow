actions
valueOn: aHandler 
	"Executes this command for aHandler and the request ."
		
	^ self databaseDo: [ | newMaplessName |
		newMaplessName :=  self request contents.
		self halt.
		newMaplessName
			ifNil:[ ZnResponse ok: (ZnStringEntity text: false asJSONString) ]
			ifNotNil:[
				ZnResponse ok: (ZnStringEntity text: true asJSONString) ] ]
	 