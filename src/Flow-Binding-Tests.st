Smalltalk createPackage: 'Flow-Binding-Tests'!
MaplessModel subclass: #MockPerson
	instanceVariableNames: ''
	package: 'Flow-Binding-Tests'!

BindingController subclass: #RivetsJSTestsController
	instanceVariableNames: ''
	package: 'Flow-Binding-Tests'!

!RivetsJSTestsController methodsFor: 'actions'!

newPerson

	^ MockPerson new
		name: 'John Galt';
		age: 42;
		yourself
! !

!RivetsJSTestsController methodsFor: 'initialization'!

initialize

	super initialize.
	
	self model: self newPerson.
	
	window at: 'r' put: self
! !

