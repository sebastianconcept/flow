actions
handleRequest: request
	"Server delegate entry point"

	"Transcript cr; show: request."

	(prefix isNil or: [ prefix = request uri pathSegments ])
		ifFalse: [ ^ ZnResponse notFound: request uri ].
	^ (self isValidWebSocketRequest: request)
		ifTrue: [ self webSocketResponseForRequest: request ]
		ifFalse: [ self restfulRequest: request ]