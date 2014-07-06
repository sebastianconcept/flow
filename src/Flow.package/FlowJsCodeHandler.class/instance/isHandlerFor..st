testing
isHandlerFor: aRequest
	"Answers true if this handler should take care of aRequest.
	Note: subclasses should specialize"

	^ (super isHandlerFor: aRequest) and:[
	'*.js' match: aRequest uri segments last]