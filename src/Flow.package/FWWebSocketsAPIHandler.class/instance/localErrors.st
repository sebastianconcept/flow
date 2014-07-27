accessing
localErrors
	"Returns the dictionary of callbacks that are waiting for
	 its commands' answer reacting if they are an exception.
	The convention is to use the ids provided by the counter in the keys
	and the callbacks in the values."
	
	^ localErrors ifNil:[ localErrors := Dictionary new ]