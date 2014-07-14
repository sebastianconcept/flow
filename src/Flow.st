Smalltalk createPackage: 'Flow'!
Object subclass: #Flow
	instanceVariableNames: ''
	package: 'Flow'!

!Object methodsFor: '*Flow'!

trigger: anEventName 
	"Triggers anEventName in this object.
	There you have it, it happened. 
	Hey World, do something about this!!"
	
	^ (jQuery value: self) trigger: anEventName
!

trigger: anEventName with: anArgument
	"Triggers anEventName in this object.
	There you have it, it happened. 
	Hey World, do something about this!!"
	
	^ self trigger: anEventName withAll: (Array with: anArgument)
!

trigger: anEventName withAll: someArguments
	"Triggers anEventName in this object.
	There you have it, it happened. 
	Hey World, do something about this!!"
	
	^ (jQuery value: self) 
			trigger: anEventName 
			withAll: someArguments
!

when: anEventName do: aReactionBlock
	"Wires the observation of this object to the occurrence of anEventName.
	When (and if) anEventName happens, aReactionBlock will take place. 
	Godspeed!!"
	
	^ (jQuery value: self) 
		on: anEventName 
		do: aReactionBlock
! !

