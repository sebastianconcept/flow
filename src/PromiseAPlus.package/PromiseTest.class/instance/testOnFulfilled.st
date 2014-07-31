tests
testOnFulfilled

	"If onFulfilled is a function:
		it must be called after promise is fulfilled, with promise’s value as its first argument.
		it must not be called before promise is fulfilled.
		it must not be called more than once."

	| p after |

	p := Promise new.
	p onFulfilled: [ :v | after := v ].

	self assert: p isPending.
	self deny: p isFulfilled. 
	self deny: p isRejected.
	self assert: after isNil.
	p resolve: 42.
	self assert: after notNil.
	self assert: after = 42.
	self assert: p isFulfilled.
	self deny: p isRejected.
	
	