actions
send: aCommand to: aClient
	"Send aCommand aClient."

	aClient sendMessage: aCommand asJSONString