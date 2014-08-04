Smalltalk createPackage: 'Flow-Binding-Tests'!
MaplessModel subclass: #MockPerson
	instanceVariableNames: ''
	package: 'Flow-Binding-Tests'!

BindingController subclass: #RivetsJSTestsController
	instanceVariableNames: ''
	package: 'Flow-Binding-Tests'!

!RivetsJSTestsController methodsFor: 'actions'!

getModelAsArgument
	"Returns the model in a way that is appropiate for binding (usable by rivets)"
	^ model data
!

getView
	"Gets and answer the element which is 
	the parent html element of the view of this controller."
	
	^ '#rivetsTests' asJQuery
!

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

