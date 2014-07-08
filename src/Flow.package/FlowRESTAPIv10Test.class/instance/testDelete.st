tests
testDelete
	
	| anId aThing apiResponse  |
	
	anId := UUID new asString36.
	aThing := Thing new id: anId; prospect: 'guy'; offer: 355.25; yourself.

	self do:[
		self assert: (Thing findAt: aThing id) isNil.
		aThing save.
		self assert: (Thing findAt: aThing id) notNil.
		self assert: (Thing findAt: aThing id) offer = 355.25.
		].
		
	apiResponse := ZnEasy delete: self apiUrl,'/things/', aThing id.

	self do:[
		self deny: (Thing findAt: anId) notNil.
		self assert: (Thing findAt: anId) isNil.
		].
