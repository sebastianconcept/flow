actions
sendCommand: aWebSocketCommand to: aClient do: anAnswerBlock
	"Sends aWebSocketCommand to aClient and 
	evaluates anAnswerBlock with the answer once it comes."

	self 
		sendCommand: aWebSocketCommand 
		to: aClient 
		do: anAnswerBlock 
		onError: [ :x | x resignalAs: (FWAPIError signal: x asString)  ]