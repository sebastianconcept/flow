actions
read: anId
	<get>
	<path: '/{anId}'>
	
	^ self answerJSONFor: (self readModel: anId)