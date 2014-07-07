testing
isValid: aRequest 

	^ (#(#GET #POST #DELETE #PUT) includes: aRequest method) and:[
	self isAboutModel: aRequest]