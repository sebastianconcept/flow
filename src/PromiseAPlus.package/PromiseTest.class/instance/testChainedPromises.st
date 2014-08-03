tests
testChainedPromises

	"promises affect their accumulated karma."

	| p returned a b c |

	p := Promise new.
	
	self assert: p isPending.
	returned := p 
				then: [ :v | a := v + 13 ];
				then: [ :v | b := v +  18 ];
				then: [ :v | c := v + 1942 ];
				yourself.
	self assert: returned class = Promise.
	self assert: p hasDuty.
	self assert: p hasKarma.	
	p resolve: 11.
	self assert: a = 24.
	self assert: b = 42.
	self assert: c = 1984.
