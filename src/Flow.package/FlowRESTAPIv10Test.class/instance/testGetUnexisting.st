tests
testGetUnexisting
	
	| anId  apiResponse  |
	
	anId := UUID new asString36.

	self do:[
		self assert: (Thing findAt: anId) isNil].
			
	apiResponse := ZnEasy get: self apiUrl,'/things/',anId.

	self assert: apiResponse contents = 'null'.
	self assert: (MaplessMongo fromJSONString: apiResponse contents) isNil
