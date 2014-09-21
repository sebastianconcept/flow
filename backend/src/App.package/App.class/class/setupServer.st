actions
setupServer

	"Setting up a dispatcher for Zinc so we can use our handlers"
	(ZnServer managedServers detect:[:e|
		e port = (ConfigurationFiles at: 'API' at: 'websocketOn')]) 
			delegate: (FWDelegate new
						addHandler: FWWebSocketsAPIHandler new;
						yourself).
		
	"Setting up the RESTful handler for the flow-based app and static content"
	ZnServer default delegate	
		addHandler: FWRESTAPIv10Handler new;
		addHandler: (FWFilesHandler for: (FileLocator imageDirectory / 'service') resolve fullName base: 'service');
		yourself.
	