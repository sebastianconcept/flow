actions
for: aFulfillBlock
	"Returns the promise of fulfilling the block"

	^ self new 
		then: aFulfillBlock;
		yourself 