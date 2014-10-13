define("app/Flow-Binding", ["amber/boot", "app/Flow-Templates"], function($boot){
var smalltalk=$boot.vm,nil=$boot.nil,_st=$boot.asReceiver,globals=$boot.globals;
smalltalk.addPackage('Flow-Binding');
smalltalk.packages["Flow-Binding"].transport = {"type":"amd","amdNamespace":"app"};

smalltalk.addClass('BindingController', globals.TemplateController, [], 'Flow-Binding');
globals.BindingController.comment="## BindingController is an abstraction\x0aThe concrete subclasses of BindingController are users of the two-way data binding mechanism loaded by flow.\x0a\x0aNote that BindingController is a subclass of TemplateController so all subclasses of it follow the convention of loading a html template from the server using the keyword of the controller as the name of the template to be found at views/";
smalltalk.addMethod(
smalltalk.method({
selector: "asBindArgument",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=globals.HashedCollection._newFromPairs_(["model",self._getModelAsArgument(),"controller",self]);
return $1;
}, function($ctx1) {$ctx1.fill(self,"asBindArgument",{},globals.BindingController)})},
args: [],
source: "asBindArgument\x0a\x09\x22Answers the model and this controller as rivets like it for binding.\x22\x0a\x0a\x09^ #{\x0a\x09'model' -> self getModelAsArgument.\x0a\x09'controller' -> self\x0a\x09}",
messageSends: ["getModelAsArgument"],
referencedClasses: []
}),
globals.BindingController);

smalltalk.addMethod(
smalltalk.method({
selector: "bind",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(self._rivets())._bind_to_(self._view(),self._asBindArgument());
return self}, function($ctx1) {$ctx1.fill(self,"bind",{},globals.BindingController)})},
args: [],
source: "bind\x0a\x09\x22Tells rivets.js to bind \x0a\x09the model of this controller to its view.\x22\x0a\x09\x0a\x09self rivets\x0a\x09\x09bind: self view \x0a\x09\x09to: self asBindArgument\x0a\x09",
messageSends: ["bind:to:", "rivets", "view", "asBindArgument"],
referencedClasses: []
}),
globals.BindingController);

smalltalk.addMethod(
smalltalk.method({
selector: "configure",
protocol: 'actions',
fn: function (){
var self=this;
var conf;
return smalltalk.withContext(function($ctx1) { 
conf=self._getConfiguration();
_st(self._rivets())._configure_(conf);
return self}, function($ctx1) {$ctx1.fill(self,"configure",{conf:conf},globals.BindingController)})},
args: [],
source: "configure\x0a\x09\x22Sets some configurations for rivets\x22\x0a\x09| conf |\x0a\x09\x0a\x09conf := self getConfiguration.\x0a\x09\x0a\x09self rivets configure: conf",
messageSends: ["getConfiguration", "configure:", "rivets"],
referencedClasses: []
}),
globals.BindingController);

smalltalk.addMethod(
smalltalk.method({
selector: "configureAndBind",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._configure();
self._bind();
return self}, function($ctx1) {$ctx1.fill(self,"configureAndBind",{},globals.BindingController)})},
args: [],
source: "configureAndBind\x0a\x0a\x09self configure.\x0a\x09\x0a\x09self bind.",
messageSends: ["configure", "bind"],
referencedClasses: []
}),
globals.BindingController);

smalltalk.addMethod(
smalltalk.method({
selector: "getConfiguration",
protocol: 'actions',
fn: function (){
var self=this;
function $HashedCollection(){return globals.HashedCollection||(typeof HashedCollection=="undefined"?nil:HashedCollection)}
return smalltalk.withContext(function($ctx1) { 
var $2,$3,$1;
$2=_st($HashedCollection())._new();
_st($2)._at_put_("handler",self._getHandler());
$3=_st($2)._yourself();
$1=$3;
return $1;
}, function($ctx1) {$ctx1.fill(self,"getConfiguration",{},globals.BindingController)})},
args: [],
source: "getConfiguration\x0a\x0a\x09^ HashedCollection new \x0a\x09\x09at: #handler put: self getHandler;\x0a\x09\x09yourself",
messageSends: ["at:put:", "new", "getHandler", "yourself"],
referencedClasses: ["HashedCollection"]
}),
globals.BindingController);

smalltalk.addMethod(
smalltalk.method({
selector: "getHandler",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
return function( target, event, binding ){
		this.call(binding.model);
	};
return self}, function($ctx1) {$ctx1.fill(self,"getHandler",{},globals.BindingController)})},
args: [],
source: "getHandler\x0a\x09\x22Answers the custom handler of flow controllers for rivets.\x0a\x09We need it to be call on binding.model otherwhise \x0a\x09rivets would send the html element (target of the event)\x0a\x09screwing the self instance of this controller\x22\x0a\x0a\x09<return function( target, event, binding ){\x0a\x09\x09this.call(binding.model);\x0a\x09}>",
messageSends: [],
referencedClasses: []
}),
globals.BindingController);

smalltalk.addMethod(
smalltalk.method({
selector: "getModelAsArgument",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self["@model"])._data();
return $1;
}, function($ctx1) {$ctx1.fill(self,"getModelAsArgument",{},globals.BindingController)})},
args: [],
source: "getModelAsArgument\x0a\x09\x22Returns the model in a way that is appropiate for binding (usable by rivets).\x0a\x09By default BindingController assumes you are using mapless as controllers model\x0a\x09so we send their data but subclasses might differ if they please.\x22\x0a\x09^ model data",
messageSends: ["data"],
referencedClasses: []
}),
globals.BindingController);

smalltalk.addMethod(
smalltalk.method({
selector: "onAboutToRemove",
protocol: 'reactions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
($ctx1.supercall = true, globals.BindingController.superclass.fn.prototype._onAboutToRemove.apply(_st(self), []));
$ctx1.supercall = false;
self._unbind();
return self}, function($ctx1) {$ctx1.fill(self,"onAboutToRemove",{},globals.BindingController)})},
args: [],
source: "onAboutToRemove\x0a\x0a\x09super onAboutToRemove.\x0a\x09\x0a\x09self unbind",
messageSends: ["onAboutToRemove", "unbind"],
referencedClasses: []
}),
globals.BindingController);

smalltalk.addMethod(
smalltalk.method({
selector: "onTemplate:",
protocol: 'reactions',
fn: function (data){
var self=this;
return smalltalk.withContext(function($ctx1) { 
($ctx1.supercall = true, globals.BindingController.superclass.fn.prototype._onTemplate_.apply(_st(self), [data]));
$ctx1.supercall = false;
self._configureAndBind();
return self}, function($ctx1) {$ctx1.fill(self,"onTemplate:",{data:data},globals.BindingController)})},
args: ["data"],
source: "onTemplate: data\x0a\x09\x22Receives data once requirejs have received it from the server.\x22\x0a\x0a\x09super onTemplate: data.\x09\x0a\x09\x0a\x09self configureAndBind.\x0a\x0a\x09\x09",
messageSends: ["onTemplate:", "configureAndBind"],
referencedClasses: []
}),
globals.BindingController);

smalltalk.addMethod(
smalltalk.method({
selector: "rivets",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(require)._value_("bower/rivets/dist/rivets");
return $1;
}, function($ctx1) {$ctx1.fill(self,"rivets",{},globals.BindingController)})},
args: [],
source: "rivets\x0a\x09\x22Answers the rivets accessor.\x0a\x09http://rivetsjs.com/docs/guide/\x22\x0a\x09\x0a\x09\x22^ require value: 'bower/rivets/dist/rivets.min'.\x22\x0a\x09^ require value: 'bower/rivets/dist/rivets'",
messageSends: ["value:"],
referencedClasses: []
}),
globals.BindingController);

smalltalk.addMethod(
smalltalk.method({
selector: "unbind",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1,$receiver;
$1=self["@view"];
if(($receiver = $1) == null || $receiver.isNil){
$1;
} else {
_st(self["@view"])._unbind();
};
return self}, function($ctx1) {$ctx1.fill(self,"unbind",{},globals.BindingController)})},
args: [],
source: "unbind\x0a\x09\x22Tells rivets.js to unbind the view.\x22\x0a\x09\x0a\x09view ifNotNil:[ view unbind ]",
messageSends: ["ifNotNil:", "unbind"],
referencedClasses: []
}),
globals.BindingController);


smalltalk.addMethod(
smalltalk.method({
selector: "isAbstract",
protocol: 'testing',
fn: function (){
var self=this;
function $BindingController(){return globals.BindingController||(typeof BindingController=="undefined"?nil:BindingController)}
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self.__eq($BindingController());
return $1;
}, function($ctx1) {$ctx1.fill(self,"isAbstract",{},globals.BindingController.klass)})},
args: [],
source: "isAbstract\x0a\x09\x22Answers true if the receiver is abstract.\x22\x0a\x09\x0a\x09^ self = BindingController",
messageSends: ["="],
referencedClasses: ["BindingController"]
}),
globals.BindingController.klass);


smalltalk.addClass('IteratedController', globals.BindingController, ['itemControllerClass', 'newItemControllerBlock'], 'Flow-Binding');
globals.IteratedController.comment="##IteratedController\x0aLike ListController except it relies on rivets.js to iterate  models' presentation.\x0a\x0aIt's rivets who triggers the creation, maintenance and destruction of the (sub)controllers of this controller.\x0a\x0a[This is how you use it in the template/view](http://rivetsjs.com/docs/reference/#each-[item])";
smalltalk.addMethod(
smalltalk.method({
selector: "configureAndBind",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._configure();
self._makeCustomBinder();
self._bind();
return self}, function($ctx1) {$ctx1.fill(self,"configureAndBind",{},globals.IteratedController)})},
args: [],
source: "configureAndBind\x0a\x0a\x09self configure.\x0a\x0a\x09self makeCustomBinder.\x0a\x09\x0a\x09self bind",
messageSends: ["configure", "makeCustomBinder", "bind"],
referencedClasses: []
}),
globals.IteratedController);

smalltalk.addMethod(
smalltalk.method({
selector: "getCustomBindFor:",
protocol: 'actions',
fn: function (theEachBind){
var self=this;
return smalltalk.withContext(function($ctx1) { 
return function(el){
		this.view.onViewCreated = function(v){ self._onViewCreated_(v) };
		this.view.onViewDestroyed = function(v){ self._onViewDestroyed_(v) };
		theEachBind.call(this,el);
		};
return self}, function($ctx1) {$ctx1.fill(self,"getCustomBindFor:",{theEachBind:theEachBind},globals.IteratedController)})},
args: ["theEachBind"],
source: "getCustomBindFor: theEachBind\x0a\x0a\x09<return function(el){\x0a\x09\x09this.view.onViewCreated = function(v){ self._onViewCreated_(v) };\x0a\x09\x09this.view.onViewDestroyed = function(v){ self._onViewDestroyed_(v) };\x0a\x09\x09theEachBind.call(this,el);\x0a\x09\x09}>",
messageSends: [],
referencedClasses: []
}),
globals.IteratedController);

smalltalk.addMethod(
smalltalk.method({
selector: "getCustomRoutineFor:",
protocol: 'actions',
fn: function (theEachRoutine){
var self=this;
return smalltalk.withContext(function($ctx1) { 
return function(el, collection){
		var results = theEachRoutine.call(this, el, collection);
		self._onRoutine_value_(el, collection);
		return results;
		};
return self}, function($ctx1) {$ctx1.fill(self,"getCustomRoutineFor:",{theEachRoutine:theEachRoutine},globals.IteratedController)})},
args: ["theEachRoutine"],
source: "getCustomRoutineFor: theEachRoutine\x0a\x0a\x09<return function(el, collection){\x0a\x09\x09var results = theEachRoutine.call(this, el, collection);\x0a\x09\x09self._onRoutine_value_(el, collection);\x0a\x09\x09return results;\x0a\x09\x09}>",
messageSends: [],
referencedClasses: []
}),
globals.IteratedController);

smalltalk.addMethod(
smalltalk.method({
selector: "itemControllerClass",
protocol: 'accessing',
fn: function (){
var self=this;
var $1;
$1=self["@itemControllerClass"];
return $1;
},
args: [],
source: "itemControllerClass\x0a\x0a\x09^ itemControllerClass",
messageSends: [],
referencedClasses: []
}),
globals.IteratedController);

smalltalk.addMethod(
smalltalk.method({
selector: "itemControllerClass:",
protocol: 'accessing',
fn: function (aBlock){
var self=this;
self["@itemControllerClass"]=aBlock;
return self},
args: ["aBlock"],
source: "itemControllerClass: aBlock\x0a\x0a\x09itemControllerClass := aBlock",
messageSends: [],
referencedClasses: []
}),
globals.IteratedController);

smalltalk.addMethod(
smalltalk.method({
selector: "makeCustomBinder",
protocol: 'actions',
fn: function (){
var self=this;
var theEachBind,theEachRoutine;
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$5,$4,$3,$8,$7,$6,$11,$10,$9,$14,$13,$12;
$2=self._rivets();
$ctx1.sendIdx["rivets"]=1;
$1=_st($2)._binders();
$ctx1.sendIdx["binders"]=1;
$5=self._rivets();
$ctx1.sendIdx["rivets"]=2;
$4=_st($5)._binders();
$ctx1.sendIdx["binders"]=2;
$3=_st($4)._at_("each-*");
$ctx1.sendIdx["at:"]=1;
_st($1)._at_put_("iterated-*",$3);
$ctx1.sendIdx["at:put:"]=1;
$8=self._rivets();
$ctx1.sendIdx["rivets"]=3;
$7=_st($8)._binders();
$ctx1.sendIdx["binders"]=3;
$6=_st($7)._at_("each-*");
$ctx1.sendIdx["at:"]=3;
theEachBind=_st($6)._at_("bind");
$ctx1.sendIdx["at:"]=2;
$11=self._rivets();
$ctx1.sendIdx["rivets"]=4;
$10=_st($11)._binders();
$ctx1.sendIdx["binders"]=4;
$9=_st($10)._at_("each-*");
$ctx1.sendIdx["at:"]=5;
theEachRoutine=_st($9)._at_("routine");
$ctx1.sendIdx["at:"]=4;
$14=self._rivets();
$ctx1.sendIdx["rivets"]=5;
$13=_st($14)._binders();
$ctx1.sendIdx["binders"]=5;
$12=_st($13)._at_("iterated-*");
$ctx1.sendIdx["at:"]=6;
_st($12)._at_put_("bind",self._getCustomBindFor_(theEachBind));
$ctx1.sendIdx["at:put:"]=2;
_st(_st(_st(self._rivets())._binders())._at_("iterated-*"))._at_put_("routine",self._getCustomRoutineFor_(theEachRoutine));
return self}, function($ctx1) {$ctx1.fill(self,"makeCustomBinder",{theEachBind:theEachBind,theEachRoutine:theEachRoutine},globals.IteratedController)})},
args: [],
source: "makeCustomBinder\x0a\x09\x22Answers the rivetjs configuration needed for this controller to maintain subcontrollers\x0a\x09in sync with the lifecicly of the elements maintained by rivets via the each-* directive\x22\x0a\x09\x0a\x09| theEachBind theEachRoutine |\x0a\x09\x0a\x09self rivets binders \x0a\x09\x09at: 'iterated-*'\x0a\x09\x09put: (self rivets binders at: 'each-*').\x0a\x09\x09\x0a\x09theEachBind := (self rivets binders at: 'each-*') at: #bind.\x0a\x09theEachRoutine := (self rivets binders at: 'each-*') at: #routine.\x0a\x09\x0a\x09(self rivets binders at: 'iterated-*') at: #bind put: (self getCustomBindFor: theEachBind).\x0a\x09(self rivets binders at: 'iterated-*') at: #routine put: (self getCustomRoutineFor: theEachRoutine)\x0a\x09\x0a\x09",
messageSends: ["at:put:", "binders", "rivets", "at:", "getCustomBindFor:", "getCustomRoutineFor:"],
referencedClasses: []
}),
globals.IteratedController);

smalltalk.addMethod(
smalltalk.method({
selector: "newItemControllerBlock",
protocol: 'accessing',
fn: function (){
var self=this;
var $1;
$1=self["@newItemControllerBlock"];
return $1;
},
args: [],
source: "newItemControllerBlock\x0a\x0a\x09^ newItemControllerBlock",
messageSends: [],
referencedClasses: []
}),
globals.IteratedController);

smalltalk.addMethod(
smalltalk.method({
selector: "newItemControllerBlock:",
protocol: 'accessing',
fn: function (aBlock){
var self=this;
self["@newItemControllerBlock"]=aBlock;
return self},
args: ["aBlock"],
source: "newItemControllerBlock: aBlock\x0a\x0a\x09newItemControllerBlock := aBlock",
messageSends: [],
referencedClasses: []
}),
globals.IteratedController);

smalltalk.addMethod(
smalltalk.method({
selector: "newItemControllerFor:",
protocol: 'actions',
fn: function (anItem){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$1;
self._halt();
$2=_st(self["@itemControllerClass"])._isNil();
if(smalltalk.assert($2)){
$1=_st(self._newItemControllerBlock())._value_(anItem);
} else {
$1=_st(self["@itemControllerClass"])._for_on_appendingTo_(anItem,self,self._view());
};
return $1;
}, function($ctx1) {$ctx1.fill(self,"newItemControllerFor:",{anItem:anItem},globals.IteratedController)})},
args: ["anItem"],
source: "newItemControllerFor: anItem\x0aself halt.\x0a\x09^ itemControllerClass isNil\x0a\x09\x09ifFalse:[ itemControllerClass \x0a\x09\x09\x09\x09\x09for: anItem \x0a\x09\x09\x09\x09\x09on: self \x0a\x09\x09\x09\x09\x09appendingTo: self view ] \x0a\x09\x09ifTrue:[ self newItemControllerBlock value: anItem ]\x0a\x0a\x09 ",
messageSends: ["halt", "ifFalse:ifTrue:", "isNil", "for:on:appendingTo:", "view", "value:", "newItemControllerBlock"],
referencedClasses: []
}),
globals.IteratedController);

smalltalk.addMethod(
smalltalk.method({
selector: "onRoutine:value:",
protocol: 'reactions',
fn: function (anElement,aValue){
var self=this;
return self},
args: ["anElement", "aValue"],
source: "onRoutine: anElement value: aValue\x0a\x09\x22Rivetjs has executed the routing of the iterated-* binder.\x22\x0a\x0a\x09\x22no-op\x22\x0a\x09",
messageSends: [],
referencedClasses: []
}),
globals.IteratedController);

smalltalk.addMethod(
smalltalk.method({
selector: "onViewCreated:",
protocol: 'reactions',
fn: function (aView){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(console)._warn_(aView);
return self}, function($ctx1) {$ctx1.fill(self,"onViewCreated:",{aView:aView},globals.IteratedController)})},
args: ["aView"],
source: "onViewCreated: aView\x0a\x0a\x09console warn: aView",
messageSends: ["warn:"],
referencedClasses: []
}),
globals.IteratedController);

smalltalk.addMethod(
smalltalk.method({
selector: "onViewDestroyed:",
protocol: 'reactions',
fn: function (aView){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(console)._info_(aView);
return self}, function($ctx1) {$ctx1.fill(self,"onViewDestroyed:",{aView:aView},globals.IteratedController)})},
args: ["aView"],
source: "onViewDestroyed: aView\x0a\x0a\x09console info: aView",
messageSends: ["info:"],
referencedClasses: []
}),
globals.IteratedController);

smalltalk.addMethod(
smalltalk.method({
selector: "parentElement:",
protocol: 'accessing',
fn: function (anHtmlElement){
var self=this;
self["@view"]=anHtmlElement;
self["@parentElement"]=self["@view"];
return self},
args: ["anHtmlElement"],
source: "parentElement: anHtmlElement\x0a\x09\x22Sets the parent elment for the list.\x0a\x09It can be anything but, in the case of lists, the parent element usually is a <ul>\x0a\x09The thing is to treat it like an <ul> full of <li> children.\x22\x0a\x09parentElement := view := anHtmlElement",
messageSends: [],
referencedClasses: []
}),
globals.IteratedController);


});
