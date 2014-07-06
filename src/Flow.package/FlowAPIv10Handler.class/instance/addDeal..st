actions
addDeal: aRequest 

	| command |

	command := CQAddDeal fromJSONString: aRequest contents keys first.
	
	self databaseDo:[ | deal |
		deal := command deal.
		deal save].

	^ ZnResponse ok: (ZnStringEntity text: ':)')