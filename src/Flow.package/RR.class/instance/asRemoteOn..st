actions
asRemoteOn: aClient
	"Returns a fresh instance of a remote object in aClient based on this remote reference"
	
	^ Remote 
		for: self id 
		on: aClient