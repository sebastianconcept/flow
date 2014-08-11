testing
hasValidDetailsFor: aRequest 
	"Answers true if the lasts segments of the URI of aRequest 
	are looking good"
	
	"and do we even have a model to take care of this?"
	^ (self hasModelNameFor: aRequest uri segments third) and: [
	
	aRequest uri segments size = 4 or:[

	(aRequest uri segments size = 5 and:[
	aRequest uri segments last = #/ ] ) ] ]