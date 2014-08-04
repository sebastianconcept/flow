define("app/Flow-Binding", ["amber/boot", "app/Flow-Templates"], function($boot){
var smalltalk=$boot.vm,nil=$boot.nil,_st=$boot.asReceiver,globals=$boot.globals;
smalltalk.addPackage('Flow-Binding');
smalltalk.packages["Flow-Binding"].transport = {"type":"amd","amdNamespace":"app"};

smalltalk.addClass('BindingController', globals.TemplateController, ['view'], 'Flow-Binding');
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
source: "asBindArgument\x0a\x09\x22Answers the model and this controller as rivets like it for binding.\x22\x0a\x09\x0a\x09^ #{\x0a\x09'model' -> self getModelAsArgument.\x0a\x09'controller' -> self\x0a\x09}",
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
source: "bind\x0a\x09\x22Tells rivets.js to bind \x0a\x09the model of this controller to its view.\x22\x0a\x09\x0a\x09self rivets \x0a\x09\x09bind: self view \x0a\x09\x09to: self asBindArgument\x0a\x09",
messageSends: ["bind:to:", "rivets", "view", "asBindArgument"],
referencedClasses: []
}),
globals.BindingController);

smalltalk.addMethod(
smalltalk.method({
selector: "getModelAsArgument",
protocol: 'actions',
fn: function (){
var self=this;
var $1;
$1=self["@model"];
return $1;
},
args: [],
source: "getModelAsArgument\x0a\x09\x22Returns the model in a way that is appropiate for binding (usable by rivets)\x22\x0a\x09^ model ",
messageSends: [],
referencedClasses: []
}),
globals.BindingController);

smalltalk.addMethod(
smalltalk.method({
selector: "getView",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._subclassResponsibility();
return self}, function($ctx1) {$ctx1.fill(self,"getView",{},globals.BindingController)})},
args: [],
source: "getView\x0a\x09\x22Gets and answer the element which is \x0a\x09the parent html element of the view of this controller.\x22\x0a\x09\x0a\x09\x22Subclasses should return in its own way\x0a\x09^ 'bindable' asJQuery\x22\x0a\x0a\x09self subclassResponsibility",
messageSends: ["subclassResponsibility"],
referencedClasses: []
}),
globals.BindingController);

smalltalk.addMethod(
smalltalk.method({
selector: "onAfterModel",
protocol: 'reactions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
($ctx1.supercall = true, globals.BindingController.superclass.fn.prototype._onAfterModel.apply(_st(self), []));
$ctx1.supercall = false;
return self}, function($ctx1) {$ctx1.fill(self,"onAfterModel",{},globals.BindingController)})},
args: [],
source: "onAfterModel\x0a\x0a\x09super onAfterModel.\x0a\x0a\x09\x22self bind\x22",
messageSends: ["onAfterModel"],
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
$1=_st(require)._value_("bower/rivets/dist/rivets.min");
return $1;
}, function($ctx1) {$ctx1.fill(self,"rivets",{},globals.BindingController)})},
args: [],
source: "rivets\x0a\x09\x22Answers the rivets accessor.\x0a\x09http://rivetsjs.com/docs/guide/\x22\x0a\x09\x0a\x09^ require value: 'bower/rivets/dist/rivets.min'",
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
selector: "view",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$receiver;
$2=self["@view"];
if(($receiver = $2) == null || $receiver.isNil){
self["@view"]=self._getView();
$1=self["@view"];
} else {
$1=$2;
};
return $1;
}, function($ctx1) {$ctx1.fill(self,"view",{},globals.BindingController)})},
args: [],
source: "view\x0a\x09\x22Answers the view (element) of this controller\x22\x0a\x09^ view ifNil:[ view := self getView ]",
messageSends: ["ifNil:", "getView"],
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

});
