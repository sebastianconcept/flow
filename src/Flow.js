define("app/Flow", ["amber/boot", "amber_core/Kernel-Objects", "amber_core/Kernel-Classes", "amber_core/Kernel-Collections", "amber_core/Kernel-Exceptions", "amber_core/Kernel-Infrastructure"], function($boot){
var smalltalk=$boot.vm,nil=$boot.nil,_st=$boot.asReceiver,globals=$boot.globals;
smalltalk.addPackage('Flow');
smalltalk.packages["Flow"].transport = {"type":"amd","amdNamespace":"app"};

smalltalk.addClass('AbsrtactGenerator', globals.Object, [], 'Flow');

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
}, function($ctx1) {$ctx1.fill(self,"scaffold:",{anObject:anObject},globals.AbsrtactGenerator.klass)})},
args: ["anObject"],
source: "scaffold: anObject\x0a\x09\x22Scaffold what's relevnt to this generator\x22\x0a\x09\x0a\x09^ self subclassResponsibility",
messageSends: ["subclassResponsibility"],
referencedClasses: []
}),
globals.AbsrtactGenerator.klass);


smalltalk.addClass('CRUDGenerator', globals.AbsrtactGenerator, [], 'Flow');


smalltalk.addClass('MaplessGenerator', globals.AbsrtactGenerator, [], 'Flow');

globals.MaplessGenerator.klass.iVarNames = ['api'];
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
}, function($ctx1) {$ctx1.fill(self,"api",{},globals.MaplessGenerator.klass)})},
args: [],
source: "api\x0a\x0a\x09^ api ifNil:[ api := RESTfulAPI new ]",
messageSends: ["ifNil:", "new"],
referencedClasses: ["RESTfulAPI"]
}),
globals.MaplessGenerator.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "backendScaffold:do:onError:",
protocol: 'actions',
fn: function (aString,aBlock,anErrorBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(self._api())._post_data_do_onError_(self._url(),aString,aBlock,anErrorBlock);
return self}, function($ctx1) {$ctx1.fill(self,"backendScaffold:do:onError:",{aString:aString,aBlock:aBlock,anErrorBlock:anErrorBlock},globals.MaplessGenerator.klass)})},
args: ["aString", "aBlock", "anErrorBlock"],
source: "backendScaffold: aString do: aBlock onError: anErrorBlock\x0a\x0a\x09self api\x0a\x09\x09post: self url  \x0a\x09\x09data: aString\x0a\x09\x09do: aBlock\x0a\x09\x09onError: anErrorBlock",
messageSends: ["post:data:do:onError:", "api", "url"],
referencedClasses: []
}),
globals.MaplessGenerator.klass);

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
globals.MaplessGenerator.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "frontEndScaffold:",
protocol: 'actions',
fn: function (aString){
var self=this;
function $Flow(){return globals.Flow||(typeof Flow=="undefined"?nil:Flow)}
return smalltalk.withContext(function($ctx1) { 
_st(self._parentClass())._subclass_instanceVariableNames_package_(aString,"",_st(_st($Flow())._generator())._packageName());
return self}, function($ctx1) {$ctx1.fill(self,"frontEndScaffold:",{aString:aString},globals.MaplessGenerator.klass)})},
args: ["aString"],
source: "frontEndScaffold: aString\x0a\x09\x0a\x09self parentClass \x0a\x09\x09subclass: aString \x0a\x09\x09instanceVariableNames: '' \x0a\x09\x09package: Flow generator packageName",
messageSends: ["subclass:instanceVariableNames:package:", "parentClass", "packageName", "generator"],
referencedClasses: ["Flow"]
}),
globals.MaplessGenerator.klass);

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
globals.MaplessGenerator.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "port",
protocol: 'accessing',
fn: function (){
var self=this;
return (3333);
},
args: [],
source: "port\x0a\x0a\x09^ 3333",
messageSends: [],
referencedClasses: []
}),
globals.MaplessGenerator.klass);

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
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})}),(function(x){
return smalltalk.withContext(function($ctx2) {
_st(x)._inspect();
return self._error_("Backend scaffolding failed: ".__comma(_st(_st(x)._messageText())._asString()));
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,2)})}));
return self}, function($ctx1) {$ctx1.fill(self,"scaffold:",{aString:aString},globals.MaplessGenerator.klass)})},
args: ["aString"],
source: "scaffold: aString\x0a\x09\x22Scaffold what's relevnt to this generator\x22\x0a\x09\x0a\x09self backendScaffold: aString \x0a\x09\x09do:[ :res | self frontendScaffold: aString ]\x0a\x09\x09onError:[ :x | \x0a\x09\x09\x09x inspect.\x0a\x09\x09\x09self error: 'Backend scaffolding failed: ', x messageText asString ]",
messageSends: ["backendScaffold:do:onError:", "frontendScaffold:", "inspect", "error:", ",", "asString", "messageText"],
referencedClasses: []
}),
globals.MaplessGenerator.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "url",
protocol: 'accessing',
fn: function (){
var self=this;
function $Mapless(){return globals.Mapless||(typeof Mapless=="undefined"?nil:Mapless)}
return smalltalk.withContext(function($ctx1) { 
var $4,$3,$2,$1;
$4=_st("http://localhost:".__comma(_st(self._port())._asString())).__comma("/");
$ctx1.sendIdx[","]=4;
$3=_st($4).__comma(_st($Mapless())._basePath());
$ctx1.sendIdx[","]=3;
$2=_st($3).__comma("/generate");
$ctx1.sendIdx[","]=2;
$1=_st($2).__comma(self._command());
$ctx1.sendIdx[","]=1;
return $1;
}, function($ctx1) {$ctx1.fill(self,"url",{},globals.MaplessGenerator.klass)})},
args: [],
source: "url\x0a\x0a\x09^ 'http://localhost:',self port asString,'/',Mapless basePath,'/generate',self command",
messageSends: [",", "asString", "port", "basePath", "command"],
referencedClasses: ["Mapless"]
}),
globals.MaplessGenerator.klass);


smalltalk.addClass('ModelGenerator', globals.MaplessGenerator, [], 'Flow');

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
globals.ModelGenerator.klass);

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
globals.ModelGenerator.klass);


smalltalk.addClass('Flow', globals.Object, [], 'Flow');

smalltalk.addMethod(
smalltalk.method({
selector: "gen",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self._generate();
return $1;
}, function($ctx1) {$ctx1.fill(self,"gen",{},globals.Flow.klass)})},
args: [],
source: "gen\x0a\x0a\x09^ self generate",
messageSends: ["generate"],
referencedClasses: []
}),
globals.Flow.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "generate",
protocol: 'accessing',
fn: function (){
var self=this;
function $Generator(){return globals.Generator||(typeof Generator=="undefined"?nil:Generator)}
return $Generator();
},
args: [],
source: "generate\x0a\x0a\x09^ Generator",
messageSends: [],
referencedClasses: ["Generator"]
}),
globals.Flow.klass);


smalltalk.addClass('Generator', globals.Object, [], 'Flow');

globals.Generator.klass.iVarNames = ['packageName'];
smalltalk.addMethod(
smalltalk.method({
selector: "crud:",
protocol: 'actions',
fn: function (aMaplessClassOrName){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self._crudGenerator())._scaffold_(aMaplessClassOrName);
return $1;
}, function($ctx1) {$ctx1.fill(self,"crud:",{aMaplessClassOrName:aMaplessClassOrName},globals.Generator.klass)})},
args: ["aMaplessClassOrName"],
source: "crud: aMaplessClassOrName\x0a\x0a\x09^ self crudGenerator scaffold: aMaplessClassOrName",
messageSends: ["scaffold:", "crudGenerator"],
referencedClasses: []
}),
globals.Generator.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "crudGenerator",
protocol: 'accessing',
fn: function (){
var self=this;
function $CRUDGenerator(){return globals.CRUDGenerator||(typeof CRUDGenerator=="undefined"?nil:CRUDGenerator)}
return $CRUDGenerator();
},
args: [],
source: "crudGenerator\x0a\x0a\x09^ CRUDGenerator ",
messageSends: [],
referencedClasses: ["CRUDGenerator"]
}),
globals.Generator.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "mapless:",
protocol: 'actions',
fn: function (aMaplessName){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self._maplessGenerator())._scaffold_(aMaplessName);
return $1;
}, function($ctx1) {$ctx1.fill(self,"mapless:",{aMaplessName:aMaplessName},globals.Generator.klass)})},
args: ["aMaplessName"],
source: "mapless: aMaplessName\x0a\x0a\x09^ self maplessGenerator scaffold: aMaplessName",
messageSends: ["scaffold:", "maplessGenerator"],
referencedClasses: []
}),
globals.Generator.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "maplessGenerator",
protocol: 'accessing',
fn: function (){
var self=this;
function $MaplessGenerator(){return globals.MaplessGenerator||(typeof MaplessGenerator=="undefined"?nil:MaplessGenerator)}
return $MaplessGenerator();
},
args: [],
source: "maplessGenerator\x0a\x0a\x09^ MaplessGenerator ",
messageSends: [],
referencedClasses: ["MaplessGenerator"]
}),
globals.Generator.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "model:",
protocol: 'actions',
fn: function (aModelName){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self._modelGenerator())._scaffold_(aModelName);
return $1;
}, function($ctx1) {$ctx1.fill(self,"model:",{aModelName:aModelName},globals.Generator.klass)})},
args: ["aModelName"],
source: "model: aModelName\x0a\x0a\x09^ self modelGenerator scaffold: aModelName",
messageSends: ["scaffold:", "modelGenerator"],
referencedClasses: []
}),
globals.Generator.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "modelGenerator",
protocol: 'accessing',
fn: function (){
var self=this;
function $ModelGenerator(){return globals.ModelGenerator||(typeof ModelGenerator=="undefined"?nil:ModelGenerator)}
return $ModelGenerator();
},
args: [],
source: "modelGenerator\x0a\x0a\x09^ ModelGenerator ",
messageSends: [],
referencedClasses: ["ModelGenerator"]
}),
globals.Generator.klass);

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
globals.Generator.klass);

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
globals.Generator.klass);

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
var $1;
$1=_st(_st(jQuery)._value_(self))._trigger_withAll_(anEventName,someArguments);
return $1;
}, function($ctx1) {$ctx1.fill(self,"trigger:withAll:",{anEventName:anEventName,someArguments:someArguments},globals.Object)})},
args: ["anEventName", "someArguments"],
source: "trigger: anEventName withAll: someArguments\x0a\x09\x22Triggers anEventName in this object.\x0a\x09There you have it, it happened. \x0a\x09Hey World, do something about this!\x22\x0a\x09\x0a\x09^ (jQuery value: self) \x0a\x09\x09\x09trigger: anEventName \x0a\x09\x09\x09withAll: someArguments",
messageSends: ["trigger:withAll:", "value:"],
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
