reactions
onClient: aWebSocket	
	"Handle a new incoming web socket connection."
	
	| clientsChange |
	
	self purgeClients.
	
	[self register: aWebSocket.
	aWebSocket runWith: [:message|
		aWebSocket log info: [ 'Received message: ', message printString ].
		self process: message on: aWebSocket]]
			on: ConnectionClosed 
			do: [
				aWebSocket log debug: 'Connection close, cleaning up...'.
				self unregister: aWebSocket].
	
	"Broadcast to clients the new number of connected clients"
	[clientsChange :=  RChangeClients for: self.
	clientsChange clients ifNotNil:[
		self sendToAll: clientsChange]]
			on: ConnectionClosed 
			do: [:x| self unregister: x signaler].