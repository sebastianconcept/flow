testing
isValidFor: aRequest
	"Answers true if aRequest should be processed by an instance of this class of command."

	^ (self isBasePathValidFor: aRequest) and:[
	aRequest method = #DELETE and:[
	aRequest uri segments third = 'bids' and:[
	
	( aRequest uri segments size = 4 or:[

	( aRequest uri segments size = 5 and:[
	aRequest uri segments last = #/ ] ) ] ) ] ] ]