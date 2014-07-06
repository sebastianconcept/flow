actions
prospect: aRequest 

	| prospect |

	prospect := RModel fromJSONString: aRequest contents keys first.

	self databaseDo:[ 
		prospect save].

	self notifyProspect: prospect.

	^ ZnResponse ok: (ZnStringEntity text: ':)') 