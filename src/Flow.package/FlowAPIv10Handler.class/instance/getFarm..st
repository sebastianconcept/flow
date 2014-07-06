actions
getFarm: aRequest 

	| anId farm |
	
	anId := aRequest uri queryAt: 'id'.
	
	self databaseDo:[
		farm := CQFarm findAt: anId].
	
	^ ZnResponse ok: (ZnStringEntity text: farm asJSONString)