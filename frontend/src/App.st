Smalltalk createPackage: 'App'!
Object subclass: #App
	instanceVariableNames: ''
	package: 'App'!

App class instanceVariableNames: 'main'!

!App class methodsFor: 'accessing'!

main

	^ main ifNil: [ self initializeMain ]
! !

!App class methodsFor: 'actions'!

getSessionThen: aBlock

	Flow session: ReteVenditaSession new.
	Flow session visitor: self getVisitor.

	aBlock value: Flow session
!

getVisitor
	"Answers a model for the visitor of the app.
	In visitor we expect the cid of the mapless, if not there, then we return a new visitor instance."

	^ (Visitor localFindCid: (window localStorage at: #visitor)) ifNil: [ Visitor new ]
!

publishObjects
	"Publish some local objects to be reached from backend"
	
	Flow session api ws
		publish: Flow app at: 'app';
		publish: Transcript current at: 'Transcript';
		publish: console at: 'console';
		publish: [ :sent | sent ] at: 'echo';
		publish: [ :ping | #pong ] at: 'ping';		
		publish: [ :a :b | a + b ] at: 'sum';	
		yourself
!

saveVisitor
	"Saves the visitor's model in the localStorage."

	window localStorage at: #visitor put: Flow session visitor cid.
	window localStorage at: Flow session visitor cid put: Flow session visitor asJSONString.
!

setupRouter

	Router rlite
		add: '' do: [ :r | Router set: '#/home' ];
		add: '#' do: [ :r | Router set: '#/home' ];
		add: '#/' do: [ :r | Router set: '#/home' ];
		add: '/' do: [ :r | Router set: '#/home' ];
		
		add: 'home' do: [ :r | App main reset ];

		add: 'companies' do: [ :r | App main showCompanies ];
		add: 'companies/:id' do: [ :r | Router set: 'companies/:id/view' ];
		add: 'companies/:id/view' do: [ :r | App main showCompanyId: r params id ];

		add: 'contacts' do: [ :r | App main showContacts ];
		add: 'contacts/:id' do: [ :r | Router set: 'contacts/:id/view' ];
		add: 'contacts/:id/view' do: [ :r | App main showContactId: r params id ];
		add: 'contacts/:id/edit' do: [ :r | App main editContactId: r params id ];

		add: 'products' do: [ :r | App main showProducts ];
		add: 'products/:id' do: [ :r | Router set: 'products/:id/view' ];	
		add: 'products/:id/view' do: [ :r | App main showProductId: r params id ];	

		add: 'home/search/:target' do: [ :r | App main showSearchResultsFor: r params target ];
		
		yourself
!

start
	"Starts the app"
	
	Flow app: self; start.
	window at: #app put: self.
		
	self getSessionThen: [ :aSession |
		Flow session: aSession.
		self saveVisitor.
		self main show done: [
			Router processHash ] ]
! !

!App class methodsFor: 'initialization'!

initialize

	self setupRouter
!

initializeMain
	
	^ main := MainController 
					for: Flow session
					on: nil
					appendingTo: '#main-wrapper' asJQuery
! !

Model subclass: #Company
	instanceVariableNames: ''
	package: 'App'!

!Company methodsFor: 'initialization'!

initialize

	super initialize.
	
	self fantasyName: ''.
	self formalName: ''.
! !

!Company class methodsFor: 'accessing'!

pluralName

	^ 'companies'
! !

BindingController subclass: #MainController
	instanceVariableNames: ''
	package: 'App'!

!MainController methodsFor: 'accessing'!

companies

	^ self ifAbsentAt: #companies put: [
		CompaniesController
			for: model 
			on: self
			appendingTo: '#companies-wrapper' asJQuery ]
!

contacts

	^ self ifAbsentAt: #contacts put: [
		ContactsController
			for: model 
			on: self
			appendingTo: '#contacts-wrapper' asJQuery ]
!

home

	^ self ifAbsentAt: #home put: [
		HomeController
			for: model 
			on: self
			appendingTo: '#home-wrapper' asJQuery ]
!

navbar

	^ self ifAbsentAt: #navbar put: [
		NavBarController
			for: model 
			on: self
			appendingTo: '#navbar-wrapper' asJQuery ]
!

products

	^ self ifAbsentAt: #products put: [
		ProductsController
			for: model 
			on: self
			appendingTo: '#products-wrapper' asJQuery ]
!

searchResults

	^ self ifAbsentAt: #searchResults put: [
		SearchResultsController
			for: model 
			on: self
			appendingTo: '#search-results-wrapper' asJQuery ]
! !

!MainController methodsFor: 'actions'!

editContactId: anId

	self hideAllBut: #navbar.
	self contacts editId: anId
!

reset
	
	self navbar deactivateAll.
	
	self hideAllBut: #navbar.
	
	self home show
!

showCompanies

	self hideAllBut: #navbar.
	self companies show
!

showCompanyId: anId

	self hideAllBut: #navbar.
	self companies showId: anId
!

showContactId: anId

	self hideAllBut: #navbar.
	self contacts showId: anId
!

showContacts

	self hideAllBut: #navbar.
	self contacts show
!

showProductId: anId

	self hideAllBut: #navbar.
	self products showId: anId
!

showProducts

	self hideAllBut: #navbar.
	self products show
!

showSearchResultsFor: aTargetString

	self hideAllBut: #navbar.
	self searchResults showResultsFor: aTargetString
! !

!MainController methodsFor: 'initialization'!

initialize

	super initialize.
	
	self deferred done: [ :c | 
		self navbar show.
		self home ]
! !

Model subclass: #Order
	instanceVariableNames: ''
	package: 'App'!

!Order methodsFor: 'accessing'!

discarded

	super discarded ifNil: [
		self discarded: OrderedCollection new ].
		
	^ super discarded
!

products

	super products ifNil: [
		self products: OrderedCollection new ].
		
	^ super products
! !

!Order methodsFor: 'actions'!

addOrderedProduct: anOrderedProduct

	self products add: anOrderedProduct.
	self discarded remove: anOrderedProduct ifAbsent: [ nil ].
	self updateTotal.
	
	self trigger: #productsChanged
!

removeOrderedProduct: anOrderedProduct

	self products remove: anOrderedProduct ifAbsent: [ nil ].
	self discarded add: anOrderedProduct.
	self updateTotal.
	
	self trigger: #productsChanged
!

updateTotal

	self total: (self products inject: 0 into: [ :sum :e | sum + e total ])
! !

ConfirmController subclass: #OrderProductController
	instanceVariableNames: ''
	package: 'App'!

!OrderProductController methodsFor: 'accessing'!

acceptButtonLabel

	^ 'Add ', self model quantity asString, ' of ',model product CodiceArticolo, ' to the order'
!

many

	^ 10
! !

!OrderProductController methodsFor: 'actions'!

discountChanged

	self updateTotal
!

getAvailability

	^ 42
!

getDescription

	^ model product Descrizione
!

getListPrice

	^ model product listPrice
!

manyLess

	self canSubtractMany ifTrue: [ 
		model quantity: model quantity asNumber - self many ]
!

manyMore

	model quantity: model quantity asNumber + self many
!

oneLess

	self canSubtract ifTrue: [ 
		model quantity: model quantity asNumber - 1 ]
!

oneMore

	model quantity: model quantity asNumber + 1
!

quantityChanged
	
	self updateTotal
!

sellingPriceChanged

	self updateTotal
!

setProductDetails

	self basicAt: #description put: self getDescription.
	self basicAt: #availability put: self getAvailability.
	self basicAt: #listPrice put: self getListPrice.

	model sellingPrice: self getListPrice.
	model quantity.

	self rejectButtonLabel: 'Discard'.
!

updateTotal

	self model updateTotal
! !

!OrderProductController methodsFor: 'initialization'!

initialize

	super initialize.
	
	self when: #onAfterModel do: [ 

		self model 
			when: #quantityChanged do: [ self quantityChanged ];
			when: #discountChanged do: [ self discountChanged ];
			yourself.
			
		self setProductDetails ].
! !

!OrderProductController methodsFor: 'testing'!

canSubtract

	^ model quantity > 1
!

canSubtractMany

	^ model quantity > self many
! !

Model subclass: #OrderedProduct
	instanceVariableNames: ''
	package: 'App'!

!OrderedProduct methodsFor: 'accessing'!

discount

	super discount ifNil: [
		self product Sconto isNil
			ifTrue: [ self discount: self class defaultDiscount ]
			ifFalse: [ self discount: self product Sconto ] ].
		
	^ super discount
!

discount: aNumber

	super discount: aNumber.
	
	self trigger: #discountChanged
!

quantity

	super quantity ifNil: [
		self quantity: 1 ].
		
	^ super quantity
!

quantity: aNumber

	super quantity: aNumber.
	
	self trigger: #quantityChanged
! !

!OrderedProduct methodsFor: 'actions'!

updateTotal

	self total: (self quantity asNumber * self sellingPrice asNumber) * ((100 - self discount asNumber) / 100)
! !

!OrderedProduct class methodsFor: 'accessing'!

defaultDiscount

	^ 0
! !

Model subclass: #Person
	instanceVariableNames: ''
	package: 'App'!

!Person methodsFor: 'initialization'!

initialize

	super initialize.
	
	self firstName: ''.
	self lastName: ''.
	self cellPhone: ''.
	self workPhone: ''.
	self homePhone: ''.
	self email: ''.
	self notes: ''.
! !

!Person class methodsFor: 'accessing'!

pluralName

	^ 'people'
! !

Model subclass: #Product
	instanceVariableNames: ''
	package: 'App'!

BindingController subclass: #RVAbstractController
	instanceVariableNames: ''
	package: 'App'!
!RVAbstractController commentStamp!
Abstract controller for most of ReteVendita app controllers.

Subclasses specialize!

!RVAbstractController methodsFor: 'actions'!

createControllers

	self ensureModals
!

ensureModals
	"Makes sure that this controller has as subcontrollers all the modals 
	required by the UX.
	Subclasses should implement as they need to"
	
	
	"nothing added by default"
!

hidePreloader

	'#preloader' asJQuery hide
!

showError

	'#errorAlert' asJQuery show.
	[ '#errorAlert' asJQuery hide ] valueWithTimeout: 2000
!

showPreloader

	'#preloader' asJQuery show
!

showSuccess

	'#successAlert' asJQuery show.
	[ '#successAlert' asJQuery hide ] valueWithTimeout: 2000
! !

!RVAbstractController class methodsFor: 'accessing'!

keyword

	^ super keyword asLowercase
!

viewPath
	"Returns the path where the template of the view should be found"
	
	^ 'text!!views/'
! !

RVAbstractController subclass: #AbstractModelEditorController
	instanceVariableNames: 'lastResponse'
	package: 'App'!

!AbstractModelEditorController methodsFor: 'actions'!

asBindArgument
	"Answers the model and this controller as rivets like it for binding."

	^ #{
	'model' -> self getModelAsArgument.
	'controller' -> self.
	'lastResponse'-> lastResponse
	}
!

cancel

	Router goBack
!

save
	
	model 
		saveThen:[ :res | 
			lastResponse at: #statusText put: res statusText.
			self showSuccess ] 
		onError:[ :res |  
			lastResponse at: #statusText put: res statusText.
			self showError ].
! !

!AbstractModelEditorController methodsFor: 'initialization'!

initialize

	super initialize.
	
	lastResponse := HashedCollection new
! !

AbstractModelEditorController subclass: #ContactEditorController
	instanceVariableNames: ''
	package: 'App'!

!ContactEditorController methodsFor: 'actions'!

editContact

	self showPreloader.

	Person
		findOne: #{ '_id' -> (window location hash subStrings: '/') third }
		then: [ :personOrNil |
			self model: personOrNil.
			'.contactDetailJSON' asJQuery html: model asJSONString.
			self hidePreloader ]
		ifNone: [ ]
		onError: [ :res | self showError ]
!

editNewContact

	self model: Person new.
	'.contactDetailJSON' asJQuery html: model asJSONString.
!

showContact

	self isNewContact
		ifTrue: [ self editNewContact ]
		ifFalse: [ self editContact ]
! !

!ContactEditorController methodsFor: 'initialization'!

initialize

	super initialize.
	
	self when: #onAfterView do: [ self showContact ]
! !

!ContactEditorController methodsFor: 'testing'!

isNewContact

	^ (window location hash subStrings: '/') third = 'new'
! !

!ContactEditorController class methodsFor: 'testing'!

isValidFor: anURI
	"Answers true if this controller is the right route for anURI"

	^ self isAbstract not and: [
	anURI notEmpty and: [
	(anURI match: 'contacts/(.+)(/edit)') or: [
	(anURI match: 'contacts/new') ] ] ]
! !

RVAbstractController subclass: #AbstractResultController
	instanceVariableNames: ''
	package: 'App'!

!AbstractResultController methodsFor: 'actions'!

getId
 
 	^ model at: '_id'
!

setUri

	(view find: 'a') attr: 'href' is: ('#/',model class name asLowercase,'s/',self getId)
! !

!AbstractResultController methodsFor: 'initialization'!

initialize

	super initialize.
	
	self when: #onAfterView do: [ self setUri ]
! !

AbstractResultController subclass: #CompanyResultController
	instanceVariableNames: ''
	package: 'App'!

!CompanyResultController methodsFor: 'actions'!

setLinkAddress 

	(view find: 'a') attr: 'href' is: ('#/companies/',model CodiceCliente)
! !

!CompanyResultController methodsFor: 'initialization'!

intialize

	super initialize.
	
	self when: #onAfterView do: [ self setLinkAddress ].
! !

AbstractResultController subclass: #DiscardedProductController
	instanceVariableNames: ''
	package: 'App'!

!DiscardedProductController methodsFor: 'actions'!

reAddToOrder

	self trigger: #addToOrder
!

showAddedAlert

	#todo. "sas: invalid implementation, the list removes the controller and its view way before it can display or hide anything"


	"(view asJQuery find: '.addAlert') show.
	[ self remove ] valueWithTimeout: 2000"
! !

AbstractResultController subclass: #OrderResultController
	instanceVariableNames: ''
	package: 'App'!

!OrderResultController methodsFor: 'actions'!

showOrder
! !

!OrderResultController methodsFor: 'initialization'!

initialize

	super initialize.
	
	self trigger: #onAfterView do: [ self showOrder ]
! !

AbstractResultController subclass: #OrderedProductController
	instanceVariableNames: ''
	package: 'App'!

!OrderedProductController methodsFor: 'actions'!

removeFromOrder

	self trigger: #removeFromOrder
!

showRemovedAlert

	#todo. "sas: invalid implementation, the list removes the controller and its view way before it can display or hide anything"
	
	"(view asJQuery find: '.removedAlert') show.
	[ self remove ] valueWithTimeout: 2000"
! !

AbstractResultController subclass: #PersonResultController
	instanceVariableNames: ''
	package: 'App'!

!PersonResultController methodsFor: 'actions'!

setLinkAddress 

	(view find: 'a') attr: 'href' is: ('#/contacts/',model id)
! !

!PersonResultController methodsFor: 'initialization'!

intitialize

	super initialize.
	
	self trigger: #onAfterView do: [ self setLinkAddress ]
! !

AbstractResultController subclass: #ProductResultController
	instanceVariableNames: ''
	package: 'App'!

!ProductResultController methodsFor: 'actions'!

addToOrder

	self trigger: #addToOrder.
!

getId

	^ model CodiceArticolo
! !

!ProductResultController methodsFor: 'initialization'!

initialize

	super initialize.
	
	self when: #onAfterView do: [ self basicAt: 'hasOpenOrder' put: Flow session hasOrder ]
! !

RVAbstractController subclass: #CompaniesController
	instanceVariableNames: ''
	package: 'App'!

!CompaniesController methodsFor: 'accessing'!

companies

	^ self ifAbsentAt: #companies put: [
		(ListController 
			on: self
			appendingTo: '#companies-list-wrapper' asJQuery)
				itemControllerClass: CompanyInListController;
				yourself ]
! !

!CompaniesController methodsFor: 'actions'!

setNavBarActive
	"Sets the active element in the NavBar.
	Default is none."
	
	App main navbar setActive: 'companies'
!

show

	super show done: [ 
		self setNavBarActive.
		self showCompanies ]
!

showCompanies

	self showPreloader.

	Company 
		findAllThen: [ :companies | 
			self companies model removeAll.
			self companies model addAll: companies.
			self hidePreloader ]			
		ifEmpty: [ ]
		onError: [ :resp | 
					'#errorAlert' asJQuery show.
					[ '#errorAlert' asJQuery hide ] valueWithTimeout: 2000 ].
! !

!CompaniesController class methodsFor: 'testing'!

isValidFor: anURI
	"Answers true if this controller is the right route for anURI"

	^ self isAbstract not and:[
	anURI notEmpty and:[
	(anURI match: 'companies(/?)$')	] ]
! !

RVAbstractController subclass: #CompanyController
	instanceVariableNames: ''
	package: 'App'!

!CompanyController methodsFor: 'accessing'!

detailsClass

	^ CompanyMonitorController
! !

!CompanyController methodsFor: 'actions'!

editCompany

	self showPreloader.
	self getCompanyDo:[ :company |
		self ifAbsentAt: #company put:[
			CompanyEditorController
				for: company
				on: self
				appendingTo: '#detailsRoot' asJQuery ].

		(self controllerAt: #company) refresh.
	
		self hidePreloader ]
!

getCompanyDo: aBlock
	"Evaluates aBlock with the company that corresponds to the ID present in the URI.
	Or nil if 404 or error "
	
	Company 
		findId: (Router uri subStrings: '/') second 
		do: [ :res | 
				res status = 404 ifTrue:[ ^ aBlock value: nil ].
				res status = 200 ifTrue:[ ^ aBlock value: (Company onAfterRead: res) ].
				self error: 'Sorry, there was a problem res status ', res satus asString ]
!

hidePreloader

	'#monitorPreloader' asJQuery hide
!

setNavBarActive
	"Sets the active element in the NavBar.
	Default is none."
	
	(self controllerAt: #navbar) setActive: 'companies'
!

showCompany

	self isNewCompany ifTrue:[
		^ self showNewCompany ].

	self isEditCompany ifTrue:[
		^ self editCompany ].

	self showPreloader.
	self getCompanyDo:[ :company |
		self ifAbsentAt: #company put:[
			CompanyEditorController
				for: company
				on: self
				appendingTo: '#detailsRoot' asJQuery ].

		(self controllerAt: #company) refresh.
		self hidePreloader ]
!

showNewCompany

	self ifAbsentAt: #company put:[
		CompanyEditorController
			for: Company new
			on: self
			appendingTo: '#detailsRoot' asJQuery ].
			
	(self controllerAt: #company) refresh
!

showPreloader

	'#monitorPreloader' asJQuery show
! !

!CompanyController methodsFor: 'initialization'!

initialize
	
	super initialize.
	
	self when: #onAfterView do: [ self showCompany ]
! !

!CompanyController methodsFor: 'reactions'!

onShow

	"override for no-op"
! !

!CompanyController methodsFor: 'testing'!

isEditCompany

	^ Router uri match: 'companies/edit/*'
!

isNewCompany

	^ Router uri match: 'companies/add'
! !

!CompanyController class methodsFor: 'testing'!

defaultModel

	^ Company new
!

isValidFor: anURI
	"Answers true if this controller is the right route for anURI"

	^ self isAbstract not and:[
	anURI notEmpty and:[
	(anURI match: 'companies/add') or:[
	(anURI match: 'companies/edit*') ] ] ]
! !

RVAbstractController subclass: #CompanyDetailController
	instanceVariableNames: ''
	package: 'App'!

!CompanyDetailController methodsFor: 'actions'!

setNavBarActive
	"Sets the active element in the NavBar.
	Default is none."
	
	(self controllerAt: #navbar) setActive: 'companies'
!

showCompany

	self showPreloader.
	
	Company
		findOne: #{ '_id' -> (window location hash subStrings: '/') third }
		then: [ :personOrNil |
			self model: personOrNil.
			"self silentRefresh; configureAndBind."
			'.companyDetailJSON' asJQuery html: model asJSONString.
			self hidePreloader ]
		ifNone: [ ]
		onError: [ :res | self showError ]
!

showDetails
! !

!CompanyDetailController methodsFor: 'initialization'!

initialize
		
	super initialize.

	self when: #onAfterView do: [ self showCompany ].
! !

!CompanyDetailController class methodsFor: 'actions'!

defaultModel

	^  nil
! !

!CompanyDetailController class methodsFor: 'testing'!

isValidFor: anURI
	"Answers true if this controller is the right route for anURI"

	^ self isAbstract not and:[
	anURI notEmpty and:[
	(anURI match: 'companies/(.)((?!!/.).)*$') ] ]
! !

RVAbstractController subclass: #CompanyInListController
	instanceVariableNames: ''
	package: 'App'!

!CompanyInListController methodsFor: 'accessing'!

getId
 
 	^ model CodiceCliente
! !

!CompanyInListController methodsFor: 'actions'!

setLinkAddress

	(view find: 'a') attr: 'href' is: ('#/companies/',self getId)
! !

!CompanyInListController methodsFor: 'initialization'!

initialize

	super initialize.
	
	self when: #onAfterView do: [self setLinkAddress ]
! !

RVAbstractController subclass: #CompanyMonitorController
	instanceVariableNames: ''
	package: 'App'!

RVAbstractController subclass: #ContactController
	instanceVariableNames: ''
	package: 'App'!

!ContactController methodsFor: 'accessing'!

detailsClass

	^ ContactMonitorController
! !

!ContactController methodsFor: 'actions'!

getContactDo: aBlock
	"Evaluates aBlock with the person that corresponds to the ID present in the URI.
	Or nil if 404 or error "
	
	Person 
		findId: (Router uri subStrings: '/') second 
		do: [ :res | 
				res status = 404 ifTrue:[ ^ aBlock value: nil ].
				res status = 200 ifTrue:[ ^ aBlock value: (Person onAfterRead: res) ].
				self error: 'Sorry, there was a problem res status ', res satus asString ]
!

hidePreloader

	'#monitorPreloader' asJQuery hide
!

setNavBarActive
	"Sets the active element in the NavBar.
	Default is none."
	
	(self controllerAt: #navbar) setActive: 'contacts'
!

showContact

	self isNewContact ifTrue:[
		^ self showNewContact ].
		
	self showPreloader.
	self getContactDo:[ :contact |
		self ifAbsentAt: #contact put:[
			ContactEditorController
				for: contact
				on: self
				appendingTo: '#detailsRoot' asJQuery ].
		(self controllerAt: #contact) refresh.
		self hidePreloader ]
!

showNewContact

	self ifAbsentAt: #contact put:[
		ContactEditorController
			for: Person new
			on: self
			appendingTo: '#detailsRoot' asJQuery ].
			
	(self controllerAt: #contact) refresh
!

showPreloader

	'#monitorPreloader' asJQuery show
! !

!ContactController methodsFor: 'initialization'!

intialize

	super initalize.
	
	self when: #onAfterView do: [ self showContact ]
! !

!ContactController methodsFor: 'reactions'!

onShow

	"override for no-op"
! !

!ContactController methodsFor: 'testing'!

isNewContact

	^ Router uri match: 'contacts/add'
! !

!ContactController class methodsFor: 'testing'!

defaultModel

	^ Person new
!

isValidFor: anURI
	"Answers true if this controller is the right route for anURI"

	^ self isAbstract not and:[
	anURI notEmpty and:[
	(anURI match: 'contacts/add') or:[
	(anURI match: 'contacts/edit*') ] ] ]
! !

RVAbstractController subclass: #ContactDetailController
	instanceVariableNames: ''
	package: 'App'!

!ContactDetailController methodsFor: 'actions'!

setNavBarActive
	"Sets the active element in the NavBar.
	Default is none."
	
	(self controllerAt: #navbar) setActive: 'contacts'
!

showDetails
!

showPerson

	self showPreloader.
	
	Person
		findOne: #{ '_id' -> (window location hash subStrings: '/') third }
		then: [ :personOrNil |
			self model: personOrNil.
			((view find: '.contactDetail') find: 'a') attr: 'href' is: ('#/contacts/',personOrNil id,'/edit').
			'.productDetailJSON' asJQuery html: model asJSONString.				
			self hidePreloader ]
		ifNone: [ ]
		onError: [ :res | self showError ]
! !

!ContactDetailController methodsFor: 'initialization'!

initialize

	super initialize.
	
	self when: #onAfterView do: [ self showPerson ]
! !

!ContactDetailController class methodsFor: 'actions'!

defaultModel

	^  nil
! !

!ContactDetailController class methodsFor: 'testing'!

isValidFor: anURI
	"Answers true if this controller is the right route for anURI"

	^ self isAbstract not and:[
	anURI notEmpty and:[
	(anURI match: 'contacts/(.)((?!!/.).)*$') ] ]
! !

RVAbstractController subclass: #ContactInListController
	instanceVariableNames: ''
	package: 'App'!

!ContactInListController methodsFor: 'accessing'!

getId
 
 	^ model at: '_id'
! !

!ContactInListController methodsFor: 'actions'!

setLinkAddress

	(view find: 'a') attr: 'href' is: ('#/contacts/',self getId)
! !

!ContactInListController methodsFor: 'initialization'!

initialize

	super initialize.
	
	self when: #onAfterView do: [ self setLinkAddress ]
! !

RVAbstractController subclass: #ContactMonitorController
	instanceVariableNames: ''
	package: 'App'!

RVAbstractController subclass: #ContactsController
	instanceVariableNames: ''
	package: 'App'!

!ContactsController methodsFor: 'accessing'!

contact

	^ self ifAbsentAt: #contact put: [
		ContactDetailController
			on: self
			appendingTo: '#conact-wrapper' asJQuery ]
!

contacts

	^ self ifAbsentAt: #contacts put:[
				(ListController 
					on: self
					appendingTo: '#contacts-list-wrapper' asJQuery)
						itemControllerClass: ContactInListController;
						getItemsBlock:[:m| m contacts ];
						yourself ]
! !

!ContactsController methodsFor: 'actions'!

setNavBarActive
	"Sets the active element in the NavBar.
	Default is none."
	
	App main navbar setActive: 'contacts'
!

showContact

	self hideAll.
	
	self showPreloader.
	
	Person
		findOne: #{ '_id' -> (window location hash subStrings: '/') third }
		then: [ :personOrNil |
			self contact 
				model: personOrNil
				refresh.
			self hidePreloader ]
		ifNone: [ ]
		onError: [ :res | self showError ]
!

showContactOrList
	
	self isContact ifTrue: [
		^ self showContact ].
		
	self showList
!

showContacts

	self hideAll.
	
	self showPreloader.

	Person findAllThen:[ :people | 
			self contacts 
				model: (ListModel for: people);
				show.
			self hidePreloader]
		ifEmpty: [ ]
		onError:[ :resp | 
					'#errorAlert' asJQuery show.
					[ '#errorAlert' asJQuery hide ] valueWithTimeout: 2000 ]
!

showList
! !

!ContactsController methodsFor: 'initialization'!

initialize

	super initialize.
	
	self when: #onAfterView do: [ self showContactOrList ]
! !

!ContactsController methodsFor: 'testing'!

isContact

	^ window location hash match: 'contacts/[^()]'
! !

!ContactsController class methodsFor: 'testing'!

isValidFor: anURI
	"Answers true if this controller is the right route for anURI"

	^ self isAbstract not and:[
	anURI notEmpty and:[
	(anURI match: 'contacts') ] ]
! !

RVAbstractController subclass: #ContactsMonitorController
	instanceVariableNames: ''
	package: 'App'!

!ContactsMonitorController methodsFor: 'actions'!

showContacts

	self showPreloader.

	Person findAllThen:[ :people | 
			self ifAbsentAt: #contacts put:[
				(ListController 
					for: (ListModel for: people)
					on: self
					appendingTo: '#contacts' asJQuery)
						itemControllerClass: ContactInListController;
						yourself ].
			(self controllerAt: #contacts) refresh.
			self hidePreloader]
		ifEmpty: [ ]
		onError:[ :resp | 
					'#errorAlert' asJQuery show.
					[ '#errorAlert' asJQuery hide ] valueWithTimeout: 2000 ].
!

showContactsIterable

	Person 
		findAllThen:[ :contacts | 
			self ifAbsentAt: #contacts put:[
				(IteratedController 
					for: (ListModel on: contacts)
					on: self
					appendingTo: '#contacts' asJQuery)
						itemControllerClass: ContactInListController;
						templateUri: (TemplateController viewPath, 'listofcontacts.html');
						yourself ].
			(self controllerAt: #contacts) model list: contacts.
			(self controllerAt: #contacts) refresh.
			self hidePreloader ]
		ifEmpty: [ ]
		onError:[ :resp | 
				'#errorAlert' asJQuery show.
				[ '#errorAlert' asJQuery hide ] valueWithTimeout: 2000 ].
! !

!ContactsMonitorController methodsFor: 'initialization'!

initialize

	super initialize.
	
	self when: #onAfterView do: [ self showContacts ]
! !

RVAbstractController subclass: #DashboardController
	instanceVariableNames: ''
	package: 'App'!

!DashboardController methodsFor: 'accessing'!

detailsClass

	^ OrdersMonitorController
! !

RVAbstractController subclass: #DashboardMonitorController
	instanceVariableNames: ''
	package: 'App'!

RVAbstractController subclass: #GenericResultController
	instanceVariableNames: ''
	package: 'App'!

RVAbstractController subclass: #HomeController
	instanceVariableNames: ''
	package: 'App'!
!HomeController commentStamp!
##AppController

The AppController is the main/root controller of your flow-based application.!

!HomeController methodsFor: 'accessing'!

getSearchTarget

	#todo.
	
	"get parameter form hash"
	"(Search for: (Router parameterAt: 'target')) "
!

searchResults

	self ifAbsentAt: #searchResults put:[ 
		SearchResultsController 
			on: self 
			appendingTo: '#detailsRoot' asJQuery ]
! !

!HomeController methodsFor: 'actions'!

search

	self searchResults: self getSearchTarget
!

search: aTargetString

	self searchResults 
		model: (Search for: aTargetString);
		refresh
! !

!HomeController methodsFor: 'initialization'!

initialize

	super initialize.
	
	self when: #onAfterView do: [ 
		"self isSearch ifTrue:[ self search ]"
		]
! !

!HomeController methodsFor: 'testing'!

isSearch

	^ window location hash match: '/search'
! !

!HomeController class methodsFor: 'testing'!

isValidFor: anURI
	"Answers true if this controller is the right route for anURI"

	^ self isAbstract not and:[
	anURI isEmpty or:[
	(anURI match: 'home') or:[
	anURI = '/' or:[
	anURI = '/#/' ] ] ] ]
! !

RVAbstractController subclass: #NavBarController
	instanceVariableNames: ''
	package: 'App'!

!NavBarController methodsFor: 'accessing'!

tabElementFor: anActiveTabNameOrNil

	anActiveTabNameOrNil ifNil:[ ^ nil ].
	
	^ ('.nav li.',anActiveTabNameOrNil, 'Tab') asJQuery
!

tabElements
	
	^ [ :array |
	'ul.nav' asJQuery children map:[ :i :e |
		array add: e ].
	array ] value: Array new
! !

!NavBarController methodsFor: 'actions'!

deactivateAll
	
	self tabElements do:[ :e |
		e asJQuery removeClass: 'active' ].
!

search
	"Search for the text in the input of the navbar.
	Makes a URI so the UX is beter due to copy/paste of the action"
	
	window location href: ('/#/home/search?target=', ('.navbar' asJQuery find: 'input') val uriEncoded)
!

setActive: anActiveTabNameOrNil

	| tab |
	
	self deactivateAll.
		
	tab := self tabElementFor: anActiveTabNameOrNil.

	tab ifNotNil:[ tab addClass: 'active' ]
!

setOrderButton

	model hasOrder 
		ifFalse: [ '#orderButton' asJQuery 
						attr: 'href' is: ('#/order/new');
						removeClass: 'btn-info';
						addClass: 'btn-success';
						html: 'New order';
						yourself ]
		ifTrue: [ '#orderButton' asJQuery 
						attr: 'href' is: ('#/order');
						removeClass: 'btn-success';
						addClass: 'btn-info';
						html: 'Current order';
						yourself ].
						
	self isShowingOrder
		ifTrue: [ '#orderButton' asJQuery hide ]
		ifFalse: [ '#orderButton' asJQuery show ]
! !

!NavBarController methodsFor: 'initialization'!

initialize

	super initialize.
	
	self basicAt: #locale put: Flow session locale.
	
	self when: #onAfterView do: [
		('.navbar' asJQuery find: 'input') on: #keyup do: [ :e | self onSearchKeyUp: e ].
		self setOrderButton ].
! !

!NavBarController methodsFor: 'reactions'!

onSearchKeyUp: anEvent

	anEvent keyCode == 13 ifTrue:[
		self search ]
! !

!NavBarController methodsFor: 'testing'!

isShowingOrder
	"Answers true if the app is showing an order"
	^ '#order-wrapper' asJQuery is: ':visible'
! !

RVAbstractController subclass: #NavigableControllerOLD
	instanceVariableNames: ''
	package: 'App'!

!NavigableControllerOLD methodsFor: 'accessing'!

detailsClass

	^ self subclassResponsibility
! !

!NavigableControllerOLD methodsFor: 'actions'!

setNavBarActive
	"Sets the active element in the NavBar.
	Default is none."
	
	(self controllerAt: #navbar) setActive: nil
!

showDetails
	
	(self ifAbsentAt: #details put:[ 
		self detailsClass for: self model on: self appendingTo: '#detailsRoot' asJQuery ]) refresh.
!

showNavBar

	(self ifAbsentAt: #navbar put:[ 
		NavBarController 
			for: Flow session 
			on: self 
			appendingTo: '#navbarRoot' asJQuery ]) refresh.

	[ self setNavBarActive ] valueWithTimeout: 100.
! !

!NavigableControllerOLD methodsFor: 'initialization'!

initialize

	super initialize.
	
	self when: #onAfterView do: [ 
		self showNavBar.
		self onShown ].
! !

!NavigableControllerOLD methodsFor: 'reactions'!

onShown

	self showDetails
! !

!NavigableControllerOLD class methodsFor: 'actions'!

defaultModel

	^  Flow session
! !

RVAbstractController subclass: #OrderController
	instanceVariableNames: ''
	package: 'App'!

!OrderController methodsFor: 'accessing'!

detailsClass

	^ OrderMonitorController
! !

!OrderController methodsFor: 'actions'!

loadOrderId: anId

	self basicAt: 'orderId' put: anId.

	Order 
		findOne:  #{ '_id'-> anId }
		then: [ :order |
			order inspect ]
		ifNone: [ self beOrderNotFound ] 
		onError: [ self beOrderNotFound ]
!

setNavBarActive
	"Sets the active element in the NavBar.
	Default is none."
	
	(self controllerAt: #navbar) setActive: 'orders'
!

setOrder

	self isNewOrder 
		ifTrue: [ self model order: self class newOrder ]
		ifFalse: [ 
			self model hasOrder ifFalse:[ 
				self loadOrderId: (Router uri subStrings: '/') last ] ]
! !

!OrderController methodsFor: 'initialization'!

initialize

	super initialize.
	
	self 
		when: #onBeforeView do: [ self setOrder ];
		when: #onBeforeView do: [ '#orderButton' asJQuery hide ];
		when: #onAfterRemove do: [ '#orderButton' asJQuery show ];
		yourself
! !

!OrderController methodsFor: 'testing'!

hasClient

	^ model order client notNil
!

isClientView

	^ self basicAt: 'isClientView'
!

isNewOrder

	^ Router uri match: 'order/new'
! !

!OrderController class methodsFor: 'actions'!

newOrder

	^ Order new
		"createdBy: Flow session username;"
		yourself
! !

!OrderController class methodsFor: 'testing'!

isValidFor: anURI

	^ self isAbstract not and: [
	anURI notEmpty and: [
	(anURI match: 'order(/?)$')	or: [ 
	(anURI match: 'order/new') or: [ 
	(anURI match: 'orders(/.*)') ] ] ] ]
! !

RVAbstractController subclass: #OrderMonitorController
	instanceVariableNames: 'producInOrder'
	package: 'App'!

!OrderMonitorController methodsFor: 'actions'!

beClientInput
	"Set the typeahead and the controllet to be in input state."

	self setTypeahead.
	
	self basicAt: 'isClientInput' put: true
!

beClientView

	self basicAt: 'isClientInput' put: false
!

beOrderNotFound

	self basicAt: 'isOrderNotFound' put: true
!

changeClient

	self beClientInput
!

refreshProducts

	(self controllerAt: #orderedProducts) refresh.			
	(self controllerAt: #discardedProducts) refresh.

	self basicAt: 'hasDiscarded' put: Flow session order discarded notEmpty.
!

setTypeahead
	"Loads and configures the typeahead for the clients."
	
	"require value: 'typeahead'."
!

showDiscardedProducts

			self ifAbsentAt: #discardedProducts put: [
				(ListController 
					for: (ListModel on: model order discarded)
					on: self
					appendingTo: '#discardedProducts' asJQuery)
						newItemControllerBlock: [ :item | | itemController |
							itemController := DiscardedProductController 
												for: item
												on: self
												appendingTo: '#discardedProducts' asJQuery.
							itemController when: #addToOrder do: [ self onAddToOrder: item from: itemController  ] ];
						yourself ].
			(self controllerAt: #discardedProducts) refresh.
!

showOrderContents

	self basicAt: 'hasProducts' put: Flow session order products notEmpty.
	self basicAt: 'hasDiscarded' put: Flow session order discarded notEmpty.
	
	self showOrderedProducts.
	self showDiscardedProducts.
!

showOrderedProducts

			self ifAbsentAt: #orderedProducts put:[
				(ListController 
					for: (ListModel on: model order products)
					on: self
					appendingTo: '#orderedProducts' asJQuery)
						newItemControllerBlock: [ :item | | itemController |
							itemController := OrderedProductController 
												for: item
												on: self
												appendingTo: '#orderedProducts' asJQuery.
							itemController 
								when: #removeFromOrder do: [ self onRemoveFromOrder: item from: itemController ];
								yourself ];
						yourself ].
			(self controllerAt: #orderedProducts) refresh.
! !

!OrderMonitorController methodsFor: 'initialization'!

initialize

	super initialize.
	
	self 
		when: #onBeforeView do: [ self isNewOrder ifTrue: [ self beClientInput ] ];
		when: #onAfterView do: [ self showOrderContents ];
		yourself
! !

!OrderMonitorController methodsFor: 'reactions'!

onAddToOrder: aPreviouslyOrderedProduct from: anItemController

	Flow session order addOrderedProduct: aPreviouslyOrderedProduct.
	
	self refreshProducts
!

onClientChanged

	console log: 'onClientChanged'
!

onRemoveFromOrder: aProductInOrder from: anItemController
	
	Flow session order removeOrderedProduct: aProductInOrder.
	
	self refreshProducts
! !

!OrderMonitorController methodsFor: 'testing'!

hasClient

	^ model order client notNil
!

isClientView

	^ self basicAt: 'isClientView'
!

isNewOrder

	^ Router uri match: 'order/new'
! !

RVAbstractController subclass: #OrdersController
	instanceVariableNames: ''
	package: 'App'!

!OrdersController methodsFor: 'accessing'!

detailsClass

	^ OrdersMonitorController
! !

!OrdersController methodsFor: 'actions'!

setNavBarActive
	"Sets the active element in the NavBar.
	Default is none."
	
	(self controllerAt: #navbar) setActive: 'orders'
! !

!OrdersController class methodsFor: 'testing'!

isValidFor: anURI

	^ self isAbstract not and:[
	anURI notEmpty and:[
	(anURI match: 'orders(/?)$') ] ]
! !

RVAbstractController subclass: #ProductDetailController
	instanceVariableNames: ''
	package: 'App'!

!ProductDetailController methodsFor: 'actions'!

addToOrder

	Flow session order products add: (OrderedProduct new 
										product: model;
										quantity: 1;
										price: 1000;
										discount: 0;
										yourself).

	(view asJQuery find: '.successAlert') show.
	[ (view asJQuery find: '.successAlert') hide ] valueWithTimeout: 2000
!

showDetails
		
	'.productDetailJSON' asJQuery html: model asJSONString.
	
	self basicAt: 'hasOpenOrder' put: Flow session hasOrder
! !

!ProductDetailController methodsFor: 'initialization'!

initialize

	super initialize.
	
	self when: #onAfterView do: [ self showDetails ].
! !

RVAbstractController subclass: #ProductsController
	instanceVariableNames: ''
	package: 'App'!

!ProductsController methodsFor: 'accessing'!

detailsClass

	^ ProductsMonitorController
! !

!ProductsController methodsFor: 'actions'!

getProductDo: aBlock
	"Returns the product that corresponds to the ID present in the URI."
	
	Product 
		findId: (window location hash subStrings: '/') third 
		then: [ :productOrNil | aBlock value: productOrNil ]
!

setNavBarActive
	"Sets the active element in the NavBar.
	Default is none."
	
	(self controllerAt: #navbar) setActive: 'products'
!

showCatalog
!

showProduct

	self showPreloader.
	
	Product
		findOne: #{ '_id' -> (window location hash subStrings: '/') third }
		then: [ :productOrNil |
		
			self ifAbsentAt: #product put: [
				ProductDetailController
					for: productOrNil
					on: self
					appendingTo: '#detailsRoot' asJQuery].

			(self controllerAt: #product) 
				model: productOrNil;
				refresh.
				
			self hidePreloader ]
		ifNone: [ ]
		onError: [ :res | self showError ]
!

showProductOrCatalog

	self isProduct ifTrue: [
		^ self showProduct ].
		
	self showCatalog
! !

!ProductsController methodsFor: 'initialization'!

initialize

	super initialize.
	
	self when: #onAfterView do: [ self showProductOrCatalog ]
! !

!ProductsController methodsFor: 'testing'!

isProduct

	^ window location hash match: 'products/[^()]'
! !

!ProductsController class methodsFor: 'testing'!

isValidFor: anURI
	"Answers true if this controller is the right route for anURI"

	^ self isAbstract not and:[
	anURI notEmpty and:[
	(anURI match: 'products*') ] ]
! !

RVAbstractController subclass: #ProductsMonitorController
	instanceVariableNames: ''
	package: 'App'!

RVAbstractController subclass: #SearchResultsController
	instanceVariableNames: ''
	package: 'App'!

!SearchResultsController methodsFor: 'accessing'!

results

	^ self ifAbsentAt: #results put: [
		(ListController 
			for: (ListModel for: model results)
			on: self
			appendingTo: '#searchResults' asJQuery)
				newItemControllerBlock: [ :m | self newResultControllerFor: m ];
				yourself ]
! !

!SearchResultsController methodsFor: 'actions'!

addOrderedProduct: anOrderedProduct

	Flow session order addOrderedProduct: anOrderedProduct
!

displayResultsFrom: res 
	"Set the received results into the model and display it."
	
	model results addAll: (Mapless fromJSONString: res).
	
	self ifAbsentAt: #results put: [
		(ListController 
			for: (ListModel for: model results)
			on: self
			appendingTo: '#searchResults' asJQuery)
				newItemControllerBlock: [ :m | self newResultControllerFor: m ];
				yourself ].
	
	(self controllerAt: #results) refresh
!

ensureModals

	self ifAbsentAt: #orderProduct put: [
		OrderProductController 
			on: self
			appendingTo: '#modals' asJQuery ].
!

newOrderedProductFor: aProduct

	^ OrderedProduct new 
		product: aProduct;
		yourself
!

newResultControllerFor: aModel
	"Creates the controller that corresponds to aModel."
	
	| resultControllerClass itemController |
	
	resultControllerClass := Smalltalk globals at: (aModel modelClass,'ResultController') ifAbsent: [ nil ].

	resultControllerClass ifNil: [ ^ GenericResultController 
									for: aModel 
									on: (self controllerAt: #results)
									appendingTo: (jQuery value: (self controllerAt: #results) view) ].

	itemController := resultControllerClass
						for: aModel 
						on: (self controllerAt: #results) 
						appendingTo: (jQuery value: (self controllerAt: #results) view).
	^ itemController
		when: #addToOrder do: [ self onAddToOrderFrom: itemController ];
		yourself
!

orderProduct: anOrderedProduct
	"Opens the dialog to order a product.
	Uses anOrderedProduct as model."
	"We are not reusing the instance of the controller with the same model because
	rivetjs unbound seems to have an issue"
	self removeControllerAt: #orderProduct.

	self ifAbsentAt: #orderProduct put: [
		OrderProductController 
			for: anOrderedProduct
			on: self
			appendingTo: '#modals' asJQuery ].
			
	(self controllerAt: #orderProduct)
		model: anOrderedProduct;
		when: #onAfterView do: [ (self controllerAt: #orderProduct) open ];
		acceptBlock: [ 
			self addOrderedProduct: (self controllerAt: #orderProduct) model.
			(self controllerAt: #orderProduct) close ];
		rejectBlock: [ 
			(self controllerAt: #orderProduct) close ];
		refresh
!

reset

	self model reset
!

search
	"Display a pre-loader and perform the api command.
	When results arrive, display them."	

	| apiCommand |

	self showPreloader.
	
	self reset.
	
	apiCommand := window location origin,'/api/1.0/search/', self model asParameters.

	Flow session api rest 
		get: apiCommand
		do: [ :res | 
			self hidePreloader.
			self displayResultsFrom: res  ]  
		onError: [:x| self error: 'There was an error retrieving your search results: ', apiCommand ].
! !

!SearchResultsController methodsFor: 'initialization'!

initialize

	super initialize.
		
	self when: #onAfterView do: [ self results show ]
! !

!SearchResultsController methodsFor: 'reactions'!

onAddToOrderFrom: anItemController

	self orderProduct: (self newOrderedProductFor: anItemController model)
! !

!SearchResultsController class methodsFor: 'accessing'!

defaultDiscount

	^ 0
! !

Session subclass: #ReteVenditaSession
	instanceVariableNames: ''
	package: 'App'!

!ReteVenditaSession methodsFor: 'accessing'!

order

	super order ifNil: [
		self order: self getOrder ].
		
	^ super order
! !

!ReteVenditaSession methodsFor: 'actions'!

getOrder

	^ Order localFindCid: 'order'
!

loadLocale

	require 
		value:  (Array with: 'text!!locale/it-IT.json')
		value: [ :dict | self locale: (JSON parse: dict) ].
! !

!ReteVenditaSession methodsFor: 'initialization'!

initialize

	super initialize.
	
	self loadLocale
! !

!ReteVenditaSession methodsFor: 'testing'!

hasOrder

	^ self order notNil
! !

Model subclass: #Search
	instanceVariableNames: ''
	package: 'App'!

!Search methodsFor: 'accessing'!

asParameters

	^  String streamContents:[ :stream| 
		stream
			nextPutAll: '?target=';
			nextPutAll: self target;
			nextPutAll: '&from=';
			nextPutAll: self from asString;
			nextPutAll: '&count=';
			nextPutAll: self count asString]
!

count

	super count ifNil:[ 
		self count: self class defaultQuantityOfResults.
		^ self count].
	
	^ super count
!

from

	super from ifNil:[ 
		self from: 1.
		^ self from].
	
	^ super from
!

results

	super results ifNil:[ 
		self results: Array new.
		^ self results].
	
	^ super results
!

target

	super target ifNil:[ 
		self target: ''.
		^ self target].
	
	^ super target
! !

!Search methodsFor: 'actions'!

reset
	"If this has results from a previous search, it will now be as fresh as new."
	self results removeAll
! !

!Search class methodsFor: 'accessing'!

defaultQuantityOfResults

	^ 10
! !

!Search class methodsFor: 'actions'!

for: aString

	^ self new
		target: aString;
		yourself
! !

Model subclass: #Visitor
	instanceVariableNames: ''
	package: 'App'!

!Controller methodsFor: '*App'!

hideAllBut: aKey
	"Hides all the (sub)controller except the one at aKey.
	Does  not fail when controller are not found."

	(self controllers keys reject: [ :e | e = aKey ]) do: [ :each | | found |
		found := self controllerAt: each ifAbsent: [ nil ].
		found ifNotNil: [ found hide ] ]
!

hideAt: aKey
	"Hides the (sub)controller found at aKey.
	Does nothing if no controller is found."
	
	(self controllerAt: aKey ifAbsent: [ ^ self ]) hide
!

showAt: aKey
	"Shows the (sub)controller found at aKey.
	Does nothing if no controller is found."
	
	(self controllerAt: aKey ifAbsent: [ ^ self ]) show
! !

!ListModel class methodsFor: '*App'!

for: aCollection

	^ self new 
		list: aCollection;
		yourself
!

on: aCollection

	^ self new 
		list: aCollection;
		yourself
! !

!RivetsJS class methodsFor: '*App'!

utilFormatters

	^ Dictionary new 
		at: #at put: [ :object :key | object at: key ];
		at: #reversed put: [ :aCollection | aCollection reversed ];
		at: #sorted put: [ :aCollection | aCollection sorted ];
		at: #size put: [ :anObject | anObject size ];
		at: #rounded put: [ :aNumber | aNumber rounded ];
		at: #capitalized put: [ :aString | aString capitalized ];
		at: #currency put: [ :aNumber :aCurrencySymbol | aCurrencySymbol asString, (aNumber printShowingDecimalPlaces: 2) ];
		at: #decimalPlaces put: [ :aNumber :decimalPlaces | aNumber printShowingDecimalPlaces: decimalPlaces ];
		at: #asLowercase put: [ :aString | aString asString asLowercase ];
		at: #asUppercase put: [ :aString | aString asString asUppercase ];
		at: #bind put: self binderCallback;
		yourself
! !

!SourceArea methodsFor: '*App'!

setEditorOn: aTextarea
	<self['@editor'] = self._class()._codeMirror().fromTextArea(aTextarea, {
		theme: 'solarized',
		mode: 'text/x-stsrc',
		lineNumbers: false,
		enterMode: 'flat',
		indentWithTabs: true,
		indentUnit: 4,
		matchBrackets: true,
		electricChars: false
	})>
! !

