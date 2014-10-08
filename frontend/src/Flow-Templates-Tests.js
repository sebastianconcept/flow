define("app/Flow-Templates-Tests", ["amber/boot", "app/Flow-Binding"], function($boot){
var smalltalk=$boot.vm,nil=$boot.nil,_st=$boot.asReceiver,globals=$boot.globals;
smalltalk.addPackage('Flow-Templates-Tests');
smalltalk.packages["Flow-Templates-Tests"].transport = {"type":"amd","amdNamespace":"app"};

smalltalk.addClass('StuffController', globals.BindingController, [], 'Flow-Templates-Tests');
globals.StuffController.comment="StuffController is a Controller composed by ThingControllers that are created based in the model's content.\x0a\x0aStuff has a collection of Thing(s)";
smalltalk.addMethod(
smalltalk.method({
selector: "addThing",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(_st(self._model())._things())._add_(self._newThing());
self._refresh();
return self}, function($ctx1) {$ctx1.fill(self,"addThing",{},globals.StuffController)})},
args: [],
source: "addThing\x0a\x09\x0a\x09self model things add: self newThing.\x0a\x09self refresh.\x0a\x09",
messageSends: ["add:", "things", "model", "newThing", "refresh"],
referencedClasses: []
}),
globals.StuffController);

smalltalk.addMethod(
smalltalk.method({
selector: "inspiration",
protocol: 'accessing',
fn: function (){
var self=this;
var $1;
$1=["so", "many", "cool", "things", "here", "wow", "great", "sweet", "groovy"];
return $1;
},
args: [],
source: "inspiration\x0a\x09\x22Answers a collection to inspire a name for something.\x22\x0a\x09\x0a\x09^ #(\x0a\x09so \x0a\x09many \x0a\x09cool \x0a\x09things \x0a\x09here \x0a\x09wow \x0a\x09great \x0a \x09sweet \x0a\x09groovy \x0a\x09)\x0a\x09",
messageSends: [],
referencedClasses: []
}),
globals.StuffController);

smalltalk.addMethod(
smalltalk.method({
selector: "newThing",
protocol: 'actions',
fn: function (){
var self=this;
function $Thing(){return globals.Thing||(typeof Thing=="undefined"?nil:Thing)}
return smalltalk.withContext(function($ctx1) { 
var $2,$3,$1;
$2=_st($Thing())._new();
_st($2)._name_(_st(self._inspiration())._atRandom());
$3=_st($2)._yourself();
$1=$3;
return $1;
}, function($ctx1) {$ctx1.fill(self,"newThing",{},globals.StuffController)})},
args: [],
source: "newThing\x0a\x0a\x09^ Thing new\x0a\x09\x09name: self inspiration atRandom;\x0a\x09\x09yourself",
messageSends: ["name:", "new", "atRandom", "inspiration", "yourself"],
referencedClasses: ["Thing"]
}),
globals.StuffController);

smalltalk.addMethod(
smalltalk.method({
selector: "onAfterModel",
protocol: 'reactions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1,$2,$3,$4,$5,$6,$7;
($ctx1.supercall = true, globals.StuffController.superclass.fn.prototype._onAfterModel.apply(_st(self), []));
$ctx1.supercall = false;
$1=self._model();
$ctx1.sendIdx["model"]=1;
_st($1)._when_do_("changed",(function(){
return smalltalk.withContext(function($ctx2) {
return self._onStuffChanged();
$ctx2.sendIdx["onStuffChanged"]=1;
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}));
$2=self._hasView();
if(smalltalk.assert($2)){
self._onStuffChanged();
};
$3=self._model();
$ctx1.sendIdx["model"]=2;
_st($3)._name_("Hey... this stuff is new!");
$4=_st(self._model())._things();
$5=$4;
$6=self._newThing();
$ctx1.sendIdx["newThing"]=1;
_st($5)._add_($6);
$ctx1.sendIdx["add:"]=1;
$7=_st($4)._add_(self._newThing());
return self}, function($ctx1) {$ctx1.fill(self,"onAfterModel",{},globals.StuffController)})},
args: [],
source: "onAfterModel\x0a\x09\x22The model of this controller just have been set.\x22\x0a\x0a\x09super onAfterModel.\x0a\x09\x0a\x09self model when: #changed do:[ self onStuffChanged ].\x0a\x0a\x09self hasView ifTrue:[\x0a\x09\x09self onStuffChanged ].\x0a\x09\x09\x0a\x09\x22Customize the model\x22\x0a\x09self model name: 'Hey... this stuff is new!'.\x0a\x09\x22Silently add something so by default it isn't empty.\x22\x0a\x09self model things add: self newThing; add: self newThing.\x0a\x09\x09\x0a\x09",
messageSends: ["onAfterModel", "when:do:", "model", "onStuffChanged", "ifTrue:", "hasView", "name:", "add:", "things", "newThing"],
referencedClasses: []
}),
globals.StuffController);

smalltalk.addMethod(
smalltalk.method({
selector: "onStuffChanged",
protocol: 'reactions',
fn: function (){
var self=this;
function $ListController(){return globals.ListController||(typeof ListController=="undefined"?nil:ListController)}
function $ThingController(){return globals.ThingController||(typeof ThingController=="undefined"?nil:ThingController)}
return smalltalk.withContext(function($ctx1) { 
var $1,$2;
self._ifAbsentAt_put_("things",(function(){
return smalltalk.withContext(function($ctx2) {
$1=_st($ListController())._for_on_appendingTo_(self["@model"],self,".things"._asJQuery());
_st($1)._getItemsBlock_((function(m){
return smalltalk.withContext(function($ctx3) {
return _st(m)._things();
}, function($ctx3) {$ctx3.fillBlock({m:m},$ctx2,2)})}));
_st($1)._itemControllerClass_($ThingController());
$2=_st($1)._yourself();
return $2;
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}));
self._refresh();
return self}, function($ctx1) {$ctx1.fill(self,"onStuffChanged",{},globals.StuffController)})},
args: [],
source: "onStuffChanged\x0a\x09\x09\x0a\x09self ifAbsentAt: 'things' \x0a\x09\x09put: [\x0a\x09\x09\x09\x22Lazy creation of the list controller for the thumbnails\x22\x0a\x09\x09\x09(ListController \x0a\x09\x09\x09\x09for: model \x0a\x09\x09\x09\x09on: self \x0a\x09\x09\x09\x09appendingTo: '.things' asJQuery)\x0a\x09\x09\x09\x09\x09getItemsBlock: [:m| m things ];\x0a\x09\x09\x09\x09\x09itemControllerClass: ThingController;\x0a\x09\x09\x09\x09\x09yourself].\x0a\x09self refresh",
messageSends: ["ifAbsentAt:put:", "getItemsBlock:", "for:on:appendingTo:", "asJQuery", "things", "itemControllerClass:", "yourself", "refresh"],
referencedClasses: ["ListController", "ThingController"]
}),
globals.StuffController);

smalltalk.addMethod(
smalltalk.method({
selector: "onTemplate:",
protocol: 'reactions',
fn: function (data){
var self=this;
return smalltalk.withContext(function($ctx1) { 
($ctx1.supercall = true, globals.StuffController.superclass.fn.prototype._onTemplate_.apply(_st(self), [data]));
$ctx1.supercall = false;
self._onStuffChanged();
return self}, function($ctx1) {$ctx1.fill(self,"onTemplate:",{data:data},globals.StuffController)})},
args: ["data"],
source: "onTemplate: data\x0a\x0a\x09super onTemplate: data.\x0a\x09\x0a\x09self onStuffChanged",
messageSends: ["onTemplate:", "onStuffChanged"],
referencedClasses: []
}),
globals.StuffController);

smalltalk.addMethod(
smalltalk.method({
selector: "refresh",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(self._controllerAt_("things"))._refresh();
return self}, function($ctx1) {$ctx1.fill(self,"refresh",{},globals.StuffController)})},
args: [],
source: "refresh\x0a\x0a\x09(self controllerAt: 'things') refresh",
messageSends: ["refresh", "controllerAt:"],
referencedClasses: []
}),
globals.StuffController);

smalltalk.addMethod(
smalltalk.method({
selector: "removeThing",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(_st(self._model())._things())._removeLast();
self._refresh();
return self}, function($ctx1) {$ctx1.fill(self,"removeThing",{},globals.StuffController)})},
args: [],
source: "removeThing\x0a\x09\x0a\x09self model things removeLast.\x0a\x09self refresh",
messageSends: ["removeLast", "things", "model", "refresh"],
referencedClasses: []
}),
globals.StuffController);


smalltalk.addMethod(
smalltalk.method({
selector: "defaultModel",
protocol: 'accessing',
fn: function (){
var self=this;
function $Stuff(){return globals.Stuff||(typeof Stuff=="undefined"?nil:Stuff)}
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st($Stuff())._new();
return $1;
}, function($ctx1) {$ctx1.fill(self,"defaultModel",{},globals.StuffController.klass)})},
args: [],
source: "defaultModel\x0a\x0a\x09^ Stuff new",
messageSends: ["new"],
referencedClasses: ["Stuff"]
}),
globals.StuffController.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "viewPath",
protocol: 'accessing',
fn: function (){
var self=this;
return "bower_components/text/text!views/demo/";
},
args: [],
source: "viewPath\x0a\x09\x22Returns the path where the template of the view should be found\x22\x0a\x09\x0a\x09^ 'bower_components/text/text!views/demo/'",
messageSends: [],
referencedClasses: []
}),
globals.StuffController.klass);


smalltalk.addClass('StuffUsingEachController', globals.BindingController, [], 'Flow-Templates-Tests');
globals.StuffUsingEachController.comment="StuffController is a Controller composed by ThingControllers that are created based in the model's content.\x0a\x0aStuff has a collection of Thing(s)";
smalltalk.addMethod(
smalltalk.method({
selector: "addThing",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(_st(self._model())._things())._add_(self._newThing());
return self}, function($ctx1) {$ctx1.fill(self,"addThing",{},globals.StuffUsingEachController)})},
args: [],
source: "addThing\x0a\x09\x0a\x09self model things add: self newThing\x0a\x09",
messageSends: ["add:", "things", "model", "newThing"],
referencedClasses: []
}),
globals.StuffUsingEachController);

smalltalk.addMethod(
smalltalk.method({
selector: "initialize",
protocol: 'initialization',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
($ctx1.supercall = true, globals.StuffUsingEachController.superclass.fn.prototype._initialize.apply(_st(self), []));
$ctx1.supercall = false;
self._model_(self._newStuff());
self._addThing();
$ctx1.sendIdx["addThing"]=1;
$1=self._addThing();
return self}, function($ctx1) {$ctx1.fill(self,"initialize",{},globals.StuffUsingEachController)})},
args: [],
source: "initialize\x0a\x0a\x09super initialize.\x0a\x09\x0a\x09self model: self newStuff.\x0a\x09self addThing; addThing",
messageSends: ["initialize", "model:", "newStuff", "addThing"],
referencedClasses: []
}),
globals.StuffUsingEachController);

smalltalk.addMethod(
smalltalk.method({
selector: "inspiration",
protocol: 'accessing',
fn: function (){
var self=this;
var $1;
$1=["so", "many", "cool", "things", "here", "wow", "great", "sweet", "groovy"];
return $1;
},
args: [],
source: "inspiration\x0a\x09\x22Answers a collection to inspire a name for something.\x22\x0a\x09\x0a\x09^ #(\x0a\x09so \x0a\x09many \x0a\x09cool \x0a\x09things \x0a\x09here \x0a\x09wow \x0a\x09great \x0a \x09sweet \x0a\x09groovy \x0a\x09)\x0a\x09",
messageSends: [],
referencedClasses: []
}),
globals.StuffUsingEachController);

smalltalk.addMethod(
smalltalk.method({
selector: "newStuff",
protocol: 'actions',
fn: function (){
var self=this;
function $Stuff(){return globals.Stuff||(typeof Stuff=="undefined"?nil:Stuff)}
return smalltalk.withContext(function($ctx1) { 
var $2,$3,$1;
$2=_st($Stuff())._new();
_st($2)._name_("Hey... this stuff is new!");
$3=_st($2)._yourself();
$1=$3;
return $1;
}, function($ctx1) {$ctx1.fill(self,"newStuff",{},globals.StuffUsingEachController)})},
args: [],
source: "newStuff\x0a\x0a\x09^ Stuff new\x0a\x09\x09name: 'Hey... this stuff is new!';\x0a\x09\x09yourself",
messageSends: ["name:", "new", "yourself"],
referencedClasses: ["Stuff"]
}),
globals.StuffUsingEachController);

smalltalk.addMethod(
smalltalk.method({
selector: "newThing",
protocol: 'actions',
fn: function (){
var self=this;
function $Thing(){return globals.Thing||(typeof Thing=="undefined"?nil:Thing)}
return smalltalk.withContext(function($ctx1) { 
var $2,$3,$1;
$2=_st($Thing())._new();
_st($2)._name_(_st(self._inspiration())._atRandom());
$3=_st($2)._yourself();
$1=$3;
return $1;
}, function($ctx1) {$ctx1.fill(self,"newThing",{},globals.StuffUsingEachController)})},
args: [],
source: "newThing\x0a\x0a\x09^ Thing new\x0a\x09\x09name: self inspiration atRandom;\x0a\x09\x09yourself",
messageSends: ["name:", "new", "atRandom", "inspiration", "yourself"],
referencedClasses: ["Thing"]
}),
globals.StuffUsingEachController);

smalltalk.addMethod(
smalltalk.method({
selector: "removeThing",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(_st(self._model())._things())._removeLast();
return self}, function($ctx1) {$ctx1.fill(self,"removeThing",{},globals.StuffUsingEachController)})},
args: [],
source: "removeThing\x0a\x09\x0a\x09self model things removeLast",
messageSends: ["removeLast", "things", "model"],
referencedClasses: []
}),
globals.StuffUsingEachController);


smalltalk.addMethod(
smalltalk.method({
selector: "defaultModel",
protocol: 'accessing',
fn: function (){
var self=this;
function $Stuff(){return globals.Stuff||(typeof Stuff=="undefined"?nil:Stuff)}
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st($Stuff())._new();
return $1;
}, function($ctx1) {$ctx1.fill(self,"defaultModel",{},globals.StuffUsingEachController.klass)})},
args: [],
source: "defaultModel\x0a\x0a\x09^ Stuff new",
messageSends: ["new"],
referencedClasses: ["Stuff"]
}),
globals.StuffUsingEachController.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "viewPath",
protocol: 'accessing',
fn: function (){
var self=this;
return "bower_components/text/text!views/demo/";
},
args: [],
source: "viewPath\x0a\x09\x22Returns the path where the template of the view should be found\x22\x0a\x09\x0a\x09^ 'bower_components/text/text!views/demo/'",
messageSends: [],
referencedClasses: []
}),
globals.StuffUsingEachController.klass);


smalltalk.addClass('StuffComposedUsingEachController', globals.StuffUsingEachController, [], 'Flow-Templates-Tests');
smalltalk.addMethod(
smalltalk.method({
selector: "onBinded:event:handler:view:",
protocol: 'reactions',
fn: function (aTarget,anEvent,aHandler,aBindedView){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(console)._log_("onBinded: aTarget event: anEvent handler: aHandler view: aBindedView");
$ctx1.sendIdx["log:"]=1;
_st(console)._info_(aHandler);
_st(console)._log_(aBindedView);
($ctx1.supercall = true, globals.StuffComposedUsingEachController.superclass.fn.prototype._onBinded_event_handler_view_.apply(_st(self), [aTarget,anEvent,aHandler,aBindedView]));
$ctx1.supercall = false;
return self}, function($ctx1) {$ctx1.fill(self,"onBinded:event:handler:view:",{aTarget:aTarget,anEvent:anEvent,aHandler:aHandler,aBindedView:aBindedView},globals.StuffComposedUsingEachController)})},
args: ["aTarget", "anEvent", "aHandler", "aBindedView"],
source: "onBinded: aTarget event: anEvent handler: aHandler view: aBindedView\x0a\x09\x22The custom handler to bind on this controller is reacting\x22\x0a\x0a\x09console log: 'onBinded: aTarget event: anEvent handler: aHandler view: aBindedView'.\x0a\x09console info: aHandler.\x0a\x09console log: aBindedView.\x0a\x0a\x09super onBinded: aTarget event: anEvent handler: aHandler view: aBindedView.\x0a\x09\x0a\x09\x0a\x09\x22self ifAbsentAt: \x22",
messageSends: ["log:", "info:", "onBinded:event:handler:view:"],
referencedClasses: []
}),
globals.StuffComposedUsingEachController);

smalltalk.addMethod(
smalltalk.method({
selector: "onTemplate:",
protocol: 'reactions',
fn: function (data){
var self=this;
function $IteratedController(){return globals.IteratedController||(typeof IteratedController=="undefined"?nil:IteratedController)}
function $ThingController(){return globals.ThingController||(typeof ThingController=="undefined"?nil:ThingController)}
return smalltalk.withContext(function($ctx1) { 
var $1,$2;
($ctx1.supercall = true, globals.StuffComposedUsingEachController.superclass.fn.prototype._onTemplate_.apply(_st(self), [data]));
$ctx1.supercall = false;
self._ifAbsentAt_put_("things",(function(){
return smalltalk.withContext(function($ctx2) {
$1=_st($IteratedController())._for_on_appendingTo_(self["@model"],self,".things"._asJQuery());
_st($1)._itemControllerClass_($ThingController());
$2=_st($1)._yourself();
return $2;
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}));
_st(self._controllerAt_("things"))._render();
return self}, function($ctx1) {$ctx1.fill(self,"onTemplate:",{data:data},globals.StuffComposedUsingEachController)})},
args: ["data"],
source: "onTemplate: data\x0a\x0a\x09super onTemplate: data.\x0a\x09\x09\x0a\x09self ifAbsentAt: 'things' \x0a\x09\x09put: [\x0a\x09\x09\x09\x22Lazy creation of the iterated controller for the things in stuff\x22\x0a\x09\x09\x09(IteratedController \x0a\x09\x09\x09\x09for: model \x0a\x09\x09\x09\x09on: self\x0a\x09\x09\x09\x09appendingTo: '.things' asJQuery)\x0a\x09\x09\x09\x09\x09itemControllerClass: ThingController;\x0a\x09\x09\x09\x09\x09yourself].\x0a\x0a\x09(self controllerAt: 'things') render\x0a\x09",
messageSends: ["onTemplate:", "ifAbsentAt:put:", "itemControllerClass:", "for:on:appendingTo:", "asJQuery", "yourself", "render", "controllerAt:"],
referencedClasses: ["IteratedController", "ThingController"]
}),
globals.StuffComposedUsingEachController);



smalltalk.addClass('ThingController', globals.BindingController, [], 'Flow-Templates-Tests');

smalltalk.addMethod(
smalltalk.method({
selector: "viewPath",
protocol: 'accessing',
fn: function (){
var self=this;
return "bower_components/text/text!views/demo/";
},
args: [],
source: "viewPath\x0a\x09\x22Returns the path where the template of the view should be found\x22\x0a\x09\x0a\x09^ 'bower_components/text/text!views/demo/'",
messageSends: [],
referencedClasses: []
}),
globals.ThingController.klass);

});
