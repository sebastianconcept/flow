actions
then: aFulfillBlock

	^ self 
		then: aFulfillBlock 
		ifRejected: [ :reason | 
			self errorDueTo: reason ]