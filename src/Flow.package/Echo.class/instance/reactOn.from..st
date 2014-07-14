actions
reactOn: aHandler from: aClient
	"This command has arrived to aHandler from aClient, time to react to it."
	
	aHandler 
		send: (self echoes: self content; yourself)
		to: aClient 