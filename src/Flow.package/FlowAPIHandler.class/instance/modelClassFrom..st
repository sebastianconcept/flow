accessing
modelClassFrom: aRequest 
	"Answers the model referred by aRequest (or nil if absent or invalid)"
	
	^ [self modelClasses 
		detect: [:e| (e name copyFrom: 3 to: e name size) = aRequest uri segments third]
		ifNone:[nil]] on: Error do:[:x| nil ]