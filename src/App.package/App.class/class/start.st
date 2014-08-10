actions
start

	self reset.

	self startHttpd.
	
	self startTimer.

	self startVNC.
	
	self setupServer.

	self publishObjects