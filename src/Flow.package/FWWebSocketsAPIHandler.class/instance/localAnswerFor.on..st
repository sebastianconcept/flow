actions
localAnswerFor: aWebSocketCommand on: aClient
	"Executes the callback waiting for this command's answer.
	It's done by evaluating the callback waiting for aWebSocketCommand.
	It also removes it from the dictionary because is not pending for it anymore."
	
	| callback |
	
	(aWebSocketCommand isException notNil and:[
	aWebSocketCommand isException ]) ifTrue:[ 
		"If it's a remote exception it will execute the local error callback with it"
		^ (self localErrorFor: aWebSocketCommand) value: (FWRemoteException for: aWebSocketCommand) ].
	
	callback := self localAnswers 
				at: aWebSocketCommand bId
				ifAbsent:[ self error: 'No callback found for this ', aWebSocketCommand asString ].

	self localAnswers 
		removeKey: aWebSocketCommand bId
		ifAbsent:[ nil ].
		
	callback value: aWebSocketCommand