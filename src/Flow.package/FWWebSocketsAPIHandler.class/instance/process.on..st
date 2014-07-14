actions
process: aMessage on: socket
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
	
	command processOn: self from: socket 