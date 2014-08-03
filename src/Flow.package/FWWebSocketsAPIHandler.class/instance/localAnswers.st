accessing
localAnswers
	"Returns the dictionary of callbacks that are waiting for its commands' answer.
	The convention is to use the ids provided by the counter in the keys
	and the callbacks in the values."
	
	^ localAnswers ifNil:[ localAnswers := Dictionary new ]