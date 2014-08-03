tests
testThenPromise

	"then must return a promise."

	| p returned after |

	p := Promise new.
	
	self assert: p isPending.
	returned := p then: [ :v | after := v ].
	self assert: returned class = Promise.
	p resolve: 42.
	self assert: p value = 42.
	self assert: after = 42.
		
