actions
sendCommand: aCommand to: aClient
	"Sends aCommand to aClient."

	self sendCommand: aCommand 
		to: aClient 
		do: [ :ans | "ignoring answer" ]