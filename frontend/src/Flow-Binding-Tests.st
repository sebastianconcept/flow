Smalltalk createPackage: 'Flow-Binding-Tests'!
MaplessModel subclass: #MockPerson
	instanceVariableNames: ''
	package: 'Flow-Binding-Tests'!

BindingController subclass: #RivetsJSTestsController
	instanceVariableNames: ''
	package: 'Flow-Binding-Tests'!

!RivetsJSTestsController methodsFor: 'reactions'!

onAha

	Transcript cr; show: 'Woha!! it was you who clicked that?'
!

onMhm

	window alert: 'Nicely clicked!!'
! !

!RivetsJSTestsController class methodsFor: 'accessing'!

defaultModel
	"Answers the default model that is going to be set in the instance of this controller."

	^ MockPerson new
		name: 'John Galt';
		age: 42;
		yourself
!

viewPath
	"Returns the path where the template of the view should be found"
	
	^ 'text!!views/demo/'
! !

