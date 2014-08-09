actions
then: aFulfillBlock

	^ self 
		then: aFulfillBlock 
		ifRejected: [ :reason | 
			self _errorDueTo: reason ]