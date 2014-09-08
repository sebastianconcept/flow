tests
testDelete
	
	| anId aThing apiResponse  |
	
	anId := UUID new asString36.
	aThing := Thing new id: anId; prospect: 'guy'; offer: 355.25; yourself.

	self do:[
		self assert: (Thing findId: aThing id) isNil.
		aThing save.
		self assert: (Thing findId: aThing id) notNil.
		self assert: (Thing findId: aThing id) offer = 355.25.
		].
		
	apiResponse := ZnEasy delete: self apiUrl,'/things/', aThing id.

	self do:[
		self deny: (Thing findId: anId) notNil.
		self assert: (Thing findId: anId) isNil.
		].
