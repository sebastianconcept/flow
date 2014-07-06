actions
addUser: aRequest 

	| command |

	command := CQAddUser fromJSONString: aRequest contents keys first.
	
	self databaseDo:[ | user |
		user := command user.
		user save].

	^ ZnResponse ok: (ZnStringEntity text: ':)')