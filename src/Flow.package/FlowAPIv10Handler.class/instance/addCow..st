actions
addCow: aRequest 

	| command |

	command := CQAddCow fromJSONString: aRequest contents keys first.
	
	self databaseDo:[ | cow |
		cow := command cow.
		cow save].

	^ ZnResponse ok: (ZnStringEntity text: ':)')