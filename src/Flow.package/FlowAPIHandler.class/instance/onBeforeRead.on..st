reactions
onBeforeRead: anId on: aDatabase
	"This model is about to be read.
	This is a great chance to do something you could need about this."

	^ (aDatabase read: self modelClass atId: anId) onRead