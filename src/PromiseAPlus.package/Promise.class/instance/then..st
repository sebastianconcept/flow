actions
then:  fulfilledBlock

	self 
		then: fulfilledBlock 
		ifRejected: [ :r | r "just answer the value" ]