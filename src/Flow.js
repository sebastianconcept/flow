define("app/Flow", ["amber/boot", "amber_core/Kernel-Objects", "amber_core/Kernel-Exceptions"], function($boot){
var smalltalk=$boot.vm,nil=$boot.nil,_st=$boot.asReceiver,globals=$boot.globals;
smalltalk.addPackage('Flow');
smalltalk.packages["Flow"].transport = {"type":"amd","amdNamespace":"app"};

smalltalk.addClass('Flow', globals.Object, [], 'Flow');

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

});
