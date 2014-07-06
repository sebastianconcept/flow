testing
isBasePathValidFor: aRequest
	"Answers true if aRequest has a path that matched the base path of this version of the API"
	
	| apiSegments requestSegments |

	apiSegments := FlowAPIv10Handler basePath subStrings: '/'.
	requestSegments := aRequest uri segments.
	
	^ requestSegments size >= 2 and:[
	requestSegments first = apiSegments first and:[
	requestSegments second = apiSegments second ] ]
	