Smalltalk createPackage: 'MiniMapless-Tests'!
TestCase subclass: #MaplessTest
	instanceVariableNames: ''
	package: 'MiniMapless-Tests'!

!MaplessTest methodsFor: 'tests'!

testLocalFresh

	| createdOne loadedOne |
	
	createdOne := Thing new.
	
	createdOne remember: 42.
	createdOne localSave.
	
	self shouldnt: [
			loadedOne := Mapless localFindId: createdOne id.
			loadedOne remember: 'something'.
			self assert: loadedOne remember = 'something'.
			loadedOne localFresh.
			self deny: loadedOne remember = 'something'.
			self assert: loadedOne remember = 42.
		] raise: Error
!

testLocalSaveAndDelete

	| createdOne loadedOne |
	
	createdOne := Thing new.
	
	createdOne remember: 'something'.
	
	self deny: (window localStorage getItem: createdOne id) notNil.
	
	createdOne localSave.

	self shouldnt: [
		self assert: (window localStorage getItem: createdOne id) notNil.
		loadedOne := Mapless localFindId: createdOne id.
		self assert: loadedOne remember = 'something'.
		
		loadedOne localDelete.
		self assert: (window localStorage getItem: createdOne id) isNil.
		self assert: (Mapless localFindId: createdOne id) isNil.
		] raise: Error
!

testLocalSaveAndFindOne

	| createdOne loadedOne |
	
	createdOne := Thing new.
	
	createdOne remember: 'something'.
	
	self deny: (window localStorage getItem: createdOne id) notNil.
	
	createdOne localSave.

	self assert: (window localStorage getItem: createdOne id) notNil.

	self shouldnt: [
			loadedOne := Mapless localFindId: createdOne id.
			self assert: loadedOne class = Thing.
			self assert: loadedOne id = createdOne id.
			self assert: loadedOne remember = 'something'.
		] raise: Error
!

testLocalUpdate

	| createdOne loadedOne |
	
	createdOne := Thing new.
	
	createdOne remember: 'something'.
	
	self deny: (window localStorage getItem: createdOne id) notNil.
	
	createdOne localSave.

	self assert: (window localStorage getItem: createdOne id) notNil.

	self shouldnt: [
			loadedOne := Mapless localFindId: createdOne id.
			
			self assert: loadedOne class = Thing.
			self assert: loadedOne id = createdOne id.
			self assert: loadedOne remember = 'something'.
			self deny: loadedOne remember = 'else'.
			loadedOne remember: 'else'.
			self assert: loadedOne remember = 'else'.
			loadedOne localSave.
			loadedOne := Mapless localFindId: createdOne id.
			self deny: loadedOne remember = 'something'.
			self assert: loadedOne remember = 'else'.
		] raise: Error
!

testPath

	self deny: Thing path = 'api/1.0/thing'.
	self assert: Thing path = 'api/1.0/things'.

	"ok, but what about irregulars?"
	self assert: Stuff path = 'api/1.0/stuff'.
!

testRemoteCreate

	| createdOne loadedOne |
	
	createdOne := Thing new.
	
	createdOne remember: 'something'.
		
	createdOne createDo:[ :res |
		self shouldnt: [
				createdOne onAfterCreated: res.
				self assert: res status = 201 ]
			raise: MaplessError. 

		createdOne createDo:[ :resp |
		[ createdOne onAfterCreated: resp ]
			on: MaplessError
			do:[ :x | self assert: resp status = 409 ] ]
	].
!

testRemoteDelete

	| createdOne loadedOne |
	
	createdOne := Thing new.
	
	createdOne remember: 'something'.
		
	createdOne createDo:[ :res |
		self shouldnt: [
				createdOne onAfterCreated: res.
				self assert: res status = 201 ]
			raise: MaplessError. 

		createdOne deleteDo:[ :resp |
			createdOne onAfterDeleted: resp.
			self assert: resp status = 200 ].	
			
		Thing findId: createdOne id do:[ :response |
			response status = 404 ]
	].
!

testRemoteRead

	| createdOne loadedOne |
	
	createdOne := Thing new.
	
	createdOne 
		remember: 'something';
		remarkable: 'today';
		youself.
		
	createdOne createDo:[ :res |
		self shouldnt: [
				createdOne onAfterCreated: res.
				self assert: res status = 201 ]
			raise: MaplessError. 
			
		Thing findId: createdOne id do:[ :response | 
			loadedOne := Thing onAfterRead: response.
			self assert: loadedOne class = Thing.
			self assert: loadedOne remember = 'something'.
			self assert: loadedOne remarkable = 'today'
		]
	].
!

testRemoteReadAll

	| createdOne loadedOnes |
	
	createdOne := Thing new.
	
	createdOne 
		remember: 'something';
		remarkable: 'today';
		youself.
		
	createdOne createDo:[ :res |
		self shouldnt: [
				createdOne onAfterCreated: res.
				self assert: res status = 201 ]
			raise: MaplessError. 
	
		Thing findAllDo:[ :response |
			loadedOnes := Thing onAfterReadAll: response.
			self assert: (loadedOnes allSatisfy:[ :e | e class = Thing ]).
			self assert: (loadedOnes allSatisfy:[ :e | e id notNil ]).
			self assert: (loadedOnes anySatisfy:[ :e | e id = createdOne id ]).
			self assert: (loadedOnes anySatisfy:[ :e | e = createdOne ]).
			].
	]
!

testRemoteReadSome

	| createdOne query loadedOnes |
	
	createdOne := Thing new.
	
	createdOne 
		remember: 'some';
		youself.
		
	createdOne createDo:[ :res |
		self shouldnt: [
				createdOne onAfterCreated: res.
				self assert: res status = 201 ]
			raise: MaplessError. 

		query := '{"remember":"some"}'.
		
		Thing find: query do:[ :response |
			loadedOnes := Thing onAfterReadSome: response.
			self assert: (loadedOnes allSatisfy:[ :e | e class = Thing ]).
			self assert: (loadedOnes allSatisfy:[ :e | e id notNil ]).
			self assert: (loadedOnes anySatisfy:[ :e | e id = createdOne id ]).
			self assert: (loadedOnes anySatisfy:[ :e | e = createdOne ]).
			].
	]
!

testRemoteSave

	| createdOne loadedOne |
	
	createdOne := Thing new.
	
	createdOne 
		thereIs: 'noMap';
		in: 'mapless';
		yourself.
		
	createdOne saveDo:[ :res |
		self shouldnt: [
				createdOne onAfterSaved: res.
				self assert: res status = 200 ]
			raise: MaplessError.

		createdOne createDo:[ :resp |
		[ createdOne onAfterCreated: resp ]
			on: MaplessError
			do:[ :x | self assert: resp status = 409 ] ].
		
		Thing findId: createdOne id do:[ :response | 
			loadedOne := Thing onAfterRead: response.
			self assert: loadedOne class = Thing.
			self assert: loadedOne thereIs = 'noMap'.
			self assert: loadedOne in = 'mapless'
		]
	].
!

testRemoteUpdate

	| createdOne loadedOne updatedOne |
	
	createdOne := Thing new.
	
	createdOne thereIs: 'noMap'.
		
	createdOne saveDo:[ :res |
		self shouldnt: [
				createdOne onAfterSaved: res.
				self assert: res status = 200 ]
			raise: MaplessError.

		createdOne createDo:[ :resp |
		[ createdOne onAfterCreated: resp ]
			on: MaplessError
			do:[ :x | self assert: resp status = 409 ] ].
		
		Thing findId: createdOne id do:[ :response | 
			loadedOne := Thing onAfterRead: response.			
			self assert: loadedOne class = Thing.
			self assert: loadedOne thereIs = 'noMap'.

			loadedOne thereIs: 'LOLWAT?'.
			self assert: createdOne thereIs = 'noMap'.
			self assert: loadedOne thereIs = 'LOLWAT?'.
		
			loadedOne saveDo:[ :aResponse | loadedOne onAfterSave: aResponse.
				Thing findId: loadedOne id do:[ :aResp |
					updatedOne := Thing onAfterRead: aResp.
					self assert: updatedOne id = loadedOne id.
					self assert: updatedOne id = createdOne id.
					self assert: updatedOne thereIs = 'LOLWAT?'.
					self assert: updatedOne = loadedOne.
					self assert: createdOne = updatedOne.
					self deny: createdOne thereIs = updatedOne thereIs.
					self assert: loadedOne thereIs = updatedOne thereIs.
				] 
			]
		].
	]
!

testURI
	| thing |
	
	thing := Thing new.
	
	self assert: thing id notNil.
	
	self assert: thing uri = ('api/1.0/things/', thing id)
! !

MaplessModel subclass: #Stuff
	instanceVariableNames: ''
	package: 'MiniMapless-Tests'!

!Stuff methodsFor: 'accessing'!

things

	^ super things ifNil:[ 
		self things: OrderedCollection new.
		self things ]
! !

!Stuff class methodsFor: 'accessing'!

pluralName

	^ 'stuff'
! !

MaplessModel subclass: #Thing
	instanceVariableNames: ''
	package: 'MiniMapless-Tests'!

