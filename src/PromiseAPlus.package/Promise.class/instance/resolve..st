actions
resolve: aValue
	"Resolve this promise either fulfilling or rejecting"
	
	| answer |

	^ [ answer := onFulfilled value: aValue.
	self beFulfilled.
	value := aValue.
	self hasKarma ifTrue:[
		karma resolve: answer ].
	answer ] 
			on: Error 
			do:[ :x | self reject: x ].
		
	
