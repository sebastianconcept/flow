accessing
applicationFrom: aRequest
	"Answers the application to be used for the operations related to aRequest"
	
	^ self applications at: aRequest uri segments first 