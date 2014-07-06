actions
handle: aRequest with: aResponse

	| handler |
	
	(self isValid: aRequest) ifFalse:[
		^ ZnResponse badRequest: aRequest].

	handler := self handlerFor: aRequest.

	^ handler
		ifNil:[ZnResponse notFound: aRequest uri]
		ifNotNil:[handler writeContentFrom: aRequest]