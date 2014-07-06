accessing
handlerFor: aRequest
	"Answer a reaction handler for aRequest (or nil if can't find one)"
	
	^ self handlers
			detect:[:each| each isHandlerFor: aRequest]
			ifNone:[nil]

