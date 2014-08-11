actions
valueOn: aHandler 
	"Executes this command for aHandler and the request ."
		
	^ self databaseDo: [ | newMaplessName |
		newMaplessName :=  self request contents.
		newMaplessName
			ifNil:[ ZnResponse ok: (ZnStringEntity text: false asJSONString) ]
			ifNotNil:[
				self scaffold: newMaplessName.
				ZnResponse ok: (ZnStringEntity text: true asJSONString) ] ]
	 