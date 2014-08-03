tests
testOnRejected

	"If onRejected is a function,
		it must be called after promise is rejected, with promise’s reason as its first argument.
		it must not be called before promise is rejected.
		it must not be called more than once."

	| p after |

	p := Promise new.
	p onRejected: [ :r | after := r ].

	self assert: p isPending.
	self deny: p isFulfilled. 
	self deny: p isRejected. 
	self assert: after isNil.
	p reject: 1984.
	self assert: after notNil.
	self assert: after = 1984.
	self assert: p isRejected.
	self deny: p isFulfilled. 
	