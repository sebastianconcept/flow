testing
isHandlerFor: aRequest
	"Answers true if this handler should take care of aRequest.
	Note: subclasses should specialize"

	^ aRequest method = #PUT and:[
	(aRequest uri segments includes: 'lib')]