actions
setupServer

	"Handlers for Amber frontend code.
	We're probably going to deprecate this in favor of amber's own node based server"

	"Flow isProduction ifFalse:[ 
		ZnServer default delegate	
			addHandler: FlowJsCodeHandler new;
			addHandler: FlowStCodeHandler new;
			yourself]."

	"Setting up the custom WebSocket handler for cowlinq"
	(ZnServer managedServers detect:[:e|
		e port = (ConfigurationFiles at: 'API' at: 'websocketOn')]) 
			delegate: (FlowWebSocketDelegate new
						addHandler: FlowWebSocketsAPI new;
						yourself).
		
	"Setting up the RESTful handler for the Cowlinq API"
	ZnServer default delegate	
		addHandler: FlowAPIv10Handler new;
		addHandler: (FlowFilesHandler for: (FileLocator imageDirectory / 'service') resolve fullName base: 'service');
		yourself.
	