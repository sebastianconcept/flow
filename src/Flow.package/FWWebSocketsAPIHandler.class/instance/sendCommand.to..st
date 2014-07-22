actions
sendCommand: aCommand to: aClient
	"Sends aCommand to aClient."

	aClient sendCommand: aCommand 
		to: aClient 
		do: [ :ans | "ignoring answer" ]