actions
resolve: aValue
	"Resolve this promise either fulfilling or rejecting"
	
	| answer |

	^ [
	onFulfilled isNil 
		ifTrue:[ answer := aValue ]
		ifFalse:[ answer := onFulfilled value: aValue ].
	value := answer.
	self beFulfilled.
	self hasKarma ifTrue:[
		karma resolve: answer ].
	answer ] 
			on: Error 
			do:[ :x | self reject: x ].
		
	
