accessing
published
	"Answers the dictionary holding the published objects 
	in 'this smalltalk' environment.
	Keys can be the instance's hash, a Mapless UUID, etc.
	Values are the instances receiving messages from remote."
	^ published ifNil:[ published := Dictionary new ]