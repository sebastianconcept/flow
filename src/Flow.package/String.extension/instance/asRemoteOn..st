*flow
asRemoteOn: aClient
	"Returns a fresh instance of a remote object in aClient based on this string"
	
	^ Remote 
		for: self 
		on: aClient