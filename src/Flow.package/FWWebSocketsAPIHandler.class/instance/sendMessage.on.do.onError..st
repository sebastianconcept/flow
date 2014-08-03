actions
sendMessage: aMessageSend on: aClient do: aBlock onError: anErrorBlock
	"Makes aMessageSend  to happen in aClient.
	Evaluates aBlock with the received answer"

	self sendCommand: (RMS new
							receiverId: aMessageSend receiver;
							selector: aMessageSend selector;
							arguments: aMessageSend arguments asArray;
							yourself)
		to: aClient
		do: aBlock
		onError: anErrorBlock