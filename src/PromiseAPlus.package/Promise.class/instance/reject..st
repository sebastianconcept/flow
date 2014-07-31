actions
reject: aReason

	self beRejected.
	
	reason := aReason.
	
	onRejected value: reason