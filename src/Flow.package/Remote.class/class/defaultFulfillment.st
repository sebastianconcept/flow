accessing
defaultFulfillment
	"Answers a block for the default behavior of the promise onFulfilled.
	What we essentialy want is to use the answer further"

	^ [ :answer |  
		"simply return the answer"
		answer ]