actions
localErrorFor: aWebSocketCommand
	"Evaluates the local error handler (or complain about the lack of one).
	Removes both, the error handler and the normal callback."
	
	| callback |
	
	callback := self localErrors  
		at: aWebSocketCommand bId
		ifAbsent:[ self error: 'No error callback found for this ', aWebSocketCommand asString ].

	self localErrors 
		removeKey: aWebSocketCommand bId
		ifAbsent:[ nil ].
		
	self localAnswers 
		removeKey: aWebSocketCommand bId
		ifAbsent:[ nil ].
		
	^ callback 