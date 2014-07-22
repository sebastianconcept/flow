actions
receivedFrom: aClient on: aHandler
	"This command has been received from aClient by aHandler.
	Time to react depending in this being an answer or not..."
	
	self hasAnswer 
		ifTrue:[ 
			"Is frontend's answer of a previous command"
			self onAnsweredBy: aClient on: aHandler ]
		ifFalse:[ 
			"Is the frontend taking initiative"
			self onCommandFrom: aClient on: aHandler ]
	