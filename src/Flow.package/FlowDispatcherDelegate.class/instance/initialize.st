initialization
initialize 
	"The dispachet is responsible for delegating who cares about what request.
	This basically configures the server."
	
	super initialize.
	
	self
		"addHandler: FlowStCodeHandler new;
		addHandler: FlowJsCodeHandler new;"
		addHandler: FlowRootHandler new;
		yourself 