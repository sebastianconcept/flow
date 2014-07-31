actions
then:  fulfilledBlock
	"Sets aFulfilledBlock to be performed by this promise (or its karma)"
	
	self 
		then: fulfilledBlock 
		ifRejected: [ :r | r "just answer the value" ]