actions
reject: aReason

	| answer |
	
	answer := onRejected value: aReason.
	self beRejected.
	reason := answer.
	self hasKarma ifTrue: [ 
		karma reject: reason ].
	
	^ answer 