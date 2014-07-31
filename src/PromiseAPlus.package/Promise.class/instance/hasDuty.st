testing
hasDuty
	"Answers true if this promise has already things to do either onFulfilled or onRejected"
	
	^ onRejected notNil or:[
	onFulfilled notNil ]