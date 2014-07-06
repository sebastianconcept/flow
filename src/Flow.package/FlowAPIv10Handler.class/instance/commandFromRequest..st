accessing
commandFromRequest: aRequest
	"Answers the command that this handler can discern from aRequest.
	Note: the convention is to return some sanitized method name to be performed by this handler."
	
	aRequest uri segments. 
	self halt.