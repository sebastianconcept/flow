reactions
onBeforeDelete: aModel on: aDatabase
	"This model is about to be deleted.
	This is a great chance to do something you could need about this."
	
	aDatabase delete: aModel