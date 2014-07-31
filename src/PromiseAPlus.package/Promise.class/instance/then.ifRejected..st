actions
then: fulfilledBlock ifRejected: rejectedBlock
	"Makes this promise to either fullfill or reject the sent blocks.
	If this promise already have a duty then it will start accumulating karma."

	self hasDuty 
		ifFalse:[
			onFulfilled := fulfilledBlock.
			onRejected := rejectedBlock ]
		ifTrue:[ 
			self hasKarma 
				ifFalse:[ karma := Promise new then: fulfilledBlock ifRejected: rejectedBlock ]
				ifTrue:[ karma then: fulfilledBlock ifRejected: rejectedBlock ] ]
	