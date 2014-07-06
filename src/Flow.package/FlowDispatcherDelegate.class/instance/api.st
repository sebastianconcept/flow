accessing
api 

	^ self handlers detect:[:e| e isKindOf: FlowAPIHandler]