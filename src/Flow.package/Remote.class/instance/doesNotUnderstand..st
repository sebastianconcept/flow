actions
doesNotUnderstand: aMessage
	"Route aMessage to the client so it gets sent to the receiver in the other end.
	Answers this very remote because is a 'thenable' so you can send it 
	then: and then:ifRejected: that will be executed once the answer comes to
	either fulfill or reject the promise"
		
	App webSocketAPI sendRemoteMessage: aMessage on: self.

