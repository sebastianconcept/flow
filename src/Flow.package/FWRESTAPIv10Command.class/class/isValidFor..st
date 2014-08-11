testing
isValidFor: aRequest
	"Answers true if aRequest should be processed by an instance of this class of command."

	"Came in the right path?"
	^ (self isBasePathValidFor: aRequest) and:[
		
	"ok, what about the method?"
	(self acceptedMethods anySatisfy:[ :each|
		each = aRequest method ]) and:[
			
	"ok, and it ends in a sane way?"
	self hasValidDetailsFor: aRequest ] ]