actions
reactOn: aHandler from: aClient
	"This command has arrived to aHandler from aClient, time to react to it."
	| receiver answer |
	
	[ receiver := aHandler published
		at: self receiverId
		ifAbsent:[ self error: 'There is no "',self receiverId asString,'" published here' ].
	answer := receiver perform: self selector withArguments: self arguments.
	(answer respondsTo: #jsonWriteOn:) ifFalse:[
		"We'll start with a poor's man remote interaction."
		answer := answer asString ].
	aHandler 
		send: self
		to: aClient  ]
			on: Error 
			do:[ :x | 
				aHandler 
					send: (self answer: x asString; isException: true; yourself)
					to: aClient  ]