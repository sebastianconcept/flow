Smalltalk createPackage: 'Flow-Templates'!
RouteableController subclass: #TemplateController
	instanceVariableNames: 'templateUri'
	package: 'Flow-Templates'!
!TemplateController commentStamp!
## TemplateController is an abstraction
The concrete subclasses of TemplateController follow the convention of loading html from the server.
This convention uses the name of the controller without the "Controller" suffix as the name of the template (in lowercase) to be found as a html file in the views/ directory.

A typical interesting moment for this controllers is when they are actually finished loading and with the view set. You can observe the #onAfterView event to make it do things after it has the view loaded and set.!

!TemplateController methodsFor: 'accessing'!

templateName: aString

	self templateUri: (self class viewPath, aString,'.html')
!

templateUri

	^ templateUri ifNil:[ self initializeTemplateUri ]
!

templateUri: anUri

	templateUri := anUri
! !

!TemplateController methodsFor: 'actions'!

flush
	"Tells require to flush the potentially cached template (or do nothing if not loaded yet)"
	<window.require.undef(self._templateUri())>
!

setTemplate: htmlString
	"Receives the template's htmlString after requirejs 
	have received it from the server (or cache)."

	| appended |

	"Make it to be the contents of this controllers parent element"
	appended := self parentElement append: htmlString.
	
	"And follow the convention that all templates are wrapped
	in one element which is the view of this controller."
	self view: appended children last.
!

silentSetTemplate: htmlString
	"Receives the template's htmlString after requirejs 
	have received it from the server (or cache)."

	| appended |

	"Make it to be the contents of this controllers parent element"
	appended := self parentElement append: htmlString.
	
	"And follow the convention that all templates are wrapped
	in one element which is the view of this controller."
	self silentView: appended children last.
! !

!TemplateController methodsFor: 'initialization'!

initializeTemplateUri
	"Initilizes the templateUri on the convention that uses the first part of the controller name."
	^ templateUri := self class viewPath, self class keyword,'.html'
! !

!TemplateController methodsFor: 'rendering'!

renderOn: html
	
	require 
		value: (Array with: self templateUri)
		value: [ :template | self setTemplate: template ]
!

silentRenderOn: html

	require 
		value: (Array with: self templateUri)
		value: [ :template | self silentSetTemplate: template ]
! !

!TemplateController class methodsFor: 'accessing'!

viewPath
	"Returns the path where the template of the view should be found"
	
	^ 'text!!views/'
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

