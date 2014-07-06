define("app/MiniMapless", ["amber/boot", "amber_core/Kernel-Objects"], function($boot){
var smalltalk=$boot.vm,nil=$boot.nil,_st=$boot.asReceiver,globals=$boot.globals;
smalltalk.addPackage('MiniMapless');
smalltalk.packages["MiniMapless"].transport = {"type":"amd","amdNamespace":"app"};

smalltalk.addClass('MaplessModel', globals.Object, ['data'], 'MiniMapless');
globals.MaplessModel.comment="MaplessModel is the same kind of aggregate you'll found in Mapless in Pharo but here in the frontend.\x0aThe concrete subclasses' instances of these aggregates are very friendly to be sent and received to and from the backend.\x0a\x0aFor more on Mapless visit:\x0ahttp://sebastianconcept.github.io/Mapless";
smalltalk.addMethod(
smalltalk.method({
selector: "=",
protocol: 'testing',
fn: function (anObject){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$1;
$1=_st(_st(anObject)._respondsTo_("id"))._and_((function(){
return smalltalk.withContext(function($ctx2) {
$2=self._id();
$ctx2.sendIdx["id"]=1;
return _st($2).__eq(_st(anObject)._id());
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}));
return $1;
}, function($ctx1) {$ctx1.fill(self,"=",{anObject:anObject},globals.MaplessModel)})},
args: ["anObject"],
source: "= anObject\x0a\x0a\x09^ (anObject respondsTo: #id) and:[\x0a\x09self id = anObject id]",
messageSends: ["and:", "respondsTo:", "=", "id"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "asJSONString",
protocol: 'actions',
fn: function (){
var self=this;
function $JSON(){return globals.JSON||(typeof JSON=="undefined"?nil:JSON)}
return smalltalk.withContext(function($ctx1) { 
var $1;
self._onAboutToJSON();
$1=_st($JSON())._stringify_(self["@data"]);
return $1;
}, function($ctx1) {$ctx1.fill(self,"asJSONString",{},globals.MaplessModel)})},
args: [],
source: "asJSONString\x0a\x0a\x09self onAboutToJSON.\x0a\x0a\x09^ JSON stringify: data",
messageSends: ["onAboutToJSON", "stringify:"],
referencedClasses: ["JSON"]
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "at:",
protocol: 'accessing',
fn: function (aKey){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self["@data"])._at_(aKey);
return $1;
}, function($ctx1) {$ctx1.fill(self,"at:",{aKey:aKey},globals.MaplessModel)})},
args: ["aKey"],
source: "at: aKey\x0a\x0a\x09^ data at: aKey",
messageSends: ["at:"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "at:ifAbsent:",
protocol: 'actions',
fn: function (aKey,aBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self["@data"])._at_ifAbsent_(aKey,aBlock);
return $1;
}, function($ctx1) {$ctx1.fill(self,"at:ifAbsent:",{aKey:aKey,aBlock:aBlock},globals.MaplessModel)})},
args: ["aKey", "aBlock"],
source: "at: aKey ifAbsent: aBlock\x0a\x0a\x09^ data at: aKey ifAbsent: aBlock",
messageSends: ["at:ifAbsent:"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "at:put:",
protocol: 'accessing',
fn: function (aKey,anObject){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(self["@data"])._at_put_(aKey,anObject);
return anObject;
}, function($ctx1) {$ctx1.fill(self,"at:put:",{aKey:aKey,anObject:anObject},globals.MaplessModel)})},
args: ["aKey", "anObject"],
source: "at: aKey put: anObject\x0a\x0a\x09data at: aKey put: anObject.\x0a\x0a\x09^ anObject",
messageSends: ["at:put:"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "create",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self._createDo_((function(){
return nil;
}));
return $1;
}, function($ctx1) {$ctx1.fill(self,"create",{},globals.MaplessModel)})},
args: [],
source: "create\x0a\x0a\x09^ self createDo:[nil]",
messageSends: ["createDo:"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "createDo:",
protocol: 'actions',
fn: function (aBlock){
var self=this;
function $ModelCreateError(){return globals.ModelCreateError||(typeof ModelCreateError=="undefined"?nil:ModelCreateError)}
return smalltalk.withContext(function($ctx1) { 
var $5,$4,$3,$2,$6,$1,$8,$7;
_st(jQuery)._ajax_(globals.HashedCollection._newFromPairs_(["url",self._path(),"type","POST","cache",false,"data",self._asJSONString(),"success",(function(x){
return smalltalk.withContext(function($ctx2) {
return self._onAfterCreate_done_(x,aBlock);
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,1)})}),"fai",(function(x){
return smalltalk.withContext(function($ctx2) {
$5=self._class();
$ctx2.sendIdx["class"]=1;
$4=_st($5)._name();
$ctx2.sendIdx["name"]=1;
$3="Could not create ".__comma($4);
$ctx2.sendIdx[","]=3;
$2=_st($3).__comma(":  ");
$ctx2.sendIdx[","]=2;
$6=_st(x)._responseText();
$ctx2.sendIdx["responseText"]=1;
$1=_st($2).__comma($6);
$ctx2.sendIdx[","]=1;
return _st($ModelCreateError())._signal_($1);
$ctx2.sendIdx["signal:"]=1;
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,2)})}),"error",(function(x){
return smalltalk.withContext(function($ctx2) {
$8=_st("Could not create ".__comma(_st(self._class())._name())).__comma(":  ");
$ctx2.sendIdx[","]=5;
$7=_st($8).__comma(_st(x)._responseText());
$ctx2.sendIdx[","]=4;
return _st($ModelCreateError())._signal_($7);
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,3)})})]));
return self;
}, function($ctx1) {$ctx1.fill(self,"createDo:",{aBlock:aBlock},globals.MaplessModel)})},
args: ["aBlock"],
source: "createDo: aBlock\x0a\x0a\x09jQuery ajax: #{\x0a\x09\x09'url' -> self path.\x0a\x09\x09'type' -> 'POST'.\x0a\x09\x09'cache' -> false.\x0a\x09\x09'data' -> self asJSONString.\x0a\x09\x09'success' -> [:x| self onAfterCreate: x done: aBlock].\x0a\x09\x09'fai' -> [:x| ModelCreateError signal: 'Could not create ', self class name,':  ', x responseText].\x0a\x09\x09'error' -> [:x| ModelCreateError signal: 'Could not create ', self class name,':  ', x responseText]}.\x0a\x0a\x09^ self",
messageSends: ["ajax:", "path", "asJSONString", "onAfterCreate:done:", "signal:", ",", "name", "class", "responseText"],
referencedClasses: ["ModelCreateError"]
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "createdOn",
protocol: 'accessing',
fn: function (){
var self=this;
var selector,expects,object;
function $Date(){return globals.Date||(typeof Date=="undefined"?nil:Date)}
return smalltalk.withContext(function($ctx1) { 
var $1,$2,$3,$4,$5,$receiver;
selector="createdOn";
expects=$Date();
$1=_st(selector)._asString();
$ctx1.sendIdx["asString"]=1;
object=self._at_($1);
$2=object;
if(($receiver = $2) == null || $receiver.isNil){
return nil;
} else {
$2;
};
$3=_st(object)._isKindOf_(expects);
if(smalltalk.assert($3)){
$4=object;
return $4;
};
$5=self._at_put_(_st(selector)._asString(),self._dateAndTimeAt_(selector));
return $5;
}, function($ctx1) {$ctx1.fill(self,"createdOn",{selector:selector,expects:expects,object:object},globals.MaplessModel)})},
args: [],
source: "createdOn \x0a\x0a\x09| selector expects object|\x0a\x0a\x09selector := #createdOn.\x0a\x09expects := Date.\x0a\x0a\x09object := self at: selector asString.\x0a\x09object ifNil:[^nil].\x0a\x0a\x09(object isKindOf: expects) ifTrue:[^object].\x0a\x0a\x09^ self at: selector asString put: (self dateAndTimeAt: selector).",
messageSends: ["at:", "asString", "ifNil:", "ifTrue:", "isKindOf:", "at:put:", "dateAndTimeAt:"],
referencedClasses: ["Date"]
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "createdOn:",
protocol: 'accessing',
fn: function (aDate){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._at_put_("createdOn",aDate);
return self}, function($ctx1) {$ctx1.fill(self,"createdOn:",{aDate:aDate},globals.MaplessModel)})},
args: ["aDate"],
source: "createdOn: aDate\x0a\x0a\x09self at: #createdOn put: aDate",
messageSends: ["at:put:"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "data",
protocol: 'accessing',
fn: function (){
var self=this;
var $1;
$1=self["@data"];
return $1;
},
args: [],
source: "data\x0a\x0a\x09^ data",
messageSends: [],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "dateAndTimeAt:",
protocol: 'accessing',
fn: function (aSelector){
var self=this;
function $Date(){return globals.Date||(typeof Date=="undefined"?nil:Date)}
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st($Date())._fromString_(self._at_(aSelector));
return $1;
}, function($ctx1) {$ctx1.fill(self,"dateAndTimeAt:",{aSelector:aSelector},globals.MaplessModel)})},
args: ["aSelector"],
source: "dateAndTimeAt: aSelector\x0a\x0a\x09^ Date fromString: (self at: aSelector)",
messageSends: ["fromString:", "at:"],
referencedClasses: ["Date"]
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "delete",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._deleteDo_((function(){
return nil;
}));
return self}, function($ctx1) {$ctx1.fill(self,"delete",{},globals.MaplessModel)})},
args: [],
source: "delete\x0a\x0a\x09self deleteDo:[nil]",
messageSends: ["deleteDo:"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "deleteDo:",
protocol: 'actions',
fn: function (aBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1,$3,$2;
$1=jQuery;
$3=_st(_st(self._path()).__comma("?id=")).__comma(_st(self._id())._asString());
$ctx1.sendIdx[","]=1;
$2=globals.HashedCollection._newFromPairs_(["url",$3,"type","DELETE","cache",false,"data",self._asJSONString(),"success",(function(x){
return smalltalk.withContext(function($ctx2) {
return self._onAfterDelete_done_(x,aBlock);
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,1)})}),"fail",(function(x){
return smalltalk.withContext(function($ctx2) {
return self._onDeleteFail_(x);
$ctx2.sendIdx["onDeleteFail:"]=1;
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,2)})}),"error",(function(x){
return smalltalk.withContext(function($ctx2) {
return self._onDeleteFail_(x);
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,3)})})]);
_st($1)._ajax_($2);
return self}, function($ctx1) {$ctx1.fill(self,"deleteDo:",{aBlock:aBlock},globals.MaplessModel)})},
args: ["aBlock"],
source: "deleteDo: aBlock\x0a\x0a\x09jQuery ajax: #{ \x0a\x09\x09'url' -> (self path, '?id=',self id asString).\x0a\x09\x09'type' -> 'DELETE'.\x0a\x09\x09'cache' -> false.\x0a\x09\x09'data' -> self asJSONString.\x0a\x09\x09'success' -> [:x| self onAfterDelete: x done: aBlock].\x0a\x09\x09'fail' -> [:x| self onDeleteFail: x].\x0a\x09\x09'error' -> [:x| self onDeleteFail: x]}  ",
messageSends: ["ajax:", ",", "path", "asString", "id", "asJSONString", "onAfterDelete:done:", "onDeleteFail:"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "doesNotUnderstand:",
protocol: 'actions',
fn: function (aMessage){
var self=this;
var key,part,subModel,isUndefined,isObject,obj,keys;
function $HashedCollection(){return globals.HashedCollection||(typeof HashedCollection=="undefined"?nil:HashedCollection)}
function $JSObjectProxy(){return globals.JSObjectProxy||(typeof JSObjectProxy=="undefined"?nil:JSObjectProxy)}
function $Smalltalk(){return globals.Smalltalk||(typeof Smalltalk=="undefined"?nil:Smalltalk)}
return smalltalk.withContext(function($ctx1) { 
var $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$23,$22,$21,$20,$receiver;
key=_st(_st(aMessage)._selector())._asSymbol();
$1=self._isUnary_(key);
if(smalltalk.assert($1)){
$2=_st(_st(self["@data"])._class()).__eq_eq($HashedCollection());
if(smalltalk.assert($2)){
$3=self["@data"];
$4=_st(key)._asString();
$ctx1.sendIdx["asString"]=1;
part=_st($3)._at_ifAbsent_($4,(function(){
return nil;
}));
part;
} else {
$5=self["@data"];
$6=_st(key)._asString();
$ctx1.sendIdx["asString"]=2;
part=_st($5)._at_($6);
$ctx1.sendIdx["at:"]=1;
part;
};
$7=part;
if(($receiver = $7) == null || $receiver.isNil){
return nil;
} else {
$7;
};
isUndefined=self._isUndefinedPart_(part);
isUndefined;
$8=isUndefined;
if(smalltalk.assert($8)){
return nil;
};
isObject=self._isObjectPart_(part);
isObject;
$9=isObject;
if(smalltalk.assert($9)){
obj=self._newJSObject();
obj;
obj=_st($JSObjectProxy())._on_(obj);
obj;
$10=_st(_st(obj)._keys_(part))._isEmpty();
if(smalltalk.assert($10)){
$11=self["@data"];
$12=_st(key)._asString();
$ctx1.sendIdx["asString"]=3;
_st($11)._at_put_($12,nil);
$ctx1.sendIdx["at:put:"]=1;
return nil;
};
};
subModel=self._get_from_("modelClass",part);
subModel;
$13=subModel;
if(($receiver = $13) == null || $receiver.isNil){
$14=part;
return $14;
} else {
$13;
};
subModel=_st(_st($Smalltalk())._current())._at_(subModel);
subModel;
$15=subModel;
if(($receiver = $15) == null || $receiver.isNil){
_st(part)._inspect();
$16=_st("this should have a ".__comma(subModel)).__comma(" modelClass no?");
$ctx1.sendIdx[","]=1;
self._error_($16);
} else {
$15;
};
subModel=_st(subModel)._fromReified_(part);
subModel;
$17=self["@data"];
$18=_st(key)._asString();
$ctx1.sendIdx["asString"]=4;
_st($17)._at_put_($18,subModel);
$ctx1.sendIdx["at:put:"]=2;
$19=subModel;
return $19;
};
$21=_st(self._isKeyword_(key))._and_((function(){
return smalltalk.withContext(function($ctx2) {
$23=_st(key)._asString();
$ctx2.sendIdx["asString"]=5;
$22=_st($23)._occurrencesOf_(":");
return _st($22).__eq((1));
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,11)})}));
if(smalltalk.assert($21)){
key=_st(key)._allButLast();
key;
$20=_st(self["@data"])._at_put_(_st(key)._asString(),_st(_st(aMessage)._arguments())._first());
} else {
$20=($ctx1.supercall = true, globals.MaplessModel.superclass.fn.prototype._doesNotUnderstand_.apply(_st(self), [aMessage]));
$ctx1.supercall = false;
};
return $20;
}, function($ctx1) {$ctx1.fill(self,"doesNotUnderstand:",{aMessage:aMessage,key:key,part:part,subModel:subModel,isUndefined:isUndefined,isObject:isObject,obj:obj,keys:keys},globals.MaplessModel)})},
args: ["aMessage"],
source: "doesNotUnderstand: aMessage\x0a\x09\x22The idea behind this DNU is to use the selector as setters or getter \x0a\x09delegating to data (aJsonObject)\x22\x0a\x09\x0a\x09| key part subModel isUndefined isObject obj keys |\x0a\x0a\x09key := aMessage selector asSymbol.\x0a\x0a\x09(self isUnary: key) ifTrue: [\x0a\x09\x09(data class == HashedCollection)\x0a\x09\x09\x09ifTrue:[part := data at: key asString ifAbsent:[nil]]\x0a\x09\x09\x09ifFalse:[part := data at: key asString].\x0a\x09\x09part ifNil:[^nil].\x0a\x09\x09isUndefined := self isUndefinedPart: part.\x0a\x09\x09isUndefined ifTrue:[^nil].\x0a\x09\x09isObject := self isObjectPart: part.\x0a\x09\x09isObject ifTrue:[\x0a\x09\x09\x09\x22is part an empty js object? (would be nil for JSON eyes)\x22\x0a\x09\x09\x09obj := self newJSObject.\x0a\x09\x09\x09obj := JSObjectProxy on: obj.\x0a\x09\x09\x09(obj keys: part) isEmpty ifTrue:[\x0a\x09\x09\x09\x09data at: key asString put: nil.\x0a\x09\x09\x09\x09^nil]].\x0a\x0a\x09\x09subModel := self get: 'modelClass' from: part.\x0a\x09\x09\x22If there is no modelClass in it, then is a direct value in the property\x22\x0a\x09\x09subModel ifNil:[ ^part].\x0a\x0a\x09\x09subModel := Smalltalk current at: subModel.\x0a\x09\x09subModel ifNil:[part inspect. self error: 'this should have a ',subModel,' modelClass no?'].\x0a\x09\x09subModel := subModel fromReified: part.\x0a\x09\x09data at: key asString put: subModel.\x0a\x09\x09^ subModel].\x0a \x0a\x09^ ((self isKeyword: key) and: [\x0a\x09(key asString occurrencesOf: ':') = 1])\x0a\x09\x09ifTrue: [key := key allButLast.\x0a\x09\x09\x09\x09data at: key asString put: aMessage arguments first]\x0a\x09\x09ifFalse: [super doesNotUnderstand: aMessage]",
messageSends: ["asSymbol", "selector", "ifTrue:", "isUnary:", "ifTrue:ifFalse:", "==", "class", "at:ifAbsent:", "asString", "at:", "ifNil:", "isUndefinedPart:", "isObjectPart:", "newJSObject", "on:", "isEmpty", "keys:", "at:put:", "get:from:", "current", "inspect", "error:", ",", "fromReified:", "and:", "isKeyword:", "=", "occurrencesOf:", "allButLast", "first", "arguments", "doesNotUnderstand:"],
referencedClasses: ["HashedCollection", "JSObjectProxy", "Smalltalk"]
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "get:from:",
protocol: 'actions',
fn: function (anAttribute,aPart){
var self=this;
return smalltalk.withContext(function($ctx1) { 
return aPart[anAttribute];
return self}, function($ctx1) {$ctx1.fill(self,"get:from:",{anAttribute:anAttribute,aPart:aPart},globals.MaplessModel)})},
args: ["anAttribute", "aPart"],
source: "get: anAttribute from: aPart\x0a\x09\x0a\x09<return aPart[anAttribute]>",
messageSends: [],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "id",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self["@data"])._at_("id");
return $1;
}, function($ctx1) {$ctx1.fill(self,"id",{},globals.MaplessModel)})},
args: [],
source: "id\x0a\x0a\x09^ data at: #id ",
messageSends: ["at:"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "id:",
protocol: 'accessing',
fn: function (aString){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(self["@data"])._at_put_("id",aString);
return self}, function($ctx1) {$ctx1.fill(self,"id:",{aString:aString},globals.MaplessModel)})},
args: ["aString"],
source: "id: aString\x0a\x0a\x09data at: #id put: aString",
messageSends: ["at:put:"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "initialize",
protocol: 'initialization',
fn: function (){
var self=this;
function $HashedCollection(){return globals.HashedCollection||(typeof HashedCollection=="undefined"?nil:HashedCollection)}
return smalltalk.withContext(function($ctx1) { 
var $2,$1;
($ctx1.supercall = true, globals.MaplessModel.superclass.fn.prototype._initialize.apply(_st(self), []));
$ctx1.supercall = false;
self["@data"]=_st($HashedCollection())._new();
$2=self._class();
$ctx1.sendIdx["class"]=1;
$1=_st($2)._name();
self._modelClass_($1);
self._initializeInstanceVersion();
self._id_(_st(self._class())._newUUID());
return self}, function($ctx1) {$ctx1.fill(self,"initialize",{},globals.MaplessModel)})},
args: [],
source: "initialize\x0a\x0a\x09super initialize.\x0a\x0a\x09data := HashedCollection new.\x0a\x09self modelClass: self class name.\x0a\x09self initializeInstanceVersion.\x0a\x09self id: self class newUUID.",
messageSends: ["initialize", "new", "modelClass:", "name", "class", "initializeInstanceVersion", "id:", "newUUID"],
referencedClasses: ["HashedCollection"]
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "initializeCreatedOn",
protocol: 'initialization',
fn: function (){
var self=this;
function $Date(){return globals.Date||(typeof Date=="undefined"?nil:Date)}
return smalltalk.withContext(function($ctx1) { 
self._createdOn_(_st($Date())._now());
return self}, function($ctx1) {$ctx1.fill(self,"initializeCreatedOn",{},globals.MaplessModel)})},
args: [],
source: "initializeCreatedOn\x0a\x0a\x09self createdOn: Date now",
messageSends: ["createdOn:", "now"],
referencedClasses: ["Date"]
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "initializeInstanceVersion",
protocol: 'initialization',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._v_((1));
return self}, function($ctx1) {$ctx1.fill(self,"initializeInstanceVersion",{},globals.MaplessModel)})},
args: [],
source: "initializeInstanceVersion\x09\x0a\x0a\x09self v: 1",
messageSends: ["v:"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "isKeyword:",
protocol: 'testing',
fn: function (aSelector){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(_st(aSelector)._asString())._includes_(":");
return $1;
}, function($ctx1) {$ctx1.fill(self,"isKeyword:",{aSelector:aSelector},globals.MaplessModel)})},
args: ["aSelector"],
source: "isKeyword: aSelector\x0a\x0a\x09^ aSelector asString includes: ':'",
messageSends: ["includes:", "asString"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "isObjectPart:",
protocol: 'testing',
fn: function (aPart){
var self=this;
return smalltalk.withContext(function($ctx1) { 
return typeof part=='object';
return self}, function($ctx1) {$ctx1.fill(self,"isObjectPart:",{aPart:aPart},globals.MaplessModel)})},
args: ["aPart"],
source: "isObjectPart: aPart\x0a\x09<return typeof part=='object'>",
messageSends: [],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "isUnary:",
protocol: 'testing',
fn: function (aSelector){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(_st(_st(aSelector)._asString())._includes_(":"))._not();
return $1;
}, function($ctx1) {$ctx1.fill(self,"isUnary:",{aSelector:aSelector},globals.MaplessModel)})},
args: ["aSelector"],
source: "isUnary: aSelector\x0a\x0a\x09^ (aSelector asString includes: ':') not",
messageSends: ["not", "includes:", "asString"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "isUndefinedPart:",
protocol: 'testing',
fn: function (aPart){
var self=this;
return smalltalk.withContext(function($ctx1) { 
return aPart=='undefined';
return self}, function($ctx1) {$ctx1.fill(self,"isUndefinedPart:",{aPart:aPart},globals.MaplessModel)})},
args: ["aPart"],
source: "isUndefinedPart: aPart\x0a\x09<return aPart=='undefined'>",
messageSends: [],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "localDelete",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(self._class())._localDelete_(self);
return self}, function($ctx1) {$ctx1.fill(self,"localDelete",{},globals.MaplessModel)})},
args: [],
source: "localDelete\x0a\x0a\x09self class localDelete: self ",
messageSends: ["localDelete:", "class"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "localSave",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(self._class())._localSave_(self);
return self}, function($ctx1) {$ctx1.fill(self,"localSave",{},globals.MaplessModel)})},
args: [],
source: "localSave\x0a\x0a\x09self class localSave: self ",
messageSends: ["localSave:", "class"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "newJSObject",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
return Object;
return self}, function($ctx1) {$ctx1.fill(self,"newJSObject",{},globals.MaplessModel)})},
args: [],
source: "newJSObject\x0a\x09<return Object>",
messageSends: [],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "onAboutToJSON",
protocol: 'reactions',
fn: function (){
var self=this;
var obj,keys;
function $JSObjectProxy(){return globals.JSObjectProxy||(typeof JSObjectProxy=="undefined"?nil:JSObjectProxy)}
function $MaplessModel(){return globals.MaplessModel||(typeof MaplessModel=="undefined"?nil:MaplessModel)}
return smalltalk.withContext(function($ctx1) { 
var $1;
obj=self._newJSObject();
obj=_st($JSObjectProxy())._on_(obj);
keys=_st(obj)._keys_(self["@data"]);
_st(keys)._do_((function(key){
var value;
return smalltalk.withContext(function($ctx2) {
value=_st(self["@data"])._at_(key);
value;
value=self._perform_(_st(key)._asSymbol());
value;
$1=_st(value)._isKindOf_($MaplessModel());
if(smalltalk.assert($1)){
_st(value)._onAboutToJSON();
value=_st(value)._data();
value;
};
return _st(self["@data"])._at_put_(key,value);
}, function($ctx2) {$ctx2.fillBlock({key:key,value:value},$ctx1,1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"onAboutToJSON",{obj:obj,keys:keys},globals.MaplessModel)})},
args: [],
source: "onAboutToJSON\x0a\x09\x22This model is about to be stringified in JSON.\x0a\x09All inst var values that are expected to be model objects, need to be stringify friendly after this.\x22\x0a\x09| obj keys |\x0a\x0a\x09obj := self newJSObject.\x0a\x09obj := JSObjectProxy on: obj.\x0a\x09keys := obj keys: data. \x0a\x0a\x09keys do:[:key| |value|\x0a\x09\x09value := data at: key.\x0a\x09\x09value := self perform: key asSymbol.\x0a\x0a\x09\x09(value isKindOf: MaplessModel) ifTrue:[\x0a\x09\x09\x09value onAboutToJSON.\x0a\x09\x09\x09value := value data].\x0a\x09\x09data at: key put: value].",
messageSends: ["newJSObject", "on:", "keys:", "do:", "at:", "perform:", "asSymbol", "ifTrue:", "isKindOf:", "onAboutToJSON", "data", "at:put:"],
referencedClasses: ["JSObjectProxy", "MaplessModel"]
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "onAfterCreate:done:",
protocol: 'reactions',
fn: function (x,aBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self["@data"]=_st(self._class())._reify_(x);
self._trigger_("afterCreated");
_st(aBlock)._value_(self);
return self}, function($ctx1) {$ctx1.fill(self,"onAfterCreate:done:",{x:x,aBlock:aBlock},globals.MaplessModel)})},
args: ["x", "aBlock"],
source: "onAfterCreate: x done: aBlock\x0a\x0a\x09data := self class reify: x.\x0a\x0a\x09self trigger: 'afterCreated'.\x0a\x09\x0a\x09aBlock value: self",
messageSends: ["reify:", "class", "trigger:", "value:"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "onAfterDelete:done:",
protocol: 'reactions',
fn: function (x,aBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._trigger_("afterDeleted");
_st(aBlock)._value_(self);
return self}, function($ctx1) {$ctx1.fill(self,"onAfterDelete:done:",{x:x,aBlock:aBlock},globals.MaplessModel)})},
args: ["x", "aBlock"],
source: "onAfterDelete: x done: aBlock\x0a\x09\x0a\x09self trigger: 'afterDeleted'.\x0a\x0a\x09aBlock value: self",
messageSends: ["trigger:", "value:"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "onAfterRefresh:done:",
protocol: 'reactions',
fn: function (x,aBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._syncWith_(_st(self._class())._reify_(x));
self._trigger_("afterRefeshed");
_st(aBlock)._value_(self);
return self}, function($ctx1) {$ctx1.fill(self,"onAfterRefresh:done:",{x:x,aBlock:aBlock},globals.MaplessModel)})},
args: ["x", "aBlock"],
source: "onAfterRefresh: x done: aBlock\x0a\x0a\x09self syncWith: (self class reify: x).\x0a\x09self trigger: 'afterRefeshed'.\x0a\x09aBlock value: self",
messageSends: ["syncWith:", "reify:", "class", "trigger:", "value:"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "onAfterSave:done:",
protocol: 'reactions',
fn: function (x,aBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._trigger_("afterSaved");
_st(aBlock)._value_(self);
return self}, function($ctx1) {$ctx1.fill(self,"onAfterSave:done:",{x:x,aBlock:aBlock},globals.MaplessModel)})},
args: ["x", "aBlock"],
source: "onAfterSave: x done: aBlock\x0a\x09\x0a\x09self trigger: 'afterSaved'.\x0a\x0a\x09aBlock value: self",
messageSends: ["trigger:", "value:"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "onDeleteFail:",
protocol: 'reactions',
fn: function (x){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._error_("Could not delete ".__comma(_st(self._class())._name()));
return self}, function($ctx1) {$ctx1.fill(self,"onDeleteFail:",{x:x},globals.MaplessModel)})},
args: ["x"],
source: "onDeleteFail: x\x0a\x0a\x09self error: 'Could not delete ', self class name\x09",
messageSends: ["error:", ",", "name", "class"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "onRefreshFail:",
protocol: 'reactions',
fn: function (x){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._error_("Could not refresh ".__comma(_st(self._class())._name()));
return self}, function($ctx1) {$ctx1.fill(self,"onRefreshFail:",{x:x},globals.MaplessModel)})},
args: ["x"],
source: "onRefreshFail: x\x0a\x0a\x09self error: 'Could not refresh ', self class name\x09",
messageSends: ["error:", ",", "name", "class"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "onSaveFail:",
protocol: 'reactions',
fn: function (x){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._error_("Could not save ".__comma(_st(self._class())._name()));
return self}, function($ctx1) {$ctx1.fill(self,"onSaveFail:",{x:x},globals.MaplessModel)})},
args: ["x"],
source: "onSaveFail: x\x0a\x0a\x09self error: 'Could not save ', self class name\x09",
messageSends: ["error:", ",", "name", "class"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "path",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self._class())._path();
return $1;
}, function($ctx1) {$ctx1.fill(self,"path",{},globals.MaplessModel)})},
args: [],
source: "path \x0a\x0a\x09^ self class path",
messageSends: ["path", "class"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "refresh",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._refreshDo_((function(){
return nil;
}));
return self}, function($ctx1) {$ctx1.fill(self,"refresh",{},globals.MaplessModel)})},
args: [],
source: "refresh\x0a\x09\x22Re-read this model's state.\x22\x0a\x0a\x09self refreshDo:[nil]",
messageSends: ["refreshDo:"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "refreshDo:",
protocol: 'actions',
fn: function (aBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1,$3,$2;
$1=jQuery;
$3=_st(_st(self._path()).__comma("?id=")).__comma(_st(self._id())._asString());
$ctx1.sendIdx[","]=1;
$2=globals.HashedCollection._newFromPairs_(["url",$3,"type","GET","cache",false,"success",(function(x){
return smalltalk.withContext(function($ctx2) {
return self._onAfterRefresh_done_(x,aBlock);
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,1)})}),"fail",(function(x){
return smalltalk.withContext(function($ctx2) {
return self._onRefeshFail_(x);
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,2)})}),"error",(function(x){
return smalltalk.withContext(function($ctx2) {
return self._onRefreshFail_(x);
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,3)})})]);
_st($1)._ajax_($2);
return self}, function($ctx1) {$ctx1.fill(self,"refreshDo:",{aBlock:aBlock},globals.MaplessModel)})},
args: ["aBlock"],
source: "refreshDo: aBlock\x0a\x09\x22Re-read this model's state.\x22\x0a\x0a\x09jQuery ajax: #{ \x0a\x09\x09'url' -> (self path, '?id=',self id asString).\x0a\x09\x09'type' -> 'GET'.\x0a\x09\x09'cache' -> false.\x0a\x09\x09'success' -> [:x| self onAfterRefresh: x done: aBlock].\x0a\x09\x09'fail' -> [:x| self onRefeshFail: x].\x0a\x09\x09'error' -> [:x| self onRefreshFail: x]}\x09",
messageSends: ["ajax:", ",", "path", "asString", "id", "onAfterRefresh:done:", "onRefeshFail:", "onRefreshFail:"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "remoteSaveDo:",
protocol: 'actions',
fn: function (aBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(jQuery)._ajax_(globals.HashedCollection._newFromPairs_(["url",self._path(),"type","PUT","cache",false,"data",self._asJSONString(),"success",(function(x){
return smalltalk.withContext(function($ctx2) {
return self._onAfterSave_done_(x,aBlock);
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,1)})}),"fail",(function(x){
return smalltalk.withContext(function($ctx2) {
return self._onSaveFail_(x);
$ctx2.sendIdx["onSaveFail:"]=1;
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,2)})}),"error",(function(x){
return smalltalk.withContext(function($ctx2) {
return self._onSaveFail_(x);
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,3)})})]));
return self}, function($ctx1) {$ctx1.fill(self,"remoteSaveDo:",{aBlock:aBlock},globals.MaplessModel)})},
args: ["aBlock"],
source: "remoteSaveDo: aBlock\x0a\x0a\x09jQuery ajax: #{ \x0a\x09\x09'url' -> self path.\x0a\x09\x09'type' -> 'PUT'.\x0a\x09\x09'cache' -> false.\x0a\x09\x09'data' -> self asJSONString.\x0a\x09\x09'success' -> [:x| self onAfterSave: x done: aBlock].\x0a\x09\x09'fail' -> [:x| self onSaveFail: x].\x0a\x09\x09'error' -> [:x| self onSaveFail: x]}",
messageSends: ["ajax:", "path", "asJSONString", "onAfterSave:done:", "onSaveFail:"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "save",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self._saveDo_((function(){
return nil;
}));
return $1;
}, function($ctx1) {$ctx1.fill(self,"save",{},globals.MaplessModel)})},
args: [],
source: "save\x0a\x09^ self saveDo:[nil]",
messageSends: ["saveDo:"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "saveDo:",
protocol: 'actions',
fn: function (aBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._localSave();
self._remoteSaveDo_(aBlock);
return self}, function($ctx1) {$ctx1.fill(self,"saveDo:",{aBlock:aBlock},globals.MaplessModel)})},
args: ["aBlock"],
source: "saveDo: aBlock\x0a\x0a\x09self localSave.\x0a\x09self remoteSaveDo: aBlock",
messageSends: ["localSave", "remoteSaveDo:"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "subModelAt:",
protocol: 'accessing',
fn: function (aSelector){
var self=this;
var subModelData,modelClass;
function $Smalltalk(){return globals.Smalltalk||(typeof Smalltalk=="undefined"?nil:Smalltalk)}
function $ModelMetadataError(){return globals.ModelMetadataError||(typeof ModelMetadataError=="undefined"?nil:ModelMetadataError)}
return smalltalk.withContext(function($ctx1) { 
var $1,$2,$3,$5,$4,$6,$receiver;
subModelData=_st(self["@data"])._at_(aSelector);
$ctx1.sendIdx["at:"]=1;
$1=subModelData;
if(($receiver = $1) == null || $receiver.isNil){
return nil;
} else {
$1;
};
modelClass=_st(subModelData)._at_("modelClass");
$ctx1.sendIdx["at:"]=2;
$2=modelClass;
if(($receiver = $2) == null || $receiver.isNil){
return nil;
} else {
$2;
};
modelClass=_st(_st($Smalltalk())._current())._at_(modelClass);
$3=modelClass;
if(($receiver = $3) == null || $receiver.isNil){
$5=_st("Cannot find ".__comma(_st(aSelector)._asString())).__comma("'s class for this metadata");
$ctx1.sendIdx[","]=1;
$4=_st($ModelMetadataError())._signal_($5);
return $4;
} else {
$3;
};
$6=_st(modelClass)._fromReified_(subModelData);
return $6;
}, function($ctx1) {$ctx1.fill(self,"subModelAt:",{aSelector:aSelector,subModelData:subModelData,modelClass:modelClass},globals.MaplessModel)})},
args: ["aSelector"],
source: "subModelAt: aSelector\x0a\x09\x22Answers the reified submodel (instantiating if necessary).\x22\x0a\x09\x0a\x09| subModelData modelClass |\x0a\x0a\x09subModelData := data at: aSelector.\x0a\x09subModelData ifNil:[^nil].\x0a\x09\x0a\x09modelClass := subModelData at: 'modelClass'.\x0a\x09modelClass ifNil:[^nil].\x0a\x09modelClass := Smalltalk current at: modelClass.\x0a\x0a\x09modelClass ifNil:[^ModelMetadataError signal: 'Cannot find ',aSelector asString,'''s class for this metadata'].\x0a\x09\x0a\x09^ modelClass fromReified: subModelData",
messageSends: ["at:", "ifNil:", "current", "signal:", ",", "asString", "fromReified:"],
referencedClasses: ["Smalltalk", "ModelMetadataError"]
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "syncFrom:",
protocol: 'actions',
fn: function (someJson){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self._syncWith_(_st(self._class())._reify_(someJson));
return $1;
}, function($ctx1) {$ctx1.fill(self,"syncFrom:",{someJson:someJson},globals.MaplessModel)})},
args: ["someJson"],
source: "syncFrom: someJson\x0a\x0a\x09^ self syncWith: (self class reify: someJson)",
messageSends: ["syncWith:", "reify:", "class"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "syncWith:",
protocol: 'actions',
fn: function (aReifiedJSON){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $3,$2,$1,$receiver;
if(($receiver = aReifiedJSON) == null || $receiver.isNil){
return nil;
} else {
aReifiedJSON;
};
$3=_st(aReifiedJSON)._at_("modelClass");
$ctx1.sendIdx["at:"]=1;
$2=_st($3)._isNil();
$1=_st($2)._or_((function(){
return smalltalk.withContext(function($ctx2) {
return _st(_st(aReifiedJSON)._at_("modelClass")).__tild_eq(_st(self._class())._name());
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,2)})}));
if(smalltalk.assert($1)){
self._error_("this JSON does not fit here");
};
self["@data"]=aReifiedJSON;
return self}, function($ctx1) {$ctx1.fill(self,"syncWith:",{aReifiedJSON:aReifiedJSON},globals.MaplessModel)})},
args: ["aReifiedJSON"],
source: "syncWith: aReifiedJSON\x0a\x09\x22Sync the current values in this model \x0a\x09with the ones coming in aReifiedJSON.\x22\x0a\x0a\x09aReifiedJSON ifNil:[^ nil].\x0a\x0a\x09((aReifiedJSON at: 'modelClass') isNil or:[\x0a\x09(aReifiedJSON at: 'modelClass') ~= self class name]) ifTrue:[\x0a\x09\x09self error: 'this JSON does not fit here'].\x0a\x0a\x09data := aReifiedJSON",
messageSends: ["ifNil:", "ifTrue:", "or:", "isNil", "at:", "~=", "name", "class", "error:"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "url",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(_st(self._path()).__comma("/")).__comma(_st(self._id())._asString());
$ctx1.sendIdx[","]=1;
return $1;
}, function($ctx1) {$ctx1.fill(self,"url",{},globals.MaplessModel)})},
args: [],
source: "url\x0a\x0a\x09^ self path,'/',self id asString",
messageSends: [",", "path", "asString", "id"],
referencedClasses: []
}),
globals.MaplessModel);


smalltalk.addMethod(
smalltalk.method({
selector: "atId:do:",
protocol: 'accessing',
fn: function (anId,onDone){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self._read_do_(anId,onDone);
return $1;
}, function($ctx1) {$ctx1.fill(self,"atId:do:",{anId:anId,onDone:onDone},globals.MaplessModel.klass)})},
args: ["anId", "onDone"],
source: "atId: anId do: onDone\x0a\x09\x22Answers the instance of this model found at anId (or nil)\x0a\x09using th answer in the onDone callback\x22\x0a \x0a\x09^ self read: anId do: onDone",
messageSends: ["read:do:"],
referencedClasses: []
}),
globals.MaplessModel.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "create",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self._createDo_((function(){
return nil;
}));
return $1;
}, function($ctx1) {$ctx1.fill(self,"create",{},globals.MaplessModel.klass)})},
args: [],
source: "create\x0a\x0a\x09^ self createDo: [nil]",
messageSends: ["createDo:"],
referencedClasses: []
}),
globals.MaplessModel.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "createDo:",
protocol: 'actions',
fn: function (aBlock){
var self=this;
var newInstance;
function $ModelCreateError(){return globals.ModelCreateError||(typeof ModelCreateError=="undefined"?nil:ModelCreateError)}
return smalltalk.withContext(function($ctx1) { 
var $4,$3,$2,$5,$1,$7,$6,$8;
newInstance=_st(self._basicNew())._initialize();
_st(jQuery)._ajax_(globals.HashedCollection._newFromPairs_(["url",self._path(),"type","POST","cache",false,"data",_st(newInstance)._asJSONString(),"success",(function(x){
return smalltalk.withContext(function($ctx2) {
return _st(newInstance)._onAfterCreate_done_(x,aBlock);
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,1)})}),"fail",(function(x){
return smalltalk.withContext(function($ctx2) {
$4=self._name();
$ctx2.sendIdx["name"]=1;
$3="Could not create ".__comma($4);
$ctx2.sendIdx[","]=3;
$2=_st($3).__comma(":  ");
$ctx2.sendIdx[","]=2;
$5=_st(x)._responseText();
$ctx2.sendIdx["responseText"]=1;
$1=_st($2).__comma($5);
$ctx2.sendIdx[","]=1;
return _st($ModelCreateError())._signal_($1);
$ctx2.sendIdx["signal:"]=1;
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,2)})}),"error",(function(x){
return smalltalk.withContext(function($ctx2) {
$7=_st("Could not create ".__comma(self._name())).__comma(":  ");
$ctx2.sendIdx[","]=5;
$6=_st($7).__comma(_st(x)._responseText());
$ctx2.sendIdx[","]=4;
return _st($ModelCreateError())._signal_($6);
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,3)})})]));
$8=newInstance;
return $8;
}, function($ctx1) {$ctx1.fill(self,"createDo:",{aBlock:aBlock,newInstance:newInstance},globals.MaplessModel.klass)})},
args: ["aBlock"],
source: "createDo: aBlock\x0a\x0a\x09| newInstance |\x0a\x0a\x09newInstance := self basicNew initialize.\x0a\x0a\x09jQuery ajax: #{\x0a\x09\x09'url'-> self path.\x0a\x09\x09'type' -> 'POST'.\x0a\x09\x09'cache'-> false.\x0a\x09\x09'data' -> newInstance asJSONString.\x0a\x09\x09'success' -> [:x| newInstance onAfterCreate: x done: aBlock].\x0a\x09\x09'fail' -> [:x| ModelCreateError signal: 'Could not create ', self name,':  ', x responseText].\x0a\x09\x09'error' -> [:x| ModelCreateError signal: 'Could not create ', self name,':  ', x responseText]}.\x0a\x0a\x09^ newInstance",
messageSends: ["initialize", "basicNew", "ajax:", "path", "asJSONString", "onAfterCreate:done:", "signal:", ",", "name", "responseText"],
referencedClasses: ["ModelCreateError"]
}),
globals.MaplessModel.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "createdOnFrom:",
protocol: 'actions',
fn: function (aReifiedJSON){
var self=this;
function $Date(){return globals.Date||(typeof Date=="undefined"?nil:Date)}
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st($Date())._fromString_(aReifiedJSON);
return $1;
}, function($ctx1) {$ctx1.fill(self,"createdOnFrom:",{aReifiedJSON:aReifiedJSON},globals.MaplessModel.klass)})},
args: ["aReifiedJSON"],
source: "createdOnFrom: aReifiedJSON\x0a\x0a\x09^ Date fromString: aReifiedJSON",
messageSends: ["fromString:"],
referencedClasses: ["Date"]
}),
globals.MaplessModel.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "fromJson:",
protocol: 'actions',
fn: function (someJson){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self._new())._syncFrom_(someJson);
return $1;
}, function($ctx1) {$ctx1.fill(self,"fromJson:",{someJson:someJson},globals.MaplessModel.klass)})},
args: ["someJson"],
source: "fromJson: someJson\x0a\x09\x22Answers a new instance of this model and returns it\x0a\x09in the state dictated by someJson.\x22\x0a\x0a\x09^ self new syncFrom: someJson",
messageSends: ["syncFrom:", "new"],
referencedClasses: []
}),
globals.MaplessModel.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "fromJsonString:",
protocol: 'actions',
fn: function (someJsonString){
var self=this;
var json,modelClass;
function $Smalltalk(){return globals.Smalltalk||(typeof Smalltalk=="undefined"?nil:Smalltalk)}
return smalltalk.withContext(function($ctx1) { 
var $2,$1;
json=self._reify_(someJsonString);
modelClass=_st(json)._at_ifAbsent_("modelClass",(function(){
return nil;
}));
$2=_st(modelClass)._isNil();
if(smalltalk.assert($2)){
$1=nil;
} else {
$1=_st(_st(_st(_st($Smalltalk())._current())._at_(modelClass))._new())._syncFrom_(someJsonString);
};
return $1;
}, function($ctx1) {$ctx1.fill(self,"fromJsonString:",{someJsonString:someJsonString,json:json,modelClass:modelClass},globals.MaplessModel.klass)})},
args: ["someJsonString"],
source: "fromJsonString: someJsonString\x0a\x09\x22Answers a new instance of this model and returns it\x0a\x09in the state dictated by someJsonString.\x22\x0a\x0a\x09| json modelClass |\x0a\x09json := self reify: someJsonString.\x0a\x09modelClass := json at: 'modelClass' ifAbsent:[nil].\x0a\x09\x0a\x09^ modelClass isNil\x0a\x09\x09ifTrue:[nil]\x0a\x09\x09ifFalse:[(Smalltalk current at: modelClass) new syncFrom: someJsonString]",
messageSends: ["reify:", "at:ifAbsent:", "ifTrue:ifFalse:", "isNil", "syncFrom:", "new", "at:", "current"],
referencedClasses: ["Smalltalk"]
}),
globals.MaplessModel.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "fromReified:",
protocol: 'actions',
fn: function (aReifiedJSON){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self._new())._syncWith_(aReifiedJSON);
return $1;
}, function($ctx1) {$ctx1.fill(self,"fromReified:",{aReifiedJSON:aReifiedJSON},globals.MaplessModel.klass)})},
args: ["aReifiedJSON"],
source: " fromReified: aReifiedJSON\x0a\x09\x22Answers a new instance of this model and returns it\x0a\x09in sync with aReifiedJSON.\x22\x0a\x0a\x09^ self new syncWith: aReifiedJSON",
messageSends: ["syncWith:", "new"],
referencedClasses: []
}),
globals.MaplessModel.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "localDelete:",
protocol: 'actions',
fn: function (aMaplessModel){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(_st(window)._localStorage())._removeItem_(_st(aMaplessModel)._id());
return self}, function($ctx1) {$ctx1.fill(self,"localDelete:",{aMaplessModel:aMaplessModel},globals.MaplessModel.klass)})},
args: ["aMaplessModel"],
source: "localDelete: aMaplessModel\x0a\x0a\x09window localStorage removeItem: aMaplessModel id",
messageSends: ["removeItem:", "localStorage", "id"],
referencedClasses: []
}),
globals.MaplessModel.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "localLoadAt:",
protocol: 'actions',
fn: function (anId){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self._fromJsonString_(_st(_st(window)._localStorage())._getItem_(anId));
return $1;
}, function($ctx1) {$ctx1.fill(self,"localLoadAt:",{anId:anId},globals.MaplessModel.klass)})},
args: ["anId"],
source: "localLoadAt: anId\x0a\x0a\x09^ self fromJsonString: (window localStorage getItem: anId)",
messageSends: ["fromJsonString:", "getItem:", "localStorage"],
referencedClasses: []
}),
globals.MaplessModel.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "localSave:",
protocol: 'actions',
fn: function (aMaplessModel){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(_st(window)._localStorage())._setItem_value_(_st(aMaplessModel)._id(),_st(aMaplessModel)._asJSONString());
return self}, function($ctx1) {$ctx1.fill(self,"localSave:",{aMaplessModel:aMaplessModel},globals.MaplessModel.klass)})},
args: ["aMaplessModel"],
source: "localSave: aMaplessModel\x0a\x0a\x09window localStorage\x0a\x09\x09setItem: aMaplessModel id\x0a\x09\x09value: aMaplessModel asJSONString",
messageSends: ["setItem:value:", "localStorage", "id", "asJSONString"],
referencedClasses: []
}),
globals.MaplessModel.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "manyFromJson:",
protocol: 'actions',
fn: function (someJson){
var self=this;
function $JSON(){return globals.JSON||(typeof JSON=="undefined"?nil:JSON)}
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(_st($JSON())._parse_(someJson))._collect_((function(each){
return smalltalk.withContext(function($ctx2) {
return self._fromReified_(each);
}, function($ctx2) {$ctx2.fillBlock({each:each},$ctx1,1)})}));
return $1;
}, function($ctx1) {$ctx1.fill(self,"manyFromJson:",{someJson:someJson},globals.MaplessModel.klass)})},
args: ["someJson"],
source: "manyFromJson: someJson\x0a\x0a\x09^ (JSON parse: someJson) collect:[:each|\x0a\x09\x09 self fromReified: each ]",
messageSends: ["collect:", "parse:", "fromReified:"],
referencedClasses: ["JSON"]
}),
globals.MaplessModel.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "newUUID",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self._uuidGenerator())._value();
return $1;
}, function($ctx1) {$ctx1.fill(self,"newUUID",{},globals.MaplessModel.klass)})},
args: [],
source: "newUUID\x0a\x09^ self uuidGenerator value",
messageSends: ["value", "uuidGenerator"],
referencedClasses: []
}),
globals.MaplessModel.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "onAfterRead:done:",
protocol: 'reactions',
fn: function (someJson,aBlock){
var self=this;
var reified;
return smalltalk.withContext(function($ctx1) { 
var $1;
reified=self._fromJson_(someJson);
_st(aBlock)._value_(reified);
$1=reified;
return $1;
}, function($ctx1) {$ctx1.fill(self,"onAfterRead:done:",{someJson:someJson,aBlock:aBlock,reified:reified},globals.MaplessModel.klass)})},
args: ["someJson", "aBlock"],
source: "onAfterRead: someJson done: aBlock\x0a\x0a\x09| reified |\x0a\x09\x0a\x09reified := self fromJson: someJson.\x0a\x09aBlock value: reified.\x0a\x09^ reified",
messageSends: ["fromJson:", "value:"],
referencedClasses: []
}),
globals.MaplessModel.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "read:",
protocol: 'actions',
fn: function (anId){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._read_do_(anId,(function(){
return nil;
}));
return self}, function($ctx1) {$ctx1.fill(self,"read:",{anId:anId},globals.MaplessModel.klass)})},
args: ["anId"],
source: "read: anId\x0a\x0a\x09self read: anId do: [nil]",
messageSends: ["read:do:"],
referencedClasses: []
}),
globals.MaplessModel.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "read:do:",
protocol: 'actions',
fn: function (anId,aBlock){
var self=this;
function $ModelReadError(){return globals.ModelReadError||(typeof ModelReadError=="undefined"?nil:ModelReadError)}
return smalltalk.withContext(function($ctx1) { 
var $1,$4,$3,$8,$7,$6,$9,$5,$11,$10,$2;
$1=jQuery;
$4=_st(self._path()).__comma("?id=");
$ctx1.sendIdx[","]=2;
$3=_st($4).__comma(anId);
$ctx1.sendIdx[","]=1;
$2=globals.HashedCollection._newFromPairs_(["url",$3,"type","GET","cache",false,"success",(function(x){
return smalltalk.withContext(function($ctx2) {
return self._onAfterRead_done_(x,aBlock);
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,1)})}),"fail",(function(x){
return smalltalk.withContext(function($ctx2) {
$8=self._name();
$ctx2.sendIdx["name"]=1;
$7="Could not read ".__comma($8);
$ctx2.sendIdx[","]=5;
$6=_st($7).__comma(":  ");
$ctx2.sendIdx[","]=4;
$9=_st(x)._responseText();
$ctx2.sendIdx["responseText"]=1;
$5=_st($6).__comma($9);
$ctx2.sendIdx[","]=3;
return _st($ModelReadError())._signal_($5);
$ctx2.sendIdx["signal:"]=1;
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,2)})}),"error",(function(x){
return smalltalk.withContext(function($ctx2) {
$11=_st("Could not read ".__comma(self._name())).__comma(":  ");
$ctx2.sendIdx[","]=7;
$10=_st($11).__comma(_st(x)._responseText());
$ctx2.sendIdx[","]=6;
return _st($ModelReadError())._signal_($10);
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,3)})})]);
_st($1)._ajax_($2);
return self}, function($ctx1) {$ctx1.fill(self,"read:do:",{anId:anId,aBlock:aBlock},globals.MaplessModel.klass)})},
args: ["anId", "aBlock"],
source: "read: anId do: aBlock\x0a\x0a\x09jQuery ajax: #{ \x0a\x09\x09'url' -> (self path, '?id=',anId).\x0a\x09\x09'type'-> 'GET'.\x0a\x09\x09'cache'-> false.\x0a\x09\x09'success'-> [:x| self onAfterRead: x done: aBlock].\x0a\x09\x09'fail' -> [:x| ModelReadError signal: 'Could not read ', self name,':  ', x responseText].\x0a\x09\x09'error'-> [:x| ModelReadError signal: 'Could not read ', self name,':  ', x responseText]}",
messageSends: ["ajax:", ",", "path", "onAfterRead:done:", "signal:", "name", "responseText"],
referencedClasses: ["ModelReadError"]
}),
globals.MaplessModel.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "reify:",
protocol: 'actions',
fn: function (someJson){
var self=this;
function $JSON(){return globals.JSON||(typeof JSON=="undefined"?nil:JSON)}
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st($JSON())._parse_(someJson);
return $1;
}, function($ctx1) {$ctx1.fill(self,"reify:",{someJson:someJson},globals.MaplessModel.klass)})},
args: ["someJson"],
source: "reify: someJson\x0a\x09\x22Returns a simple javascript object with\x0a\x09the attributes meant for the matching instance variable content of this model.\x22\x0a\x0a\x09^ JSON parse: someJson",
messageSends: ["parse:"],
referencedClasses: ["JSON"]
}),
globals.MaplessModel.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "uuidGenerator",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
return function guid() {
    function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
    }
    return _p8() + _p8(true) + _p8(true) + _p8();
};
return self}, function($ctx1) {$ctx1.fill(self,"uuidGenerator",{},globals.MaplessModel.klass)})},
args: [],
source: "uuidGenerator\x0a\x09\x22Taken from:\x0a\x09http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript\x22\x0a\x0a<return function guid() {\x0a    function _p8(s) {\x0a        var p = (Math.random().toString(16)+\x22000000000\x22).substr(2,8);\x0a        return s ? \x22-\x22 + p.substr(0,4) + \x22-\x22 + p.substr(4,4) : p ;\x0a    }\x0a    return _p8() + _p8(true) + _p8(true) + _p8();\x0a}>",
messageSends: [],
referencedClasses: []
}),
globals.MaplessModel.klass);

});
