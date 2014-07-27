actions
processFor: aClient on: aHandler
	"Executes this command comming from aClient on aHandler
	loading the answer in it."
	
	self answer: (Dictionary new
					at: #echoes put: self content;
					yourself)