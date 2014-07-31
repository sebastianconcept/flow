actions
then: fulfilledBlock ifRejected: rejectedBlock
	"Makes this promise to either fullfill or reject the sent blocks.
	If this promise already have a duty it will start accumulating them in its karma."

	self hasDuty 
		ifTrue:[ 
			self hasKarma 
				ifFalse:[ karma := Promise new then: fulfilledBlock ifRejected: rejectedBlock ]
				ifTrue:[ karma then: fulfilledBlock ifRejected: rejectedBlock ] ]
		ifFalse:[
			onFulfilled := fulfilledBlock.
			onRejected := rejectedBlock ].
		