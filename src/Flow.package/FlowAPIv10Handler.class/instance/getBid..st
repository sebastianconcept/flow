actions
getBid: aRequest 

	| anId bid |
	
	anId := aRequest uri queryAt: 'id'.
	
	self databaseDo:[
		bid := CQBid findAt: anId].
	
	^ ZnResponse ok: (ZnStringEntity text: bid asJSONString)