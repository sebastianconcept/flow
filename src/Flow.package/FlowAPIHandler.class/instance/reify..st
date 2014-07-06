actions
reify: someJSON
	"Answers a model reified from someJSON.
	AKA inflates that JSON :)"

	^ self modelClass fromJSON: someJSON