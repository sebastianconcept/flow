actions
sendCommand: aWebSocketCommand to: aClient do: anAnswerBlock onError: anErrorBlock
	"Sends aWebSocketCommand to aClient and 
	evaluates anAnswerBlock with the answer once it comes."

	self nextId.
	"Marks the commandwith a backend's id."
	aWebSocketCommand bId: self counter.

	self localErrors at: self counter put: anErrorBlock.
	self localAnswers at: self counter put: anAnswerBlock.

	aClient sendMessage: aWebSocketCommand asJSONString
	