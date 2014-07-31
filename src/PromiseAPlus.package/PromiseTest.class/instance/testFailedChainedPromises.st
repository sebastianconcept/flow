tests
testFailedChainedPromises

	| p returned answer a aa b c screwed |

	p := Promise new.
	screwed := false.	
	self assert: p isPending.
	returned := p 
				then: [ :v | 
					a := v + 13.
					self error: 'screw it'.
					aa := 42 ] 
				ifRejected:[ :x | screwed := true. #sorryButItDidNotWork ];
				then: [ :v | b := v +  18 ];
				then: [ :v | c := v + 1942 ];
				yourself.
	self deny: screwed.
	self assert: returned class = Promise.
	self assert: p hasDuty.
	self assert: p hasKarma.	

	answer := p resolve: 11.

	self assert: a = 24.
	self deny: aa = 42.
	self deny: b = 42.
	self deny: c = 1984.

	self assert: screwed.
	self assert: answer isSymbol.
	self deny: p isFulfilled.
	self assert: p value isNil.

	self assert: p value isNil.
	self assert: p karma value isNil.
	self assert: p karma karma value isNil.
	self assert: p karma karma karma isNil.

	self assert: p reason notNil.
	self assert: p karma reason notNil.
	self assert: p karma karma reason notNil.
	
	self assert: p reason notNil.
	self assert: p karma reason notNil.
	self assert: p karma karma reason notNil.
	
	self assert: p reason = #sorryButItDidNotWork.
	self assert: p karma reason = #sorryButItDidNotWork.
	self assert: p karma karma reason = #sorryButItDidNotWork.
