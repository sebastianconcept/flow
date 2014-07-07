tests
testUpdate
	
	| anId registeredThing apiResponse  |
	
	anId := UUID new asString36.
	registeredThing := Thing new id: anId; production: 'a bunch'; memes: 'very good ones'; yourself.

	self do:[
		self assert: (Thing findAt: registeredThing id) isNil.
		registeredThing save.
		self assert: (Thing findAt: registeredThing id) notNil.
		self assert: (Thing findAt: registeredThing id) production = 'a bunch'.
		].

	registeredThing production: 'quite a lot'.
	
	apiResponse := ZnEasy 
						put: self apiUrl,'/things' 
						data: (ZnStringEntity text: registeredThing asJSONString).
	
	self do: [	
		self assert: (Thing findAt: registeredThing id) notNil.
		self assert: (Thing findAt: registeredThing id) production = 'quite a lot'].


