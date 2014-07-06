actions
removeUser: aRequest 

	| command |
	
	command := CQRemoveUser fromJSONString: aRequest contents keys first.

	self databaseDo:[ | freshUser |
		freshUser := CQUser findAt: command user id.
		freshUser destroy].

	^ ZnResponse ok: (ZnStringEntity text: ':)')