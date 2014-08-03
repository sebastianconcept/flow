tests
testRejected

	"When rejected, a promise:
		must not transition to any other state.
		must have a reason, which must not change."

	| p screwed answer |

	screwed := false.
	p := Promise new.
	p 
		then:[:v| "ignore"] 
		ifRejected: [:r|  
			screwed := true.
			r].
	
	self assert: p isPending.
	self deny: screwed.
	answer := p reject: 1984.
	self assert: answer = 1984.
	self assert: screwed.
	self assert: p reason notNil.
	self assert: p reason = 1984.
	self deny: p isPending.
	self deny:  p isFulfilled.
	self assert: p isRejected.
	self deny: p value = 42.
	self deny: p value = 1984.
	self should: [ p beFulfilled ] raise: Error.
	self should: [ p bePending ] raise: Error.
