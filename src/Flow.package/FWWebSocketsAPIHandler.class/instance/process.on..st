actions
process: aMessage on: socket
	"Some client has sent aMessage.
	It's time to chew it."
	
	| command |
	self halt.
	command := FWAPIv10WebSocketCommand fromJSONString: aMessage.
	"Transcript cr; show: command; flush."
	command processOn: self from: socket.