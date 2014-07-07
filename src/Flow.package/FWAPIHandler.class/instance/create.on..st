actions
create: aModelClass on: aRequest
	
	| newOne app |

	app := self applicationFrom: aRequest.
	newOne := aModelClass new.

	self onBeforeCreate: newOne on: app.

	^ self answerJSONFor: newOne