actions
resolve: aValue
	"Resolve this promise and call any doneCallbacks with anObject."
	
	self beFulfilled.
	value := aValue.
	onFulfilled value: value