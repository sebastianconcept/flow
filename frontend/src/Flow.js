define("app/Flow", ["amber/boot", "amber_core/Kernel-Objects", "amber_core/Kernel-Classes", "amber_core/Kernel-Collections", "amber_core/Kernel-Exceptions", "amber_core/Kernel-Infrastructure"], function($boot){
var smalltalk=$boot.vm,nil=$boot.nil,_st=$boot.asReceiver,globals=$boot.globals;
smalltalk.addPackage('Flow');
smalltalk.packages["Flow"].transport = {"type":"amd","amdNamespace":"app"};

smalltalk.addClass('AbsrtactScaffolder', globals.Object, [], 'Flow');

globals.AbsrtactScaffolder.klass.iVarNames = ['api'];
smalltalk.addMethod(
smalltalk.method({
selector: "api",
protocol: 'accessing',
fn: function (){
var self=this;
function $RESTfulAPI(){return globals.RESTfulAPI||(typeof RESTfulAPI=="undefined"?nil:RESTfulAPI)}
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$receiver;
$2=self["@api"];
if(($receiver = $2) == null || $receiver.isNil){
self["@api"]=_st($RESTfulAPI())._new();
$1=self["@api"];
} else {
$1=$2;
};
return $1;
}, function($ctx1) {$ctx1.fill(self,"api",{},globals.AbsrtactScaffolder.klass)})},
args: [],
source: "api\x0a\x0a\x09^ api ifNil:[ api := RESTfulAPI new ]",
messageSends: ["ifNil:", "new"],
referencedClasses: ["RESTfulAPI"]
}),
globals.AbsrtactScaffolder.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "scaffold:",
protocol: 'actions',
fn: function (anObject){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self._subclassResponsibility();
return $1;
}, function($ctx1) {$ctx1.fill(self,"scaffold:",{anObject:anObject},globals.AbsrtactScaffolder.klass)})},
args: ["anObject"],
source: "scaffold: anObject\x0a\x09\x22Scaffold what's relevnt to this scaffolder\x22\x0a\x09\x0a\x09^ self subclassResponsibility",
messageSends: ["subclassResponsibility"],
referencedClasses: []
}),
globals.AbsrtactScaffolder.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "url",
protocol: 'accessing',
fn: function (){
var self=this;
function $Mapless(){return globals.Mapless||(typeof Mapless=="undefined"?nil:Mapless)}
return smalltalk.withContext(function($ctx1) { 
var $3,$2,$1;
$3=_st(_st(_st(_st(window)._location())._asString()).__comma(_st($Mapless())._basePath())).__comma("/scaffold");
$ctx1.sendIdx[","]=3;
$2=_st($3).__comma(self._command());
$ctx1.sendIdx[","]=2;
$1=_st($2).__comma("/");
$ctx1.sendIdx[","]=1;
return $1;
}, function($ctx1) {$ctx1.fill(self,"url",{},globals.AbsrtactScaffolder.klass)})},
args: [],
source: "url\x0a\x0a\x09^ window location asString,Mapless basePath,'/scaffold',self command,'/'",
messageSends: [",", "asString", "location", "basePath", "command"],
referencedClasses: ["Mapless"]
}),
globals.AbsrtactScaffolder.klass);


smalltalk.addClass('CRUDScaffolder', globals.AbsrtactScaffolder, [], 'Flow');

smalltalk.addMethod(
smalltalk.method({
selector: "command",
protocol: 'accessing',
fn: function (){
var self=this;
return "/crud";
},
args: [],
source: "command\x0a\x0a\x09^ '/crud'",
messageSends: [],
referencedClasses: []
}),
globals.CRUDScaffolder.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "scaffold:",
protocol: 'actions',
fn: function (aString){
var self=this;
function $Transcript(){return globals.Transcript||(typeof Transcript=="undefined"?nil:Transcript)}
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$3;
_st($Transcript())._cr();
$ctx1.sendIdx["cr"]=1;
$2=_st("CRUD scaffolding ".__comma(aString)).__comma("...");
$ctx1.sendIdx[","]=1;
$1=_st($Transcript())._show_($2);
$ctx1.sendIdx["show:"]=1;
_st(self._api())._post_data_do_onError_(self._url(),aString,(function(res){
return smalltalk.withContext(function($ctx2) {
_st($Transcript())._cr();
$3=_st($Transcript())._show_(" ...done");
return $3;
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})}),(function(res){
return smalltalk.withContext(function($ctx2) {
return self._error_(_st(res)._responseText());
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,2)})}));
return self}, function($ctx1) {$ctx1.fill(self,"scaffold:",{aString:aString},globals.CRUDScaffolder.klass)})},
args: ["aString"],
source: "scaffold: aString \x0a\x0a\x09Transcript cr; show: 'CRUD scaffolding ', aString,'...'.\x0a\x0a\x09self api\x0a\x09\x09post: self url  \x0a\x09\x09data: aString\x0a\x09\x09do: [ :res | Transcript cr; show: ' ...done']\x0a\x09\x09onError: [ :res | self error: res responseText ]\x09",
messageSends: ["cr", "show:", ",", "post:data:do:onError:", "api", "url", "error:", "responseText"],
referencedClasses: ["Transcript"]
}),
globals.CRUDScaffolder.klass);


smalltalk.addClass('MaplessScaffolder', globals.AbsrtactScaffolder, [], 'Flow');

smalltalk.addMethod(
smalltalk.method({
selector: "backendScaffold:do:onError:",
protocol: 'actions',
fn: function (aString,aBlock,anErrorBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(self._api())._post_data_do_onError_(self._url(),aString,aBlock,anErrorBlock);
return self}, function($ctx1) {$ctx1.fill(self,"backendScaffold:do:onError:",{aString:aString,aBlock:aBlock,anErrorBlock:anErrorBlock},globals.MaplessScaffolder.klass)})},
args: ["aString", "aBlock", "anErrorBlock"],
source: "backendScaffold: aString do: aBlock onError: anErrorBlock\x0a\x0a\x09self api\x0a\x09\x09post: self url  \x0a\x09\x09data: aString\x0a\x09\x09do: aBlock\x0a\x09\x09onError: anErrorBlock",
messageSends: ["post:data:do:onError:", "api", "url"],
referencedClasses: []
}),
globals.MaplessScaffolder.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "command",
protocol: 'accessing',
fn: function (){
var self=this;
return "/mapless";
},
args: [],
source: "command\x0a\x0a\x09^ '/mapless'",
messageSends: [],
referencedClasses: []
}),
globals.MaplessScaffolder.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "frontendScaffold:",
protocol: 'actions',
fn: function (aString){
var self=this;
function $Flow(){return globals.Flow||(typeof Flow=="undefined"?nil:Flow)}
return smalltalk.withContext(function($ctx1) { 
_st(self._parentClass())._subclass_instanceVariableNames_package_(aString,"",_st(_st($Flow())._scaffolder())._packageName());
return self}, function($ctx1) {$ctx1.fill(self,"frontendScaffold:",{aString:aString},globals.MaplessScaffolder.klass)})},
args: ["aString"],
source: "frontendScaffold: aString\x0a\x09\x0a\x09self parentClass \x0a\x09\x09subclass: aString \x0a\x09\x09instanceVariableNames: '' \x0a\x09\x09package: Flow scaffolder packageName",
messageSends: ["subclass:instanceVariableNames:package:", "parentClass", "packageName", "scaffolder"],
referencedClasses: ["Flow"]
}),
globals.MaplessScaffolder.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "parentClass",
protocol: 'accessing',
fn: function (){
var self=this;
function $Mapless(){return globals.Mapless||(typeof Mapless=="undefined"?nil:Mapless)}
return $Mapless();
},
args: [],
source: "parentClass\x0a\x0a\x09^ Mapless",
messageSends: [],
referencedClasses: ["Mapless"]
}),
globals.MaplessScaffolder.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "scaffold:",
protocol: 'actions',
fn: function (aString){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._backendScaffold_do_onError_(aString,(function(res){
return smalltalk.withContext(function($ctx2) {
return self._frontendScaffold_(aString);
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})}),(function(res){
return smalltalk.withContext(function($ctx2) {
return self._error_(_st(res)._responseText());
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,2)})}));
return self}, function($ctx1) {$ctx1.fill(self,"scaffold:",{aString:aString},globals.MaplessScaffolder.klass)})},
args: ["aString"],
source: "scaffold: aString\x0a\x09\x22Scaffold what's relevnt to this scaffolder\x22\x0a\x09\x0a\x09self backendScaffold: aString \x0a\x09\x09do:[ :res | self frontendScaffold: aString ]\x0a\x09\x09onError:[ :res | \x0a\x09\x09\x09self error: res responseText ]",
messageSends: ["backendScaffold:do:onError:", "frontendScaffold:", "error:", "responseText"],
referencedClasses: []
}),
globals.MaplessScaffolder.klass);


smalltalk.addClass('ModelScaffolder', globals.MaplessScaffolder, [], 'Flow');

smalltalk.addMethod(
smalltalk.method({
selector: "command",
protocol: 'accessing',
fn: function (){
var self=this;
return "/model";
},
args: [],
source: "command\x0a\x0a\x09^ '/model'",
messageSends: [],
referencedClasses: []
}),
globals.ModelScaffolder.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "parentClass",
protocol: 'accessing',
fn: function (){
var self=this;
function $MaplessModel(){return globals.MaplessModel||(typeof MaplessModel=="undefined"?nil:MaplessModel)}
return $MaplessModel();
},
args: [],
source: "parentClass\x0a\x0a\x09^ MaplessModel",
messageSends: [],
referencedClasses: ["MaplessModel"]
}),
globals.ModelScaffolder.klass);


smalltalk.addClass('Flow', globals.Object, [], 'Flow');

globals.Flow.klass.iVarNames = ['app','session'];
smalltalk.addMethod(
smalltalk.method({
selector: "activeController",
protocol: 'accessing',
fn: function (){
var self=this;
function $Router(){return globals.Router||(typeof Router=="undefined"?nil:Router)}
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st($Router())._active();
return $1;
}, function($ctx1) {$ctx1.fill(self,"activeController",{},globals.Flow.klass)})},
args: [],
source: "activeController \x0a\x09\x22Returns the controller that is currently active\x22\x0a\x09\x0a\x09^ Router active",
messageSends: ["active"],
referencedClasses: ["Router"]
}),
globals.Flow.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "app",
protocol: 'accessing',
fn: function (){
var self=this;
var $1;
$1=self["@app"];
return $1;
},
args: [],
source: "app \x0a\x0a\x09^ app",
messageSends: [],
referencedClasses: []
}),
globals.Flow.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "app:",
protocol: 'accessing',
fn: function (anApplication){
var self=this;
self["@app"]=anApplication;
return self},
args: ["anApplication"],
source: "app: anApplication \x0a\x0a\x09app := anApplication",
messageSends: [],
referencedClasses: []
}),
globals.Flow.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "initializeSession",
protocol: 'initialization',
fn: function (){
var self=this;
function $Session(){return globals.Session||(typeof Session=="undefined"?nil:Session)}
return smalltalk.withContext(function($ctx1) { 
var $1;
self["@session"]=_st($Session())._new();
$1=self["@session"];
return $1;
}, function($ctx1) {$ctx1.fill(self,"initializeSession",{},globals.Flow.klass)})},
args: [],
source: "initializeSession\x0a\x09\x0a\x09^ session := Session new",
messageSends: ["new"],
referencedClasses: ["Session"]
}),
globals.Flow.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "scaffold",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self._scaffolder();
return $1;
}, function($ctx1) {$ctx1.fill(self,"scaffold",{},globals.Flow.klass)})},
args: [],
source: "scaffold\x0a\x0a\x09^ self scaffolder",
messageSends: ["scaffolder"],
referencedClasses: []
}),
globals.Flow.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "scaffolder",
protocol: 'accessing',
fn: function (){
var self=this;
function $Scaffolder(){return globals.Scaffolder||(typeof Scaffolder=="undefined"?nil:Scaffolder)}
return $Scaffolder();
},
args: [],
source: "scaffolder\x0a\x0a\x09^ Scaffolder",
messageSends: [],
referencedClasses: ["Scaffolder"]
}),
globals.Flow.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "session",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$receiver;
$2=self["@session"];
if(($receiver = $2) == null || $receiver.isNil){
$1=self._initializeSession();
} else {
$1=$2;
};
return $1;
}, function($ctx1) {$ctx1.fill(self,"session",{},globals.Flow.klass)})},
args: [],
source: "session\x0a\x0a\x09^ session ifNil:[ self initializeSession ]",
messageSends: ["ifNil:", "initializeSession"],
referencedClasses: []
}),
globals.Flow.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "session:",
protocol: 'accessing',
fn: function (aSession){
var self=this;
self["@session"]=aSession;
return self},
args: ["aSession"],
source: "session: aSession\x0a\x0a\x09session := aSession",
messageSends: [],
referencedClasses: []
}),
globals.Flow.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "start",
protocol: 'actions',
fn: function (){
var self=this;
function $Router(){return globals.Router||(typeof Router=="undefined"?nil:Router)}
return smalltalk.withContext(function($ctx1) { 
_st(window)._at_put_("flow",self);
_st($Router())._observeHash();
return self}, function($ctx1) {$ctx1.fill(self,"start",{},globals.Flow.klass)})},
args: [],
source: "start\x0a\x09\x22Makes the foundation of a flow app to be ready for action.\x22\x0a\x0a\x09window at: 'flow' put: self.\x0a\x0a\x09\x22Make the router be sensible to URI changes\x22\x0a\x09Router observeHash",
messageSends: ["at:put:", "observeHash"],
referencedClasses: ["Router"]
}),
globals.Flow.klass);


smalltalk.addClass('Scaffolder', globals.Object, [], 'Flow');

globals.Scaffolder.klass.iVarNames = ['packageName'];
smalltalk.addMethod(
smalltalk.method({
selector: "crud:",
protocol: 'actions',
fn: function (aMaplessClassOrName){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self._crudModel_(aMaplessClassOrName);
return $1;
}, function($ctx1) {$ctx1.fill(self,"crud:",{aMaplessClassOrName:aMaplessClassOrName},globals.Scaffolder.klass)})},
args: ["aMaplessClassOrName"],
source: "crud: aMaplessClassOrName\x0a\x0a\x09^ self crudModel: aMaplessClassOrName",
messageSends: ["crudModel:"],
referencedClasses: []
}),
globals.Scaffolder.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "crudMapless:",
protocol: 'actions',
fn: function (aMaplessClassOrName){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
self._mapless_(aMaplessClassOrName);
$1=_st(self._crudScaffolder())._scaffold_(aMaplessClassOrName);
return $1;
}, function($ctx1) {$ctx1.fill(self,"crudMapless:",{aMaplessClassOrName:aMaplessClassOrName},globals.Scaffolder.klass)})},
args: ["aMaplessClassOrName"],
source: "crudMapless: aMaplessClassOrName\x0a\x0a\x09self mapless: aMaplessClassOrName.\x0a\x0a\x09^ self crudScaffolder scaffold: aMaplessClassOrName",
messageSends: ["mapless:", "scaffold:", "crudScaffolder"],
referencedClasses: []
}),
globals.Scaffolder.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "crudModel:",
protocol: 'actions',
fn: function (aMaplessClassOrName){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
self._model_(aMaplessClassOrName);
$1=_st(self._crudScaffolder())._scaffold_(aMaplessClassOrName);
return $1;
}, function($ctx1) {$ctx1.fill(self,"crudModel:",{aMaplessClassOrName:aMaplessClassOrName},globals.Scaffolder.klass)})},
args: ["aMaplessClassOrName"],
source: "crudModel: aMaplessClassOrName\x0a\x0a\x09self model: aMaplessClassOrName.\x0a\x0a\x09^ self crudScaffolder scaffold: aMaplessClassOrName",
messageSends: ["model:", "scaffold:", "crudScaffolder"],
referencedClasses: []
}),
globals.Scaffolder.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "crudScaffolder",
protocol: 'accessing',
fn: function (){
var self=this;
function $CRUDScaffolder(){return globals.CRUDScaffolder||(typeof CRUDScaffolder=="undefined"?nil:CRUDScaffolder)}
return $CRUDScaffolder();
},
args: [],
source: "crudScaffolder\x0a\x0a\x09^ CRUDScaffolder",
messageSends: [],
referencedClasses: ["CRUDScaffolder"]
}),
globals.Scaffolder.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "mapless:",
protocol: 'actions',
fn: function (aMaplessName){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self._maplessScaffolder())._scaffold_(aMaplessName);
return $1;
}, function($ctx1) {$ctx1.fill(self,"mapless:",{aMaplessName:aMaplessName},globals.Scaffolder.klass)})},
args: ["aMaplessName"],
source: "mapless: aMaplessName\x0a\x0a\x09^ self maplessScaffolder scaffold: aMaplessName",
messageSends: ["scaffold:", "maplessScaffolder"],
referencedClasses: []
}),
globals.Scaffolder.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "maplessScaffolder",
protocol: 'accessing',
fn: function (){
var self=this;
function $MaplessScaffolder(){return globals.MaplessScaffolder||(typeof MaplessScaffolder=="undefined"?nil:MaplessScaffolder)}
return $MaplessScaffolder();
},
args: [],
source: "maplessScaffolder\x0a\x0a\x09^ MaplessScaffolder",
messageSends: [],
referencedClasses: ["MaplessScaffolder"]
}),
globals.Scaffolder.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "model:",
protocol: 'actions',
fn: function (aModelName){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self._modelScaffolder())._scaffold_(aModelName);
return $1;
}, function($ctx1) {$ctx1.fill(self,"model:",{aModelName:aModelName},globals.Scaffolder.klass)})},
args: ["aModelName"],
source: "model: aModelName\x0a\x0a\x09^ self modelScaffolder scaffold: aModelName",
messageSends: ["scaffold:", "modelScaffolder"],
referencedClasses: []
}),
globals.Scaffolder.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "modelScaffolder",
protocol: 'accessing',
fn: function (){
var self=this;
function $ModelScaffolder(){return globals.ModelScaffolder||(typeof ModelScaffolder=="undefined"?nil:ModelScaffolder)}
return $ModelScaffolder();
},
args: [],
source: "modelScaffolder\x0a\x0a\x09^ ModelScaffolder",
messageSends: [],
referencedClasses: ["ModelScaffolder"]
}),
globals.Scaffolder.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "packageName",
protocol: 'accessing',
fn: function (){
var self=this;
var $1;
$1=self["@packageName"];
return $1;
},
args: [],
source: "packageName\x0a\x0a\x09^ packageName",
messageSends: [],
referencedClasses: []
}),
globals.Scaffolder.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "packageName:",
protocol: 'accessing',
fn: function (aString){
var self=this;
self["@packageName"]=aString;
return self},
args: ["aString"],
source: "packageName: aString\x0a\x0a\x09packageName := aString",
messageSends: [],
referencedClasses: []
}),
globals.Scaffolder.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "asRemoteReferenceFor:",
protocol: '*Flow',
fn: function (anObject){
var self=this;
return anObject;
},
args: ["anObject"],
source: "asRemoteReferenceFor: anObject\x0a\x09\x22Answers anObject (copy) or an appropiate reference (can't be copied) for \x0a\x09traveling over the wire and still referring to this receiver\x22\x0a\x0a\x09^ anObject",
messageSends: [],
referencedClasses: []
}),
globals.Boolean.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "asRemote",
protocol: '*Flow',
fn: function (){
var self=this;
function $Remote(){return globals.Remote||(typeof Remote=="undefined"?nil:Remote)}
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st($Remote())._for_(self);
return $1;
}, function($ctx1) {$ctx1.fill(self,"asRemote",{},globals.CharacterArray)})},
args: [],
source: "asRemote\x0a\x09\x22Answers a new Remote instance based in the id represented in this string\x22\x0a\x09\x0a\x09^ Remote for: self",
messageSends: ["for:"],
referencedClasses: ["Remote"]
}),
globals.CharacterArray);

smalltalk.addMethod(
smalltalk.method({
selector: "asRemoteReferenceFor:",
protocol: '*Flow',
fn: function (anObject){
var self=this;
return anObject;
},
args: ["anObject"],
source: "asRemoteReferenceFor: anObject\x0a\x09\x22Answers anObject (copy) or an appropiate reference (can't be copied) for \x0a\x09traveling over the wire and still referring to this receiver\x22\x0a\x0a\x09^ anObject",
messageSends: [],
referencedClasses: []
}),
globals.CharacterArray.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "asRemoteReferenceFor:",
protocol: '*Flow',
fn: function (anObject){
var self=this;
return anObject;
},
args: ["anObject"],
source: "asRemoteReferenceFor: anObject\x0a\x09\x22Answers anObject (copy) or an appropiate reference (can't be copied) for \x0a\x09traveling over the wire and still referring to this receiver\x22\x0a\x0a\x09^ anObject",
messageSends: [],
referencedClasses: []
}),
globals.Date.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "printOn:",
protocol: '*Flow',
fn: function (aStream){
var self=this;
var content;
return smalltalk.withContext(function($ctx1) { 
var $1,$2,$3,$4;
($ctx1.supercall = true, globals.Error.superclass.fn.prototype._printOn_.apply(_st(self), [aStream]));
$ctx1.supercall = false;
$1=_st(_st(self["@messageText"])._notNil())._and_((function(){
return smalltalk.withContext(function($ctx2) {
return _st(self["@messageText"])._notEmpty();
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}));
if(smalltalk.assert($1)){
content=self["@messageText"];
content;
};
$2=self._isSmalltalkError();
if(! smalltalk.assert($2)){
content=self._jsStack();
content;
};
$3=_st(content)._isNil();
if(smalltalk.assert($3)){
return self;
};
$4=_st("(".__comma(_st(content)._printString())).__comma(")");
$ctx1.sendIdx[","]=1;
_st(aStream)._nextPutAll_($4);
return self}, function($ctx1) {$ctx1.fill(self,"printOn:",{aStream:aStream,content:content},globals.Error)})},
args: ["aStream"],
source: "printOn: aStream\x0a\x0a\x09| content |\x0a\x09\x0a\x09super printOn: aStream.\x0a\x0a\x09(messageText notNil and:[\x0a\x09messageText notEmpty ]) ifTrue:[\x0a\x09\x09content := messageText ].\x0a\x09\x0a\x09self isSmalltalkError ifFalse:[ content := self jsStack ].\x0a\x09\x0a\x09content isNil ifTrue:[ ^ self ].\x0a\x09\x0a\x09aStream nextPutAll: '(',content printString,')'",
messageSends: ["printOn:", "ifTrue:", "and:", "notNil", "notEmpty", "ifFalse:", "isSmalltalkError", "jsStack", "isNil", "nextPutAll:", ",", "printString"],
referencedClasses: []
}),
globals.Error);

smalltalk.addMethod(
smalltalk.method({
selector: "asRemoteReference",
protocol: '*Flow',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self._class())._asRemoteReferenceFor_(self);
return $1;
}, function($ctx1) {$ctx1.fill(self,"asRemoteReference",{},globals.JSObjectProxy)})},
args: [],
source: "asRemoteReference\x0a\x09\x22Answers the object appropiate for \x0a\x09traveling over the wire and still referring to this receiver\x22\x0a\x09\x0a\x09^ self class asRemoteReferenceFor: self",
messageSends: ["asRemoteReferenceFor:", "class"],
referencedClasses: []
}),
globals.JSObjectProxy);

smalltalk.addMethod(
smalltalk.method({
selector: "asRemoteReferenceFor:",
protocol: '*Flow',
fn: function (anObject){
var self=this;
function $RR(){return globals.RR||(typeof RR=="undefined"?nil:RR)}
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st($RR())._new();
return $1;
}, function($ctx1) {$ctx1.fill(self,"asRemoteReferenceFor:",{anObject:anObject},globals.JSObjectProxy.klass)})},
args: ["anObject"],
source: "asRemoteReferenceFor: anObject\x0a\x09\x22Answers anObject (copy) or an appropiate reference (can't be copied) for \x0a\x09traveling over the wire and still referring to this receiver\x22\x0a\x0a\x09\x22Subclasses differ you can check on them.\x0a\x09The default is not be copied, so...\x22\x0a\x0a\x09^ RR new",
messageSends: ["new"],
referencedClasses: ["RR"]
}),
globals.JSObjectProxy.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "printOn:",
protocol: '*Flow',
fn: function (aStream){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $5,$4,$3,$2,$1;
($ctx1.supercall = true, globals.MessageNotUnderstood.superclass.fn.prototype._printOn_.apply(_st(self), [aStream]));
$ctx1.supercall = false;
$5=_st(self._receiver())._asString();
$ctx1.sendIdx["asString"]=1;
$4="(".__comma($5);
$3=_st($4).__comma(">>");
$ctx1.sendIdx[","]=3;
$2=_st($3).__comma(_st(_st(self._message())._selector())._asString());
$ctx1.sendIdx[","]=2;
$1=_st($2).__comma(")");
$ctx1.sendIdx[","]=1;
_st(aStream)._nextPutAll_($1);
return self}, function($ctx1) {$ctx1.fill(self,"printOn:",{aStream:aStream},globals.MessageNotUnderstood)})},
args: ["aStream"],
source: "printOn: aStream\x0a\x0a\x09super printOn: aStream.\x0a\x09\x0a\x09aStream nextPutAll: '(',self receiver asString, '>>',self message selector asString,')'",
messageSends: ["printOn:", "nextPutAll:", ",", "asString", "receiver", "selector", "message"],
referencedClasses: []
}),
globals.MessageNotUnderstood);

smalltalk.addMethod(
smalltalk.method({
selector: "asRemoteReferenceFor:",
protocol: '*Flow',
fn: function (anObject){
var self=this;
function $RR(){return globals.RR||(typeof RR=="undefined"?nil:RR)}
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st($RR())._new();
return $1;
}, function($ctx1) {$ctx1.fill(self,"asRemoteReferenceFor:",{anObject:anObject},globals.Metaclass)})},
args: ["anObject"],
source: "asRemoteReferenceFor: anObject\x0a\x09\x22Answers anObject (copy) or an appropiate reference (can't be copied) for \x0a\x09traveling over the wire and still referring to this receiver\x22\x0a\x0a\x09\x22Subclasses differ you can check on them.\x0a\x09The default is not be copied, so...\x22\x0a\x0a\x09^ RR new",
messageSends: ["new"],
referencedClasses: ["RR"]
}),
globals.Metaclass);

smalltalk.addMethod(
smalltalk.method({
selector: "asRemoteReferenceFor:",
protocol: '*Flow',
fn: function (anObject){
var self=this;
return anObject;
},
args: ["anObject"],
source: "asRemoteReferenceFor: anObject\x0a\x09\x22Answers anObject (copy) or an appropiate reference (can't be copied) for \x0a\x09traveling over the wire and still referring to this receiver\x22\x0a\x0a\x09^ anObject",
messageSends: [],
referencedClasses: []
}),
globals.Number.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "asRemote",
protocol: '*Flow',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
"todo";
$1=self._asString();
return $1;
}, function($ctx1) {$ctx1.fill(self,"asRemote",{},globals.Object)})},
args: [],
source: "asRemote\x0a\x09\x22Answers this object in a way that is appropriate \x0a\x09for a remote end to do something with it\x22\x0a\x09\x0a\x09#todo. \x22return a proxy so it gets actually useful\x22\x0a\x09^ self asString",
messageSends: ["asString"],
referencedClasses: []
}),
globals.Object);

smalltalk.addMethod(
smalltalk.method({
selector: "asRemoteReference",
protocol: '*Flow',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self._class())._asRemoteReferenceFor_(self);
return $1;
}, function($ctx1) {$ctx1.fill(self,"asRemoteReference",{},globals.Object)})},
args: [],
source: "asRemoteReference\x0a\x09\x22Answers the object appropiate for \x0a\x09traveling over the wire and still referring to this receiver\x22\x0a\x09\x0a\x09^ self class asRemoteReferenceFor: self",
messageSends: ["asRemoteReferenceFor:", "class"],
referencedClasses: []
}),
globals.Object);

smalltalk.addMethod(
smalltalk.method({
selector: "isRemote",
protocol: '*Flow',
fn: function (){
var self=this;
return false;
},
args: [],
source: "isRemote\x0a\x09\x22Answers true if this object is remote\x22\x0a\x09\x0a\x09^ false",
messageSends: [],
referencedClasses: []
}),
globals.Object);

smalltalk.addMethod(
smalltalk.method({
selector: "promise:",
protocol: '*Flow',
fn: function (onDoneBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(_st(_st(jQuery)._value_(self))._promise())._done_(onDoneBlock);
return $1;
}, function($ctx1) {$ctx1.fill(self,"promise:",{onDoneBlock:onDoneBlock},globals.Object)})},
args: ["onDoneBlock"],
source: "promise: onDoneBlock\x0a\x09\x0a\x09^ (jQuery value: self) promise done: onDoneBlock",
messageSends: ["done:", "promise", "value:"],
referencedClasses: []
}),
globals.Object);

smalltalk.addMethod(
smalltalk.method({
selector: "trigger:",
protocol: '*Flow',
fn: function (anEventName){
var self=this;
return smalltalk.withContext(function($ctx1) { 
return $(self._jsObject).trigger(anEventName);
return self}, function($ctx1) {$ctx1.fill(self,"trigger:",{anEventName:anEventName},globals.Object)})},
args: ["anEventName"],
source: "trigger: anEventName \x0a\x09\x22Triggers anEventName in this object.\x0a\x09There you have it, it happened. \x0a\x09Hey World, do something about this!\x22\x0a\x09\x0a\x09<return $(self._jsObject).trigger(anEventName)>",
messageSends: [],
referencedClasses: []
}),
globals.Object);

smalltalk.addMethod(
smalltalk.method({
selector: "trigger:with:",
protocol: '*Flow',
fn: function (anEventName,anArgument){
var self=this;
function $Array(){return globals.Array||(typeof Array=="undefined"?nil:Array)}
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self._trigger_withAll_(anEventName,_st($Array())._with_(anArgument));
return $1;
}, function($ctx1) {$ctx1.fill(self,"trigger:with:",{anEventName:anEventName,anArgument:anArgument},globals.Object)})},
args: ["anEventName", "anArgument"],
source: "trigger: anEventName with: anArgument\x0a\x09\x22Triggers anEventName in this object.\x0a\x09There you have it, it happened. \x0a\x09Hey World, do something about this!\x22\x0a\x09\x0a\x09^ self trigger: anEventName withAll: (Array with: anArgument)",
messageSends: ["trigger:withAll:", "with:"],
referencedClasses: ["Array"]
}),
globals.Object);

smalltalk.addMethod(
smalltalk.method({
selector: "trigger:withAll:",
protocol: '*Flow',
fn: function (anEventName,someArguments){
var self=this;
return smalltalk.withContext(function($ctx1) { 
return $(self._jsObject).trigger(anEventName, someArguments);
return self}, function($ctx1) {$ctx1.fill(self,"trigger:withAll:",{anEventName:anEventName,someArguments:someArguments},globals.Object)})},
args: ["anEventName", "someArguments"],
source: "trigger: anEventName withAll: someArguments\x0a\x09\x22Triggers anEventName in this object.\x0a\x09There you have it, it happened. \x0a\x09Hey World, do something about this!\x22\x0a\x0a\x09<return $(self._jsObject).trigger(anEventName, someArguments)>",
messageSends: [],
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
return $(self._jsObject).bind(anEventName, aReactionBlock);
return self}, function($ctx1) {$ctx1.fill(self,"when:do:",{anEventName:anEventName,aReactionBlock:aReactionBlock},globals.Object)})},
args: ["anEventName", "aReactionBlock"],
source: "when: anEventName do: aReactionBlock\x0a\x09\x22Wires the observation of this object to the occurrence of anEventName.\x0a\x09When (and if) anEventName happens, aReactionBlock will take place. \x0a\x09Based on this feature: http://forum.jquery.com/topic/triggering-custom-events-on-js-objects\x0a\x09Beware some objects wont fire (anArray for example).\x0a\x09Godspeed!\x22\x0a\x0a\x09<return $(self._jsObject).bind(anEventName, aReactionBlock)>",
messageSends: [],
referencedClasses: []
}),
globals.Object);

smalltalk.addMethod(
smalltalk.method({
selector: "asRemoteReferenceFor:",
protocol: '*Flow',
fn: function (anObject){
var self=this;
function $RR(){return globals.RR||(typeof RR=="undefined"?nil:RR)}
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st($RR())._new();
return $1;
}, function($ctx1) {$ctx1.fill(self,"asRemoteReferenceFor:",{anObject:anObject},globals.Object.klass)})},
args: ["anObject"],
source: "asRemoteReferenceFor: anObject\x0a\x09\x22Answers anObject (copy) or an appropiate reference (can't be copied) for \x0a\x09traveling over the wire and still referring to this receiver\x22\x0a\x0a\x09\x22Subclasses differ you can check on them.\x0a\x09The default is not be copied, so...\x22\x0a\x0a\x09^ RR new",
messageSends: ["new"],
referencedClasses: ["RR"]
}),
globals.Object.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "isNil",
protocol: '*Flow',
fn: function (){
var self=this;
return false;
},
args: [],
source: "isNil\x0a\x09^ false",
messageSends: [],
referencedClasses: []
}),
globals.ProtoObject);

smalltalk.addMethod(
smalltalk.method({
selector: "isRemoteReference",
protocol: '*Flow',
fn: function (){
var self=this;
return false;
},
args: [],
source: "isRemoteReference\x0a\x0a\x09^ false",
messageSends: [],
referencedClasses: []
}),
globals.ProtoObject);

smalltalk.addMethod(
smalltalk.method({
selector: "notNil",
protocol: '*Flow',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self._isNil())._not();
return $1;
}, function($ctx1) {$ctx1.fill(self,"notNil",{},globals.ProtoObject)})},
args: [],
source: "notNil\x0a\x09^ self isNil not",
messageSends: ["not", "isNil"],
referencedClasses: []
}),
globals.ProtoObject);

smalltalk.addMethod(
smalltalk.method({
selector: "asRemoteReferenceFor:",
protocol: '*Flow',
fn: function (anObject){
var self=this;
return anObject;
},
args: ["anObject"],
source: "asRemoteReferenceFor: anObject\x0a\x09\x22Answers anObject (copy) or an appropiate reference (can't be copied) for \x0a\x09traveling over the wire and still referring to this receiver\x22\x0a\x0a\x09^ anObject",
messageSends: [],
referencedClasses: []
}),
globals.UndefinedObject.klass);

});
