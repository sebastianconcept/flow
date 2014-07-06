actions
process: aMessage on: socket
	"Some client has sent aMessage.
	It's time to chew it."
	
	| command |

	command := RModel fromJSONString: aMessage.
	"Transcript cr; show: command; flush."
	command processOn: self from: socket.