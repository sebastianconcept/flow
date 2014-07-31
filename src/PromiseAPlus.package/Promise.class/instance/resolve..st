actions
resolve: aValue
	"Resolve this promise and call any doneCallbacks with anObject."
	
	self beFulfilled.
	
	self hasKarma 
		ifTrue: [ 
			karma resolve: aValue.
			onFulfilled value: karma value.
			value := karma value ]
		ifFalse:[
			value := aValue.
			onFulfilled value: aValue ]
