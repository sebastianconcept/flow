actions
getDeal: aRequest 

	| anId deal |
	
	anId := aRequest uri queryAt: 'id'.
	
	self databaseDo:[
		deal := CQDeal findAt: anId].
	
	^ ZnResponse ok: (ZnStringEntity text: deal asJSONString)