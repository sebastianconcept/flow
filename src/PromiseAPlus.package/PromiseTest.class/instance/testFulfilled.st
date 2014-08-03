tests
testFulfilled

	"When fulfilled, a promise:
		must not transition to any other state.
		must have a value, which must not change"

	| p |

	p := Promise new.
	p then:[:v|  v ].
	
	self assert: p isPending.
	p resolve: 42.
	self deny: p isPending.
	self assert:  p isFulfilled.
	self deny: p isRejected.
	self assert: p value = 42.
	self assert: p reason isNil.
	self should: [ p beRejected ] raise: Error.
	self should: [ p bePending ] raise: Error.
	