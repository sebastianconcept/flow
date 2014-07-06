actions
updateCow: aRequest 

	| command |

	command := CQUpdateCow fromJSONString: aRequest contents keys first.
	
	self databaseDo:[ | updatedCow freshCow |
		updatedCow := command cow.
		freshCow := Thing findAt: updatedCow id.
		freshCow updateFrom: updatedCow.
		freshCow save].

	^ ZnResponse ok: (ZnStringEntity text: ':)')