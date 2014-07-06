actions
getCow: aRequest 

	| anId cow |
	
	anId := aRequest uri queryAt: 'id'.
	
	self databaseDo:[
		cow := Thing findAt: anId].
	
	^ ZnResponse ok: (ZnStringEntity text: cow asJSONString)