accessing
handlerFor: aRequest 
	"Answer which handler in this server can take care of aRequest
	(or nil if none found)."
	
	^ ZnServer default delegate handlers 
		detect:[:e| e isHandlerFor: aRequest]
		ifNone:[nil]
	