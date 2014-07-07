tests
testCreate
	
	| anId aThing apiResponse  |
	
	anId := UUID new asString36.
	aThing := Thing new id: anId; something: 'this'; has: 355.25; yourself.

	self do:[
		self assert: (Thing findAt: aThing id) isNil].
	
	apiResponse := ZnEasy 
						post: self apiUrl,'/things' 
						data: (ZnStringEntity text: aThing asJSONString).

	self do:[
		self assert: (Thing findAt: anId) notNil.
		self assert: (Thing findAt: anId) id = anId.
		self assert: (Thing findAt: anId) something = 'this'.
		self assert: (Thing findAt: anId) has = 355.25.
		].

