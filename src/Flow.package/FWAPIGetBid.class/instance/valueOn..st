actions
valueOn: aHandler 
	"Executes this command for aHandler and the request ."
		
	^ self databaseDo: [ | foundOrNil |
		foundOrNil := self apiObjectClass findAt: self request uri segments fourth.
		ZnResponse ok: (ZnStringEntity text: foundOrNil asJSONString) ]
	 