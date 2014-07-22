actions
sendSelector: aSymbol arguments: someArguments to: anObjectID on: aClient do: aBlock
	"Creates a remote message for the object published at anObjectID in aClient,
	using aSymbol and someArgumetns.
	Evaluates aBlock with the received answer"

	self sendMessage: (MessageSend 
							receiver: anObjectID 
							selector: aSymbol 
							arguments: someArguments asArray) 
		on: aClient 
		do: aBlock