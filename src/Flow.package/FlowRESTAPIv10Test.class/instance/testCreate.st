tests
testCreate
	
	| anId aThing apiResponse  |
	
	anId := UUID new asString36.
	aThing := Thing new id: anId; something: 'this'; has: 355.25; yourself.

	self do:[
		self assert: (Thing findId: aThing id) isNil].
	
	apiResponse := ZnEasy 
						post: self apiUrl,'/things' 
						data: (ZnStringEntity text: aThing asJSONString).

	self do:[
		self assert: (Thing findId: anId) notNil.
		self assert: (Thing findId: anId) id = anId.
		self assert: (Thing findId: anId) something = 'this'.
		self assert: (Thing findId: anId) has = 355.25.
		].

