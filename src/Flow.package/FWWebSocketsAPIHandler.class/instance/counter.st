accessing
counter
	"Answers the counter used in the ids the commands (instead of less compact UUIDs)"

	^ counter ifNil:[ counter := 1 ]