actions
remoteAnswerFor:  aClient on: aHandler
	"Tells the API to respond to the backend 
	with this command (assumes it's loading the answer already)"
	
	aHandler remoteAnswerFor: self on: aClient