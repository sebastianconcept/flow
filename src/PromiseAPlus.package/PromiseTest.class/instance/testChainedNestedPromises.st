tests
testChainedNestedPromises

	"promises affect their accumulated karma."

	| p1 p2 p3 p4 returned a b c |

	p1 := Promise new.
	self assert: p1 isPending.
	p2 := [ :v | a := v + 13 ] promise.
	p3 := [ :v | b := v + 18 ] promise.
	p4 := [ :v | c := v + 1942 ] promise.
	
	returned := p1 
				then: [ :v | p2 resolve: v ];
				then: [ :v | p3 resolve: v ];
				then: [ :v | p4 resolve: v ];
				yourself.
				
	self assert: returned class = Promise.
	self assert: p1 hasDuty.
	self assert: p1 hasKarma.	

	p1 resolve: 11.
	
	self assert: a = 24.
	self assert: b = 42.
	self assert: c = 1984.
