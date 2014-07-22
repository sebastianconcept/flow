actions
localAnswerFor: aWebSocketCommand on: aClient
	"Executes the callback waiting for this command's answer.
	It's done by evaluating the callback waiting for aWebSocketCommand.
	It also removes it from the dictionary because is not pending for it anymore."
	
	(self localAnswers 
		at: aWebSocketCommand bId
		ifAbsent:[ ^ nil ]) value: aWebSocketCommand.

	self localAnswers 
		removeKey: aWebSocketCommand bId
		ifAbsent:[ nil ]		