actions
handle: aRequest with: aResponse
	
	| command |

	(self isValid: aRequest) ifFalse:[
		^ ZnResponse badRequest: aRequest ].

	command := FlowAPIv10Command fromRequest: aRequest.
	
	^ [ [ command valueOn: self ]
		on: ConnectionTimedOut
		do:[:x| ^ ZnResponse ok: (ZnStringEntity text: 'backend offline') ] ]
			on: Error
			do:[ :x| 
				Flow isProduction ifFalse:[self halt ].
				ZnResponse badRequest: aRequest ]