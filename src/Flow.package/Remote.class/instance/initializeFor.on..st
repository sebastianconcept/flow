initialization
initializeFor: aRemoteObjectId on: aClient

	id := aRemoteObjectId.
	client := aClient.
	semaphore := Semaphore new.