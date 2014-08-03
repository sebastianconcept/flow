actions
processFor: aClient on: aHandler
	"Executes this command comming from aClient on aHandler
	loading the answer in it."
	
	self answer: (Dictionary new
					at: #pongOn put: DateAndTime now;
					yourself)