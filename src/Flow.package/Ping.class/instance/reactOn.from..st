actions
reactOn: aHandler from: aClient
	"This command has arrived to aHandler from aClient, time to react to it."
	
	aHandler 
		send: (self pongOn: DateAndTime now; yourself)
		to: aClient 