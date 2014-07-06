actions
start

	self startHttpd.
	
	self startTimer.

	self startVNC.
	
	self startWebsocket.
	self setupServer.
