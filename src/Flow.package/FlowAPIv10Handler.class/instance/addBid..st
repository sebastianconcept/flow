actions
addBid: aRequest 

	| command |

	command := CQAddBid fromJSONString: aRequest contents keys first.
	
	self databaseDo:[ | bid |
		bid  := command bid.
		bid save].

	^ ZnResponse ok: (ZnStringEntity text: ':)')