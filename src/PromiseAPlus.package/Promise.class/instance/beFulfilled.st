actions
beFulfilled

	self isRejected ifTrue:[ self error: 'This promise is already rejected' ].

	state := #fulfilled