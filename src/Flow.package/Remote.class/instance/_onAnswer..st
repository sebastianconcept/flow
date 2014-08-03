reactions
_onAnswer: aRemotelyAnsweredObject

	"Transcript cr; show: anAnsweredObject."

	self promise resolve: aRemotelyAnsweredObject.
	
	self initializePromise 