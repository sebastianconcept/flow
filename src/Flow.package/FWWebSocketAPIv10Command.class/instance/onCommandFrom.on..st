reactions
onCommandFrom: aClient on: aHandler
	"This command arrived from aClient, time to execute and answer it"
	
	self executeFor: aClient on: aHandler