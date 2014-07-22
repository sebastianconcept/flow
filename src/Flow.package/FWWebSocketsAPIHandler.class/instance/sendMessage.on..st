actions
sendMessage: aMessageSend on: aClient
	"Makes aMessageSend  to happen in aClient"

	self sendMessage: aMessageSend 
		on: aClient 
		do: [ "ignores answer" #todo "for feedback, it could default to log it somewhere" ]