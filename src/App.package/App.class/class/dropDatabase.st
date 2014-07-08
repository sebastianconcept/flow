actions
dropDatabase

	(self confirm: 'Wait whaaat? R U sure I should drop the MongoDB database named: ',FWRESTAPIv10Command databaseName,'? (no undo)') ifTrue:[
		OSProcess command: 'mongo ',FWRESTAPIv10Command databaseName,' --eval "db.dropDatabase()"']