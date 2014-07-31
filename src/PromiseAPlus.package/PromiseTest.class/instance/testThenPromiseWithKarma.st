tests
testThenPromiseWithKarma

	"promises affect their accumulated karma."

	| p returned a b c |

	p := Promise new.
	
	self assert: p isPending.
	returned := p 
				then: [ :v | a := v + 13 ];
				then: [ :v | b := v + 12 ];
				then: [ :v | c := v + 11 ];
				yourself.
	self assert: returned class = Promise.
	self assert: p hasDuty.
	self assert: p hasKarma.	
	p resolve: 31.
	self assert: p value = 31.
	self assert: p karma karma value = 31.
	self assert: c = 42.
	self assert: b = 43.
	self assert: a = 44.
		
