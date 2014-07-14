actions
process: aMessage on: aClient
	"Some client has sent aMessage.
	It's time to chew it."
	
	| command |
	
	[ command := FWAPIv10WebSocketCommand fromJSONString: aMessage ]
		on: Error 
		do:[ :x | 
			command := BadCommand  new
							problematic: aMessage;
							exception: x asString;
							yourself ].
	
	command ifNotNil:[
		"We are currently ignoring commands that we don't understand"
		command reactOn: self from: aClient ]