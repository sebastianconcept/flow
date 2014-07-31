actions
publishObjects
	"Expose some objects to the web sockets API so they are reachable for remote messages."
	
	App webSocketAPI 
		publish: Transcript at: 'Transcript';
		publish: [ :sent | sent ] at: 'echo';
		publish: [ :ping | #pong ] at: 'ping';
		yourself