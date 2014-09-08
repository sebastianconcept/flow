actions
databaseDo: aBlock
	"Evaluates aBlock in the context of a database"

	^ MongoPool instance
		databaseAt: self databaseName
		do: [ ^ aBlock value ]
