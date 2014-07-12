tests
testGetOne
	
	| anId registeredOne apiResponse answeredOne |
	
	anId := UUID new asString36.
	registeredOne := Thing new id: anId; location: 'north!'; yourself.

	self do:[
		self assert: (Thing findId: registeredOne id) isNil].
	
	self do:[
		registeredOne save.
		self assert: (Thing findId: anId) notNil.
		self assert: (Thing findId: anId) id = anId.
		self assert: (Thing findId: anId) location = 'north!'.
		].
		
	apiResponse := ZnEasy get: self apiUrl,'/things/',anId.

	answeredOne := MaplessMongo fromJSONString: apiResponse contents.

	self assert: answeredOne notNil.
	self assert: answeredOne class = Thing.
	self assert: answeredOne id = anId.
	self assert: answeredOne location = 'north!'.

	apiResponse := ZnEasy get: self apiUrl,'/things/', UUID new asString36.

	self assert: apiResponse code = 404.
	