actions
valueOn: aHandler 
	"Executes this command for aHandler and the request ."
		
	^ self databaseDo: [ | foundOrEmpty |
		foundOrEmpty := self apiObjectClass findAll.
		ZnResponse ok: (ZnStringEntity text: foundOrEmpty asJSONString) ]
	 