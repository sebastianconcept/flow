actions
sendRemoteMessage: aMessage on: aRemote

	self 
		sendSelector: aMessage selector
		arguments: aMessage arguments
		to: aRemote id
		on: aRemote client
		do: [ :ans | "aRemote future resolve: ans" ];
		onError: [ :x | x signal ].
		
	aRemote onMessageSent