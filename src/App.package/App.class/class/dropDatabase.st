actions
dropDatabase

	(self confirm: 'Is it okay to drop the MongoDB database named: ',FWRESTAPIv10Command databaseName,'? (no undo)') ifTrue:[
		OSProcess command: 'mongo ',FWRESTAPIv10Command databaseName,' --eval "db.dropDatabase()"']