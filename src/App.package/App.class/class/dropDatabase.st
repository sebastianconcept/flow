actions
dropDatabase

	(self confirm: 'Wait whaaat? R U sure I should drop the MongoDB database named: ',FlowAPIv10Command databaseName,'? (no undo)') ifTrue:[
		OSProcess command: 'mongo ',FlowAPIv10Command databaseName,' --eval "db.dropDatabase()"']