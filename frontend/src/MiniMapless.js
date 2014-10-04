define("app/MiniMapless", ["amber/boot", "amber_core/Kernel-Objects", "amber_core/Kernel-Exceptions"], function($boot){
var smalltalk=$boot.vm,nil=$boot.nil,_st=$boot.asReceiver,globals=$boot.globals;
smalltalk.addPackage('MiniMapless');
smalltalk.packages["MiniMapless"].transport = {"type":"amd","amdNamespace":"app"};

smalltalk.addClass('Mapless', globals.Object, ['data'], 'MiniMapless');
globals.Mapless.comment="MaplessModel is the same kind of aggregate you'll found in Mapless in Pharo but here in the frontend.\x0aThe concrete subclasses' instances of these aggregates are very friendly to be sent and received to and from the backend.\x0a\x0aFor more on Mapless visit:\x0ahttp://sebastianconcept.github.io/Mapless";
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
}, function($ctx1) {$ctx1.fill(self,"=",{anObject:anObject},globals.Mapless)})},
args: ["anObject"],
source: "= anObject\x0a\x0a\x09^ (anObject respondsTo: #id) and:[\x0a\x09self id = anObject id]",
messageSends: ["and:", "respondsTo:", "=", "id"],
referencedClasses: []
}),
globals.Mapless);

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
}, function($ctx1) {$ctx1.fill(self,"asJSONString",{},globals.Mapless)})},
args: [],
source: "asJSONString\x0a\x0a\x09self onAboutToJSON.\x0a\x0a\x09^ JSON stringify: data",
messageSends: ["onAboutToJSON", "stringify:"],
referencedClasses: ["JSON"]
}),
globals.Mapless);

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
}, function($ctx1) {$ctx1.fill(self,"at:",{aKey:aKey},globals.Mapless)})},
args: ["aKey"],
source: "at: aKey\x0a\x0a\x09^ data at: aKey",
messageSends: ["at:"],
referencedClasses: []
}),
globals.Mapless);

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
}, function($ctx1) {$ctx1.fill(self,"at:ifAbsent:",{aKey:aKey,aBlock:aBlock},globals.Mapless)})},
args: ["aKey", "aBlock"],
source: "at: aKey ifAbsent: aBlock\x0a\x0a\x09^ data at: aKey ifAbsent: aBlock",
messageSends: ["at:ifAbsent:"],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "at:put:",
protocol: 'accessing',
fn: function (aKey,anObject){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(self["@data"])._at_put_(aKey,anObject);
return anObject;
}, function($ctx1) {$ctx1.fill(self,"at:put:",{aKey:aKey,anObject:anObject},globals.Mapless)})},
args: ["aKey", "anObject"],
source: "at: aKey put: anObject\x0a\x0a\x09data at: aKey put: anObject.\x0a\x0a\x09^ anObject",
messageSends: ["at:put:"],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "create",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self._createDo_((function(res){
return smalltalk.withContext(function($ctx2) {
return self._onAfterCreate_(res);
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})}));
return $1;
}, function($ctx1) {$ctx1.fill(self,"create",{},globals.Mapless)})},
args: [],
source: "create\x0a\x09\x22Creates this mapless using the remote API\x22\x0a\x09^ self createDo:[ :res | self onAfterCreate: res ]",
messageSends: ["createDo:", "onAfterCreate:"],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "createDo:",
protocol: 'actions',
fn: function (aBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._onAboutToCreate();
_st(jQuery)._ajax_(globals.HashedCollection._newFromPairs_(["url",self._path(),"type","POST","cache",false,"contentType","application/json; charset=utf-8","dataType","json","data",self._asJSONString(),"complete",(function(res){
return smalltalk.withContext(function($ctx2) {
return _st(aBlock)._value_(res);
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})})]));
return self}, function($ctx1) {$ctx1.fill(self,"createDo:",{aBlock:aBlock},globals.Mapless)})},
args: ["aBlock"],
source: "createDo: aBlock\x0a\x09\x22Creates this mapless using the remote API\x22\x0a\x0a\x09self onAboutToCreate.\x0a\x0a\x09jQuery ajax: #{\x0a\x09\x09'url' -> self path.\x0a\x09\x09'type' -> 'POST'.\x0a\x09\x09'cache' -> false.\x0a\x09\x09'contentType'-> 'application/json; charset=utf-8'.\x0a\x09\x09'dataType'-> 'json'.\x0a\x09\x09'data' -> self asJSONString.\x0a\x09\x09'complete' -> [ :res | aBlock value: res ]\x0a\x09}.",
messageSends: ["onAboutToCreate", "ajax:", "path", "asJSONString", "value:"],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "createdOn",
protocol: 'accessing',
fn: function (){
var self=this;
var selector,expectsInstanceOf,object;
function $Date(){return globals.Date||(typeof Date=="undefined"?nil:Date)}
return smalltalk.withContext(function($ctx1) { 
var $1,$2,$3,$4,$5,$receiver;
selector="createdOn";
expectsInstanceOf=$Date();
$1=_st(selector)._asString();
$ctx1.sendIdx["asString"]=1;
object=self._at_($1);
$2=object;
if(($receiver = $2) == null || $receiver.isNil){
return nil;
} else {
$2;
};
$3=_st(object)._isKindOf_(expectsInstanceOf);
if(smalltalk.assert($3)){
$4=object;
return $4;
};
$5=self._at_put_(_st(selector)._asString(),self._dateAndTimeAt_(selector));
return $5;
}, function($ctx1) {$ctx1.fill(self,"createdOn",{selector:selector,expectsInstanceOf:expectsInstanceOf,object:object},globals.Mapless)})},
args: [],
source: "createdOn \x0a\x0a\x09| selector expectsInstanceOf object |\x0a\x0a\x09selector := #createdOn.\x0a\x09expectsInstanceOf := Date.\x0a\x0a\x09object := self at: selector asString.\x0a\x09object ifNil:[^nil].\x0a\x0a\x09(object isKindOf: expectsInstanceOf) ifTrue:[^object].\x0a\x0a\x09^ self at: selector asString put: (self dateAndTimeAt: selector).",
messageSends: ["at:", "asString", "ifNil:", "ifTrue:", "isKindOf:", "at:put:", "dateAndTimeAt:"],
referencedClasses: ["Date"]
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "createdOn:",
protocol: 'accessing',
fn: function (aDate){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._at_put_("createdOn",aDate);
return self}, function($ctx1) {$ctx1.fill(self,"createdOn:",{aDate:aDate},globals.Mapless)})},
args: ["aDate"],
source: "createdOn: aDate\x0a\x0a\x09self at: #createdOn put: aDate",
messageSends: ["at:put:"],
referencedClasses: []
}),
globals.Mapless);

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
source: "data\x0a\x09\x22Answers the raw content of this mapless.\x0a\x09Warning: NOT meant to be overriden by subclasses.\x22\x0a\x09^ data",
messageSends: [],
referencedClasses: []
}),
globals.Mapless);

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
}, function($ctx1) {$ctx1.fill(self,"dateAndTimeAt:",{aSelector:aSelector},globals.Mapless)})},
args: ["aSelector"],
source: "dateAndTimeAt: aSelector\x0a\x0a\x09^ Date fromString: (self at: aSelector)",
messageSends: ["fromString:", "at:"],
referencedClasses: ["Date"]
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "delete",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._deleteDo_((function(res){
return smalltalk.withContext(function($ctx2) {
return self._onAfterDelete_(res);
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"delete",{},globals.Mapless)})},
args: [],
source: "delete\x0a\x09\x22Delete this mapless using the remote API\x22\x0a\x09self deleteDo:[ :res | self onAfterDelete: res ]",
messageSends: ["deleteDo:", "onAfterDelete:"],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "deleteDo:",
protocol: 'actions',
fn: function (aBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._onAboutToDelete();
_st(jQuery)._ajax_(globals.HashedCollection._newFromPairs_(["url",self._uri(),"type","DELETE","cache",false,"data",self._asJSONString(),"complete",(function(res){
return smalltalk.withContext(function($ctx2) {
return _st(aBlock)._value_(res);
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})})]));
return self}, function($ctx1) {$ctx1.fill(self,"deleteDo:",{aBlock:aBlock},globals.Mapless)})},
args: ["aBlock"],
source: "deleteDo: aBlock\x0a\x09\x22Delete this mapless using the remote API\x22\x0a\x0a\x09self onAboutToDelete.\x0a\x0a\x09jQuery ajax: #{ \x0a\x09\x09'url' -> self uri.\x0a\x09\x09'type' -> 'DELETE'.\x0a\x09\x09'cache' -> false.\x0a\x09\x09'data' -> self asJSONString.\x0a\x09\x09'complete' -> [ :res | aBlock value: res ]\x0a\x09}  ",
messageSends: ["onAboutToDelete", "ajax:", "uri", "asJSONString", "value:"],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "doesNotUnderstand:",
protocol: 'actions',
fn: function (aMessage){
var self=this;
var key,part,subModel,isUndefined,isObject,obj,keys;
function $HashedCollection(){return globals.HashedCollection||(typeof HashedCollection=="undefined"?nil:HashedCollection)}
function $Smalltalk(){return globals.Smalltalk||(typeof Smalltalk=="undefined"?nil:Smalltalk)}
return smalltalk.withContext(function($ctx1) { 
var $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$21,$20,$19,$18,$receiver;
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
isUndefined=self._isJavaScriptUndefined_(part);
isUndefined;
$8=isUndefined;
if(smalltalk.assert($8)){
return nil;
};
$9=self._isSubMaplessArrayFor_on_(key,part);
if(smalltalk.assert($9)){
$10=_st(self["@data"])._at_put_(key,self._getSubMaplessAt_from_(key,part));
$ctx1.sendIdx["at:put:"]=1;
return $10;
};
isObject=self._isJavaScriptObject_(part);
isObject;
subModel=self._get_from_("modelClass",part);
subModel;
$11=subModel;
if(($receiver = $11) == null || $receiver.isNil){
$12=part;
return $12;
} else {
$11;
};
subModel=_st(_st($Smalltalk())._globals())._at_(subModel);
subModel;
$13=subModel;
if(($receiver = $13) == null || $receiver.isNil){
_st(part)._inspect();
$14=_st("this should have a ".__comma(subModel)).__comma(" modelClass no?");
$ctx1.sendIdx[","]=1;
self._error_($14);
} else {
$13;
};
subModel=_st(subModel)._fromReified_(part);
subModel;
$15=self["@data"];
$16=_st(key)._asString();
$ctx1.sendIdx["asString"]=3;
_st($15)._at_put_($16,subModel);
$ctx1.sendIdx["at:put:"]=2;
$17=subModel;
return $17;
};
$19=_st(self._isKeyword_(key))._and_((function(){
return smalltalk.withContext(function($ctx2) {
$21=_st(key)._asString();
$ctx2.sendIdx["asString"]=4;
$20=_st($21)._occurrencesOf_(":");
return _st($20).__eq((1));
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,10)})}));
if(smalltalk.assert($19)){
key=_st(key)._allButLast();
key;
$18=_st(self["@data"])._at_put_(_st(key)._asString(),_st(_st(aMessage)._arguments())._first());
} else {
$18=($ctx1.supercall = true, globals.Mapless.superclass.fn.prototype._doesNotUnderstand_.apply(_st(self), [aMessage]));
$ctx1.supercall = false;
};
return $18;
}, function($ctx1) {$ctx1.fill(self,"doesNotUnderstand:",{aMessage:aMessage,key:key,part:part,subModel:subModel,isUndefined:isUndefined,isObject:isObject,obj:obj,keys:keys},globals.Mapless)})},
args: ["aMessage"],
source: "doesNotUnderstand: aMessage\x0a\x09\x22The idea behind this DNU is to use the selector as setters or getter \x0a\x09delegating to data (aJsonObject)\x22\x0a\x09\x0a\x09| key part subModel isUndefined isObject obj keys |\x0a\x0a\x09key := aMessage selector asSymbol.\x0a\x0a\x09(self isUnary: key) ifTrue: [\x0a\x09\x09(data class == HashedCollection)\x0a\x09\x09\x09ifTrue:[part := data at: key asString ifAbsent:[nil]]\x0a\x09\x09\x09ifFalse:[part := data at: key asString].\x0a\x09\x09part ifNil:[^nil].\x0a\x09\x09isUndefined := self isJavaScriptUndefined: part.\x0a\x09\x09isUndefined ifTrue:[^nil].\x0a\x0a\x09\x09\x22Is accessing an array of (sub)Mapless?\x22\x0a\x09\x09(self isSubMaplessArrayFor: key on: part) ifTrue:[\x0a\x09\x09\x09^ data \x0a\x09\x09\x09\x09at: key\x0a\x09\x09\x09\x09put: (self getSubMaplessAt: key from: part) ].\x0a\x0a\x09\x09isObject := self isJavaScriptObject: part.\x0a\x09\x09\x22console log: 'is object'.\x0a\x09\x09console log: part.\x22\x0a\x09\x09\x0a\x09\x09\x22is part an empty js object? (would be nil for JSON eyes)\x22\x0a\x09\x09\x22isObject ifTrue:[\x09\x0a\x09\x09\x09obj := self newJSObject.\x0a\x09\x09\x09obj := JSObjectProxy on: obj.\x0a\x09\x09\x09(obj keys: part) isEmpty ifTrue:[\x0a\x09\x09\x09\x09data at: key asString put: nil.\x0a\x09\x09\x09\x09^nil]].\x22\x0a\x0a\x09\x09subModel := self get: 'modelClass' from: part.\x0a\x09\x09\x22If there is no modelClass in it, then is a direct value in the property\x22\x0a\x09\x09subModel ifNil:[ ^part].\x0a\x0a\x09\x09subModel := Smalltalk globals at: subModel.\x0a\x09\x09subModel ifNil:[part inspect. self error: 'this should have a ',subModel,' modelClass no?'].\x0a\x09\x09subModel := subModel fromReified: part.\x0a\x09\x09data at: key asString put: subModel.\x0a\x09\x09^ subModel].\x0a \x0a\x09^ ((self isKeyword: key) and: [\x0a\x09(key asString occurrencesOf: ':') = 1])\x0a\x09\x09ifTrue: [key := key allButLast.\x0a\x09\x09\x09\x09data at: key asString put: aMessage arguments first]\x0a\x09\x09ifFalse: [super doesNotUnderstand: aMessage]",
messageSends: ["asSymbol", "selector", "ifTrue:", "isUnary:", "ifTrue:ifFalse:", "==", "class", "at:ifAbsent:", "asString", "at:", "ifNil:", "isJavaScriptUndefined:", "isSubMaplessArrayFor:on:", "at:put:", "getSubMaplessAt:from:", "isJavaScriptObject:", "get:from:", "globals", "inspect", "error:", ",", "fromReified:", "and:", "isKeyword:", "=", "occurrencesOf:", "allButLast", "first", "arguments", "doesNotUnderstand:"],
referencedClasses: ["HashedCollection", "Smalltalk"]
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "fresh",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._freshDo_((function(res){
return smalltalk.withContext(function($ctx2) {
return self._onAfterFresh_(res);
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"fresh",{},globals.Mapless)})},
args: [],
source: "fresh\x0a\x09\x22Re-read this mapless' state.\x22\x0a\x09self freshDo:[ :res | self onAfterFresh: res ]",
messageSends: ["freshDo:", "onAfterFresh:"],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "freshDo:",
protocol: 'actions',
fn: function (aBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._onAboutToFresh();
_st(jQuery)._ajax_(globals.HashedCollection._newFromPairs_(["url",self._uri(),"type","GET","cache",false,"complete",(function(res){
return smalltalk.withContext(function($ctx2) {
return _st(aBlock)._value_(res);
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})})]));
return self}, function($ctx1) {$ctx1.fill(self,"freshDo:",{aBlock:aBlock},globals.Mapless)})},
args: ["aBlock"],
source: "freshDo: aBlock\x0a\x09\x22Re-read this mapless' state from the remote API.\x22\x0a\x0a\x09self onAboutToFresh.\x0a\x0a\x09jQuery ajax: #{ \x0a\x09\x09'url' -> self uri.\x0a\x09\x09'type' -> 'GET'.\x0a\x09\x09'cache' -> false.\x0a\x09\x09'complete' -> [ :res | aBlock value: res ]\x0a\x09}\x09\x0a\x09",
messageSends: ["onAboutToFresh", "ajax:", "uri", "value:"],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "get:from:",
protocol: 'actions',
fn: function (anAttribute,aPart){
var self=this;
return smalltalk.withContext(function($ctx1) { 
return aPart[anAttribute];
return self}, function($ctx1) {$ctx1.fill(self,"get:from:",{anAttribute:anAttribute,aPart:aPart},globals.Mapless)})},
args: ["anAttribute", "aPart"],
source: "get: anAttribute from: aPart\x0a\x09\x22Answers what aPart has at anAttribute.\x22\x0a\x09<return aPart[anAttribute]>",
messageSends: [],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "getSubMaplessAt:from:",
protocol: 'actions',
fn: function (aKey,someObjects){
var self=this;
function $JSObjectProxy(){return globals.JSObjectProxy||(typeof JSObjectProxy=="undefined"?nil:JSObjectProxy)}
function $Mapless(){return globals.Mapless||(typeof Mapless=="undefined"?nil:Mapless)}
return smalltalk.withContext(function($ctx1) { 
var $4,$3,$2,$1,$6,$5,$7,$8,$9;
$1=_st(someObjects)._anySatisfy_((function(e){
return smalltalk.withContext(function($ctx2) {
$4=_st(e)._class();
$ctx2.sendIdx["class"]=1;
$3=self._isJavaScriptUndefined_($4);
$2=_st($3)._not();
return _st($2)._and_((function(){
return smalltalk.withContext(function($ctx3) {
return _st(_st(_st(e)._class()).__tild_eq($JSObjectProxy()))._and_((function(){
return smalltalk.withContext(function($ctx4) {
return _st(e)._isKindOf_($Mapless());
}, function($ctx4) {$ctx4.fillBlock({},$ctx3,3)})}));
}, function($ctx3) {$ctx3.fillBlock({},$ctx2,2)})}));
$ctx2.sendIdx["and:"]=1;
}, function($ctx2) {$ctx2.fillBlock({e:e},$ctx1,1)})}));
$ctx1.sendIdx["anySatisfy:"]=1;
if(smalltalk.assert($1)){
return someObjects;
};
$5=_st(someObjects)._anySatisfy_((function(e){
return smalltalk.withContext(function($ctx2) {
$6=_st(e)._at_("data");
$ctx2.sendIdx["at:"]=1;
return _st($6)._notNil();
$ctx2.sendIdx["notNil"]=1;
}, function($ctx2) {$ctx2.fillBlock({e:e},$ctx1,5)})}));
$ctx1.sendIdx["anySatisfy:"]=2;
if(smalltalk.assert($5)){
$7=_st(someObjects)._collect_((function(each){
return smalltalk.withContext(function($ctx2) {
return _st($Mapless())._fromReified_(_st(each)._data());
$ctx2.sendIdx["fromReified:"]=1;
}, function($ctx2) {$ctx2.fillBlock({each:each},$ctx1,7)})}));
$ctx1.sendIdx["collect:"]=1;
return $7;
};
$8=_st(someObjects)._anySatisfy_((function(e){
return smalltalk.withContext(function($ctx2) {
return _st(_st(e)._at_("modelClass"))._notNil();
}, function($ctx2) {$ctx2.fillBlock({e:e},$ctx1,8)})}));
if(smalltalk.assert($8)){
$9=_st(someObjects)._collect_((function(each){
return smalltalk.withContext(function($ctx2) {
return _st($Mapless())._fromReified_(each);
}, function($ctx2) {$ctx2.fillBlock({each:each},$ctx1,10)})}));
return $9;
};
self._error_("Unknown case :(");
return self}, function($ctx1) {$ctx1.fill(self,"getSubMaplessAt:from:",{aKey:aKey,someObjects:someObjects},globals.Mapless)})},
args: ["aKey", "someObjects"],
source: "getSubMaplessAt: aKey from: someObjects\x0a\x09\x22Returns the submapless on aKey for this mapless based on someObjects.\x22\x0a\x09\x0a\x09\x22Are they already mapless?\x22\x0a\x09(someObjects anySatisfy:[ :e | \x0a\x09\x09(self isJavaScriptUndefined: e class) not and:[\x0a\x09\x09e class ~= JSObjectProxy and:[\x0a\x09\x09e isKindOf: Mapless ] ] ]) ifTrue:[ ^ someObjects ].\x0a\x09\x09\x0a\x09\x22So they are probably reified JSON..\x22\x0a\x09\x0a\x09\x22Do they have @data?\x22\x0a\x09(someObjects anySatisfy:[ :e | \x0a\x09\x09(e at: 'data') notNil ]) ifTrue:[\x0a\x09\x09\x09^ someObjects collect:[ :each | Mapless fromReified: each data ] ].\x0a\x0a\x09\x22Do they have modelClass directly in it?\x22\x0a\x09(someObjects anySatisfy:[ :e | \x0a\x09\x09(e at: 'modelClass') notNil ]) ifTrue:[\x0a\x09\x09\x09^ someObjects collect:[ :each | Mapless fromReified: each ] ].\x0a\x09\x0a\x09self error: 'Unknown case :('",
messageSends: ["ifTrue:", "anySatisfy:", "and:", "not", "isJavaScriptUndefined:", "class", "~=", "isKindOf:", "notNil", "at:", "collect:", "fromReified:", "data", "error:"],
referencedClasses: ["JSObjectProxy", "Mapless"]
}),
globals.Mapless);

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
}, function($ctx1) {$ctx1.fill(self,"id",{},globals.Mapless)})},
args: [],
source: "id\x0a\x0a\x09^ data at: #id ",
messageSends: ["at:"],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "id:",
protocol: 'accessing',
fn: function (aString){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(self["@data"])._at_put_("id",aString);
return self}, function($ctx1) {$ctx1.fill(self,"id:",{aString:aString},globals.Mapless)})},
args: ["aString"],
source: "id: aString\x0a\x0a\x09data at: #id put: aString",
messageSends: ["at:put:"],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "initialize",
protocol: 'initialization',
fn: function (){
var self=this;
function $HashedCollection(){return globals.HashedCollection||(typeof HashedCollection=="undefined"?nil:HashedCollection)}
return smalltalk.withContext(function($ctx1) { 
($ctx1.supercall = true, globals.Mapless.superclass.fn.prototype._initialize.apply(_st(self), []));
$ctx1.supercall = false;
self["@data"]=_st($HashedCollection())._new();
self._modelClass_(_st(self._class())._name());
return self}, function($ctx1) {$ctx1.fill(self,"initialize",{},globals.Mapless)})},
args: [],
source: "initialize\x0a\x0a\x09super initialize.\x0a\x0a\x09data := HashedCollection new.\x0a\x09self modelClass: self class name.",
messageSends: ["initialize", "new", "modelClass:", "name", "class"],
referencedClasses: ["HashedCollection"]
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "initializeCreatedOn",
protocol: 'initialization',
fn: function (){
var self=this;
function $Date(){return globals.Date||(typeof Date=="undefined"?nil:Date)}
return smalltalk.withContext(function($ctx1) { 
self._createdOn_(_st($Date())._now());
return self}, function($ctx1) {$ctx1.fill(self,"initializeCreatedOn",{},globals.Mapless)})},
args: [],
source: "initializeCreatedOn\x0a\x0a\x09self createdOn: Date now",
messageSends: ["createdOn:", "now"],
referencedClasses: ["Date"]
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "initializeInstanceVersion",
protocol: 'initialization',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._v_((1));
return self}, function($ctx1) {$ctx1.fill(self,"initializeInstanceVersion",{},globals.Mapless)})},
args: [],
source: "initializeInstanceVersion\x09\x0a\x0a\x09self v: 1",
messageSends: ["v:"],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "isJavaScriptObject:",
protocol: 'testing',
fn: function (anObject){
var self=this;
return smalltalk.withContext(function($ctx1) { 
return typeof anObject=='object';
return self}, function($ctx1) {$ctx1.fill(self,"isJavaScriptObject:",{anObject:anObject},globals.Mapless)})},
args: ["anObject"],
source: "isJavaScriptObject: anObject\x0a\x09\x22Answers true if aPart is a javascript object (as opposed to javascript 'other types')\x22\x0a\x09<return typeof anObject=='object'>",
messageSends: [],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "isJavaScriptUndefined:",
protocol: 'testing',
fn: function (anObject){
var self=this;
return smalltalk.withContext(function($ctx1) { 
return anObject=='undefined';
return self}, function($ctx1) {$ctx1.fill(self,"isJavaScriptUndefined:",{anObject:anObject},globals.Mapless)})},
args: ["anObject"],
source: "isJavaScriptUndefined: anObject\x0a\x09\x22Answers true if anObject is javascript's undefined\x22\x0a\x09<return anObject=='undefined'>",
messageSends: [],
referencedClasses: []
}),
globals.Mapless);

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
}, function($ctx1) {$ctx1.fill(self,"isKeyword:",{aSelector:aSelector},globals.Mapless)})},
args: ["aSelector"],
source: "isKeyword: aSelector\x0a\x09\x22Answers true if aSelector is for a keyword kind of message\x22\x0a\x09^ aSelector asString includes: ':'",
messageSends: ["includes:", "asString"],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "isSubMaplessArrayFor:on:",
protocol: 'testing',
fn: function (aKey,someObjects){
var self=this;
function $Array(){return globals.Array||(typeof Array=="undefined"?nil:Array)}
return smalltalk.withContext(function($ctx1) { 
var $3,$2,$1;
$1=_st(self._isUnary_(aKey))._and_((function(){
return smalltalk.withContext(function($ctx2) {
return _st(_st(_st(someObjects)._class()).__eq($Array()))._and_((function(){
return smalltalk.withContext(function($ctx3) {
return _st(someObjects)._anySatisfy_((function(e){
return smalltalk.withContext(function($ctx4) {
$3=_st(e)._at_("modelClass");
$ctx4.sendIdx["at:"]=1;
$2=_st($3)._notNil();
$ctx4.sendIdx["notNil"]=1;
return _st($2)._or_((function(){
return smalltalk.withContext(function($ctx5) {
return _st(_st(_st(e)._data())._at_("modelClass"))._notNil();
}, function($ctx5) {$ctx5.fillBlock({},$ctx4,4)})}));
}, function($ctx4) {$ctx4.fillBlock({e:e},$ctx3,3)})}));
}, function($ctx3) {$ctx3.fillBlock({},$ctx2,2)})}));
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}));
$ctx1.sendIdx["and:"]=1;
return $1;
}, function($ctx1) {$ctx1.fill(self,"isSubMaplessArrayFor:on:",{aKey:aKey,someObjects:someObjects},globals.Mapless)})},
args: ["aKey", "someObjects"],
source: "isSubMaplessArrayFor: aKey on: someObjects\x0a\x09\x22Answers true if someObjects are some case of submapless.\x22\x0a\x09\x0a\x09^ (self isUnary: aKey) and:[\x0a\x09someObjects class = Array and:[\x0a\x09someObjects anySatisfy:[ :e |\x0a\x09\x09(e at: 'modelClass') notNil or:[\x0a\x09\x09(e data at: 'modelClass') notNil ] ] ] ]",
messageSends: ["and:", "isUnary:", "=", "class", "anySatisfy:", "or:", "notNil", "at:", "data"],
referencedClasses: ["Array"]
}),
globals.Mapless);

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
}, function($ctx1) {$ctx1.fill(self,"isUnary:",{aSelector:aSelector},globals.Mapless)})},
args: ["aSelector"],
source: "isUnary: aSelector\x0a\x09\x22Answers true if aSelector is for an unary kind of message.\x22\x0a\x09^ (aSelector asString includes: ':') not",
messageSends: ["not", "includes:", "asString"],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "localDelete",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(self._class())._localDelete_(self);
return self}, function($ctx1) {$ctx1.fill(self,"localDelete",{},globals.Mapless)})},
args: [],
source: "localDelete\x0a\x0a\x09self class localDelete: self ",
messageSends: ["localDelete:", "class"],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "localFresh",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self._syncFromJSON_(_st(_st(window)._localStorage())._getItem_(self._id()));
return $1;
}, function($ctx1) {$ctx1.fill(self,"localFresh",{},globals.Mapless)})},
args: [],
source: "localFresh\x0a\x09\x22Answers the receiver loaded with a fresh version the contents regarding to the localStorage.\x22\x0a\x0a\x09^ self syncFromJSON: (window localStorage getItem: self id)",
messageSends: ["syncFromJSON:", "getItem:", "localStorage", "id"],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "localSave",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(self._class())._localSave_(self);
return self}, function($ctx1) {$ctx1.fill(self,"localSave",{},globals.Mapless)})},
args: [],
source: "localSave\x0a\x0a\x09self class localSave: self ",
messageSends: ["localSave:", "class"],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "newJSObject",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
return Object;
return self}, function($ctx1) {$ctx1.fill(self,"newJSObject",{},globals.Mapless)})},
args: [],
source: "newJSObject\x0a\x09<return Object>",
messageSends: [],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "onAboutToCreate",
protocol: 'reactions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._trigger_with_("aboutToCreate:",self);
return self}, function($ctx1) {$ctx1.fill(self,"onAboutToCreate",{},globals.Mapless)})},
args: [],
source: "onAboutToCreate\x0a\x0a\x09self trigger: 'aboutToCreate:' with: self",
messageSends: ["trigger:with:"],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "onAboutToDelete",
protocol: 'reactions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._trigger_with_("aboutToDelete:",self);
return self}, function($ctx1) {$ctx1.fill(self,"onAboutToDelete",{},globals.Mapless)})},
args: [],
source: "onAboutToDelete\x0a\x0a\x09self trigger: 'aboutToDelete:' with: self",
messageSends: ["trigger:with:"],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "onAboutToFresh",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._trigger_with_("aboutToFresh:",self);
return self}, function($ctx1) {$ctx1.fill(self,"onAboutToFresh",{},globals.Mapless)})},
args: [],
source: "onAboutToFresh\x0a\x0a\x09self trigger: 'aboutToFresh:' with: self\x0a\x09",
messageSends: ["trigger:with:"],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "onAboutToJSON",
protocol: 'reactions',
fn: function (){
var self=this;
var obj,keys;
function $JSObjectProxy(){return globals.JSObjectProxy||(typeof JSObjectProxy=="undefined"?nil:JSObjectProxy)}
function $Array(){return globals.Array||(typeof Array=="undefined"?nil:Array)}
function $Mapless(){return globals.Mapless||(typeof Mapless=="undefined"?nil:Mapless)}
return smalltalk.withContext(function($ctx1) { 
var $3,$2,$4,$1,$7,$6,$5,$8;
obj=self._newJSObject();
obj=_st($JSObjectProxy())._on_(obj);
keys=_st(obj)._keys_(self["@data"]);
_st(keys)._do_((function(key){
var value;
return smalltalk.withContext(function($ctx2) {
value=_st(self["@data"])._at_(key);
value;
$3=_st(value)._class();
$ctx2.sendIdx["class"]=1;
$2=_st($3).__tild_eq($Array());
$ctx2.sendIdx["~="]=1;
$1=_st($2)._and_((function(){
return smalltalk.withContext(function($ctx3) {
$4=_st(value)._class();
$ctx3.sendIdx["class"]=2;
return _st($4).__tild_eq($JSObjectProxy());
$ctx3.sendIdx["~="]=2;
}, function($ctx3) {$ctx3.fillBlock({},$ctx2,2)})}));
$ctx2.sendIdx["and:"]=1;
if(smalltalk.assert($1)){
value=self._perform_(_st(key)._asSymbol());
value;
};
$7=_st(value)._class();
$ctx2.sendIdx["class"]=3;
$6=_st($7).__tild_eq($JSObjectProxy());
$5=_st($6)._and_((function(){
return smalltalk.withContext(function($ctx3) {
return _st(value)._isKindOf_($Mapless());
$ctx3.sendIdx["isKindOf:"]=1;
}, function($ctx3) {$ctx3.fillBlock({},$ctx2,4)})}));
$ctx2.sendIdx["and:"]=2;
if(smalltalk.assert($5)){
_st(value)._onAboutToJSON();
$ctx2.sendIdx["onAboutToJSON"]=1;
value=_st(value)._data();
$ctx2.sendIdx["data"]=1;
value;
};
$8=_st(_st(_st(value)._class()).__eq($Array()))._and_((function(){
return smalltalk.withContext(function($ctx3) {
return _st(_st(value)._notEmpty())._and_((function(){
return smalltalk.withContext(function($ctx4) {
return _st(value)._anySatisfy_((function(e){
return smalltalk.withContext(function($ctx5) {
return _st(e)._isKindOf_($Mapless());
}, function($ctx5) {$ctx5.fillBlock({e:e},$ctx4,8)})}));
}, function($ctx4) {$ctx4.fillBlock({},$ctx3,7)})}));
}, function($ctx3) {$ctx3.fillBlock({},$ctx2,6)})}));
$ctx2.sendIdx["and:"]=3;
if(smalltalk.assert($8)){
value=_st(value)._collect_((function(e){
return smalltalk.withContext(function($ctx3) {
return _st(_st(e)._onAboutToJSON())._data();
}, function($ctx3) {$ctx3.fillBlock({e:e},$ctx2,10)})}));
value;
};
return _st(self["@data"])._at_put_(key,value);
}, function($ctx2) {$ctx2.fillBlock({key:key,value:value},$ctx1,1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"onAboutToJSON",{obj:obj,keys:keys},globals.Mapless)})},
args: [],
source: "onAboutToJSON\x0a\x09\x22This mapless is about to be stringified as JSON.\x0a\x09All inst var with mapless objects will be stringify-friendly after this.\x0a\x09Note: Mapless currently support composition of Mapless and composition with many Mapless\x22\x0a\x09\x0a\x09| obj keys |\x0a\x0a\x09obj := self newJSObject.\x0a\x09obj := JSObjectProxy on: obj.\x0a\x09keys := obj keys: data. \x0a\x0a\x09keys do:[ :key | | value |\x0a\x09\x0a\x09\x09\x22In case the value is the usual stringifiable object\x22\x0a\x09\x09value := data at: key.\x0a\x09\x09(value class ~= Array and:[\x0a\x09\x09value class ~= JSObjectProxy ] ) ifTrue:[\x0a\x09\x09\x09value := self perform: key asSymbol ].\x0a\x0a\x09\x09\x22In case the value is a (sub)Mapless\x22\x0a\x09\x09( value class ~= JSObjectProxy and:[\x0a\x09\x09value isKindOf: Mapless ] ) ifTrue:[\x0a\x09\x09\x09value onAboutToJSON.\x0a\x09\x09\x09value := value data ].\x0a\x0a\x09\x09\x22In case the value is a collection of (sub)Mapless\x22\x0a\x09\x09( value class = Array and:[\x0a\x09\x09value notEmpty and:[\x0a\x09\x09value anySatisfy:[ :e | e isKindOf: Mapless ] ] ] ) ifTrue:[\x0a\x09\x09\x09value := (value collect:[ :e | e onAboutToJSON data ] ) ].\x0a\x09\x09\x0a\x09\x09data at: key put: value ]",
messageSends: ["newJSObject", "on:", "keys:", "do:", "at:", "ifTrue:", "and:", "~=", "class", "perform:", "asSymbol", "isKindOf:", "onAboutToJSON", "data", "=", "notEmpty", "anySatisfy:", "collect:", "at:put:"],
referencedClasses: ["JSObjectProxy", "Array", "Mapless"]
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "onAboutToSave",
protocol: 'reactions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._trigger_with_("aboutToSave:",self);
return self}, function($ctx1) {$ctx1.fill(self,"onAboutToSave",{},globals.Mapless)})},
args: [],
source: "onAboutToSave\x0a\x0a\x09self trigger: 'aboutToSave:' with: self",
messageSends: ["trigger:with:"],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "onAboutToUpdate",
protocol: 'reactions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._trigger_with_("aboutToUpdate:",self);
return self}, function($ctx1) {$ctx1.fill(self,"onAboutToUpdate",{},globals.Mapless)})},
args: [],
source: "onAboutToUpdate\x0a\x0a\x09self trigger: 'aboutToUpdate:' with: self\x0a\x09",
messageSends: ["trigger:with:"],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "onAfterCreate:",
protocol: 'reactions',
fn: function (aResponse){
var self=this;
function $MaplessError(){return globals.MaplessError||(typeof MaplessError=="undefined"?nil:MaplessError)}
return smalltalk.withContext(function($ctx1) { 
var $1,$4,$3,$2;
$1=_st(_st(aResponse)._status()).__tild_eq((201));
if(smalltalk.assert($1)){
self._localDelete();
$4=_st("Could not create ".__comma(self._asString())).__comma(":  ");
$ctx1.sendIdx[","]=2;
$3=_st($4).__comma(_st(aResponse)._responseText());
$ctx1.sendIdx[","]=1;
$2=_st($MaplessError())._signal_($3);
return $2;
};
self._localSave();
self._trigger_("afterCreated");
return self}, function($ctx1) {$ctx1.fill(self,"onAfterCreate:",{aResponse:aResponse},globals.Mapless)})},
args: ["aResponse"],
source: "onAfterCreate: aResponse \x0a\x09\x22This mapless got created.\x0a\x09To keep things consistent, if the server was okay, then we locally save too but if\x0a\x09the API said it wasn't saved, then we make sure this mapless is not in local either\x0a\x09and raise the exception.\x22\x0a\x09\x09\x0a\x09aResponse status ~= 201 ifTrue:[\x0a\x09\x09self localDelete.\x0a\x09\x09^ MaplessError signal: 'Could not create ', self asString,':  ', aResponse responseText ].\x0a\x09\x0a\x09self localSave.\x0a\x09\x0a\x09self trigger: 'afterCreated'\x09",
messageSends: ["ifTrue:", "~=", "status", "localDelete", "signal:", ",", "asString", "responseText", "localSave", "trigger:"],
referencedClasses: ["MaplessError"]
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "onAfterDelete:",
protocol: 'reactions',
fn: function (aResponse){
var self=this;
function $MaplessError(){return globals.MaplessError||(typeof MaplessError=="undefined"?nil:MaplessError)}
return smalltalk.withContext(function($ctx1) { 
var $1,$4,$3,$2;
$1=_st(_st(aResponse)._status()).__tild_eq((200));
if(smalltalk.assert($1)){
$4=_st("Could not delete ".__comma(self._asString())).__comma(":  ");
$ctx1.sendIdx[","]=2;
$3=_st($4).__comma(_st(aResponse)._responseText());
$ctx1.sendIdx[","]=1;
$2=_st($MaplessError())._signal_($3);
return $2;
};
self._localDelete();
self._trigger_("afterDeleted");
return self}, function($ctx1) {$ctx1.fill(self,"onAfterDelete:",{aResponse:aResponse},globals.Mapless)})},
args: ["aResponse"],
source: "onAfterDelete: aResponse \x0a\x09\x22This mapless got deleted.\x0a\x09To keep things consistent, if the server was okay, then we locally remove it too but if\x0a\x09the API said it wasn't saved, then we make sure this mapless is not removed from local\x0a\x09and raise the exception.\x22\x0a\x0a\x09aResponse status ~= 200 ifTrue:[\x0a\x09\x09^ MaplessError signal: 'Could not delete ', self asString,':  ', aResponse responseText ].\x0a\x09\x0a\x09self localDelete.\x0a\x09\x0a\x09self trigger: 'afterDeleted'.\x0a\x09",
messageSends: ["ifTrue:", "~=", "status", "signal:", ",", "asString", "responseText", "localDelete", "trigger:"],
referencedClasses: ["MaplessError"]
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "onAfterFresh:",
protocol: 'reactions',
fn: function (aResponse){
var self=this;
function $MaplessError(){return globals.MaplessError||(typeof MaplessError=="undefined"?nil:MaplessError)}
return smalltalk.withContext(function($ctx1) { 
var $1,$4,$5,$3,$2;
$1=_st(_st(aResponse)._status()).__tild_eq((200));
if(smalltalk.assert($1)){
self._localFresh();
$4=_st("Could not read ".__comma(self._asString())).__comma(":  ");
$ctx1.sendIdx[","]=2;
$5=_st(aResponse)._responseText();
$ctx1.sendIdx["responseText"]=1;
$3=_st($4).__comma($5);
$ctx1.sendIdx[","]=1;
$2=_st($MaplessError())._signal_($3);
return $2;
};
self._syncFromJSON_(_st(aResponse)._responseText());
self._trigger_("afterFresh");
return self}, function($ctx1) {$ctx1.fill(self,"onAfterFresh:",{aResponse:aResponse},globals.Mapless)})},
args: ["aResponse"],
source: "onAfterFresh: aResponse \x0a\x09\x22This mapless got re-freshed.\x0a\x09To keep things consistent, if the server was okay, then we sync this mapless state with the response, but\x0a\x09if the API said it coudn't read (any different than 200), then we restore this mapless state from local\x0a\x09and raise the exception\x22\x0a\x0a\x09aResponse status ~= 200 ifTrue:[\x0a\x09\x09self localFresh.\x0a\x09\x09^ MaplessError signal: 'Could not read ', self asString,':  ', aResponse responseText ].\x0a\x0a\x09self syncFromJSON: aResponse responseText.\x0a\x0a\x09self trigger: 'afterFresh'.\x0a\x09",
messageSends: ["ifTrue:", "~=", "status", "localFresh", "signal:", ",", "asString", "responseText", "syncFromJSON:", "trigger:"],
referencedClasses: ["MaplessError"]
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "onAfterSave:",
protocol: 'reactions',
fn: function (aResponse){
var self=this;
function $MaplessError(){return globals.MaplessError||(typeof MaplessError=="undefined"?nil:MaplessError)}
return smalltalk.withContext(function($ctx1) { 
var $1,$4,$3,$2;
$1=_st(_st(aResponse)._status()).__tild_eq((200));
if(smalltalk.assert($1)){
self._localFresh();
$4=_st("Could not save ".__comma(self._asString())).__comma(":  ");
$ctx1.sendIdx[","]=2;
$3=_st($4).__comma(_st(aResponse)._responseText());
$ctx1.sendIdx[","]=1;
$2=_st($MaplessError())._signal_($3);
return $2;
};
self._localSave();
self._trigger_("afterSaved");
return self}, function($ctx1) {$ctx1.fill(self,"onAfterSave:",{aResponse:aResponse},globals.Mapless)})},
args: ["aResponse"],
source: "onAfterSave: aResponse\x0a\x09\x22This mapless got saved.\x0a\x09To keep things consistent, if the server was okay, then we locally save too but if\x0a\x09the API said it wasn't saved, then we restore this mapless state from local\x0a\x09and raise the exception.\x22\x0a\x09\x0a\x09aResponse status ~= 200 ifTrue:[\x0a\x09\x09self localFresh.\x0a\x09\x09^ MaplessError signal: 'Could not save ', self asString,':  ', aResponse responseText ].\x0a\x09\x09\x0a\x09self localSave.\x0a\x0a\x09self trigger: 'afterSaved'.",
messageSends: ["ifTrue:", "~=", "status", "localFresh", "signal:", ",", "asString", "responseText", "localSave", "trigger:"],
referencedClasses: ["MaplessError"]
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "onAfterUpdate:",
protocol: 'reactions',
fn: function (aResponse){
var self=this;
function $MaplessError(){return globals.MaplessError||(typeof MaplessError=="undefined"?nil:MaplessError)}
return smalltalk.withContext(function($ctx1) { 
var $1,$4,$3,$2;
$1=_st(_st(aResponse)._status()).__tild_eq((200));
if(smalltalk.assert($1)){
self._localFresh();
$4=_st("Could not update ".__comma(self._asString())).__comma(":  ");
$ctx1.sendIdx[","]=2;
$3=_st($4).__comma(_st(aResponse)._responseText());
$ctx1.sendIdx[","]=1;
$2=_st($MaplessError())._signal_($3);
return $2;
};
self._localSave();
self._trigger_("afterUpdated");
return self}, function($ctx1) {$ctx1.fill(self,"onAfterUpdate:",{aResponse:aResponse},globals.Mapless)})},
args: ["aResponse"],
source: "onAfterUpdate: aResponse \x0a\x09\x22This mapless got updated.\x0a\x09To keep things consistent, if the server was okay, then we locally save too but if\x0a\x09the API said it wasn't saved (any different than 200), then we restore this mapless state from local\x0a\x09and raise the exception\x22\x0a\x09\x0a\x09aResponse status ~= 200 ifTrue:[\x0a\x09\x09self localFresh.\x0a\x09\x09^ MaplessError signal: 'Could not update ', self asString,':  ', aResponse responseText ].\x0a\x0a\x09self localSave.\x0a\x0a\x09self trigger: 'afterUpdated'.",
messageSends: ["ifTrue:", "~=", "status", "localFresh", "signal:", ",", "asString", "responseText", "localSave", "trigger:"],
referencedClasses: ["MaplessError"]
}),
globals.Mapless);

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
}, function($ctx1) {$ctx1.fill(self,"path",{},globals.Mapless)})},
args: [],
source: "path \x0a\x0a\x09^ self class path",
messageSends: ["path", "class"],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "save",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self._saveDo_((function(res){
return smalltalk.withContext(function($ctx2) {
return self._onAfterSave_(res);
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})}));
return $1;
}, function($ctx1) {$ctx1.fill(self,"save",{},globals.Mapless)})},
args: [],
source: "save\x0a\x09\x22Saves this mapless (upserts it)\x22\x0a\x09^ self saveDo:[ :res | self onAfterSave: res ]",
messageSends: ["saveDo:", "onAfterSave:"],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "saveDo:",
protocol: 'actions',
fn: function (aBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._onAboutToSave();
_st(jQuery)._ajax_(globals.HashedCollection._newFromPairs_(["url",self._path(),"type","PUT","cache",false,"contentType","application/json; charset=utf-8","dataType","json","data",self._asJSONString(),"complete",(function(res){
return smalltalk.withContext(function($ctx2) {
return _st(aBlock)._value_(res);
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})})]));
return self}, function($ctx1) {$ctx1.fill(self,"saveDo:",{aBlock:aBlock},globals.Mapless)})},
args: ["aBlock"],
source: "saveDo: aBlock\x0a\x09\x22Saves this mapless using the remote API\x22\x0a\x0a\x09self onAboutToSave.\x0a\x09\x0a\x09jQuery ajax: #{ \x0a\x09\x09'url' -> self path.\x0a\x09\x09'type' -> 'PUT'.\x0a\x09\x09'cache' -> false.\x0a\x09\x09'contentType'-> 'application/json; charset=utf-8'.\x0a\x09\x09'dataType'-> 'json'.\x0a\x09\x09'data' -> self asJSONString.\x0a\x09\x09'complete' -> [ :res | aBlock value: res ]\x0a\x09}",
messageSends: ["onAboutToSave", "ajax:", "path", "asJSONString", "value:"],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "subModelAt:",
protocol: 'accessing',
fn: function (aSelector){
var self=this;
var subMaplessData,modelClass;
function $SmalltalkImage(){return globals.SmalltalkImage||(typeof SmalltalkImage=="undefined"?nil:SmalltalkImage)}
function $MaplessError(){return globals.MaplessError||(typeof MaplessError=="undefined"?nil:MaplessError)}
return smalltalk.withContext(function($ctx1) { 
var $1,$2,$3,$5,$4,$6,$receiver;
subMaplessData=_st(self["@data"])._at_(aSelector);
$ctx1.sendIdx["at:"]=1;
$1=subMaplessData;
if(($receiver = $1) == null || $receiver.isNil){
return nil;
} else {
$1;
};
modelClass=_st(subMaplessData)._at_("modelClass");
$2=modelClass;
if(($receiver = $2) == null || $receiver.isNil){
return nil;
} else {
$2;
};
modelClass=_st(_st(_st($SmalltalkImage())._current())._globals())._at_ifAbsent_(modelClass,(function(){
return nil;
}));
$3=modelClass;
if(($receiver = $3) == null || $receiver.isNil){
$5=_st("Cannot find ".__comma(_st(aSelector)._asString())).__comma("'s class for this metadata");
$ctx1.sendIdx[","]=1;
$4=_st($MaplessError())._signal_($5);
return $4;
} else {
$3;
};
$6=_st(modelClass)._fromReified_(subMaplessData);
return $6;
}, function($ctx1) {$ctx1.fill(self,"subModelAt:",{aSelector:aSelector,subMaplessData:subMaplessData,modelClass:modelClass},globals.Mapless)})},
args: ["aSelector"],
source: "subModelAt: aSelector\x0a\x09\x22Answers the reified submmapless (instantiating when necessary).\x22\x0a\x09\x0a\x09| subMaplessData modelClass |\x0a\x0a\x09subMaplessData := data at: aSelector.\x0a\x09subMaplessData ifNil:[^nil].\x0a\x09\x0a\x09modelClass := subMaplessData at: 'modelClass'.\x0a\x09modelClass ifNil:[^nil].\x0a\x09\x0a\x09modelClass := SmalltalkImage current globals at: modelClass ifAbsent:[ nil ].\x0a\x0a\x09modelClass ifNil:[ ^ MaplessError signal: 'Cannot find ',aSelector asString,'''s class for this metadata'].\x0a\x09\x0a\x09^ modelClass fromReified: subMaplessData",
messageSends: ["at:", "ifNil:", "at:ifAbsent:", "globals", "current", "signal:", ",", "asString", "fromReified:"],
referencedClasses: ["SmalltalkImage", "MaplessError"]
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "syncFromJSON:",
protocol: 'actions',
fn: function (someJSONString){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self._syncWith_(_st(self._class())._reify_(someJSONString));
return $1;
}, function($ctx1) {$ctx1.fill(self,"syncFromJSON:",{someJSONString:someJSONString},globals.Mapless)})},
args: ["someJSONString"],
source: "syncFromJSON: someJSONString\x0a\x09\x22Sync the current values in this model \x0a\x09with the ones coming in someJSONString.\x22\x0a\x0a\x09^ self syncWith: (self class reify: someJSONString)",
messageSends: ["syncWith:", "reify:", "class"],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "syncWith:",
protocol: 'actions',
fn: function (aReifiedJSON){
var self=this;
function $MaplessError(){return globals.MaplessError||(typeof MaplessError=="undefined"?nil:MaplessError)}
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
_st($MaplessError())._signal_("This JSON does not fit in this ".__comma(self._asString()));
};
self["@data"]=aReifiedJSON;
return self}, function($ctx1) {$ctx1.fill(self,"syncWith:",{aReifiedJSON:aReifiedJSON},globals.Mapless)})},
args: ["aReifiedJSON"],
source: "syncWith: aReifiedJSON\x0a\x09\x22Sync the current values in this model \x0a\x09with the ones coming in aReifiedJSON.\x22\x0a\x0a\x09aReifiedJSON ifNil:[ ^ nil ].\x0a\x0a\x09((aReifiedJSON at: 'modelClass') isNil or:[\x0a\x09(aReifiedJSON at: 'modelClass') ~= self class name ]) ifTrue:[\x0a\x09\x09MaplessError signal: 'This JSON does not fit in this ', self asString ].\x0a\x0a\x09data := aReifiedJSON",
messageSends: ["ifNil:", "ifTrue:", "or:", "isNil", "at:", "~=", "name", "class", "signal:", ",", "asString"],
referencedClasses: ["MaplessError"]
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "update",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._updateDo_((function(res){
return smalltalk.withContext(function($ctx2) {
return self._onAfterUpdate_(res);
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"update",{},globals.Mapless)})},
args: [],
source: "update\x0a\x09\x22Updates this mapless using the remote API\x22\x0a\x09self updateDo:[ :res | self onAfterUpdate: res ]",
messageSends: ["updateDo:", "onAfterUpdate:"],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "updateDo:",
protocol: 'actions',
fn: function (aBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._onAboutToUpdate();
self._localSave();
_st(jQuery)._ajax_(globals.HashedCollection._newFromPairs_(["url",self._uri(),"type","PUT","cache",false,"contentType","application/json; charset=utf-8","dataType","json","data",self._asJSONString(),"complete",(function(res){
return smalltalk.withContext(function($ctx2) {
return _st(aBlock)._value_(res);
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})})]));
return self}, function($ctx1) {$ctx1.fill(self,"updateDo:",{aBlock:aBlock},globals.Mapless)})},
args: ["aBlock"],
source: "updateDo: aBlock\x0a\x09\x22Updates this mapless using the remote API\x22\x0a\x0a\x09self onAboutToUpdate.\x0a\x09\x0a\x09self localSave.\x0a\x0a\x09jQuery ajax: #{ \x0a\x09\x09'url' -> self uri.\x0a\x09\x09'type' -> 'PUT'.\x0a\x09\x09'cache' -> false.\x0a\x09\x09'contentType'-> 'application/json; charset=utf-8'.\x0a\x09\x09'dataType'-> 'json'.\x0a\x09\x09'data' -> self asJSONString.\x0a\x09\x09'complete' -> [ :res | aBlock value: res ]\x0a\x09}",
messageSends: ["onAboutToUpdate", "localSave", "ajax:", "uri", "asJSONString", "value:"],
referencedClasses: []
}),
globals.Mapless);

smalltalk.addMethod(
smalltalk.method({
selector: "uri",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(_st(self._path()).__comma("/")).__comma(self._id());
$ctx1.sendIdx[","]=1;
return $1;
}, function($ctx1) {$ctx1.fill(self,"uri",{},globals.Mapless)})},
args: [],
source: "uri \x0a\x09\x22Answers the URI corresponding to this particular mapless\x22\x0a\x09^ self path,'/',self id",
messageSends: [",", "path", "id"],
referencedClasses: []
}),
globals.Mapless);

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
}, function($ctx1) {$ctx1.fill(self,"url",{},globals.Mapless)})},
args: [],
source: "url\x0a\x0a\x09^ self path,'/',self id asString",
messageSends: [",", "path", "asString", "id"],
referencedClasses: []
}),
globals.Mapless);


smalltalk.addMethod(
smalltalk.method({
selector: "basePath",
protocol: 'accessing',
fn: function (){
var self=this;
return "api/1.0";
},
args: [],
source: "basePath\x0a\x09\x22Answers the base URI for remote mapless\x22\x0a\x09\x0a\x09^ 'api/1.0'",
messageSends: [],
referencedClasses: []
}),
globals.Mapless.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "find:",
protocol: 'actions',
fn: function (aQueryString){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._find_do_(aQueryString,(function(res){
return smalltalk.withContext(function($ctx2) {
return self._onAfterReadSome_(res);
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"find:",{aQueryString:aQueryString},globals.Mapless.klass)})},
args: ["aQueryString"],
source: "find: aQueryString\x0a\x0a\x09self find: aQueryString do: [ :res | self onAfterReadSome: res ]",
messageSends: ["find:do:", "onAfterReadSome:"],
referencedClasses: []
}),
globals.Mapless.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "find:do:",
protocol: 'actions',
fn: function (aQueryJSONString,aBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(jQuery)._ajax_(globals.HashedCollection._newFromPairs_(["url",_st(self._path()).__comma("/query"),"type","POST","cache",false,"contentType","application/json; charset=utf-8","dataType","json","data",aQueryJSONString,"complete",(function(res){
return smalltalk.withContext(function($ctx2) {
return _st(aBlock)._value_(res);
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})})]));
return self}, function($ctx1) {$ctx1.fill(self,"find:do:",{aQueryJSONString:aQueryJSONString,aBlock:aBlock},globals.Mapless.klass)})},
args: ["aQueryJSONString", "aBlock"],
source: "find: aQueryJSONString do: aBlock\x0a\x09\x22Finds some mapless using the remote API to resolve aQueryJSONString\x22\x0a\x0a\x09jQuery ajax: #{\x0a\x09\x09'url' -> (self path,'/query').\x0a\x09\x09'type' -> 'POST'.\x0a\x09\x09'cache' -> false.\x0a\x09\x09'contentType'-> 'application/json; charset=utf-8'.\x0a\x09\x09'dataType'-> 'json'.\x0a\x09\x09'data' -> aQueryJSONString.\x0a\x09\x09'complete' -> [:res| aBlock value: res ]\x0a\x09}\x0a\x09",
messageSends: ["ajax:", ",", "path", "value:"],
referencedClasses: []
}),
globals.Mapless.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "findAll",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._findAllDo_((function(res){
return smalltalk.withContext(function($ctx2) {
return self._onAfterReadAll_(res);
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"findAll",{},globals.Mapless.klass)})},
args: [],
source: "findAll\x0a\x0a\x09self findAllDo: [ :res | self onAfterReadAll: res ]",
messageSends: ["findAllDo:", "onAfterReadAll:"],
referencedClasses: []
}),
globals.Mapless.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "findAllDo:",
protocol: 'actions',
fn: function (aBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(jQuery)._ajax_(globals.HashedCollection._newFromPairs_(["url",self._path(),"type","GET","cache",false,"complete",(function(res){
return smalltalk.withContext(function($ctx2) {
return _st(aBlock)._value_(res);
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})})]));
return self}, function($ctx1) {$ctx1.fill(self,"findAllDo:",{aBlock:aBlock},globals.Mapless.klass)})},
args: ["aBlock"],
source: "findAllDo: aBlock\x0a\x0a\x09jQuery ajax: #{ \x0a\x09\x09'url' -> self path.\x0a\x09\x09'type'-> 'GET'.\x0a\x09\x09'cache'-> false.\x0a\x09\x09'complete'-> [ :res | aBlock value: res ]\x0a\x09}",
messageSends: ["ajax:", "path", "value:"],
referencedClasses: []
}),
globals.Mapless.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "findId:",
protocol: 'actions',
fn: function (anId){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._findId_do_(anId,(function(res){
return smalltalk.withContext(function($ctx2) {
return self._onAfterRead_(res);
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"findId:",{anId:anId},globals.Mapless.klass)})},
args: ["anId"],
source: "findId: anId\x0a\x0a\x09self findId: anId do: [ :res | self onAfterRead: res ]",
messageSends: ["findId:do:", "onAfterRead:"],
referencedClasses: []
}),
globals.Mapless.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "findId:do:",
protocol: 'actions',
fn: function (anId,aBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1,$3,$2;
$1=jQuery;
$3=_st(_st(self._path()).__comma("/")).__comma(anId);
$ctx1.sendIdx[","]=1;
$2=globals.HashedCollection._newFromPairs_(["url",$3,"type","GET","cache",false,"complete",(function(res){
return smalltalk.withContext(function($ctx2) {
return _st(aBlock)._value_(res);
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})})]);
_st($1)._ajax_($2);
return self}, function($ctx1) {$ctx1.fill(self,"findId:do:",{anId:anId,aBlock:aBlock},globals.Mapless.klass)})},
args: ["anId", "aBlock"],
source: "findId: anId do: aBlock\x0a\x0a\x09jQuery ajax: #{ \x0a\x09\x09'url' -> (self path, '/',anId).\x0a\x09\x09'type'-> 'GET'.\x0a\x09\x09'cache'-> false.\x0a\x09\x09'complete'-> [ :res | aBlock value: res ]\x0a\x09}",
messageSends: ["ajax:", ",", "path", "value:"],
referencedClasses: []
}),
globals.Mapless.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "fromJSON:",
protocol: 'actions',
fn: function (someJSON){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self._new())._syncFromJSON_(someJSON);
return $1;
}, function($ctx1) {$ctx1.fill(self,"fromJSON:",{someJSON:someJSON},globals.Mapless.klass)})},
args: ["someJSON"],
source: "fromJSON: someJSON\x0a\x09\x22Answers a new instance of this mapless\x0a\x09based on someJSON.\x22\x0a\x0a\x09^ self new syncFromJSON: someJSON",
messageSends: ["syncFromJSON:", "new"],
referencedClasses: []
}),
globals.Mapless.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "fromJSONString:",
protocol: 'actions',
fn: function (someJSONStringOrNil){
var self=this;
var json,modelClass;
function $Array(){return globals.Array||(typeof Array=="undefined"?nil:Array)}
function $Smalltalk(){return globals.Smalltalk||(typeof Smalltalk=="undefined"?nil:Smalltalk)}
return smalltalk.withContext(function($ctx1) { 
var $1,$2,$3,$5,$6,$4,$receiver;
var $early={};
try {
if(($receiver = someJSONStringOrNil) == null || $receiver.isNil){
return nil;
} else {
someJSONStringOrNil;
};
json=self._reify_(someJSONStringOrNil);
$1=json;
if(($receiver = $1) == null || $receiver.isNil){
return nil;
} else {
$1;
};
$2=_st(_st(json)._class()).__eq($Array());
if(smalltalk.assert($2)){
$3=self._fromManyJSON_(json);
return $3;
};
modelClass=_st(json)._at_ifAbsent_("modelClass",(function(){
throw $early=[nil];
}));
$ctx1.sendIdx["at:ifAbsent:"]=1;
modelClass=_st(_st($Smalltalk())._globals())._at_ifAbsent_(modelClass,(function(){
}));
$5=_st(modelClass)._notNil();
if(smalltalk.assert($5)){
$4=_st(_st(modelClass)._new())._syncWith_(json);
} else {
$6=_st("The class \x22".__comma(modelClass)).__comma("\x22 was not found");
$ctx1.sendIdx[","]=1;
$4=self._error_($6);
};
return $4;
}
catch(e) {if(e===$early)return e[0]; throw e}
}, function($ctx1) {$ctx1.fill(self,"fromJSONString:",{someJSONStringOrNil:someJSONStringOrNil,json:json,modelClass:modelClass},globals.Mapless.klass)})},
args: ["someJSONStringOrNil"],
source: "fromJSONString: someJSONStringOrNil\x0a\x09\x22Answers a new instance of this mapless and returns it\x0a\x09in the state dictated by someJSONStringOrNil.\x0a\x09Returns nil when thigns do not fit.\x22\x0a\x0a\x09| json modelClass |\x0a\x09someJSONStringOrNil ifNil:[ ^nil ].\x0a\x09\x0a\x09json := self reify: someJSONStringOrNil.\x0a\x09json ifNil:[ ^nil ].\x0a\x09\x0a\x09json class = Array ifTrue:[ ^ self fromManyJSON: json].\x0a\x09\x0a\x09modelClass := json at: 'modelClass' ifAbsent:[ ^nil ].\x0a\x09\x0a\x09modelClass := Smalltalk globals at: modelClass ifAbsent:[  ].\x0a\x09\x0a\x09^ modelClass notNil\x0a\x09\x09ifTrue:[ modelClass new syncWith: json ]\x0a\x09\x09ifFalse:[ self error: 'The class \x22', modelClass,'\x22 was not found' ]\x0a\x09",
messageSends: ["ifNil:", "reify:", "ifTrue:", "=", "class", "fromManyJSON:", "at:ifAbsent:", "globals", "ifTrue:ifFalse:", "notNil", "syncWith:", "new", "error:", ","],
referencedClasses: ["Array", "Smalltalk"]
}),
globals.Mapless.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "fromManyJSON:",
protocol: 'actions',
fn: function (anArrayOfJSONObjects){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(anArrayOfJSONObjects)._collect_((function(someJSON){
return smalltalk.withContext(function($ctx2) {
return self._fromReified_(someJSON);
}, function($ctx2) {$ctx2.fillBlock({someJSON:someJSON},$ctx1,1)})}));
return $1;
}, function($ctx1) {$ctx1.fill(self,"fromManyJSON:",{anArrayOfJSONObjects:anArrayOfJSONObjects},globals.Mapless.klass)})},
args: ["anArrayOfJSONObjects"],
source: "fromManyJSON: anArrayOfJSONObjects\x0a\x09\x22Answers a new instance of this mapless\x0a\x09based on anArrayOfJSONObjects.\x22\x0a\x0a\x09^ anArrayOfJSONObjects collect:[ :someJSON |\x0a\x09\x09self fromReified: someJSON ]",
messageSends: ["collect:", "fromReified:"],
referencedClasses: []
}),
globals.Mapless.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "fromReified:",
protocol: 'actions',
fn: function (aReifiedJSON){
var self=this;
var modelClass;
function $Smalltalk(){return globals.Smalltalk||(typeof Smalltalk=="undefined"?nil:Smalltalk)}
return smalltalk.withContext(function($ctx1) { 
var $1;
var $early={};
try {
modelClass=_st(aReifiedJSON)._at_ifAbsent_("modelClass",(function(){
throw $early=[nil];
}));
$ctx1.sendIdx["at:ifAbsent:"]=1;
modelClass=_st(_st($Smalltalk())._globals())._at_ifAbsent_(modelClass,(function(){
return nil;
}));
$1=_st(_st(modelClass)._new())._syncWith_(aReifiedJSON);
return $1;
}
catch(e) {if(e===$early)return e[0]; throw e}
}, function($ctx1) {$ctx1.fill(self,"fromReified:",{aReifiedJSON:aReifiedJSON,modelClass:modelClass},globals.Mapless.klass)})},
args: ["aReifiedJSON"],
source: " fromReified: aReifiedJSON\x0a\x09\x22Answers a new instance of this mapless and returns it\x0a\x09in sync with aReifiedJSON.\x22\x0a\x0a\x09| modelClass |\x0a\x0a\x09modelClass := aReifiedJSON at: 'modelClass' ifAbsent:[ ^nil ].\x0a\x09\x0a\x09modelClass := Smalltalk globals at: modelClass ifAbsent:[ nil ].\x0a\x09\x0a\x09^ modelClass new syncWith: aReifiedJSON",
messageSends: ["at:ifAbsent:", "globals", "syncWith:", "new"],
referencedClasses: ["Smalltalk"]
}),
globals.Mapless.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "localDelete:",
protocol: 'actions',
fn: function (aMapless){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(_st(window)._localStorage())._removeItem_(_st(aMapless)._id());
return self}, function($ctx1) {$ctx1.fill(self,"localDelete:",{aMapless:aMapless},globals.Mapless.klass)})},
args: ["aMapless"],
source: "localDelete: aMapless\x0a\x0a\x09window localStorage removeItem: aMapless id",
messageSends: ["removeItem:", "localStorage", "id"],
referencedClasses: []
}),
globals.Mapless.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "localFindId:",
protocol: 'actions',
fn: function (anId){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self._fromJSONString_(_st(_st(window)._localStorage())._getItem_(anId));
return $1;
}, function($ctx1) {$ctx1.fill(self,"localFindId:",{anId:anId},globals.Mapless.klass)})},
args: ["anId"],
source: "localFindId: anId\x0a\x0a\x09^ self fromJSONString: (window localStorage getItem: anId)",
messageSends: ["fromJSONString:", "getItem:", "localStorage"],
referencedClasses: []
}),
globals.Mapless.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "localSave:",
protocol: 'actions',
fn: function (aMapless){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(_st(window)._localStorage())._setItem_value_(_st(aMapless)._id(),_st(aMapless)._asJSONString());
return self}, function($ctx1) {$ctx1.fill(self,"localSave:",{aMapless:aMapless},globals.Mapless.klass)})},
args: ["aMapless"],
source: "localSave: aMapless\x0a\x0a\x09window localStorage\x0a\x09\x09setItem: aMapless id\x0a\x09\x09value: aMapless asJSONString",
messageSends: ["setItem:value:", "localStorage", "id", "asJSONString"],
referencedClasses: []
}),
globals.Mapless.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "manyFromJSON:",
protocol: 'actions',
fn: function (someJSONString){
var self=this;
function $JSON(){return globals.JSON||(typeof JSON=="undefined"?nil:JSON)}
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(_st($JSON())._parse_(someJSONString))._collect_((function(each){
return smalltalk.withContext(function($ctx2) {
return self._fromReified_(each);
}, function($ctx2) {$ctx2.fillBlock({each:each},$ctx1,1)})}));
return $1;
}, function($ctx1) {$ctx1.fill(self,"manyFromJSON:",{someJSONString:someJSONString},globals.Mapless.klass)})},
args: ["someJSONString"],
source: "manyFromJSON: someJSONString\x0a\x0a\x09^ (JSON parse: someJSONString) collect:[ :each |\x0a\x09\x09 self fromReified: each ]",
messageSends: ["collect:", "parse:", "fromReified:"],
referencedClasses: ["JSON"]
}),
globals.Mapless.klass);

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
}, function($ctx1) {$ctx1.fill(self,"newUUID",{},globals.Mapless.klass)})},
args: [],
source: "newUUID\x0a\x09^ self uuidGenerator value",
messageSends: ["value", "uuidGenerator"],
referencedClasses: []
}),
globals.Mapless.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "onAfterRead:",
protocol: 'reactions',
fn: function (aResponse){
var self=this;
function $MaplessError(){return globals.MaplessError||(typeof MaplessError=="undefined"?nil:MaplessError)}
return smalltalk.withContext(function($ctx1) { 
var $1,$3,$4,$2,$5;
self._trigger_("afterRead");
$1=_st(_st(aResponse)._status()).__tild_eq((200));
if(smalltalk.assert($1)){
$3=_st("Could not read ".__comma(self._name())).__comma(":  ");
$ctx1.sendIdx[","]=2;
$4=_st(aResponse)._responseText();
$ctx1.sendIdx["responseText"]=1;
$2=_st($3).__comma($4);
$ctx1.sendIdx[","]=1;
_st($MaplessError())._signal_($2);
};
$5=self._fromJSON_(_st(aResponse)._responseText());
return $5;
}, function($ctx1) {$ctx1.fill(self,"onAfterRead:",{aResponse:aResponse},globals.Mapless.klass)})},
args: ["aResponse"],
source: "onAfterRead: aResponse\x0a\x0a\x09self trigger: 'afterRead'.\x0a\x0a\x09aResponse status ~= 200 ifTrue:[\x0a\x09\x09MaplessError signal: 'Could not read ', self name,':  ', aResponse responseText].\x0a\x09\x09\x0a\x09^ self fromJSON: aResponse responseText",
messageSends: ["trigger:", "ifTrue:", "~=", "status", "signal:", ",", "name", "responseText", "fromJSON:"],
referencedClasses: ["MaplessError"]
}),
globals.Mapless.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "onAfterReadAll:",
protocol: 'reactions',
fn: function (aResponse){
var self=this;
function $MaplessError(){return globals.MaplessError||(typeof MaplessError=="undefined"?nil:MaplessError)}
return smalltalk.withContext(function($ctx1) { 
var $1,$3,$4,$2,$5;
$1=_st(_st(aResponse)._status()).__tild_eq((200));
if(smalltalk.assert($1)){
$3=_st("Could not read all ".__comma(self._name())).__comma(":  ");
$ctx1.sendIdx[","]=2;
$4=_st(aResponse)._responseText();
$ctx1.sendIdx["responseText"]=1;
$2=_st($3).__comma($4);
$ctx1.sendIdx[","]=1;
_st($MaplessError())._signal_($2);
};
$5=self._manyFromJSON_(_st(aResponse)._responseText());
return $5;
}, function($ctx1) {$ctx1.fill(self,"onAfterReadAll:",{aResponse:aResponse},globals.Mapless.klass)})},
args: ["aResponse"],
source: "onAfterReadAll: aResponse\x0a\x0a\x09aResponse status ~= 200 ifTrue:[\x0a\x09\x09MaplessError signal: 'Could not read all ', self name,':  ', aResponse responseText].\x0a\x09\x09\x0a\x09^ self manyFromJSON: aResponse responseText",
messageSends: ["ifTrue:", "~=", "status", "signal:", ",", "name", "responseText", "manyFromJSON:"],
referencedClasses: ["MaplessError"]
}),
globals.Mapless.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "onAfterReadSome:",
protocol: 'reactions',
fn: function (aResponse){
var self=this;
function $MaplessError(){return globals.MaplessError||(typeof MaplessError=="undefined"?nil:MaplessError)}
return smalltalk.withContext(function($ctx1) { 
var $1,$3,$4,$2,$5;
$1=_st(_st(aResponse)._status()).__tild_eq((200));
if(smalltalk.assert($1)){
$3=_st("Could not read all ".__comma(self._name())).__comma(":  ");
$ctx1.sendIdx[","]=2;
$4=_st(aResponse)._responseText();
$ctx1.sendIdx["responseText"]=1;
$2=_st($3).__comma($4);
$ctx1.sendIdx[","]=1;
_st($MaplessError())._signal_($2);
};
$5=self._manyFromJSON_(_st(aResponse)._responseText());
return $5;
}, function($ctx1) {$ctx1.fill(self,"onAfterReadSome:",{aResponse:aResponse},globals.Mapless.klass)})},
args: ["aResponse"],
source: "onAfterReadSome: aResponse\x0a\x0a\x09aResponse status ~= 200 ifTrue:[\x0a\x09\x09MaplessError signal: 'Could not read all ', self name,':  ', aResponse responseText].\x0a\x09\x09\x0a\x09^ self manyFromJSON: aResponse responseText",
messageSends: ["ifTrue:", "~=", "status", "signal:", ",", "name", "responseText", "manyFromJSON:"],
referencedClasses: ["MaplessError"]
}),
globals.Mapless.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "path",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(_st(self._basePath()).__comma("/")).__comma(self._pluralName());
$ctx1.sendIdx[","]=1;
return $1;
}, function($ctx1) {$ctx1.fill(self,"path",{},globals.Mapless.klass)})},
args: [],
source: "path\x0a\x09\x22Answers the path for this kind of mapless\x22\x0a\x09\x0a\x09^ self basePath, '/',self pluralName",
messageSends: [",", "basePath", "pluralName"],
referencedClasses: []
}),
globals.Mapless.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "pluralName",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self._singularName()).__comma("s");
return $1;
}, function($ctx1) {$ctx1.fill(self,"pluralName",{},globals.Mapless.klass)})},
args: [],
source: "pluralName\x0a\x09\x22Answers the string expected in a nicely designed API.\x0a\x09Any subclass can override its own custom name.\x0a\x09The default plural name is the singular name \x0a\x09in lower case plus an 's' so beware of irregular nouns.\x22\x0a\x09\x0a\x09^ self singularName,'s'",
messageSends: [",", "singularName"],
referencedClasses: []
}),
globals.Mapless.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "reify:",
protocol: 'actions',
fn: function (jsonString){
var self=this;
function $JSON(){return globals.JSON||(typeof JSON=="undefined"?nil:JSON)}
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st($JSON())._parse_(jsonString);
return $1;
}, function($ctx1) {$ctx1.fill(self,"reify:",{jsonString:jsonString},globals.Mapless.klass)})},
args: ["jsonString"],
source: "reify: jsonString\x0a\x09\x22Returns a simple javascript object created using jsonString.\x22\x0a\x0a\x09^ JSON parse: jsonString",
messageSends: ["parse:"],
referencedClasses: ["JSON"]
}),
globals.Mapless.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "singularName",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self._name())._asLowercase();
return $1;
}, function($ctx1) {$ctx1.fill(self,"singularName",{},globals.Mapless.klass)})},
args: [],
source: "singularName\x0a\x09\x22Answers the string expected in a nicely designed API.\x0a\x09Any subclass can override its own custom name.\x0a\x09The default name is the class name in lowercase.\x22\x0a\x09\x0a\x09^ self name asLowercase",
messageSends: ["asLowercase", "name"],
referencedClasses: []
}),
globals.Mapless.klass);

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
return self}, function($ctx1) {$ctx1.fill(self,"uuidGenerator",{},globals.Mapless.klass)})},
args: [],
source: "uuidGenerator\x0a\x09\x22Taken from:\x0a\x09http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript\x22\x0a\x0a<return function guid() {\x0a    function _p8(s) {\x0a        var p = (Math.random().toString(16)+\x22000000000\x22).substr(2,8);\x0a        return s ? \x22-\x22 + p.substr(0,4) + \x22-\x22 + p.substr(4,4) : p ;\x0a    }\x0a    return _p8() + _p8(true) + _p8(true) + _p8();\x0a}>",
messageSends: [],
referencedClasses: []
}),
globals.Mapless.klass);


smalltalk.addClass('MaplessModel', globals.Mapless, [], 'MiniMapless');
smalltalk.addMethod(
smalltalk.method({
selector: "initialize",
protocol: 'initialization',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
($ctx1.supercall = true, globals.MaplessModel.superclass.fn.prototype._initialize.apply(_st(self), []));
$ctx1.supercall = false;
self._initializeInstanceVersion();
self._id_(_st(self._class())._newUUID());
return self}, function($ctx1) {$ctx1.fill(self,"initialize",{},globals.MaplessModel)})},
args: [],
source: "initialize\x0a\x0a\x09super initialize.\x0a\x0a\x09self initializeInstanceVersion.\x0a\x09self id: self class newUUID.",
messageSends: ["initialize", "initializeInstanceVersion", "id:", "newUUID", "class"],
referencedClasses: []
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "onAboutToDelete",
protocol: 'reactions',
fn: function (){
var self=this;
function $Date(){return globals.Date||(typeof Date=="undefined"?nil:Date)}
return smalltalk.withContext(function($ctx1) { 
($ctx1.supercall = true, globals.MaplessModel.superclass.fn.prototype._onAboutToDelete.apply(_st(self), []));
$ctx1.supercall = false;
self._deletedOn_(_st($Date())._now());
return self}, function($ctx1) {$ctx1.fill(self,"onAboutToDelete",{},globals.MaplessModel)})},
args: [],
source: "onAboutToDelete\x0a\x0a\x09super onAboutToDelete.\x0a\x09\x0a\x09self deletedOn: Date now",
messageSends: ["onAboutToDelete", "deletedOn:", "now"],
referencedClasses: ["Date"]
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "onAboutToSave",
protocol: 'reactions',
fn: function (){
var self=this;
function $Date(){return globals.Date||(typeof Date=="undefined"?nil:Date)}
return smalltalk.withContext(function($ctx1) { 
($ctx1.supercall = true, globals.MaplessModel.superclass.fn.prototype._onAboutToSave.apply(_st(self), []));
$ctx1.supercall = false;
self._updatedOn_(_st($Date())._now());
return self}, function($ctx1) {$ctx1.fill(self,"onAboutToSave",{},globals.MaplessModel)})},
args: [],
source: "onAboutToSave\x0a\x0a\x09super onAboutToSave.\x0a\x09\x0a\x09self updatedOn: Date now\x09",
messageSends: ["onAboutToSave", "updatedOn:", "now"],
referencedClasses: ["Date"]
}),
globals.MaplessModel);

smalltalk.addMethod(
smalltalk.method({
selector: "onAboutToUpdate",
protocol: 'reactions',
fn: function (){
var self=this;
function $Date(){return globals.Date||(typeof Date=="undefined"?nil:Date)}
return smalltalk.withContext(function($ctx1) { 
($ctx1.supercall = true, globals.MaplessModel.superclass.fn.prototype._onAboutToUpdate.apply(_st(self), []));
$ctx1.supercall = false;
self._updatedOn_(_st($Date())._now());
return self}, function($ctx1) {$ctx1.fill(self,"onAboutToUpdate",{},globals.MaplessModel)})},
args: [],
source: "onAboutToUpdate\x0a\x0a\x09super onAboutToUpdate.\x0a\x09\x0a\x09self updatedOn: Date now\x09",
messageSends: ["onAboutToUpdate", "updatedOn:", "now"],
referencedClasses: ["Date"]
}),
globals.MaplessModel);



smalltalk.addClass('MaplessError', globals.Error, [], 'MiniMapless');

});
