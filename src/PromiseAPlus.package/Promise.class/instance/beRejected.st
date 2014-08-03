actions
beRejected

	self isFulfilled ifTrue:[ self error: 'This promise is already fulfilled' ].

	state := #rejected