reactions
onMessage: aMessage from: aClient
	"aClient has sent aMessage.
	It's time to chew it."
	
	| command |
	
	[ command := FWWebSocketAPIv10Command fromJSONString: aMessage ]
		on: Error 
		do:[ :x | 
			^ aClient sendMessage: ((BadCommand caused: x)
										whenReceiving: aMessage;
										yourself) asJSONString ].
	
	command ifNotNil:[
		"We are currently ignoring commands that we don't understand"
		command receivedFrom: aClient on: self ]