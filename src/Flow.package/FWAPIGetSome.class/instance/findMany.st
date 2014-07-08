actions
findMany
	"Query the database with the information given in the request
	and return the objects found"
	
	| conditions |
	
	conditions := Json readFrom: (self class sanitizePayload: self request contents) readStream.
	^ self apiObjectClass find: conditions
	
	 