tests
testStuff

	| anId stuff apiResponse answeredOne answeredOnes |
	
	anId := UUID new asString36.
	stuff := Stuff new id: anId; something: 'this'; yourself.

	self do:[ self assert: (Stuff findAt: stuff id) isNil ].
	
	"Create"
	apiResponse := ZnEasy 
						post: self apiUrl,'/stuff' 
						data: (ZnStringEntity text: stuff asJSONString).

	self do:[ self assert: (Stuff findAt: anId) notNil ].

	"Retrieve one"
	apiResponse := ZnEasy get: self apiUrl,'/stuff/', anId.
	answeredOne := MaplessMongo fromJSONString: apiResponse contents.

	self do:[ 
		self assert: (Stuff findAt: answeredOne id) notNil.
		self assert: ((Stuff findAt: answeredOne id) = answeredOne) ].

	"Retrieve all"
	apiResponse := ZnEasy get: self apiUrl,'/stuff'.
	answeredOnes := MaplessMongo fromJSONString: apiResponse contents.

	self do:[
		answeredOnes do:[ :answered |
			self assert: (Stuff findAll anySatisfy:[ :stored | stored = answered ] ) ] ].

	"Retrieve some"
	apiResponse := ZnEasy 
					post: self apiUrl,'/stuff/query'
					data: (ZnStringEntity text: '{"something": "this"}').
	answeredOnes := MaplessMongo fromJSONString: apiResponse contents.

	self do:[
		answeredOnes do:[ :answered |
			self assert: (Stuff findAll anySatisfy:[ :registered | answered = registered ] ) ] ].

	"Update"			
	self do:[ 		
		stuff := Stuff new.
		stuff hasThis: 'once'.
		stuff save.
		self deny: (Stuff findAt: stuff id) hasThis = 'here'.
		stuff hasThis: 'here'.
		stuff save.
		self assert: (Stuff findAt: stuff id) hasThis = 'here'].
	
	stuff hasThis: 'there'.

	apiResponse := ZnEasy 
						put: self apiUrl,'/stuff/'
						data: (ZnStringEntity text: stuff asJSONString).

	self do:[ self assert: ((Stuff findAt: stuff id) hasThis = 'there') ].




	"Delete"			
	self do:[ 		
		stuff := Stuff new.
		self deny: (Stuff findAt: stuff id) notNil.
		stuff save.
		self assert: (Stuff findAt: stuff id) notNil ].
	
	apiResponse := ZnEasy delete: self apiUrl,'/stuff/', stuff id.

	self do:[ self assert: (Stuff findAt: stuff id) isNil ].
