define("app/Flow-API", ["amber/boot", "amber_core/Kernel-Objects", "app/MiniMapless"], function($boot){
var smalltalk=$boot.vm,nil=$boot.nil,_st=$boot.asReceiver,globals=$boot.globals;
smalltalk.addPackage('Flow-API');
smalltalk.packages["Flow-API"].transport = {"type":"amd","amdNamespace":"app"};

smalltalk.addClass('API', globals.Object, [], 'Flow-API');


smalltalk.addClass('RESTfulAPI', globals.API, [], 'Flow-API');
smalltalk.addMethod(
smalltalk.method({
selector: "delete:do:onError:",
protocol: 'actions',
fn: function (anURLString,aBlock,errorBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
self._trigger_("aboutToAJAX");
$ctx1.sendIdx["trigger:"]=1;
_st(jQuery)._ajax_options_(anURLString,globals.HashedCollection._newFromPairs_(["type","DELETE","contentType","text/json","complete",(function(res){
return smalltalk.withContext(function($ctx2) {
self._trigger_("afterAJAX");
$1=_st(_st(res)._status()).__eq((200));
if(smalltalk.assert($1)){
return _st(aBlock)._value_(_st(res)._responseText());
$ctx2.sendIdx["value:"]=1;
} else {
return _st(errorBlock)._value_(res);
};
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})})]));
return self}, function($ctx1) {$ctx1.fill(self,"delete:do:onError:",{anURLString:anURLString,aBlock:aBlock,errorBlock:errorBlock},globals.RESTfulAPI)})},
args: ["anURLString", "aBlock", "errorBlock"],
source: "delete: anURLString do: aBlock onError: errorBlock\x0a\x0a\x09self trigger: 'aboutToAJAX'.\x0a\x0a\x09jQuery ajax: anURLString options: #{\x0a\x09\x09'type' -> 'DELETE'.\x0a\x09\x09'contentType' -> 'text/json'.\x0a\x09\x09'complete' -> [:res |\x0a\x09\x09\x09self trigger: 'afterAJAX'.\x0a\x09\x09\x09res status = 200\x0a\x09\x09\x09\x09ifTrue: [aBlock value: res responseText]\x0a\x09\x09\x09\x09ifFalse: [errorBlock value: res]]\x0a\x09}",
messageSends: ["trigger:", "ajax:options:", "ifTrue:ifFalse:", "=", "status", "value:", "responseText"],
referencedClasses: []
}),
globals.RESTfulAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "get:do:onError:",
protocol: 'actions',
fn: function (anURLString,aBlock,errorBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1,$2;
self._trigger_("aboutToAJAX");
$ctx1.sendIdx["trigger:"]=1;
_st(jQuery)._ajax_options_(anURLString,globals.HashedCollection._newFromPairs_(["type","GET","contentType","text/json","complete",(function(res){
return smalltalk.withContext(function($ctx2) {
self._trigger_("afterAJAX");
$1=_st(_st(res)._status()).__eq((200));
if(smalltalk.assert($1)){
$2=_st(res)._responseText();
$ctx2.sendIdx["responseText"]=1;
return _st(aBlock)._value_($2);
$ctx2.sendIdx["value:"]=1;
} else {
return _st(errorBlock)._value_(_st(res)._responseText());
};
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})})]));
return self}, function($ctx1) {$ctx1.fill(self,"get:do:onError:",{anURLString:anURLString,aBlock:aBlock,errorBlock:errorBlock},globals.RESTfulAPI)})},
args: ["anURLString", "aBlock", "errorBlock"],
source: "get: anURLString do: aBlock onError: errorBlock\x0a\x0a\x09self trigger: 'aboutToAJAX'.\x0a\x0a\x09jQuery ajax: anURLString options: #{\x0a\x09\x09'type' -> 'GET'.\x0a\x09\x09'contentType' -> 'text/json'.\x0a\x09\x09'complete' -> [:res |\x0a\x09\x09\x09self trigger: 'afterAJAX'.\x0a\x09\x09\x09res status = 200\x0a\x09\x09\x09\x09ifTrue: [aBlock value: res responseText]\x0a\x09\x09\x09\x09ifFalse: [errorBlock value: res responseText]]\x0a\x09}",
messageSends: ["trigger:", "ajax:options:", "ifTrue:ifFalse:", "=", "status", "value:", "responseText"],
referencedClasses: []
}),
globals.RESTfulAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "post:data:do:onError:",
protocol: 'actions',
fn: function (anURLString,aDataString,aBlock,errorBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
self._trigger_("aboutToAJAX");
$ctx1.sendIdx["trigger:"]=1;
_st(jQuery)._ajax_options_(anURLString,globals.HashedCollection._newFromPairs_(["type","POST","contentType","text/json","data",aDataString,"complete",(function(res){
return smalltalk.withContext(function($ctx2) {
self._trigger_("afterAJAX");
$1=_st(_st(res)._status()).__eq((200));
if(smalltalk.assert($1)){
return _st(aBlock)._value_(_st(res)._responseText());
$ctx2.sendIdx["value:"]=1;
} else {
return _st(errorBlock)._value_(res);
};
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})})]));
return self}, function($ctx1) {$ctx1.fill(self,"post:data:do:onError:",{anURLString:anURLString,aDataString:aDataString,aBlock:aBlock,errorBlock:errorBlock},globals.RESTfulAPI)})},
args: ["anURLString", "aDataString", "aBlock", "errorBlock"],
source: "post: anURLString data: aDataString do: aBlock onError: errorBlock\x0a\x0a\x09self trigger: 'aboutToAJAX'.\x0a\x0a\x09jQuery ajax: anURLString options: #{\x0a\x09\x09'type' -> 'POST'.\x0a\x09\x09'contentType' -> 'text/json'.\x0a\x09\x09'data' -> aDataString.\x0a\x09\x09'complete' -> [:res |\x0a\x09\x09\x09self trigger: 'afterAJAX'.\x0a\x09\x09\x09res status = 200\x0a\x09\x09\x09\x09ifTrue: [aBlock value: res responseText]\x0a\x09\x09\x09\x09ifFalse: [errorBlock value: res]]\x0a\x09}",
messageSends: ["trigger:", "ajax:options:", "ifTrue:ifFalse:", "=", "status", "value:", "responseText"],
referencedClasses: []
}),
globals.RESTfulAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "put:data:do:onError:",
protocol: 'actions',
fn: function (anURLString,aDataString,aBlock,errorBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
self._trigger_("aboutToAJAX");
$ctx1.sendIdx["trigger:"]=1;
_st(jQuery)._ajax_options_(anURLString,globals.HashedCollection._newFromPairs_(["type","PUT","contentType","text/json","data",aDataString,"complete",(function(res){
return smalltalk.withContext(function($ctx2) {
self._trigger_("afterAJAX");
$1=_st(_st(res)._status()).__eq((200));
if(smalltalk.assert($1)){
return _st(aBlock)._value_(_st(res)._responseText());
$ctx2.sendIdx["value:"]=1;
} else {
return _st(errorBlock)._value_(res);
};
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})})]));
return self}, function($ctx1) {$ctx1.fill(self,"put:data:do:onError:",{anURLString:anURLString,aDataString:aDataString,aBlock:aBlock,errorBlock:errorBlock},globals.RESTfulAPI)})},
args: ["anURLString", "aDataString", "aBlock", "errorBlock"],
source: "put: anURLString data: aDataString do: aBlock onError: errorBlock\x0a\x0a\x09self trigger: 'aboutToAJAX'.\x0a\x0a\x09jQuery ajax: anURLString options: #{\x0a\x09\x09'type' -> 'PUT'.\x0a\x09\x09'contentType' -> 'text/json'.\x0a\x09\x09'data' -> aDataString.\x0a\x09\x09'complete' -> [:res |\x0a\x09\x09\x09self trigger: 'afterAJAX'.\x0a\x09\x09\x09res status = 200\x0a\x09\x09\x09\x09ifTrue: [aBlock value: res responseText]\x0a\x09\x09\x09\x09ifFalse: [errorBlock value: res]]\x0a\x09}",
messageSends: ["trigger:", "ajax:options:", "ifTrue:ifFalse:", "=", "status", "value:", "responseText"],
referencedClasses: []
}),
globals.RESTfulAPI);



smalltalk.addClass('WebSocketAPI', globals.API, ['socket', 'uri', 'onOpenBlock', 'onErrorBlock'], 'Flow-API');
smalltalk.addMethod(
smalltalk.method({
selector: "connect",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._initializeSocket();
return self}, function($ctx1) {$ctx1.fill(self,"connect",{},globals.WebSocketAPI)})},
args: [],
source: "connect\x0a\x0a\x09self initializeSocket",
messageSends: ["initializeSocket"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "initializeSocket",
protocol: 'initialization',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$3,$1;
$2=self._makeSocketOn_(self._uri());
_st($2)._onopen_(self._onOpenBlock());
_st($2)._onclose_(self._onCloseBlock());
_st($2)._onmessage_((function(anEvent){
return smalltalk.withContext(function($ctx2) {
return self._onMessage_(anEvent);
}, function($ctx2) {$ctx2.fillBlock({anEvent:anEvent},$ctx1,1)})}));
_st($2)._onerror_(self._onErrorBlock());
$3=_st($2)._yourself();
self["@socket"]=$3;
$1=self["@socket"];
return $1;
}, function($ctx1) {$ctx1.fill(self,"initializeSocket",{},globals.WebSocketAPI)})},
args: [],
source: "initializeSocket\x0a\x09\x0a\x09^ socket := (self makeSocketOn: self uri)\x0a\x09\x09\x09\x09\x09onopen: self onOpenBlock;\x0a\x09\x09\x09\x09\x09onclose: self onCloseBlock;\x0a\x09\x09\x09\x09\x09onmessage:[:anEvent | self onMessage: anEvent ];\x0a\x09\x09\x09\x09\x09onerror: self onErrorBlock;\x0a\x09\x09\x09\x09\x09yourself\x09",
messageSends: ["onopen:", "makeSocketOn:", "uri", "onOpenBlock", "onclose:", "onCloseBlock", "onmessage:", "onMessage:", "onerror:", "onErrorBlock", "yourself"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "initializeURI",
protocol: 'initialization',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
self["@uri"]=_st("ws://".__comma(_st(_st(window)._location())._hostname())).__comma(":21004/");
$ctx1.sendIdx[","]=1;
$1=self["@uri"];
return $1;
}, function($ctx1) {$ctx1.fill(self,"initializeURI",{},globals.WebSocketAPI)})},
args: [],
source: "initializeURI\x0a\x0a\x09^ uri := 'ws://',window location hostname,':21004/'",
messageSends: [",", "hostname", "location"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "makeSocketOn:",
protocol: 'actions',
fn: function (anUri){
var self=this;
return smalltalk.withContext(function($ctx1) { 
return new WebSocket(anUri);
return self}, function($ctx1) {$ctx1.fill(self,"makeSocketOn:",{anUri:anUri},globals.WebSocketAPI)})},
args: ["anUri"],
source: "makeSocketOn: anUri\x0a\x0a\x09<return new WebSocket(anUri)>\x0a\x09",
messageSends: [],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "onErrorBlock",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$receiver;
$2=self["@onErrorBlock"];
if(($receiver = $2) == null || $receiver.isNil){
self["@onErrorBlock"]=(function(x){
return smalltalk.withContext(function($ctx2) {
return _st(x)._signal();
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,2)})});
$1=self["@onErrorBlock"];
} else {
$1=$2;
};
return $1;
}, function($ctx1) {$ctx1.fill(self,"onErrorBlock",{},globals.WebSocketAPI)})},
args: [],
source: "onErrorBlock\x0a\x0a\x09^ onErrorBlock ifNil:[ onErrorBlock := [ :x | x signal ] ]",
messageSends: ["ifNil:", "signal"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "onErrorBlock:",
protocol: 'accessing',
fn: function (aBlock){
var self=this;
self["@onErrorBlock"]=aBlock;
return self},
args: ["aBlock"],
source: "onErrorBlock: aBlock\x0a\x0a\x09onErrorBlock := aBlock",
messageSends: [],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "onOpenBlock",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$receiver;
$2=self["@onOpenBlock"];
if(($receiver = $2) == null || $receiver.isNil){
self["@onOpenBlock"]=(function(){
return smalltalk.withContext(function($ctx2) {
return self._trigger_("webSocketConnected");
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,2)})});
$1=self["@onOpenBlock"];
} else {
$1=$2;
};
return $1;
}, function($ctx1) {$ctx1.fill(self,"onOpenBlock",{},globals.WebSocketAPI)})},
args: [],
source: "onOpenBlock\x0a\x0a\x09^ onOpenBlock ifNil:[ onOpenBlock := [ self trigger: 'webSocketConnected' ] ]",
messageSends: ["ifNil:", "trigger:"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "onOpenBlock:",
protocol: 'accessing',
fn: function (aBlock){
var self=this;
self["@onOpenBlock"]=aBlock;
return self},
args: ["aBlock"],
source: "onOpenBlock: aBlock\x0a\x0a\x09onOpenBlock := aBlock",
messageSends: [],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "send:",
protocol: 'actions',
fn: function (aString){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self._socket())._send_(aString);
return $1;
}, function($ctx1) {$ctx1.fill(self,"send:",{aString:aString},globals.WebSocketAPI)})},
args: ["aString"],
source: "send: aString\x0a\x0a\x09^ self socket send: aString",
messageSends: ["send:", "socket"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "send:onError:",
protocol: 'actions',
fn: function (aString,aBlock){
var self=this;
function $Error(){return globals.Error||(typeof Error=="undefined"?nil:Error)}
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st((function(){
return smalltalk.withContext(function($ctx2) {
return _st(self._socket())._send_(aString);
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}))._on_do_($Error(),(function(x){
return smalltalk.withContext(function($ctx2) {
return _st(aBlock)._value_(x);
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,2)})}));
return $1;
}, function($ctx1) {$ctx1.fill(self,"send:onError:",{aString:aString,aBlock:aBlock},globals.WebSocketAPI)})},
args: ["aString", "aBlock"],
source: "send: aString onError: aBlock\x0a\x0a\x09^ [ self socket send: aString ]\x0a\x09\x09on: Error\x0a\x09\x09do:[ :x | aBlock value: x ]",
messageSends: ["on:do:", "send:", "socket", "value:"],
referencedClasses: ["Error"]
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "socket",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$receiver;
$2=self["@socket"];
if(($receiver = $2) == null || $receiver.isNil){
$1=self._initializeSocket();
} else {
$1=$2;
};
return $1;
}, function($ctx1) {$ctx1.fill(self,"socket",{},globals.WebSocketAPI)})},
args: [],
source: "socket\x0a\x0a\x09^ socket ifNil:[ self initializeSocket ]",
messageSends: ["ifNil:", "initializeSocket"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "uri",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$receiver;
$2=self["@uri"];
if(($receiver = $2) == null || $receiver.isNil){
$1=self._initializeURI();
} else {
$1=$2;
};
return $1;
}, function($ctx1) {$ctx1.fill(self,"uri",{},globals.WebSocketAPI)})},
args: [],
source: "uri\x0a\x0a\x09^ uri ifNil:[ self initializeURI ]",
messageSends: ["ifNil:", "initializeURI"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "uri:",
protocol: 'accessing',
fn: function (aString){
var self=this;
self["@uri"]=aString;
return self},
args: ["aString"],
source: "uri: aString\x0a\x0a\x09uri := aString",
messageSends: [],
referencedClasses: []
}),
globals.WebSocketAPI);



smalltalk.addClass('Client', globals.Object, ['rest', 'webSocket'], 'Flow-API');
smalltalk.addMethod(
smalltalk.method({
selector: "connect",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(self._webSocket())._connect();
return self}, function($ctx1) {$ctx1.fill(self,"connect",{},globals.Client)})},
args: [],
source: "connect\x0a\x0a\x09self webSocket connect",
messageSends: ["connect", "webSocket"],
referencedClasses: []
}),
globals.Client);

smalltalk.addMethod(
smalltalk.method({
selector: "onMessage:",
protocol: 'accessing',
fn: function (anEvent){
var self=this;
var command;
function $WebSocketCommand(){return globals.WebSocketCommand||(typeof WebSocketCommand=="undefined"?nil:WebSocketCommand)}
return smalltalk.withContext(function($ctx1) { 
command=_st($WebSocketCommand())._for_(_st(anEvent)._data());
_st(command)._react();
return self}, function($ctx1) {$ctx1.fill(self,"onMessage:",{anEvent:anEvent,command:command},globals.Client)})},
args: ["anEvent"],
source: "onMessage: anEvent\x0a\x09\x22This client is receiving anEvent \x0a\x09with a message comming from the server.\x22\x0a\x09\x0a\x09| command |\x0a\x09\x0a\x09command := WebSocketCommand for: anEvent data.\x0a\x09command react",
messageSends: ["for:", "data", "react"],
referencedClasses: ["WebSocketCommand"]
}),
globals.Client);

smalltalk.addMethod(
smalltalk.method({
selector: "rest",
protocol: 'accessing',
fn: function (){
var self=this;
function $RESTfulAPI(){return globals.RESTfulAPI||(typeof RESTfulAPI=="undefined"?nil:RESTfulAPI)}
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$receiver;
$2=self["@rest"];
if(($receiver = $2) == null || $receiver.isNil){
self["@rest"]=_st($RESTfulAPI())._new();
$1=self["@rest"];
} else {
$1=$2;
};
return $1;
}, function($ctx1) {$ctx1.fill(self,"rest",{},globals.Client)})},
args: [],
source: "rest\x0a\x0a\x09^ rest ifNil:[ rest := RESTfulAPI new ]",
messageSends: ["ifNil:", "new"],
referencedClasses: ["RESTfulAPI"]
}),
globals.Client);

smalltalk.addMethod(
smalltalk.method({
selector: "webSocket",
protocol: 'accessing',
fn: function (){
var self=this;
function $WebSocketAPI(){return globals.WebSocketAPI||(typeof WebSocketAPI=="undefined"?nil:WebSocketAPI)}
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$receiver;
$2=self["@webSocket"];
if(($receiver = $2) == null || $receiver.isNil){
self["@webSocket"]=_st($WebSocketAPI())._new();
$1=self["@webSocket"];
} else {
$1=$2;
};
return $1;
}, function($ctx1) {$ctx1.fill(self,"webSocket",{},globals.Client)})},
args: [],
source: "webSocket\x0a\x0a\x09^ webSocket ifNil:[ webSocket := WebSocketAPI new ]",
messageSends: ["ifNil:", "new"],
referencedClasses: ["WebSocketAPI"]
}),
globals.Client);



smalltalk.addClass('WebSocketCommand', globals.Mapless, [], 'Flow-API');
globals.WebSocketCommand.comment="A WebSocketCommand is an abstraction.\x0a\x0aSubclasses are concrete objects that easily travel \x0a\x0a1. from the frontend to the backend and/or \x0a\x0a2. come from the backend to the frontend.\x0a\x0aThey have the concrete knowledge of how to react or who to delegate behaviour.\x0a\x0aThey also carry any information necessary to achieve some reaction at their destination.\x0a\x0aNote: they are Mapless only as convenience for traveling over the wire. You can if you like to but, originally, they are not meant to be persisted.";

});
