actions
notifyProspect: aProspect
	
	| contents |	
	contents := String streamContents: [:str|
		aProspect renderNotificationOn: str].

	Reactive mta 
		sendTo: (ConfigurationFiles at: 'Reactive' at: 'notifyAddress')
		from: (ConfigurationFiles at: 'Reactive' at: 'notifyAddress')
		subject: '[tasks] new ', aProspect yayOrFeedback, ' kind of prospect'
		body:  contents
		on: 'Reactive'