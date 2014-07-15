actions
publish: anObject at: anId
	"Holds anObject among those exposed to receive remote messages."
	^ self published at: anId put: anObject