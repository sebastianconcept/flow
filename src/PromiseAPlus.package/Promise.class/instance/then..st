actions
then:  fulfilledBlock

	self 
		then: fulfilledBlock 
		ifRejected: [ :r | "ignored" ]