actions
readModel: anId
	"Answers the persisted instance of the model found at anId (or nil)"

	^ self onBeforeRead: anId