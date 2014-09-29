Smalltalk createPackage: 'Flow-Templates'!
RouteableController subclass: #TemplateController
	instanceVariableNames: ''
	package: 'Flow-Templates'!
!TemplateController commentStamp!
## TemplateController is an abstraction
The concrete subclasses of TemplateController follow the convention of loading html from the server.
This convention uses the keyword of the controller as the name of the template to be found at views/!

!TemplateController methodsFor: 'reactions'!

onTemplate: data
	"Receives the template's data after requirejs 
	have received it from the server (or cache)."

	| appended |

	"Make it to be the contents of this controllers parent element"
	"self parentElement html: data."
	appended := self parentElement append: data.
	
	"And follow the convention that all templates are wrapped
	in one element which is the view of this controller."
	self view: appended children last.
! !

!TemplateController methodsFor: 'rendering'!

renderOn: html

	require 
		value:(Array with: self class viewPath, self class keyword,'.html')
		value:[	:template | 
			self onTemplate: template]
! !

!TemplateController class methodsFor: 'accessing'!

viewPath
	"Returns the path where the template of the view should be found"
	
	^ 'bower_components/text/text!!views/'
! !

!TemplateController class methodsFor: 'testing'!

isAbstract
	"Answers true if the receiver is abstract."
	
	^ self = TemplateController
!

isValidFor: anURI
	"Answers true if this controller is the right route for anURI"
	
	^ self isAbstract not and:[
	anURI notEmpty and:[
	anURI = self keyword ] ]
! !

TemplateController subclass: #HelloWorldController
	instanceVariableNames: ''
	package: 'Flow-Templates'!

!HelloWorldController class methodsFor: 'accessing'!

viewPath
	"Returns the path where the template of the view should be found"
	
	^ 'bower_components/text/text!!views/demo/'
! !

