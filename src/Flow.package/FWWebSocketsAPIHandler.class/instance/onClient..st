reactions
onClient: aWebSocket	
	"Handle a new incoming web socket connection."

	self purgeClients.
	
	[ self register: aWebSocket.
	aWebSocket runWith: [ :message |
		"Transcript cr; show: message."
		self onMessage: message from: aWebSocket ]]
			on: ConnectionClosed 
			do: [
				self unregister: aWebSocket].
	
	