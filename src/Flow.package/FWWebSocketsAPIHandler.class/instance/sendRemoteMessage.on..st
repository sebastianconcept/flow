actions
sendRemoteMessage: aMessage on: aRemote
	"Use aRemote to send aMessage to the instance at the other side of the wire."
	
	self 
		sendSelector: aMessage selector
		arguments: aMessage arguments
		to: aRemote id
		on: aRemote client
		do: [ :ans | aRemote promise resolve: ans answer ]
		onError: [ :x | aRemote promise reject: x ].

	^ aRemote
