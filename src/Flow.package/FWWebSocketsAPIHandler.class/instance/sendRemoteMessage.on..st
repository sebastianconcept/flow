actions
sendRemoteMessage: aMessage on: aRemote
	"Use aRemote to send aMessage to the instance at the other side of the wire."
	
	self 
		sendSelector: aMessage selector
		arguments: aMessage arguments
		to: aRemote id
		on: aRemote client
		do: [ :res | | ans |
			ans := res answer.
			ans isRemoteReference ifTrue:[
				ans := ans asRemote "If the answer is a remote reference, we want to answer the remote"].
			aRemote promise resolve: ans.
			aRemote initializePromise ]
		onError: [ :x | 
			x class = Halt ifTrue:[self halt].
			aRemote promise reject: x ].

	^ aRemote
