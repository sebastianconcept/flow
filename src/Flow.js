define("app/Flow", ["amber/boot", "amber_core/Kernel-Objects", "amber_core/Web", "app/MiniMapless"], function($boot){
var smalltalk=$boot.vm,nil=$boot.nil,_st=$boot.asReceiver,globals=$boot.globals;
smalltalk.addPackage('Flow');
smalltalk.packages["Flow"].transport = {"type":"amd","amdNamespace":"app"};

smalltalk.addClass('API', globals.Object, [], 'Flow');


smalltalk.addClass('RESTfulAPI', globals.API, [], 'Flow');


smalltalk.addClass('WebSocketAPI', globals.API, [], 'Flow');


smalltalk.addClass('Client', globals.Object, ['rest', 'webSocket'], 'Flow');


smalltalk.addClass('Controller', globals.Widget, ['model'], 'Flow');


smalltalk.addClass('RouteableController', globals.Controller, [], 'Flow');
globals.RouteableController.comment="## This is an abstraction. \x0a\x0a*Concrete subclasses know* if they are valid for a given URI so the app can be routed to them.\x0a\x0aA typical web app might have:\x0a1. home\x0a2. sign up\x0a3. sign in\x0a4. many other app-specific controllers";


smalltalk.addClass('FlowApp', globals.RouteableController, [], 'Flow');
smalltalk.addMethod(
smalltalk.method({
selector: "initialize",
protocol: 'initialization',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
($ctx1.supercall = true, globals.FlowApp.superclass.fn.prototype._initialize.apply(_st(self), []));
$ctx1.supercall = false;
_st(window)._at_put_("app",self);
return self}, function($ctx1) {$ctx1.fill(self,"initialize",{},globals.FlowApp)})},
args: [],
source: "initialize\x0a\x0a\x09super initialize.\x0a\x09\x0a\x09\x22Handy reference\x22\x0a\x09window at: 'app' put: self",
messageSends: ["initialize", "at:put:"],
referencedClasses: []
}),
globals.FlowApp);

smalltalk.addMethod(
smalltalk.method({
selector: "onOpen",
protocol: 'reactions',
fn: function (){
var self=this;
function $Router(){return globals.Router||(typeof Router=="undefined"?nil:Router)}
return smalltalk.withContext(function($ctx1) { 
self._render();
_st("#loader"._asJQuery())._hide();
_st(_st(window)._document())._title_(_st(self._class())._name());
_st($Router())._observeHash();
return self}, function($ctx1) {$ctx1.fill(self,"onOpen",{},globals.FlowApp)})},
args: [],
source: "onOpen\x0a\x0a\x09self render.\x0a\x09\x0a\x09'#loader' asJQuery hide.\x0a\x09\x0a\x09window document title: self class name.\x0a\x09\x0a\x09Router observeHash.",
messageSends: ["render", "hide", "asJQuery", "title:", "document", "name", "class", "observeHash"],
referencedClasses: ["Router"]
}),
globals.FlowApp);


smalltalk.addMethod(
smalltalk.method({
selector: "open",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self._new())._onOpen();
return $1;
}, function($ctx1) {$ctx1.fill(self,"open",{},globals.FlowApp.klass)})},
args: [],
source: "open\x0a\x09\x22The foundation is ready, time to start this app!\x22\x0a\x0a\x09^ self new onOpen",
messageSends: ["onOpen", "new"],
referencedClasses: []
}),
globals.FlowApp.klass);


smalltalk.addClass('Flow', globals.Object, [], 'Flow');


smalltalk.addClass('Model', globals.MaplessModel, [], 'Flow');


smalltalk.addClass('Router', globals.Object, [], 'Flow');
globals.Router.comment="This router observes changes in the URI and reacts accordingly.\x0a\x0aThe strategy is to collaborate intensively with controllers that understands #isValidFor: to flexibly know what to do with a pontentially complex URI";

smalltalk.addMethod(
smalltalk.method({
selector: "observeHash",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(window)._onhashchange_((function(){
return smalltalk.withContext(function($ctx2) {
return self._onHashChanged();
$ctx2.sendIdx["onHashChanged"]=1;
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}));
self._onHashChanged();
return self}, function($ctx1) {$ctx1.fill(self,"observeHash",{},globals.Router.klass)})},
args: [],
source: "observeHash\x0a\x0a\x09window onhashchange:[ self onHashChanged ].\x0a\x09self onHashChanged",
messageSends: ["onhashchange:", "onHashChanged"],
referencedClasses: []
}),
globals.Router.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "onHashChanged",
protocol: 'reactions',
fn: function (){
var self=this;
function $RouteableController(){return globals.RouteableController||(typeof RouteableController=="undefined"?nil:RouteableController)}
return smalltalk.withContext(function($ctx1) { 
self._trigger_("aboutToRoute");
$ctx1.sendIdx["trigger:"]=1;
_st(_st(_st($RouteableController())._routeFor_(self._route()))._new())._render();
self._trigger_("afterRouting");
return self}, function($ctx1) {$ctx1.fill(self,"onHashChanged",{},globals.Router.klass)})},
args: [],
source: "onHashChanged\x0a\x0a\x09self trigger: 'aboutToRoute'.\x0a\x0a\x09(RouteableController routeFor: self route) new render.\x0a\x09\x0a\x09self trigger: 'afterRouting'\x0a\x09",
messageSends: ["trigger:", "render", "new", "routeFor:", "route"],
referencedClasses: ["RouteableController"]
}),
globals.Router.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "route",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self._uri())._replace_with_("^#/","");
return $1;
}, function($ctx1) {$ctx1.fill(self,"route",{},globals.Router.klass)})},
args: [],
source: "route\x0a\x09\x22Answers the current route.\x22\x0a\x09\x0a\x09^ self uri replace: '^#/' with: ''",
messageSends: ["replace:with:", "uri"],
referencedClasses: []
}),
globals.Router.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "uri",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(_st(window)._location())._hash();
return $1;
}, function($ctx1) {$ctx1.fill(self,"uri",{},globals.Router.klass)})},
args: [],
source: "uri\x0a\x0a\x09^ window location hash",
messageSends: ["hash", "location"],
referencedClasses: []
}),
globals.Router.klass);


smalltalk.addClass('Session', globals.Object, ['user', 'client'], 'Flow');

smalltalk.addMethod(
smalltalk.method({
selector: "trigger:",
protocol: '*Flow',
fn: function (anEventName){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(_st(jQuery)._value_(self))._trigger_(anEventName);
return $1;
}, function($ctx1) {$ctx1.fill(self,"trigger:",{anEventName:anEventName},globals.Object)})},
args: ["anEventName"],
source: "trigger: anEventName \x0a\x09\x22Triggers anEventName in this object.\x0a\x09There you have it, it happened. \x0a\x09Hey World, do something about this!\x22\x0a\x09\x0a\x09^ (jQuery value: self) trigger: anEventName ",
messageSends: ["trigger:", "value:"],
referencedClasses: []
}),
globals.Object);

smalltalk.addMethod(
smalltalk.method({
selector: "trigger:with:",
protocol: '*Flow',
fn: function (anEventName,anArgument){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(_st(jQuery)._value_(self))._trigger_with_(anEventName,anArgument);
return $1;
}, function($ctx1) {$ctx1.fill(self,"trigger:with:",{anEventName:anEventName,anArgument:anArgument},globals.Object)})},
args: ["anEventName", "anArgument"],
source: "trigger: anEventName with: anArgument\x0a\x09\x22Triggers anEventName in this object.\x0a\x09There you have it, it happened. \x0a\x09Hey World, do something about this!\x22\x0a\x09\x0a\x09^ (jQuery value: self) \x0a\x09\x09\x09trigger: anEventName \x0a\x09\x09\x09with: anArgument",
messageSends: ["trigger:with:", "value:"],
referencedClasses: []
}),
globals.Object);

smalltalk.addMethod(
smalltalk.method({
selector: "when:do:",
protocol: '*Flow',
fn: function (anEventName,aReactionBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(_st(jQuery)._value_(self))._on_do_(anEventName,aReactionBlock);
return $1;
}, function($ctx1) {$ctx1.fill(self,"when:do:",{anEventName:anEventName,aReactionBlock:aReactionBlock},globals.Object)})},
args: ["anEventName", "aReactionBlock"],
source: "when: anEventName do: aReactionBlock\x0a\x09\x22Wires the observation of this object to the occurrence of anEventName.\x0a\x09When (and if) anEventName happens, aReactionBlock will take place. \x0a\x09Godspeed!\x22\x0a\x09\x0a\x09^ (jQuery value: self) \x0a\x09\x09on: anEventName \x0a\x09\x09do: aReactionBlock",
messageSends: ["on:do:", "value:"],
referencedClasses: []
}),
globals.Object);

});
