actions
handle: aRequest with: aResponse
	
	| application action modelClass |

	(self isValid: aRequest) ifFalse:[
		^ ZnResponse badRequest: aRequest].
	
	application := self applicationFrom: aRequest.
	application ifNil:[
		^ ZnResponse badRequest: aRequest].

	^ application api handle: aRequest.
	
