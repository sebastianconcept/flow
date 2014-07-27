actions
remoteAnswerFor:  aWebSocketCommand on: aClient
	"Sends aWebSocketCommand to the other end."

	aClient sendMessage: aWebSocketCommand asJSONString

