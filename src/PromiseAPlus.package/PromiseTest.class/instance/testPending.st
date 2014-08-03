tests
testPending

	"When pending, a promise:
		may transition to either the fulfilled or rejected state."

	| p |

	p := Promise new.
	
	self assert: p isPending.
	p bePending.
	self assert: p isPending.
	self deny:  p isFulfilled.
	self deny: p isRejected.