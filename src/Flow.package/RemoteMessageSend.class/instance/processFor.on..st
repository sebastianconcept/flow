actions
processFor: aClient on: aHandler
	"Executes this command comming from aClient on aHandler
	loading the answer in it."

	| receiver answer |
	self halt.
	[ receiver := aHandler published
		at: self receiverId
		ifAbsent:[ self error: 'There is no "',self receiverId asString,'" published here' ].
	answer := receiver 
				perform: self selector asSymbol 
				withArguments: self arguments.
	(answer respondsTo: #jsonWriteOn:) ifFalse:[
		"We'll start with a poor's man remote interaction."
		answer := answer asString ].
	aHandler 
		send: (self answer: answer; yourself)
		to: aClient  ]
			on: Error 
			do:[ :x | 
				aHandler 
					send: (self answer: x asString; isException: true; yourself)
					to: aClient  ]