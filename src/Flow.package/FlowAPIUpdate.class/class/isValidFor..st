testing
isValidFor: aRequest
	"Answers true if aRequest should be processed by an instance of this class of command."

	^ (self isBasePathValidFor: aRequest) and:[
	aRequest method = #PUT and:[
	aRequest uri segments third = 'bids' and:[

	( aRequest uri segments size = 3 or:[

	( aRequest uri segments size = 4 and:[
	aRequest uri segments last = #/ ] ) ] ) ] ] ]