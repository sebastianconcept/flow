actions
addApplication: anApplication

	^ self applications 
		at: anApplication appName 
		put: anApplication