actions
fromRequest: aRequest
	"Answers an instance of the command valid for aRequest (or invalid command if nothing fits)"
	
	^ ( self allSubclasses
		detect: [ :commandClass | commandClass isValidFor: aRequest ] 
		ifNone: [ FlowAPIInvalidCommand ] ) 
			for: aRequest