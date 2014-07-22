actions
executeFor: aClient on: aHandler
	"Executes this command comming from aClient on aHandler
	and performs the remote answer."
	
	[ self
		processFor: aClient on: aHandler;
		remoteAnswerFor: aClient on: aHandler ]
			on: Error 
			do:[ :x |
				self
					isException: true;
					answer: x asString;
					remoteAnswerFor: aClient on: aHandler ]
	