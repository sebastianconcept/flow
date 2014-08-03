accessing
fullfillBlockFor: aFulfillBlock on: aRemote
	"Answers a new fulfill block that ensures the answers 
	are remotes (instead of references) when appropiate"
	
	^ [ :resolvedResponse |  | remoteAnswer |
		resolvedResponse _isRemote ifFalse:[
			resolvedResponse class = RMS ifTrue:[
				remoteAnswer := resolvedResponse answer ].
			remoteAnswer isRemoteReference ifTrue:[
				"If the answer is a remote reference, we want to answer the remote"
				remoteAnswer := remoteAnswer asRemote ] ].
		"aFulfillBlock value: remoteAnswer."
		]