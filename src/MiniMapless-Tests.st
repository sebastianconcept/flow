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

testRemoteCreate

	| createdOne loadedOne |
	
	createdOne := Thing new.
	
	createdOne remember: 'something'.
		
	createdOne saveDo:[

		self shouldnt: [
			self assert: false.
		] raise: Error
	].
!

testRemoteDelete

	| createdOne loadedOne |
	
	createdOne := Thing new.
	
	createdOne remember: 'something'.
		
	createdOne saveDo:[

		self shouldnt: [
			self assert: false.
		] raise: Error
	].
!

testRemoteRead

	| createdOne loadedOne |
	
	createdOne := Thing new.
	
	createdOne remember: 'something'.
		
	createdOne saveDo:[

		self shouldnt: [
			self assert: false.
		] raise: Error
	].
!

testRemoteUpdate

	| createdOne loadedOne |
	
	createdOne := Thing new.
	
	createdOne remember: 'something'.
		
	createdOne saveDo:[

		self shouldnt: [
			self assert: false.
		] raise: Error
	].
! !

Mapless subclass: #Stuff
	instanceVariableNames: ''
	package: 'MiniMapless-Tests'!

Mapless subclass: #Thing
	instanceVariableNames: ''
	package: 'MiniMapless-Tests'!

