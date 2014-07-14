actions
processOn: aHandler from: aClient
	"Executes this command that came from aClient to aHandler ."
	
	aHandler 
		send: self
		to: aClient 