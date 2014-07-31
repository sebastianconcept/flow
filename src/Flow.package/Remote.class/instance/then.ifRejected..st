actions
then: aFulfillBlock ifRejected: aReasonBlock
	"Makes the promise to either fullfill or reject these blocks."

	self promise then: aFulfillBlock ifRejected: aReasonBlock