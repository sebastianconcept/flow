actions
remoteAnswerFor:  aWebSocketCommand on: aClient
	"Sends aWebSocketCommand to the other end."

self halt.
aWebSocketCommand asJSONString.  