actions
sendSelector: aSymbol to: anObjectID on: aClient do: aBlock onError: anErrorBlock
	"Creates a remote message for the object published at anObjectID in aClient,
	using aSymbol without argumetns.
	Evaluates aBlock with the received answer"

	self sendSelector: aSymbol arguments: #() to: anObjectID on: aClient do: aBlock onError: anErrorBlock