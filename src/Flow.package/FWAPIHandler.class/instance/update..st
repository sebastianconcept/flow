actions
update: anId
	<put>
	<path: '/{anId}'>
	
	| aModel json |
	json := 	self requestContext request rawBody.

	aModel := self onBeforeUpdateFrom: json.
	 	
	^ self answerJSONFor: aModel