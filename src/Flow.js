define("app/Flow", ["amber/boot", "amber_core/Kernel-Objects", "amber_core/Web", "app/MiniMapless"], function($boot){
var smalltalk=$boot.vm,nil=$boot.nil,_st=$boot.asReceiver,globals=$boot.globals;
smalltalk.addPackage('Flow');
smalltalk.packages["Flow"].transport = {"type":"amd","amdNamespace":"app"};

smalltalk.addClass('API', globals.Object, [], 'Flow');


smalltalk.addClass('RESTfulAPI', globals.API, [], 'Flow');
smalltalk.addMethod(
smalltalk.method({
selector: "delete:do:onError:",
protocol: 'actions',
fn: function (aString,aBlock,errorBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1,$2;
$1=".loader"._asJQuery();
$ctx1.sendIdx["asJQuery"]=1;
_st($1)._show();
_st(jQuery)._ajax_options_(aString,globals.HashedCollection._newFromPairs_(["type","DELETE","contentType","text/json","complete",(function(res){
return smalltalk.withContext(function($ctx2) {
_st(".loader"._asJQuery())._hide();
$2=_st(_st(res)._status()).__eq((200));
if(smalltalk.assert($2)){
return _st(aBlock)._value_(_st(res)._responseText());
$ctx2.sendIdx["value:"]=1;
} else {
return _st(errorBlock)._value_(res);
};
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})})]));
return self}, function($ctx1) {$ctx1.fill(self,"delete:do:onError:",{aString:aString,aBlock:aBlock,errorBlock:errorBlock},globals.RESTfulAPI)})},
args: ["aString", "aBlock", "errorBlock"],
source: "delete: aString  do: aBlock onError: errorBlock\x0a\x0a\x09'.loader' asJQuery show.\x0a\x0a\x09jQuery ajax: aString options: #{\x0a\x09\x09'type' -> 'DELETE'.\x0a\x09\x09'contentType' -> 'text/json'.\x0a\x09\x09'complete' -> [:res |\x0a\x09\x09\x09'.loader' asJQuery hide.\x0a\x09\x09\x09res status = 200\x0a\x09\x09\x09\x09ifTrue: [aBlock value: res responseText]\x0a\x09\x09\x09\x09ifFalse: [errorBlock value: res]]\x0a\x09}",
messageSends: ["show", "asJQuery", "ajax:options:", "hide", "ifTrue:ifFalse:", "=", "status", "value:", "responseText"],
referencedClasses: []
}),
globals.RESTfulAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "get:do:onError:",
protocol: 'actions',
fn: function (aString,aBlock,errorBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1,$2,$3;
$1=".loader"._asJQuery();
$ctx1.sendIdx["asJQuery"]=1;
_st($1)._show();
_st(jQuery)._ajax_options_(aString,globals.HashedCollection._newFromPairs_(["contentType","text/json","complete",(function(res){
return smalltalk.withContext(function($ctx2) {
_st(".loader"._asJQuery())._hide();
$2=_st(_st(res)._status()).__eq((200));
if(smalltalk.assert($2)){
$3=_st(res)._responseText();
$ctx2.sendIdx["responseText"]=1;
return _st(aBlock)._value_($3);
$ctx2.sendIdx["value:"]=1;
} else {
return _st(errorBlock)._value_(_st(res)._responseText());
};
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})})]));
return self}, function($ctx1) {$ctx1.fill(self,"get:do:onError:",{aString:aString,aBlock:aBlock,errorBlock:errorBlock},globals.RESTfulAPI)})},
args: ["aString", "aBlock", "errorBlock"],
source: "get: aString  do: aBlock onError: errorBlock\x0a\x0a\x09'.loader' asJQuery show.\x0a\x0a\x09jQuery ajax: aString options: #{\x0a\x09\x09'contentType' -> 'text/json'.\x0a\x09\x09'complete' -> [:res |\x0a\x09\x09\x09'.loader' asJQuery hide.\x0a\x09\x09\x09res status = 200\x0a\x09\x09\x09\x09ifTrue: [aBlock value: res responseText]\x0a\x09\x09\x09\x09ifFalse: [errorBlock value: res responseText]]\x0a\x09}",
messageSends: ["show", "asJQuery", "ajax:options:", "hide", "ifTrue:ifFalse:", "=", "status", "value:", "responseText"],
referencedClasses: []
}),
globals.RESTfulAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "post:data:do:onError:",
protocol: 'actions',
fn: function (aString,aString2,aBlock,errorBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1,$2;
$1=".loader"._asJQuery();
$ctx1.sendIdx["asJQuery"]=1;
_st($1)._show();
_st(jQuery)._ajax_options_(aString,globals.HashedCollection._newFromPairs_(["type","POST","contentType","text/json","data",aString2,"complete",(function(res){
return smalltalk.withContext(function($ctx2) {
_st(".loader"._asJQuery())._hide();
$2=_st(_st(res)._status()).__eq((200));
if(smalltalk.assert($2)){
return _st(aBlock)._value_(_st(res)._responseText());
$ctx2.sendIdx["value:"]=1;
} else {
return _st(errorBlock)._value_(res);
};
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})})]));
return self}, function($ctx1) {$ctx1.fill(self,"post:data:do:onError:",{aString:aString,aString2:aString2,aBlock:aBlock,errorBlock:errorBlock},globals.RESTfulAPI)})},
args: ["aString", "aString2", "aBlock", "errorBlock"],
source: "post: aString data: aString2 do: aBlock onError: errorBlock\x0a\x0a\x09'.loader' asJQuery show.\x0a\x0a\x09jQuery ajax: aString options: #{\x0a\x09\x09'type' -> 'POST'.\x0a\x09\x09'contentType' -> 'text/json'.\x0a\x09\x09'data' -> aString2.\x0a\x09\x09'complete' -> [:res |\x0a\x09\x09\x09'.loader' asJQuery hide.\x0a\x09\x09\x09res status = 200\x0a\x09\x09\x09\x09ifTrue: [aBlock value: res responseText]\x0a\x09\x09\x09\x09ifFalse: [errorBlock value: res]]\x0a\x09}",
messageSends: ["show", "asJQuery", "ajax:options:", "hide", "ifTrue:ifFalse:", "=", "status", "value:", "responseText"],
referencedClasses: []
}),
globals.RESTfulAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "put:data:do:onError:",
protocol: 'actions',
fn: function (aString,aString2,aBlock,errorBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1,$2;
$1=".loader"._asJQuery();
$ctx1.sendIdx["asJQuery"]=1;
_st($1)._show();
_st(jQuery)._ajax_options_(aString,globals.HashedCollection._newFromPairs_(["type","PUT","contentType","text/json","data",aString2,"complete",(function(res){
return smalltalk.withContext(function($ctx2) {
_st(".loader"._asJQuery())._hide();
$2=_st(_st(res)._status()).__eq((200));
if(smalltalk.assert($2)){
return _st(aBlock)._value_(_st(res)._responseText());
$ctx2.sendIdx["value:"]=1;
} else {
return _st(errorBlock)._value_(res);
};
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})})]));
return self}, function($ctx1) {$ctx1.fill(self,"put:data:do:onError:",{aString:aString,aString2:aString2,aBlock:aBlock,errorBlock:errorBlock},globals.RESTfulAPI)})},
args: ["aString", "aString2", "aBlock", "errorBlock"],
source: "put: aString data: aString2 do: aBlock onError: errorBlock\x0a\x0a\x09'.loader' asJQuery show.\x0a\x0a\x09jQuery ajax: aString options: #{\x0a\x09\x09'type' -> 'PUT'.\x0a\x09\x09'contentType' -> 'text/json'.\x0a\x09\x09'data' -> aString2.\x0a\x09\x09'complete' -> [:res |\x0a\x09\x09\x09'.loader' asJQuery hide.\x0a\x09\x09\x09res status = 200\x0a\x09\x09\x09\x09ifTrue: [aBlock value: res responseText]\x0a\x09\x09\x09\x09ifFalse: [errorBlock value: res]]\x0a\x09}",
messageSends: ["show", "asJQuery", "ajax:options:", "hide", "ifTrue:ifFalse:", "=", "status", "value:", "responseText"],
referencedClasses: []
}),
globals.RESTfulAPI);



smalltalk.addClass('WebSocketAPI', globals.API, [], 'Flow');


smalltalk.addClass('Client', globals.Object, ['rest', 'webSocket'], 'Flow');


smalltalk.addClass('Controller', globals.Widget, ['model'], 'Flow');
smalltalk.addMethod(
smalltalk.method({
selector: "jQueryElement",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1="#content"._asJQuery();
return $1;
}, function($ctx1) {$ctx1.fill(self,"jQueryElement",{},globals.Controller)})},
args: [],
source: "jQueryElement\x0a\x0a\x09^ '#content' asJQuery",
messageSends: ["asJQuery"],
referencedClasses: []
}),
globals.Controller);

smalltalk.addMethod(
smalltalk.method({
selector: "render",
protocol: 'actions',
fn: function (){
var self=this;
function $HTMLCanvas(){return globals.HTMLCanvas||(typeof HTMLCanvas=="undefined"?nil:HTMLCanvas)}
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self._jQueryElement();
$ctx1.sendIdx["jQueryElement"]=1;
_st($1)._empty();
self._renderOn_(_st($HTMLCanvas())._onJQuery_(self._jQueryElement()));
return self}, function($ctx1) {$ctx1.fill(self,"render",{},globals.Controller)})},
args: [],
source: "render\x0a\x09\x0a\x09self jQueryElement empty.\x0a\x09\x0a\x09self renderOn: (HTMLCanvas onJQuery: self jQueryElement)",
messageSends: ["empty", "jQueryElement", "renderOn:", "onJQuery:"],
referencedClasses: ["HTMLCanvas"]
}),
globals.Controller);

smalltalk.addMethod(
smalltalk.method({
selector: "renderOn:",
protocol: 'actions',
fn: function (html){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(html)._h1_(_st(self._class())._name());
return self}, function($ctx1) {$ctx1.fill(self,"renderOn:",{html:html},globals.Controller)})},
args: ["html"],
source: "renderOn: html\x0a\x0a\x09html h1: self class name",
messageSends: ["h1:", "name", "class"],
referencedClasses: []
}),
globals.Controller);



smalltalk.addClass('RouteableController', globals.Controller, [], 'Flow');
globals.RouteableController.comment="## This is an abstraction. \x0a\x0a*Concrete subclasses know* if they are valid for a given URI so the app can be routed to them.\x0a\x0aA typical web app might have:\x0a1. home\x0a2. sign up\x0a3. sign in\x0a4. many other app-specific controllers";

smalltalk.addMethod(
smalltalk.method({
selector: "isAbstract",
protocol: 'testing',
fn: function (){
var self=this;
function $RouteableController(){return globals.RouteableController||(typeof RouteableController=="undefined"?nil:RouteableController)}
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self.__eq($RouteableController());
return $1;
}, function($ctx1) {$ctx1.fill(self,"isAbstract",{},globals.RouteableController.klass)})},
args: [],
source: "isAbstract\x0a\x09\x22Answers true if the receiver is abstract.\x22\x0a\x09\x0a\x09^ self = RouteableController",
messageSends: ["="],
referencedClasses: ["RouteableController"]
}),
globals.RouteableController.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "isValidFor:",
protocol: 'testing',
fn: function (anURI){
var self=this;
return false;
},
args: ["anURI"],
source: "isValidFor: anURI\x0a\x09\x22Answers true if this controller is the right route for anURI\x22\x0a\x09\x0a\x09\x22the default policy is reject\x22\x0a\x09^ false",
messageSends: [],
referencedClasses: []
}),
globals.RouteableController.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "keyword",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $5,$4,$7,$6,$3,$2,$1;
$5=self._name();
$ctx1.sendIdx["name"]=1;
$4=_st($5)._reversed();
$7="Controller"._size();
$ctx1.sendIdx["size"]=1;
$6=_st($7).__plus((1));
$3=_st($4)._copyFrom_to_($6,_st(self._name())._size());
$2=_st($3)._reversed();
$ctx1.sendIdx["reversed"]=1;
$1=_st($2)._asLowercase();
return $1;
}, function($ctx1) {$ctx1.fill(self,"keyword",{},globals.RouteableController.klass)})},
args: [],
source: "keyword\x0a\x09\x22Answers the name of the class in lowercase without \x0a\x09the 'Controller' sufix so it can, for example, be used for friendly URI.\x0a\x09Subclasses are expected to follow the naming convention *Controller like\x0a\x09ThisNameController, ThatOtherNameController, AnyNameController, etc\x22\x0a\x0a\x09^ (self name reversed copyFrom: 'Controller' size + 1 to: self name size) reversed asLowercase",
messageSends: ["asLowercase", "reversed", "copyFrom:to:", "name", "+", "size"],
referencedClasses: []
}),
globals.RouteableController.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "routeFor:",
protocol: 'actions',
fn: function (anURI){
var self=this;
function $NotFoundController(){return globals.NotFoundController||(typeof NotFoundController=="undefined"?nil:NotFoundController)}
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self._allSubclasses())._detect_ifNone_((function(each){
return smalltalk.withContext(function($ctx2) {
return _st(each)._isValidFor_(anURI);
}, function($ctx2) {$ctx2.fillBlock({each:each},$ctx1,1)})}),(function(){
return $NotFoundController();
}));
return $1;
}, function($ctx1) {$ctx1.fill(self,"routeFor:",{anURI:anURI},globals.RouteableController.klass)})},
args: ["anURI"],
source: "routeFor: anURI\x0a\x09\x22Answers the subclass that is a good fit to route anURI.\x22\x0a\x09\x0a\x09^ self allSubclasses\x0a\x09\x09detect:[ :each | each isValidFor: anURI ]\x0a\x09\x09ifNone:[ NotFoundController ]",
messageSends: ["detect:ifNone:", "allSubclasses", "isValidFor:"],
referencedClasses: ["NotFoundController"]
}),
globals.RouteableController.klass);


smalltalk.addClass('FlowAppController', globals.RouteableController, [], 'Flow');
smalltalk.addMethod(
smalltalk.method({
selector: "initialize",
protocol: 'initialization',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
($ctx1.supercall = true, globals.FlowAppController.superclass.fn.prototype._initialize.apply(_st(self), []));
$ctx1.supercall = false;
_st(window)._at_put_("app",self);
return self}, function($ctx1) {$ctx1.fill(self,"initialize",{},globals.FlowAppController)})},
args: [],
source: "initialize\x0a\x0a\x09super initialize.\x0a\x09\x0a\x09\x22Handy reference\x22\x0a\x09window at: 'app' put: self",
messageSends: ["initialize", "at:put:"],
referencedClasses: []
}),
globals.FlowAppController);

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
return self}, function($ctx1) {$ctx1.fill(self,"onOpen",{},globals.FlowAppController)})},
args: [],
source: "onOpen\x0a\x0a\x09self render.\x0a\x09\x0a\x09'#loader' asJQuery hide.\x0a\x09\x0a\x09window document title: self class name.\x0a\x09\x0a\x09Router observeHash.",
messageSends: ["render", "hide", "asJQuery", "title:", "document", "name", "class", "observeHash"],
referencedClasses: ["Router"]
}),
globals.FlowAppController);


smalltalk.addMethod(
smalltalk.method({
selector: "isAbstract",
protocol: 'testing',
fn: function (){
var self=this;
function $FlowAppController(){return globals.FlowAppController||(typeof FlowAppController=="undefined"?nil:FlowAppController)}
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self.__eq($FlowAppController());
return $1;
}, function($ctx1) {$ctx1.fill(self,"isAbstract",{},globals.FlowAppController.klass)})},
args: [],
source: "isAbstract\x0a\x09\x22Answers true if the receiver is abstract.\x22\x0a\x09\x0a\x09^ self = FlowAppController",
messageSends: ["="],
referencedClasses: ["FlowAppController"]
}),
globals.FlowAppController.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "isValidFor:",
protocol: 'testing',
fn: function (anURI){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(_st(self._isAbstract())._not())._and_((function(){
return smalltalk.withContext(function($ctx2) {
return _st(anURI)._isEmpty();
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}));
return $1;
}, function($ctx1) {$ctx1.fill(self,"isValidFor:",{anURI:anURI},globals.FlowAppController.klass)})},
args: ["anURI"],
source: "isValidFor: anURI\x0a\x09\x22Answers true if this controller is the right route for anURI\x22\x0a\x09\x0a\x09^ self isAbstract not and:[\x0a\x09anURI isEmpty ]",
messageSends: ["and:", "not", "isAbstract", "isEmpty"],
referencedClasses: []
}),
globals.FlowAppController.klass);

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
}, function($ctx1) {$ctx1.fill(self,"open",{},globals.FlowAppController.klass)})},
args: [],
source: "open\x0a\x09\x22The foundation is ready, time to start this app!\x22\x0a\x0a\x09^ self new onOpen",
messageSends: ["onOpen", "new"],
referencedClasses: []
}),
globals.FlowAppController.klass);


smalltalk.addClass('NotFoundController', globals.RouteableController, [], 'Flow');


smalltalk.addClass('TemplateController', globals.RouteableController, [], 'Flow');
globals.TemplateController.comment="## TemplateController is an abstraction\x0aThe concrete subclasses of TemplateController follow the convention of loading html from the server.\x0aThis convention uses the keyword of the controller as the name of the template to be found at views/";
smalltalk.addMethod(
smalltalk.method({
selector: "renderOn:",
protocol: 'rendering',
fn: function (html){
var self=this;
function $Array(){return globals.Array||(typeof Array=="undefined"?nil:Array)}
return smalltalk.withContext(function($ctx1) { 
var $1,$3,$2;
$1=require;
$3=_st("bower_components/text/text!views/".__comma(_st(self._class())._keyword())).__comma(".html");
$ctx1.sendIdx[","]=1;
$2=_st($Array())._with_($3);
_st($1)._value_value_($2,(function(template){
return smalltalk.withContext(function($ctx2) {
return _st(self._jQueryElement())._html_(template);
}, function($ctx2) {$ctx2.fillBlock({template:template},$ctx1,1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"renderOn:",{html:html},globals.TemplateController)})},
args: ["html"],
source: "renderOn: html\x0a\x0a\x09require \x0a\x09\x09value:(Array with: 'bower_components/text/text!views/',self class keyword,'.html')\x0a\x09\x09value:[\x09:template | \x0a\x09\x09\x09self jQueryElement html: template]\x09",
messageSends: ["value:value:", "with:", ",", "keyword", "class", "html:", "jQueryElement"],
referencedClasses: ["Array"]
}),
globals.TemplateController);


smalltalk.addMethod(
smalltalk.method({
selector: "isAbstract",
protocol: 'testing',
fn: function (){
var self=this;
function $TemplateController(){return globals.TemplateController||(typeof TemplateController=="undefined"?nil:TemplateController)}
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self.__eq($TemplateController());
return $1;
}, function($ctx1) {$ctx1.fill(self,"isAbstract",{},globals.TemplateController.klass)})},
args: [],
source: "isAbstract\x0a\x09\x22Answers true if the receiver is abstract.\x22\x0a\x09\x0a\x09^ self = TemplateController",
messageSends: ["="],
referencedClasses: ["TemplateController"]
}),
globals.TemplateController.klass);


smalltalk.addClass('HelloWorldController', globals.TemplateController, [], 'Flow');

smalltalk.addMethod(
smalltalk.method({
selector: "isValidFor:",
protocol: 'testing',
fn: function (anURI){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(_st(self._isAbstract())._not())._and_((function(){
return smalltalk.withContext(function($ctx2) {
return _st(_st(anURI)._notEmpty())._and_((function(){
return smalltalk.withContext(function($ctx3) {
return _st(anURI).__eq(self._keyword());
}, function($ctx3) {$ctx3.fillBlock({},$ctx2,2)})}));
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}));
$ctx1.sendIdx["and:"]=1;
return $1;
}, function($ctx1) {$ctx1.fill(self,"isValidFor:",{anURI:anURI},globals.HelloWorldController.klass)})},
args: ["anURI"],
source: "isValidFor: anURI\x0a\x09\x22Answers true if this controller is the right route for anURI\x22\x0a\x09\x0a\x09^ self isAbstract not and:[\x0a\x09anURI notEmpty and:[\x0a\x09anURI = self keyword ] ]",
messageSends: ["and:", "not", "isAbstract", "notEmpty", "=", "keyword"],
referencedClasses: []
}),
globals.HelloWorldController.klass);


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
source: "onHashChanged\x0a\x09\x0a\x09self trigger: 'aboutToRoute'.\x0a\x09\x0a\x09(RouteableController routeFor: self route) new render.\x0a\x09\x0a\x09self trigger: 'afterRouting'\x0a\x09",
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
