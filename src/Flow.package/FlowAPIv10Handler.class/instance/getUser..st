actions
getUser: aRequest 

	| anId user |
	
	anId := aRequest uri queryAt: 'id'.
	
	self databaseDo:[
		user := CQUser findAt: anId].
	
	^ ZnResponse ok: (ZnStringEntity text: user asJSONString)