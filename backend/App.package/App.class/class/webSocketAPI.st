accessing
webSocketAPI

	^ (ZnServer managedServers 
		detect:[:srv| srv port = (ConfigurationFiles at: 'API' at: 'websocketOn')]
		ifNone:[nil])
			ifNotNilDo:[:srv| srv delegate websocketsHandler]