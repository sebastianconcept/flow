reactions
onClient: aWebSocket	
	"Handle a new incoming web socket connection."

	Transcript cr; show: aWebSocket.
	self purgeClients.
	
	[ self register: aWebSocket.
	aWebSocket runWith: [ :message |
		CurrentFlowWebSocketClient value: aWebSocket during:[
			"Transcript cr; show: message."
			self onMessage: message from: aWebSocket ]]]
				on: ConnectionClosed 
				do: [
					self unregister: aWebSocket].
	
	