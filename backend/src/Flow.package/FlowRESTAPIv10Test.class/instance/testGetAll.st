tests
testGetAll

	| anId registeredOnes apiResponse answeredOnes |
	
	anId := UUID new asString36.
	
	self do:[
		registeredOnes := Thing findAll].

	apiResponse := ZnEasy get: self apiUrl,'/things'.

	answeredOnes := MaplessMongo fromJSONString: apiResponse contents.

	answeredOnes do:[ :answeredOne |
		self assert: (registeredOnes anySatisfy:[ :registeredOne | answeredOne = registeredOne ])]
