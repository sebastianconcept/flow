actions
bePending

	self isRejected ifTrue:[ self error: 'This promise is already rejected' ].
	self isFulfilled ifTrue:[ self error: 'This promise is already fulfilled' ].
	
	state := #pending