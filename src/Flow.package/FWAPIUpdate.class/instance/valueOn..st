actions
valueOn: aHandler 
	"Executes this command for aHandler and the request .
	This update is actually an upsert."
		
	^ self databaseDo: [ | objectSent foundOrNil |
		objectSent := self apiObjectClass fromJSONString: self request contents.
		foundOrNil := objectSent class findId: objectSent id.

		foundOrNil 
			ifNil:[ ZnResponse serverError: 'No object found for updating at ', objectSent id ]
			ifNotNil:[
				#todo. "compare versions and do conflict resolution if they don't match.
				That might happen when a user writes in a model and another user tries too but in a, now  old, version.
				http://martinfowler.com/eaaCatalog/optimisticOfflineLock.html"
				objectSent save.
				ZnResponse ok: (ZnStringEntity text: true asJSONString) ] ]
