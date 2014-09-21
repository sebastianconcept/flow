reactions
onClient: aWebSocket	
	"Handle a new incoming web socket connection."
	
	self purgeClients.
	
	[self register: aWebSocket.
	aWebSocket runWith: [:message|
		aWebSocket log info: [ 'Received message: ', message printString ].
		self process: message on: aWebSocket]]
			on: ConnectionClosed 
			do: [
				aWebSocket log debug: 'Connection close, cleaning up...'.
				self unregister: aWebSocket].
	
	