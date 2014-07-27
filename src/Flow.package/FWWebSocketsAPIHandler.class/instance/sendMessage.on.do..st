actions
sendMessage: aMessageSend on: aClient do: aBlock
	"Makes aMessageSend  to happen in aClient.
	Evaluates aBlock with the received answer"

	self sendCommand: (RemoteMessageSend new
							receiverId: aMessageSend receiver;
							selector: aMessageSend selector;
							arguments: aMessageSend arguments asArray;
							yourself)
		to: aClient
		do: aBlock
		onError: [ :x | x resignalAs: (FWAPIError signal: x asString) ]