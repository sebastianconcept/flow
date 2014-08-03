actions
doesNotUnderstand: aMessage
	"Route aMessage to the client so it gets sent to the receiver in the other end.
	Answers this very remote because is a 'thenable' so you can send it 
	then: and then:ifRejected: that will be executed once the answer comes to
	either fulfill or reject the promise"
	
	"Transcript cr; show: aMessage; flush."
	self promise hasOnFulfilled ifFalse:[
		"If no expectation pre-set, then..."
		self then: self class defaultFulfillment ].

	App webSocketAPI sendRemoteMessage: aMessage on: self.


