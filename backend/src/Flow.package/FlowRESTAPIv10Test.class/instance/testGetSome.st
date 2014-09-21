tests
testGetSome

	| anId registeredOnes apiResponse answeredOnes |
	
	anId := UUID new asString36.
	
	self do:[
		registeredOnes := Thing findAll].

	apiResponse := ZnEasy 
					post: self apiUrl,'/things/query'
					data: (ZnStringEntity text: '{"production": "quite a lot"}').

	answeredOnes := MaplessMongo fromJSONString: apiResponse contents.

	answeredOnes do:[ :answeredOne |
		self assert: (registeredOnes anySatisfy:[ :registeredOne | answeredOne = registeredOne ])]
