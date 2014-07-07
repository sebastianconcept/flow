reactions
onBeforeUpdateFrom: someJson on: aDatabase
	"A model is about to be updated.
	This is a great chance to do something you could need about this."

	| aModel |

	aModel := self reify: someJson.
	
	^ aDatabase update: aModel