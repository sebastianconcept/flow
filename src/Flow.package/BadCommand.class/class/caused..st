as yet unclassified
caused: anException
	"Returns a new exception of BadCommand loaded with the answer"
	^ self new 
		answer: anException asString;
		yourself