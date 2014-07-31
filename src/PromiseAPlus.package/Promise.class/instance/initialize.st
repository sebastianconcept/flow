initialization
initialize

	super initialize.
	
	state := #pending.
	onFulfilled := [ :val | "ignored" ].
	onRejected := [ :val | "ignored" ].
	
	