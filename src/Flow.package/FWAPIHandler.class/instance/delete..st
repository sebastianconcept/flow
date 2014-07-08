actions
delete: anId
	<delete>
	<path: '/{anId}'>
		
	| aModel |
	aModel := self readModel: anId.

	self onBeforeDelete: aModel.
	
	^ self answerJSONFor: aModel