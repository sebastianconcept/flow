Smalltalk createPackage: 'MiniMapless-Tests'!
TestCase subclass: #MaplessTest
	instanceVariableNames: ''
	package: 'MiniMapless-Tests'!

!MaplessTest methodsFor: 'tests'!

testLocalCreateAndDelete

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

testLocalCreateAndFindOne

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
! !

Mapless subclass: #Stuff
	instanceVariableNames: ''
	package: 'MiniMapless-Tests'!

Mapless subclass: #Thing
	instanceVariableNames: ''
	package: 'MiniMapless-Tests'!

