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
source: "bind\x0a\x09\x22Tells rivets.js to bind \x0a\x09the model of this controller to its view.\x22\x0a\x09\x0a\x09self rivets\x0a\x09\x09\x09bind: self view \x0a\x09\x09\x09to: self asBindArgument\x0a\x09",
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
return smalltalk.withContext(function($ctx1) { 
_st(self._rivets())._configure_(self._getConfiguration());
return self}, function($ctx1) {$ctx1.fill(self,"configure",{},globals.BindingController)})},
args: [],
source: "configure\x0a\x09\x22Sets some configurations for rivets\x22\x0a\x0a\x09self rivets configure: self getConfiguration",
messageSends: ["configure:", "rivets", "getConfiguration"],
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
source: "getConfiguration\x0a\x0a\x09^ HashedCollection new \x0a\x09\x09at: 'handler' put: self getHandler;\x0a\x09\x09yourself",
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
return function( target, event, binding, view ){

		self._onBinded_event_handler_view_( target, event, binding, view );
		this.call(binding.model);
	};
return self}, function($ctx1) {$ctx1.fill(self,"getHandler",{},globals.BindingController)})},
args: [],
source: "getHandler\x0a\x09\x22Answers the custom handler of flow controllers for rivets.\x0a\x09We need it to be call on binding.model otherwhise \x0a\x09rivets would send the html element (target of the event)\x0a\x09screwing the self instance of this controller\x22\x0a\x0a\x09<return function( target, event, binding, view ){\x0a\x0a\x09\x09self._onBinded_event_handler_view_( target, event, binding, view );\x0a\x09\x09this.call(binding.model);\x0a\x09}>",
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
selector: "onBinded:event:handler:view:",
protocol: 'reactions',
fn: function (aTarget,anEvent,aHandler,aBindedView){
var self=this;
return self},
args: ["aTarget", "anEvent", "aHandler", "aBindedView"],
source: "onBinded: aTarget event: anEvent handler: aHandler view: aBindedView\x0a\x09\x22The custom handler to bind on this controller is reacting\x22\x0a\x09\x0a\x09\x22no-op\x22",
messageSends: [],
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
self._configure();
self._bind();
return self}, function($ctx1) {$ctx1.fill(self,"onTemplate:",{data:data},globals.BindingController)})},
args: ["data"],
source: "onTemplate: data\x0a\x09\x22Receives data once requirejs have received it from the server.\x22\x0a\x0a\x09super onTemplate: data.\x09\x0a\x09\x0a\x09self configure.\x0a\x0a\x09self bind.",
messageSends: ["onTemplate:", "configure", "bind"],
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
selector: "configure",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
($ctx1.supercall = true, globals.IteratedController.superclass.fn.prototype._configure.apply(_st(self), []));
$ctx1.supercall = false;
return self}, function($ctx1) {$ctx1.fill(self,"configure",{},globals.IteratedController)})},
args: [],
source: "configure\x0a\x22Transcript open.\x0a\x09self getConfiguration inspect.\x22\x0a\x09\x0a\x09super configure.",
messageSends: ["configure"],
referencedClasses: []
}),
globals.IteratedController);

smalltalk.addMethod(
smalltalk.method({
selector: "getConfiguration",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$3,$4,$1;
$2=($ctx1.supercall = true, globals.IteratedController.superclass.fn.prototype._getConfiguration.apply(_st(self), []));
$ctx1.supercall = false;
_st($2)._at_put_("adapter",globals.HashedCollection._newFromPairs_(["subscribe",(function(obj,keypath,callback){
return smalltalk.withContext(function($ctx2) {
_st(console)._log_("subscribed and observing on change:");
$ctx2.sendIdx["log:"]=1;
_st(console)._log_(obj);
$ctx2.sendIdx["log:"]=2;
$3="change:".__comma(keypath);
$ctx2.sendIdx[","]=1;
return _st(obj)._on_do_($3,callback);
}, function($ctx2) {$ctx2.fillBlock({obj:obj,keypath:keypath,callback:callback},$ctx1,1)})}),"unsubscribe",(function(obj,keypath,callback){
return smalltalk.withContext(function($ctx2) {
return _st(obj)._off_do_("change:".__comma(keypath),callback);
}, function($ctx2) {$ctx2.fillBlock({obj:obj,keypath:keypath,callback:callback},$ctx1,2)})}),"read",(function(obj,keypath){
return smalltalk.withContext(function($ctx2) {
_st(console)._log_("on read");
$ctx2.sendIdx["log:"]=3;
return _st(_st(obj)._get())._keypath();
}, function($ctx2) {$ctx2.fillBlock({obj:obj,keypath:keypath},$ctx1,3)})}),"publish",(function(obj,keypath,value){
return smalltalk.withContext(function($ctx2) {
_st(console)._log_("on publish");
return _st(obj)._set_val_(keypath,value);
}, function($ctx2) {$ctx2.fillBlock({obj:obj,keypath:keypath,value:value},$ctx1,4)})})]));
$4=_st($2)._yourself();
$1=$4;
return $1;
}, function($ctx1) {$ctx1.fill(self,"getConfiguration",{},globals.IteratedController)})},
args: [],
source: "getConfiguration\x0a\x0a\x09^ super getConfiguration\x0a\x09\x09at: 'adapter' put: ( #{\x0a    \x09\x09#subscribe -> [ :obj :keypath :callback | \x0a\x09\x09\x09\x09console log: 'subscribed and observing on change:'.\x0a\x09\x09\x09\x09console log: obj.\x0a\x09\x09\x09\x09obj on: 'change:',keypath do: callback ].\x0a    \x09\x09#unsubscribe -> [ :obj :keypath :callback | \x0a\x09\x09\x09\x09obj off: 'change:',keypath do: callback ].\x0a    \x09\x09#read -> [ :obj :keypath | \x0a\x09\x09\x09\x09console log: 'on read'.\x0a\x09\x09\x09\x09obj get keypath ].\x0a    \x09\x09#publish -> [ :obj :keypath :value | \x0a\x09\x09\x09\x09console log: 'on publish'.\x0a\x09\x09\x09\x09obj set: keypath val: value ]});\x0a\x09\x09yourself",
messageSends: ["at:put:", "getConfiguration", "log:", "on:do:", ",", "off:do:", "keypath", "get", "set:val:", "yourself"],
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
selector: "onBinded:event:handler:view:",
protocol: 'reactions',
fn: function (aTarget,anEvent,aHandler,aBindedView){
var self=this;
return smalltalk.withContext(function($ctx1) { 
($ctx1.supercall = true, globals.IteratedController.superclass.fn.prototype._onBinded_event_handler_view_.apply(_st(self), [aTarget,anEvent,aHandler,aBindedView]));
$ctx1.supercall = false;
return self}, function($ctx1) {$ctx1.fill(self,"onBinded:event:handler:view:",{aTarget:aTarget,anEvent:anEvent,aHandler:aHandler,aBindedView:aBindedView},globals.IteratedController)})},
args: ["aTarget", "anEvent", "aHandler", "aBindedView"],
source: "onBinded: aTarget event: anEvent handler: aHandler view: aBindedView\x0a\x09\x22The custom handler to bind on this controller is reacting\x22\x0a\x0a\x09super onBinded: aTarget event: anEvent handler: aHandler view: aBindedView.\x0a\x09\x0a\x09",
messageSends: ["onBinded:event:handler:view:"],
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

smalltalk.addMethod(
smalltalk.method({
selector: "renderOn:",
protocol: 'actions',
fn: function (html){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(console)._log_("rendering Iterated..");
self._configure();
self._bind();
return self}, function($ctx1) {$ctx1.fill(self,"renderOn:",{html:html},globals.IteratedController)})},
args: ["html"],
source: "renderOn: html\x0a\x0a\x09console log: 'rendering Iterated..'.\x0a\x0a\x09self configure.\x0a\x0a\x09self bind.",
messageSends: ["log:", "configure", "bind"],
referencedClasses: []
}),
globals.IteratedController);


});
