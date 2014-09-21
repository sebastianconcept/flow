Smalltalk createPackage: 'Flow-Binding-Tests'!
MaplessModel subclass: #MockPerson
	instanceVariableNames: ''
	package: 'Flow-Binding-Tests'!

BindingController subclass: #RivetsJSTestsController
	instanceVariableNames: ''
	package: 'Flow-Binding-Tests'!

!RivetsJSTestsController methodsFor: 'actions'!

newPerson
	"Answers a new MockPerson to be used as model for the demo.
	Note that its attributes are probably used from the template (read and write)"

	^ MockPerson new
		name: 'John Galt';
		age: 42;
		yourself
! !

!RivetsJSTestsController methodsFor: 'initialization'!

initialize
	"Initializes the controller of the rivets test view"
	
	super initialize.
	
	"As the controller's model we're using a new mapless"
	self model: self newPerson.
! !

!RivetsJSTestsController methodsFor: 'reactions'!

onAha

	Transcript cr; show: 'Woha!! it was you who clicked that?'
!

onMhm

	window alert: 'Nicely clicked!!'
! !

!RivetsJSTestsController class methodsFor: 'accessing'!

viewPath
	"Returns the path where the template of the view should be found"
	
	^ 'bower_components/text/text!!views/demo/'
! !

