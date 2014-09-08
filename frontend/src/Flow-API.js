define("app/Flow-API", ["amber/boot", "amber_core/Kernel-Objects", "amber_core/Kernel-Exceptions", "app/MiniMapless"], function($boot){
var smalltalk=$boot.vm,nil=$boot.nil,_st=$boot.asReceiver,globals=$boot.globals;
smalltalk.addPackage('Flow-API');
smalltalk.packages["Flow-API"].transport = {"type":"amd","amdNamespace":"app"};

smalltalk.addClass('APIClient', globals.Object, ['rest', 'ws'], 'Flow-API');
globals.APIClient.comment="## APIClient\x0a\x0aThis is a client to the backend API\x0a\x0aProvides access to the expected REST and WebSocket API at the backend side. \x0a\x0aThis client also has knows which objects are being published locally so they can be used remotely";
smalltalk.addMethod(
smalltalk.method({
selector: "answerLocallyFor:",
protocol: 'actions',
fn: function (aWebSocketCommand){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(self._ws())._answerLocallyFor_(aWebSocketCommand);
return self}, function($ctx1) {$ctx1.fill(self,"answerLocallyFor:",{aWebSocketCommand:aWebSocketCommand},globals.APIClient)})},
args: ["aWebSocketCommand"],
source: "answerLocallyFor: aWebSocketCommand\x0a\x0a\x09self ws answerLocallyFor: aWebSocketCommand",
messageSends: ["answerLocallyFor:", "ws"],
referencedClasses: []
}),
globals.APIClient);

smalltalk.addMethod(
smalltalk.method({
selector: "connect",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(self._ws())._connect();
return self}, function($ctx1) {$ctx1.fill(self,"connect",{},globals.APIClient)})},
args: [],
source: "connect\x0a\x0a\x09self ws connect",
messageSends: ["connect", "ws"],
referencedClasses: []
}),
globals.APIClient);

smalltalk.addMethod(
smalltalk.method({
selector: "initializeWs",
protocol: 'initialization',
fn: function (){
var self=this;
function $WebSocketAPI(){return globals.WebSocketAPI||(typeof WebSocketAPI=="undefined"?nil:WebSocketAPI)}
return smalltalk.withContext(function($ctx1) { 
var $2,$3,$1;
$2=_st($WebSocketAPI())._new();
_st($2)._when_do_("commandReceived:",(function(cmd){
return smalltalk.withContext(function($ctx2) {
return self._onCommand_(cmd);
}, function($ctx2) {$ctx2.fillBlock({cmd:cmd},$ctx1,1)})}));
$3=_st($2)._yourself();
self["@ws"]=$3;
$1=self["@ws"];
return $1;
}, function($ctx1) {$ctx1.fill(self,"initializeWs",{},globals.APIClient)})},
args: [],
source: "initializeWs\x0a\x09\x22Initializes the WebSocket API\x22\x0a\x0a\x09^ ws := WebSocketAPI new\x0a\x09\x09\x09\x09when: 'commandReceived:' do:[ :cmd | self onCommand: cmd ];\x0a\x09\x09\x09\x09yourself",
messageSends: ["when:do:", "new", "onCommand:", "yourself"],
referencedClasses: ["WebSocketAPI"]
}),
globals.APIClient);

smalltalk.addMethod(
smalltalk.method({
selector: "onCommand:",
protocol: 'reactions',
fn: function (aCommand){
var self=this;
return self},
args: ["aCommand"],
source: "onCommand: aCommand\x0a\x09\x22There is aCommand being received here.\x0a\x09It could be from a remote initiative or \x0a\x09a response of something sent from this end.\x22\x0a\x09\x0a\x09\x22no-op\x22",
messageSends: [],
referencedClasses: []
}),
globals.APIClient);

smalltalk.addMethod(
smalltalk.method({
selector: "remoteAnswerFor:",
protocol: 'actions',
fn: function (aWebSocketCommand){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(self._ws())._remoteAnswerFor_(aWebSocketCommand);
return self}, function($ctx1) {$ctx1.fill(self,"remoteAnswerFor:",{aWebSocketCommand:aWebSocketCommand},globals.APIClient)})},
args: ["aWebSocketCommand"],
source: "remoteAnswerFor: aWebSocketCommand\x0a\x0a\x09self ws remoteAnswerFor: aWebSocketCommand",
messageSends: ["remoteAnswerFor:", "ws"],
referencedClasses: []
}),
globals.APIClient);

smalltalk.addMethod(
smalltalk.method({
selector: "remoteExceptionFor:",
protocol: 'actions',
fn: function (aWebSocketCommand){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self._ws())._remoteExceptionFor_(aWebSocketCommand);
return $1;
}, function($ctx1) {$ctx1.fill(self,"remoteExceptionFor:",{aWebSocketCommand:aWebSocketCommand},globals.APIClient)})},
args: ["aWebSocketCommand"],
source: "remoteExceptionFor: aWebSocketCommand\x0a\x09\x22Answers the local error handler for aWebSocketCommand\x22\x0a\x0a\x09^ self ws remoteExceptionFor: aWebSocketCommand",
messageSends: ["remoteExceptionFor:", "ws"],
referencedClasses: []
}),
globals.APIClient);

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
}, function($ctx1) {$ctx1.fill(self,"rest",{},globals.APIClient)})},
args: [],
source: "rest\x0a\x0a\x09^ rest ifNil:[ rest := RESTfulAPI new ]",
messageSends: ["ifNil:", "new"],
referencedClasses: ["RESTfulAPI"]
}),
globals.APIClient);

smalltalk.addMethod(
smalltalk.method({
selector: "ws",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$receiver;
$2=self["@ws"];
if(($receiver = $2) == null || $receiver.isNil){
$1=self._initializeWs();
} else {
$1=$2;
};
return $1;
}, function($ctx1) {$ctx1.fill(self,"ws",{},globals.APIClient)})},
args: [],
source: "ws\x0a\x0a\x09^ ws ifNil:[ self initializeWs ]",
messageSends: ["ifNil:", "initializeWs"],
referencedClasses: []
}),
globals.APIClient);



smalltalk.addClass('APIError', globals.Error, ['subject'], 'Flow-API');
globals.APIError.comment="## APIError\x0a\x0aThis exception is used when flow finds issues while communicating with the backend";
smalltalk.addMethod(
smalltalk.method({
selector: "initializeOn:",
protocol: 'initialization',
fn: function (anObject){
var self=this;
self["@subject"]=anObject;
return self},
args: ["anObject"],
source: "initializeOn: anObject\x0a\x0a\x09subject := anObject.\x0a\x09\x0a\x09\x09\x0a\x09",
messageSends: [],
referencedClasses: []
}),
globals.APIError);

smalltalk.addMethod(
smalltalk.method({
selector: "printOn:",
protocol: 'actions',
fn: function (aStream){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
($ctx1.supercall = true, globals.APIError.superclass.fn.prototype._printOn_.apply(_st(self), [aStream]));
$ctx1.supercall = false;
$1=_st("(".__comma(_st(self["@subject"])._asString())).__comma(")");
$ctx1.sendIdx[","]=1;
_st(aStream)._nextPutAll_($1);
return self}, function($ctx1) {$ctx1.fill(self,"printOn:",{aStream:aStream},globals.APIError)})},
args: ["aStream"],
source: "printOn: aStream\x0a\x0a\x09super printOn: aStream.\x0a\x09\x0a\x09aStream nextPutAll: '(',subject asString,')'",
messageSends: ["printOn:", "nextPutAll:", ",", "asString"],
referencedClasses: []
}),
globals.APIError);

smalltalk.addMethod(
smalltalk.method({
selector: "subject",
protocol: 'accessing',
fn: function (){
var self=this;
var $1;
$1=self["@subject"];
return $1;
},
args: [],
source: "subject\x0a\x0a\x09^ subject",
messageSends: [],
referencedClasses: []
}),
globals.APIError);

smalltalk.addMethod(
smalltalk.method({
selector: "subject:",
protocol: 'accessing',
fn: function (anObject){
var self=this;
self["@subject"]=anObject;
return self},
args: ["anObject"],
source: "subject: anObject\x0a\x0a\x09subject := anObject",
messageSends: [],
referencedClasses: []
}),
globals.APIError);


smalltalk.addMethod(
smalltalk.method({
selector: "for:",
protocol: 'actions',
fn: function (anObject){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$3,$1;
$2=self._new();
_st($2)._initializeOn_(anObject);
$3=_st($2)._yourself();
$1=$3;
return $1;
}, function($ctx1) {$ctx1.fill(self,"for:",{anObject:anObject},globals.APIError.klass)})},
args: ["anObject"],
source: "for: anObject\x0a\x0a\x09^ self new\x0a\x09\x09initializeOn: anObject;\x0a\x09\x09yourself",
messageSends: ["initializeOn:", "new", "yourself"],
referencedClasses: []
}),
globals.APIError.klass);


smalltalk.addClass('APIRemoteException', globals.APIError, [], 'Flow-API');


smalltalk.addClass('APIStrategy', globals.Object, ['uri', 'apiPath'], 'Flow-API');
globals.APIStrategy.comment="## APIStrategy is an abstraction\x0a\x0aSee concrete subclasses of API for concrete backend interaction\x0a";
smalltalk.addMethod(
smalltalk.method({
selector: "apiPath",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$receiver;
$2=self["@apiPath"];
if(($receiver = $2) == null || $receiver.isNil){
$1=self._initializeAPIPath();
} else {
$1=$2;
};
return $1;
}, function($ctx1) {$ctx1.fill(self,"apiPath",{},globals.APIStrategy)})},
args: [],
source: "apiPath\x0a\x0a\x09^ apiPath ifNil:[ self initializeAPIPath ]",
messageSends: ["ifNil:", "initializeAPIPath"],
referencedClasses: []
}),
globals.APIStrategy);

smalltalk.addMethod(
smalltalk.method({
selector: "apiPath:",
protocol: 'accessing',
fn: function (aString){
var self=this;
self["@apiPath"]=aString;
return self},
args: ["aString"],
source: "apiPath: aString\x0a\x0a\x09apiPath := aString",
messageSends: [],
referencedClasses: []
}),
globals.APIStrategy);

smalltalk.addMethod(
smalltalk.method({
selector: "isSSL",
protocol: 'testing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self._class())._isSSL();
return $1;
}, function($ctx1) {$ctx1.fill(self,"isSSL",{},globals.APIStrategy)})},
args: [],
source: "isSSL\x0a\x09\x22Answers true if all this is going over SSL.\x22\x0a\x09\x0a\x09^ self class isSSL",
messageSends: ["isSSL", "class"],
referencedClasses: []
}),
globals.APIStrategy);

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
}, function($ctx1) {$ctx1.fill(self,"uri",{},globals.APIStrategy)})},
args: [],
source: "uri\x0a\x0a\x09^ uri ifNil:[ self initializeURI ]",
messageSends: ["ifNil:", "initializeURI"],
referencedClasses: []
}),
globals.APIStrategy);

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
globals.APIStrategy);


smalltalk.addMethod(
smalltalk.method({
selector: "isSSL",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(_st(_st(window)._location())._protocol()).__eq("https:");
return $1;
}, function($ctx1) {$ctx1.fill(self,"isSSL",{},globals.APIStrategy.klass)})},
args: [],
source: "isSSL\x0a\x09\x22Answers true if all this is going over SSL.\x22\x0a\x09\x0a\x09^ window location protocol = 'https:' \x0a\x09",
messageSends: ["=", "protocol", "location"],
referencedClasses: []
}),
globals.APIStrategy.klass);


smalltalk.addClass('RESTfulAPI', globals.APIStrategy, [], 'Flow-API');
globals.RESTfulAPI.comment="## RESTfulAPI\x0a\x0aThis API follows the typical REST on http style";
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
source: "delete: anURLString do: aBlock onError: errorBlock\x0a\x0a\x09self trigger: 'aboutToAJAX'.\x0a\x0a\x09jQuery ajax: anURLString options: #{\x0a\x09\x09'type' -> 'DELETE'.\x0a\x09\x09'contentType' -> 'text/json'.\x0a\x09\x09'complete' -> [:res |\x0a\x09\x09\x09self trigger: 'afterAJAX'.\x0a\x09\x09\x09res status = 200\x0a\x09\x09\x09\x09ifTrue: [ aBlock value: res responseText ]\x0a\x09\x09\x09\x09ifFalse: [ errorBlock value: res ] ]\x0a\x09}",
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
source: "get: anURLString do: aBlock onError: errorBlock\x0a\x0a\x09self trigger: 'aboutToAJAX'.\x0a\x0a\x09jQuery ajax: anURLString options: #{\x0a\x09\x09'type' -> 'GET'.\x0a\x09\x09'contentType' -> 'text/json'.\x0a\x09\x09'complete' -> [:res |\x0a\x09\x09\x09self trigger: 'afterAJAX'.\x0a\x09\x09\x09res status = 200\x0a\x09\x09\x09\x09ifTrue: [ aBlock value: res responseText ]\x0a\x09\x09\x09\x09ifFalse: [ errorBlock value: res responseText ] ]\x0a\x09}",
messageSends: ["trigger:", "ajax:options:", "ifTrue:ifFalse:", "=", "status", "value:", "responseText"],
referencedClasses: []
}),
globals.RESTfulAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "initializeAPIPath",
protocol: 'initialization',
fn: function (){
var self=this;
var $1;
self["@apiPath"]="api/1.0";
$1=self["@apiPath"];
return $1;
},
args: [],
source: "initializeAPIPath\x0a\x0a\x09^ apiPath := 'api/1.0'",
messageSends: [],
referencedClasses: []
}),
globals.RESTfulAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "initializeURI",
protocol: 'initialization',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $4,$3,$2,$11,$10,$9,$13,$12,$8,$7,$16,$15,$14,$6,$5,$17,$19,$18,$1;
$4=_st(window)._location();
$ctx1.sendIdx["location"]=1;
$3=_st($4)._hostname();
$ctx1.sendIdx["hostname"]=1;
$2=_st($3).__eq("localhost");
if(smalltalk.assert($2)){
$11=self._class();
$ctx1.sendIdx["class"]=1;
$10=_st($11)._protocol();
$ctx1.sendIdx["protocol"]=1;
$9=_st($10).__comma("//");
$ctx1.sendIdx[","]=6;
$13=_st(window)._location();
$ctx1.sendIdx["location"]=2;
$12=_st($13)._hostname();
$ctx1.sendIdx["hostname"]=2;
$8=_st($9).__comma($12);
$ctx1.sendIdx[","]=5;
$7=_st($8).__comma(":");
$ctx1.sendIdx[","]=4;
$16=self._class();
$ctx1.sendIdx["class"]=2;
$15=_st($16)._port();
$14=_st($15)._asString();
$6=_st($7).__comma($14);
$ctx1.sendIdx[","]=3;
$5=_st($6).__comma("/");
$ctx1.sendIdx[","]=2;
$17=self._apiPath();
$ctx1.sendIdx["apiPath"]=1;
self["@uri"]=_st($5).__comma($17);
$ctx1.sendIdx[","]=1;
$1=self["@uri"];
} else {
$19=_st(_st(_st(self._class())._protocol()).__comma("//")).__comma(_st(_st(window)._location())._hostname());
$ctx1.sendIdx[","]=9;
$18=_st($19).__comma("/");
$ctx1.sendIdx[","]=8;
self["@uri"]=_st($18).__comma(self._apiPath());
$ctx1.sendIdx[","]=7;
$1=self["@uri"];
};
return $1;
}, function($ctx1) {$ctx1.fill(self,"initializeURI",{},globals.RESTfulAPI)})},
args: [],
source: "initializeURI\x0a\x0a\x09^ window location hostname = 'localhost' \x0a\x09\x09ifTrue:[ uri := self class protocol,'//',window location hostname,':',self class port asString,'/', self apiPath]\x0a\x09\x09ifFalse:[ uri := self class protocol,'//',window location hostname, '/', self apiPath]",
messageSends: ["ifTrue:ifFalse:", "=", "hostname", "location", ",", "protocol", "class", "asString", "port", "apiPath"],
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
source: "post: anURLString data: aDataString do: aBlock onError: errorBlock\x0a\x0a\x09self trigger: 'aboutToAJAX'.\x0a\x0a\x09jQuery ajax: anURLString options: #{\x0a\x09\x09'type' -> 'POST'.\x0a\x09\x09'contentType' -> 'text/json'.\x0a\x09\x09'data' -> aDataString.\x0a\x09\x09'complete' -> [:res |\x0a\x09\x09\x09self trigger: 'afterAJAX'.\x0a\x09\x09\x09res status = 200\x0a\x09\x09\x09\x09ifTrue: [ aBlock value: res responseText ]\x0a\x09\x09\x09\x09ifFalse: [ errorBlock value: res ] ]\x0a\x09}",
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
source: "put: anURLString data: aDataString do: aBlock onError: errorBlock\x0a\x0a\x09self trigger: 'aboutToAJAX'.\x0a\x0a\x09jQuery ajax: anURLString options: #{\x0a\x09\x09'type' -> 'PUT'.\x0a\x09\x09'contentType' -> 'text/json'.\x0a\x09\x09'data' -> aDataString.\x0a\x09\x09'complete' -> [:res |\x0a\x09\x09\x09self trigger: 'afterAJAX'.\x0a\x09\x09\x09res status = 200\x0a\x09\x09\x09\x09ifTrue: [ aBlock value: res responseText ]\x0a\x09\x09\x09\x09ifFalse: [ errorBlock value: res ] ]\x0a\x09}",
messageSends: ["trigger:", "ajax:options:", "ifTrue:ifFalse:", "=", "status", "value:", "responseText"],
referencedClasses: []
}),
globals.RESTfulAPI);


smalltalk.addMethod(
smalltalk.method({
selector: "protocol",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$1;
$2=self._isSSL();
if(smalltalk.assert($2)){
$1="https:";
} else {
$1="http:";
};
return $1;
}, function($ctx1) {$ctx1.fill(self,"protocol",{},globals.RESTfulAPI.klass)})},
args: [],
source: "protocol\x0a\x0a\x09^ self isSSL\x0a\x09\x09ifTrue:[ 'https:' ]\x0a\x09\x09ifFalse:[ 'http:' ]",
messageSends: ["ifTrue:ifFalse:", "isSSL"],
referencedClasses: []
}),
globals.RESTfulAPI.klass);


smalltalk.addClass('WebSocketAPI', globals.APIStrategy, ['socket', 'onOpenBlock', 'onCloseBlock', 'onMessageBlock', 'onErrorBlock', 'counter', 'localAnswers', 'localErrors', 'published'], 'Flow-API');
globals.WebSocketAPI.comment="## WebSocketAPI\x0a\x0aThis API is WebSockets based (so is full-duplex)";
smalltalk.addMethod(
smalltalk.method({
selector: "answerLocallyFor:",
protocol: 'actions',
fn: function (aWebSocketCommand){
var self=this;
function $Error(){return globals.Error||(typeof Error=="undefined"?nil:Error)}
return smalltalk.withContext(function($ctx1) { 
_st((function(){
return smalltalk.withContext(function($ctx2) {
return self._basicAnswerLocallyFor_(aWebSocketCommand);
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}))._on_do_($Error(),(function(x){
return smalltalk.withContext(function($ctx2) {
return self._onError_for_(x,aWebSocketCommand);
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,2)})}));
return self}, function($ctx1) {$ctx1.fill(self,"answerLocallyFor:",{aWebSocketCommand:aWebSocketCommand},globals.WebSocketAPI)})},
args: ["aWebSocketCommand"],
source: "answerLocallyFor: aWebSocketCommand\x0a\x09\x22Executes the callback waiting for this command's answer.\x0a\x09Or, executes the error handler if an exception happens.\x22\x0a\x09\x09\x0a\x09[ self basicAnswerLocallyFor: aWebSocketCommand ]\x0a\x09\x09on: Error\x0a\x09\x09do:[ :x | self onError: x for: aWebSocketCommand ]",
messageSends: ["on:do:", "basicAnswerLocallyFor:", "onError:for:"],
referencedClasses: ["Error"]
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "basicAnswerLocallyFor:",
protocol: 'actions',
fn: function (aWebSocketCommand){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$3,$1;
var $early={};
try {
_st(aWebSocketCommand)._onAboutToAnswer();
$2=self._localAnswers();
$ctx1.sendIdx["localAnswers"]=1;
$3=_st(aWebSocketCommand)._fId();
$ctx1.sendIdx["fId"]=1;
$1=_st($2)._at_ifAbsent_($3,(function(){
throw $early=[nil];
}));
_st($1)._value_(aWebSocketCommand);
_st(self._localAnswers())._removeKey_ifAbsent_(_st(aWebSocketCommand)._fId(),(function(){
}));
return self}
catch(e) {if(e===$early)return e[0]; throw e}
}, function($ctx1) {$ctx1.fill(self,"basicAnswerLocallyFor:",{aWebSocketCommand:aWebSocketCommand},globals.WebSocketAPI)})},
args: ["aWebSocketCommand"],
source: "basicAnswerLocallyFor: aWebSocketCommand\x0a\x09\x22Executes the callback waiting for this command's answer.\x0a\x09It's done by evaluating the callback waiting for aWebSocketCommand.\x0a\x09It also removes it from the dictionary because is not pending for it anymore.\x22\x0a\x09\x09\x0a\x09aWebSocketCommand onAboutToAnswer.\x0a\x09\x0a\x09(self localAnswers \x0a\x09\x09at: aWebSocketCommand fId\x0a\x09\x09ifAbsent:[ ^ nil ]) value: aWebSocketCommand.\x0a\x0a\x09self localAnswers \x0a\x09\x09removeKey: aWebSocketCommand fId\x0a\x09\x09ifAbsent:[ ]\x09\x09",
messageSends: ["onAboutToAnswer", "value:", "at:ifAbsent:", "localAnswers", "fId", "removeKey:ifAbsent:"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "connect",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self._isConnected();
if(smalltalk.assert($1)){
return self;
};
self._initializeSocket();
return self}, function($ctx1) {$ctx1.fill(self,"connect",{},globals.WebSocketAPI)})},
args: [],
source: "connect\x0a\x09\x22Makes a connection.\x0a\x09Remarks:\x0a\x091. if connected already, it will do nothing\x0a\x092. it will disconnect if there is an unconnected socket.\x22\x0a\x0a\x09self isConnected ifTrue:[ ^self ].\x0a\x09\x0a\x09self initializeSocket.\x0a\x09",
messageSends: ["ifTrue:", "isConnected", "initializeSocket"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "counter",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$receiver;
$2=self["@counter"];
if(($receiver = $2) == null || $receiver.isNil){
self["@counter"]=(1);
$1=self["@counter"];
} else {
$1=$2;
};
return $1;
}, function($ctx1) {$ctx1.fill(self,"counter",{},globals.WebSocketAPI)})},
args: [],
source: "counter\x0a\x09\x22Answers the counter used in the ids the commands (instead of less compact UUIDs)\x22\x0a\x0a\x09^ counter ifNil:[ counter := 1 ]",
messageSends: ["ifNil:"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "disconnect",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self._hasSocket();
if(smalltalk.assert($1)){
_st(self["@socket"])._close();
self._reset();
};
return self}, function($ctx1) {$ctx1.fill(self,"disconnect",{},globals.WebSocketAPI)})},
args: [],
source: "disconnect\x0a\x09\x22Disconnects the web socket.\x0a\x09No fail if there is none\x22\x0a\x09\x0a\x09self hasSocket ifTrue:[\x0a\x09\x09socket close.\x0a\x09\x09self reset]",
messageSends: ["ifTrue:", "hasSocket", "close", "reset"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "errorAbout:",
protocol: 'actions',
fn: function (anException){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(anException)._signal();
return $1;
}, function($ctx1) {$ctx1.fill(self,"errorAbout:",{anException:anException},globals.WebSocketAPI)})},
args: ["anException"],
source: "errorAbout: anException\x0a\x0a\x09^ anException signal",
messageSends: ["signal"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "hasSocket",
protocol: 'testing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self["@socket"])._notNil();
return $1;
}, function($ctx1) {$ctx1.fill(self,"hasSocket",{},globals.WebSocketAPI)})},
args: [],
source: "hasSocket\x0a\x0a\x09^ socket notNil",
messageSends: ["notNil"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "initialize",
protocol: 'initialization',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
($ctx1.supercall = true, globals.WebSocketAPI.superclass.fn.prototype._initialize.apply(_st(self), []));
$ctx1.supercall = false;
_st(window)._onbeforeunload_((function(){
return smalltalk.withContext(function($ctx2) {
return self._reset();
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"initialize",{},globals.WebSocketAPI)})},
args: [],
source: "initialize\x0a\x0a\x09super initialize.\x0a\x09\x0a\x09window onbeforeunload:[\x0a\x09\x09self reset ]",
messageSends: ["initialize", "onbeforeunload:", "reset"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "initializeAPIPath",
protocol: 'initialization',
fn: function (){
var self=this;
var $1;
self["@apiPath"]="ws";
$1=self["@apiPath"];
return $1;
},
args: [],
source: "initializeAPIPath\x0a\x0a\x09^ apiPath := 'ws'",
messageSends: [],
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
$2=self._newWebSocketOn_(self._uri());
_st($2)._onopen_(self._onOpenBlock());
_st($2)._onclose_(self._onCloseBlock());
_st($2)._onmessage_(self._onMessageBlock());
_st($2)._onerror_(self._onErrorBlock());
$3=_st($2)._yourself();
self["@socket"]=$3;
$1=self["@socket"];
return $1;
}, function($ctx1) {$ctx1.fill(self,"initializeSocket",{},globals.WebSocketAPI)})},
args: [],
source: "initializeSocket\x0a\x09\x0a\x09^ socket := (self newWebSocketOn: self uri)\x0a\x09\x09\x09\x09\x09onopen: self onOpenBlock;\x0a\x09\x09\x09\x09\x09onclose: self onCloseBlock;\x0a\x09\x09\x09\x09\x09onmessage: self onMessageBlock;\x0a\x09\x09\x09\x09\x09onerror: self onErrorBlock;\x0a\x09\x09\x09\x09\x09yourself\x09",
messageSends: ["onopen:", "newWebSocketOn:", "uri", "onOpenBlock", "onclose:", "onCloseBlock", "onmessage:", "onMessageBlock", "onerror:", "onErrorBlock", "yourself"],
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
var $4,$3,$2,$11,$10,$9,$13,$12,$8,$7,$16,$15,$14,$6,$5,$17,$19,$18,$1;
$4=_st(window)._location();
$ctx1.sendIdx["location"]=1;
$3=_st($4)._hostname();
$ctx1.sendIdx["hostname"]=1;
$2=_st($3).__eq("localhost");
if(smalltalk.assert($2)){
$11=self._class();
$ctx1.sendIdx["class"]=1;
$10=_st($11)._protocol();
$ctx1.sendIdx["protocol"]=1;
$9=_st($10).__comma("//");
$ctx1.sendIdx[","]=6;
$13=_st(window)._location();
$ctx1.sendIdx["location"]=2;
$12=_st($13)._hostname();
$ctx1.sendIdx["hostname"]=2;
$8=_st($9).__comma($12);
$ctx1.sendIdx[","]=5;
$7=_st($8).__comma(":");
$ctx1.sendIdx[","]=4;
$16=self._class();
$ctx1.sendIdx["class"]=2;
$15=_st($16)._port();
$14=_st($15)._asString();
$6=_st($7).__comma($14);
$ctx1.sendIdx[","]=3;
$5=_st($6).__comma("/");
$ctx1.sendIdx[","]=2;
$17=self._apiPath();
$ctx1.sendIdx["apiPath"]=1;
self["@uri"]=_st($5).__comma($17);
$ctx1.sendIdx[","]=1;
$1=self["@uri"];
} else {
$19=_st(_st(_st(self._class())._protocol()).__comma("//")).__comma(_st(_st(window)._location())._hostname());
$ctx1.sendIdx[","]=9;
$18=_st($19).__comma("/");
$ctx1.sendIdx[","]=8;
self["@uri"]=_st($18).__comma(self._apiPath());
$ctx1.sendIdx[","]=7;
$1=self["@uri"];
};
return $1;
}, function($ctx1) {$ctx1.fill(self,"initializeURI",{},globals.WebSocketAPI)})},
args: [],
source: "initializeURI\x0a\x0a\x09^ window location hostname = 'localhost' \x0a\x09\x09ifTrue:[ uri := self class protocol,'//',window location hostname,':',self class port asString,'/',self apiPath ]\x0a\x09\x09ifFalse:[ uri := self class protocol,'//',window location hostname, '/',self apiPath ]",
messageSends: ["ifTrue:ifFalse:", "=", "hostname", "location", ",", "protocol", "class", "asString", "port", "apiPath"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "isConnected",
protocol: 'testing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self._hasSocket())._and_((function(){
return smalltalk.withContext(function($ctx2) {
return _st(_st(self["@socket"])._readyState()).__eq((1));
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}));
return $1;
}, function($ctx1) {$ctx1.fill(self,"isConnected",{},globals.WebSocketAPI)})},
args: [],
source: "isConnected\x0a\x0a\x09^ self hasSocket and:[\x0a\x09socket readyState = 1 ]",
messageSends: ["and:", "hasSocket", "=", "readyState"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "isDisconnected",
protocol: 'testing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self._hasSocket())._or_((function(){
return smalltalk.withContext(function($ctx2) {
return _st(_st(self["@socket"])._readyState()).__tild_eq((1));
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}));
return $1;
}, function($ctx1) {$ctx1.fill(self,"isDisconnected",{},globals.WebSocketAPI)})},
args: [],
source: "isDisconnected\x0a\x0a\x09^ self hasSocket or:[\x0a\x09socket readyState ~= 1 ]",
messageSends: ["or:", "hasSocket", "~=", "readyState"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "localAnswers",
protocol: 'accessing',
fn: function (){
var self=this;
function $Dictionary(){return globals.Dictionary||(typeof Dictionary=="undefined"?nil:Dictionary)}
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$receiver;
$2=self["@localAnswers"];
if(($receiver = $2) == null || $receiver.isNil){
self["@localAnswers"]=_st($Dictionary())._new();
$1=self["@localAnswers"];
} else {
$1=$2;
};
return $1;
}, function($ctx1) {$ctx1.fill(self,"localAnswers",{},globals.WebSocketAPI)})},
args: [],
source: "localAnswers\x0a\x09\x22Returns the dictionary of callbacks that are waiting for its commands' answer.\x0a\x09The convention is to use the ids provided by the counter in the keys\x0a\x09and the callbacks in the values.\x22\x0a\x09\x0a\x09^ localAnswers ifNil:[ localAnswers := Dictionary new ]",
messageSends: ["ifNil:", "new"],
referencedClasses: ["Dictionary"]
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "localErrorFor:",
protocol: 'accessing',
fn: function (aWebSocketCommand){
var self=this;
var callback;
return smalltalk.withContext(function($ctx1) { 
var $1,$2,$3,$4,$5,$6;
$1=self._localErrors();
$ctx1.sendIdx["localErrors"]=1;
$2=_st(aWebSocketCommand)._fId();
$ctx1.sendIdx["fId"]=1;
callback=_st($1)._at_ifAbsent_($2,(function(){
return smalltalk.withContext(function($ctx2) {
$3=_st("No error callback found for \x22".__comma(_st(aWebSocketCommand)._asString())).__comma("\x22");
$ctx2.sendIdx[","]=1;
return self._error_($3);
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}));
$4=self._localErrors();
$5=_st(aWebSocketCommand)._fId();
$ctx1.sendIdx["fId"]=2;
_st($4)._removeKey_ifAbsent_($5,(function(){
return nil;
}));
$ctx1.sendIdx["removeKey:ifAbsent:"]=1;
_st(self._localAnswers())._removeKey_ifAbsent_(_st(aWebSocketCommand)._fId(),(function(){
return nil;
}));
$6=callback;
return $6;
}, function($ctx1) {$ctx1.fill(self,"localErrorFor:",{aWebSocketCommand:aWebSocketCommand,callback:callback},globals.WebSocketAPI)})},
args: ["aWebSocketCommand"],
source: "localErrorFor: aWebSocketCommand\x0a\x09\x22Returns the local error handler (or complain about the lack of one).\x0a\x09Removes both, the error handler and the normal callback.\x22\x0a\x09\x0a\x09| callback |\x0a\x09\x0a\x09callback := self localErrors  \x0a\x09\x09at: aWebSocketCommand fId\x0a\x09\x09ifAbsent:[ self error: 'No error callback found for \x22', aWebSocketCommand asString,'\x22' ].\x0a\x0a\x09self localErrors \x0a\x09\x09removeKey: aWebSocketCommand fId\x0a\x09\x09ifAbsent:[ nil ].\x0a\x09\x09\x0a\x09self localAnswers \x0a\x09\x09removeKey: aWebSocketCommand fId\x0a\x09\x09ifAbsent:[ nil ].\x0a\x09\x09\x0a\x09^ callback ",
messageSends: ["at:ifAbsent:", "localErrors", "fId", "error:", ",", "asString", "removeKey:ifAbsent:", "localAnswers"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "localErrors",
protocol: 'accessing',
fn: function (){
var self=this;
function $Dictionary(){return globals.Dictionary||(typeof Dictionary=="undefined"?nil:Dictionary)}
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$receiver;
$2=self["@localErrors"];
if(($receiver = $2) == null || $receiver.isNil){
self["@localErrors"]=_st($Dictionary())._new();
$1=self["@localErrors"];
} else {
$1=$2;
};
return $1;
}, function($ctx1) {$ctx1.fill(self,"localErrors",{},globals.WebSocketAPI)})},
args: [],
source: "localErrors\x0a\x09\x22Returns the dictionary of callbacks that are waiting for\x0a\x09its commands' answer reacting when (and if) they are an exception.\x0a\x09The convention is to use the ids provided by the counter in the keys\x0a\x09and the callbacks in the values.\x22\x0a\x09\x0a\x09^ localErrors ifNil:[ localErrors := Dictionary new ]",
messageSends: ["ifNil:", "new"],
referencedClasses: ["Dictionary"]
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "newBadCommandOn:",
protocol: 'actions',
fn: function (aWebSocketEvent){
var self=this;
function $BadCommand(){return globals.BadCommand||(typeof BadCommand=="undefined"?nil:BadCommand)}
return smalltalk.withContext(function($ctx1) { 
var $2,$3,$1;
$2=_st($BadCommand())._new();
_st($2)._problematic_(_st(aWebSocketEvent)._data());
$3=_st($2)._yourself();
$1=$3;
return $1;
}, function($ctx1) {$ctx1.fill(self,"newBadCommandOn:",{aWebSocketEvent:aWebSocketEvent},globals.WebSocketAPI)})},
args: ["aWebSocketEvent"],
source: "newBadCommandOn: aWebSocketEvent  \x0a\x09\x22Answers a new instance of BadCommand based on aWebSocketEvent.\x22\x0a\x0a\x09^ BadCommand new\x0a\x09\x09problematic: aWebSocketEvent data;\x0a\x09\x09yourself",
messageSends: ["problematic:", "new", "data", "yourself"],
referencedClasses: ["BadCommand"]
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "newWebSocketOn:",
protocol: 'actions',
fn: function (anUri){
var self=this;
return smalltalk.withContext(function($ctx1) { 
return new WebSocket(anUri);
return self}, function($ctx1) {$ctx1.fill(self,"newWebSocketOn:",{anUri:anUri},globals.WebSocketAPI)})},
args: ["anUri"],
source: "newWebSocketOn: anUri\x0a\x0a\x09<return new WebSocket(anUri)>\x0a\x09",
messageSends: [],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "nextId",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
self["@counter"]=_st(self._counter()).__plus((1));
$1=self["@counter"];
return $1;
}, function($ctx1) {$ctx1.fill(self,"nextId",{},globals.WebSocketAPI)})},
args: [],
source: "nextId\x0a\x09\x22Increments the counter and answers the value.\x22\x0a\x09\x0a\x09^ counter := self counter + 1",
messageSends: ["+", "counter"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "onCloseBlock",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$receiver;
$2=self["@onCloseBlock"];
if(($receiver = $2) == null || $receiver.isNil){
self["@onCloseBlock"]=(function(){
return smalltalk.withContext(function($ctx2) {
return self._reset();
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,2)})});
$1=self["@onCloseBlock"];
} else {
$1=$2;
};
return $1;
}, function($ctx1) {$ctx1.fill(self,"onCloseBlock",{},globals.WebSocketAPI)})},
args: [],
source: "onCloseBlock\x0a\x0a\x09^ onCloseBlock ifNil:[ onCloseBlock := [ self reset ] ]",
messageSends: ["ifNil:", "reset"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "onCloseBlock:",
protocol: 'accessing',
fn: function (aBlock){
var self=this;
self["@onCloseBlock"]=aBlock;
return self},
args: ["aBlock"],
source: "onCloseBlock: aBlock\x0a\x0a\x09onCloseBlock := aBlock",
messageSends: [],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "onError:for:",
protocol: 'reactions',
fn: function (anException,aWebSocketCommand){
var self=this;
var callback;
return smalltalk.withContext(function($ctx1) { 
var $1,$2,$3,$4,$5;
$1=self._localErrors();
$ctx1.sendIdx["localErrors"]=1;
$2=_st(aWebSocketCommand)._fId();
$ctx1.sendIdx["fId"]=1;
callback=_st($1)._at_ifAbsent_($2,(function(){
return smalltalk.withContext(function($ctx2) {
$3=_st("No error callback found for \x22".__comma(_st(aWebSocketCommand)._asString())).__comma("\x22");
$ctx2.sendIdx[","]=1;
return self._error_($3);
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}));
$4=self._localErrors();
$5=_st(aWebSocketCommand)._fId();
$ctx1.sendIdx["fId"]=2;
_st($4)._removeKey_ifAbsent_($5,(function(){
return nil;
}));
$ctx1.sendIdx["removeKey:ifAbsent:"]=1;
_st(self._localAnswers())._removeKey_ifAbsent_(_st(aWebSocketCommand)._fId(),(function(){
return nil;
}));
_st(callback)._value_(anException);
return self}, function($ctx1) {$ctx1.fill(self,"onError:for:",{anException:anException,aWebSocketCommand:aWebSocketCommand,callback:callback},globals.WebSocketAPI)})},
args: ["anException", "aWebSocketCommand"],
source: "onError: anException for: aWebSocketCommand\x0a\x09\x22Reacts to anException with the callback that is \x0a\x09registered for aWebSocketCommand.\x22\x0a\x0a\x09| callback |\x0a\x09\x0a\x09callback := self localErrors  \x0a\x09\x09at: aWebSocketCommand fId\x0a\x09\x09ifAbsent:[ self error: 'No error callback found for \x22', aWebSocketCommand asString,'\x22' ].\x0a\x0a\x09self localErrors \x0a\x09\x09removeKey: aWebSocketCommand fId\x0a\x09\x09ifAbsent:[ nil ].\x0a\x09\x09\x0a\x09self localAnswers \x0a\x09\x09removeKey: aWebSocketCommand fId\x0a\x09\x09ifAbsent:[ nil ].\x0a\x0a\x09callback value: anException",
messageSends: ["at:ifAbsent:", "localErrors", "fId", "error:", ",", "asString", "removeKey:ifAbsent:", "localAnswers", "value:"],
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
selector: "onMessage:",
protocol: 'reactions',
fn: function (anEvent){
var self=this;
var command;
function $Transcript(){return globals.Transcript||(typeof Transcript=="undefined"?nil:Transcript)}
function $WebSocketCommand(){return globals.WebSocketCommand||(typeof WebSocketCommand=="undefined"?nil:WebSocketCommand)}
return smalltalk.withContext(function($ctx1) { 
var $1,$2,$receiver;
_st($Transcript())._cr();
$1=_st($Transcript())._show_(_st(anEvent)._data());
command=_st($WebSocketCommand())._for_(anEvent);
$2=command;
if(($receiver = $2) == null || $receiver.isNil){
command=self._newBadCommandOn_(anEvent);
command;
} else {
$2;
};
self._trigger_with_("commandReceived:",command);
_st(command)._receivedOn_(self);
return self}, function($ctx1) {$ctx1.fill(self,"onMessage:",{anEvent:anEvent,command:command},globals.WebSocketAPI)})},
args: ["anEvent"],
source: "onMessage: anEvent\x0a\x0a\x09| command |\x0a\x0a\x09Transcript cr; show: anEvent data.\x0a\x09command := WebSocketCommand for: anEvent.\x0a\x09command ifNil:[ command := self newBadCommandOn: anEvent ].\x0a\x0a\x09self trigger: 'commandReceived:' with: command.\x0a\x09command receivedOn: self \x0a\x09",
messageSends: ["cr", "show:", "data", "for:", "ifNil:", "newBadCommandOn:", "trigger:with:", "receivedOn:"],
referencedClasses: ["Transcript", "WebSocketCommand"]
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "onMessageBlock",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$receiver;
$2=self["@onMessageBlock"];
if(($receiver = $2) == null || $receiver.isNil){
self["@onMessageBlock"]=(function(anEvent){
return smalltalk.withContext(function($ctx2) {
return self._onMessage_(anEvent);
}, function($ctx2) {$ctx2.fillBlock({anEvent:anEvent},$ctx1,2)})});
$1=self["@onMessageBlock"];
} else {
$1=$2;
};
return $1;
}, function($ctx1) {$ctx1.fill(self,"onMessageBlock",{},globals.WebSocketAPI)})},
args: [],
source: "onMessageBlock\x0a\x0a\x09^ onMessageBlock ifNil:[ onMessageBlock := [:anEvent | self onMessage: anEvent ] ]",
messageSends: ["ifNil:", "onMessage:"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "onMessageBlock:",
protocol: 'accessing',
fn: function (aBlock){
var self=this;
self["@onMessageBlock"]=aBlock;
return self},
args: ["aBlock"],
source: "onMessageBlock: aBlock\x0a\x0a\x09onMessageBlock := aBlock",
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
selector: "publish:",
protocol: 'actions',
fn: function (anObject){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self._publish_at_(anObject,_st(anObject)._id());
return $1;
}, function($ctx1) {$ctx1.fill(self,"publish:",{anObject:anObject},globals.WebSocketAPI)})},
args: ["anObject"],
source: "publish: anObject \x0a\x09\x22Holds anObject among those exposed to receive remote messages.\x22\x0a\x09^ self publish: anObject at: anObject id",
messageSends: ["publish:at:", "id"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "publish:at:",
protocol: 'actions',
fn: function (anObject,anId){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self._published())._at_put_(anId,anObject);
return $1;
}, function($ctx1) {$ctx1.fill(self,"publish:at:",{anObject:anObject,anId:anId},globals.WebSocketAPI)})},
args: ["anObject", "anId"],
source: "publish: anObject at: anId\x0a\x09\x22Holds anObject among those exposed to receive remote messages.\x22\x0a\x09^ self published at: anId put: anObject",
messageSends: ["at:put:", "published"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "published",
protocol: 'accessing',
fn: function (){
var self=this;
function $Dictionary(){return globals.Dictionary||(typeof Dictionary=="undefined"?nil:Dictionary)}
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$receiver;
$2=self["@published"];
if(($receiver = $2) == null || $receiver.isNil){
self["@published"]=_st($Dictionary())._new();
$1=self["@published"];
} else {
$1=$2;
};
return $1;
}, function($ctx1) {$ctx1.fill(self,"published",{},globals.WebSocketAPI)})},
args: [],
source: "published\x0a\x09\x22Answers the dictionary holding the published objects \x0a\x09in 'this smalltalk' environment.\x0a\x09Keys can be the instance's hash, a Mapless UUID, etc.\x0a\x09Values are the instances receiving messages from remote.\x22\x0a\x09^ published ifNil:[ published := Dictionary new ]",
messageSends: ["ifNil:", "new"],
referencedClasses: ["Dictionary"]
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "remoteAnswerFor:",
protocol: 'actions',
fn: function (aWebSocketCommand){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._sendCommand_(aWebSocketCommand);
return self}, function($ctx1) {$ctx1.fill(self,"remoteAnswerFor:",{aWebSocketCommand:aWebSocketCommand},globals.WebSocketAPI)})},
args: ["aWebSocketCommand"],
source: "remoteAnswerFor: aWebSocketCommand\x0a\x09\x22Sends aWebSocketCommand to the other end.\x22\x0a\x09\x0a\x09self sendCommand: aWebSocketCommand",
messageSends: ["sendCommand:"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "remoteAnswerFor:onError:",
protocol: 'actions',
fn: function (aWebSocketCommand,aBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._sendCommand_onError_(aWebSocketCommand,aBlock);
return self}, function($ctx1) {$ctx1.fill(self,"remoteAnswerFor:onError:",{aWebSocketCommand:aWebSocketCommand,aBlock:aBlock},globals.WebSocketAPI)})},
args: ["aWebSocketCommand", "aBlock"],
source: "remoteAnswerFor: aWebSocketCommand onError: aBlock\x0a\x09\x22Sends aWebSocketCommand to the other end.\x22\x0a\x09\x0a\x09self sendCommand: aWebSocketCommand onError: aBlock",
messageSends: ["sendCommand:onError:"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "remoteReferenceFor:",
protocol: 'actions',
fn: function (anObject){
var self=this;
var ref;
return smalltalk.withContext(function($ctx1) { 
var $1,$2,$3;
self._nextId();
ref=_st(anObject)._asRemoteReference();
$1=_st(ref)._isRemoteReference();
if(smalltalk.assert($1)){
var anId;
anId=_st(self._published())._keyAtValue_ifAbsent_(anObject,(function(){
return nil;
}));
anId;
$2=_st(anId)._isNil();
if(smalltalk.assert($2)){
_st(ref)._id_(self._counter());
$ctx1.sendIdx["id:"]=1;
self._publish_at_(anObject,_st(ref)._id());
} else {
_st(ref)._id_(anId);
};
};
$3=ref;
return $3;
}, function($ctx1) {$ctx1.fill(self,"remoteReferenceFor:",{anObject:anObject,ref:ref},globals.WebSocketAPI)})},
args: ["anObject"],
source: "remoteReferenceFor: anObject\x0a\x09\x22Answers a remote reference for anObject in this API or\x0a\x09a copy if the object is simple enough to travel as copy.\x0a\x09If reference, it'll keep it among those published.\x22\x0a\x0a\x09| ref |\x09\x0a\x0a\x09self nextId.\x0a\x09\x0a\x09ref := anObject asRemoteReference.\x0a\x09ref isRemoteReference ifTrue:[ | anId |\x0a\x09\x09anId := self published keyAtValue: anObject ifAbsent: [ nil ].\x0a\x09\x09anId isNil \x0a\x09\x09\x09ifTrue:[\x0a\x09\x09\x09\x09ref id: self counter.\x09\x09\x0a\x09\x09\x09\x09self publish: anObject at: ref id ]\x0a\x09\x09\x09ifFalse:[ ref id: anId ] ].\x0a\x09\x09\x0a\x09^ ref",
messageSends: ["nextId", "asRemoteReference", "ifTrue:", "isRemoteReference", "keyAtValue:ifAbsent:", "published", "ifTrue:ifFalse:", "isNil", "id:", "counter", "publish:at:", "id"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "reset",
protocol: 'actions',
fn: function (){
var self=this;
self["@socket"]=nil;
return self},
args: [],
source: "reset\x0a\x09\x09\x0a\x09socket := nil",
messageSends: [],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "sendCommand:",
protocol: 'actions',
fn: function (aWebSocketCommand){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self._sendCommand_onError_(aWebSocketCommand,(function(x){
return smalltalk.withContext(function($ctx2) {
return self._errorAbout_(x);
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,1)})}));
return $1;
}, function($ctx1) {$ctx1.fill(self,"sendCommand:",{aWebSocketCommand:aWebSocketCommand},globals.WebSocketAPI)})},
args: ["aWebSocketCommand"],
source: "sendCommand: aWebSocketCommand\x0a\x09\x22Sends aWebSocketCommand to the other side of the wire.\x0a\x09Will throw an APIError if an exception happens\x22\x0a\x09\x0a\x09^ self \x0a\x09\x09sendCommand: aWebSocketCommand\x0a\x09\x09onError:[ :x | self errorAbout: x ]",
messageSends: ["sendCommand:onError:", "errorAbout:"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "sendCommand:do:",
protocol: 'actions',
fn: function (aCommand,aBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self._sendCommand_do_onError_(aCommand,aBlock,(function(x){
return smalltalk.withContext(function($ctx2) {
return self._errorAbout_(x);
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,1)})}));
return $1;
}, function($ctx1) {$ctx1.fill(self,"sendCommand:do:",{aCommand:aCommand,aBlock:aBlock},globals.WebSocketAPI)})},
args: ["aCommand", "aBlock"],
source: "sendCommand: aCommand do: aBlock\x0a\x09\x22Sends aCommand to the other side of the wire.\x0a\x09Evaluates aBlock when the answer arrives.\x22\x0a\x09\x0a\x09^ self \x0a\x09\x09sendCommand: aCommand \x0a\x09\x09do: aBlock\x0a\x09\x09onError: [ :x | self errorAbout: x ]",
messageSends: ["sendCommand:do:onError:", "errorAbout:"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "sendCommand:do:onError:",
protocol: 'actions',
fn: function (aWebSocketCommand,anAnswerBlock,aBlock){
var self=this;
function $Error(){return globals.Error||(typeof Error=="undefined"?nil:Error)}
return smalltalk.withContext(function($ctx1) { 
var $1,$2,$3,$4;
$1=_st(aWebSocketCommand)._isFromBackend();
if(! smalltalk.assert($1)){
self._nextId();
$2=self._counter();
$ctx1.sendIdx["counter"]=1;
_st(aWebSocketCommand)._fId_($2);
$3=self._localAnswers();
$4=self._counter();
$ctx1.sendIdx["counter"]=2;
_st($3)._at_put_($4,anAnswerBlock);
$ctx1.sendIdx["at:put:"]=1;
_st(self._localErrors())._at_put_(self._counter(),aBlock);
};
_st((function(){
return smalltalk.withContext(function($ctx2) {
_st(aWebSocketCommand)._onAboutToSend();
_st(self._socket())._send_(_st(aWebSocketCommand)._asJSONString());
return _st(aWebSocketCommand)._onAfterSent();
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,2)})}))._on_do_($Error(),(function(x){
return smalltalk.withContext(function($ctx2) {
return self._onError_for_(x,aWebSocketCommand);
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,3)})}));
return self}, function($ctx1) {$ctx1.fill(self,"sendCommand:do:onError:",{aWebSocketCommand:aWebSocketCommand,anAnswerBlock:anAnswerBlock,aBlock:aBlock},globals.WebSocketAPI)})},
args: ["aWebSocketCommand", "anAnswerBlock", "aBlock"],
source: "sendCommand: aWebSocketCommand do: anAnswerBlock onError: aBlock\x0a\x09\x22Sends aWebSocketCommand to the other side of the wire.\x0a\x09Registers anAnswerBlock to be evaluated later when the answer arrives.\x0a\x09Evaluates aBlock if there is an exception while doing it.\x22\x0a\x09\x0a\x09aWebSocketCommand isFromBackend ifFalse:[ \x0a\x09\x09self nextId.\x0a\x09\x09\x22Marks the commandwith a frontend's id.\x22\x0a\x09\x09aWebSocketCommand fId: self counter.\x0a\x09\x09self localAnswers at: self counter put: anAnswerBlock.\x0a\x09\x09self localErrors at: self counter put: aBlock ].\x0a\x09\x0a\x09[ aWebSocketCommand onAboutToSend.\x0a\x09self socket send: aWebSocketCommand asJSONString.\x0a\x09aWebSocketCommand onAfterSent ]\x0a\x09\x09on: Error\x0a\x09\x09do:[ :x | self onError: x for: aWebSocketCommand ]\x0a\x09",
messageSends: ["ifFalse:", "isFromBackend", "nextId", "fId:", "counter", "at:put:", "localAnswers", "localErrors", "on:do:", "onAboutToSend", "send:", "socket", "asJSONString", "onAfterSent", "onError:for:"],
referencedClasses: ["Error"]
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "sendCommand:onError:",
protocol: 'actions',
fn: function (aCommand,aBlock){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self._sendCommand_do_onError_(aCommand,(function(){
}),aBlock);
return $1;
}, function($ctx1) {$ctx1.fill(self,"sendCommand:onError:",{aCommand:aCommand,aBlock:aBlock},globals.WebSocketAPI)})},
args: ["aCommand", "aBlock"],
source: "sendCommand: aCommand onError: aBlock\x0a\x09\x22Sends aCommand to the other side of the wire.\x0a\x09Evaluates aBlock if there is an exception while doing it.\x22\x0a\x09\x0a\x09^ self \x0a\x09\x09sendCommand: aCommand \x0a\x09\x09do: [ \x22ignoring answer\x22 ] \x0a\x09\x09onError: aBlock",
messageSends: ["sendCommand:do:onError:"],
referencedClasses: []
}),
globals.WebSocketAPI);

smalltalk.addMethod(
smalltalk.method({
selector: "sendMessage:on:",
protocol: 'actions',
fn: function (aMessage,aRemoteObject){
var self=this;
function $RMS(){return globals.RMS||(typeof RMS=="undefined"?nil:RMS)}
return smalltalk.withContext(function($ctx1) { 
var $1;
self._sendCommand_do_onError_(_st($RMS())._to_send_withAll_(_st(aRemoteObject)._id(),_st(aMessage)._selector(),_st(aMessage)._arguments()),(function(ans){
return smalltalk.withContext(function($ctx2) {
$1=_st(aRemoteObject)._future();
$ctx2.sendIdx["future"]=1;
return _st($1)._resolve_(ans);
}, function($ctx2) {$ctx2.fillBlock({ans:ans},$ctx1,1)})}),(function(x){
return smalltalk.withContext(function($ctx2) {
return _st(_st(_st(aRemoteObject)._future())._at_("fail"))._value_(x);
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,2)})}));
return aRemoteObject;
}, function($ctx1) {$ctx1.fill(self,"sendMessage:on:",{aMessage:aMessage,aRemoteObject:aRemoteObject},globals.WebSocketAPI)})},
args: ["aMessage", "aRemoteObject"],
source: "sendMessage: aMessage on: aRemoteObject\x0a\x09\x22Sends aMessage to aRemoteObject.\x22\x0a\x0a\x09self \x0a\x09\x09sendCommand: (RMS to: aRemoteObject id send: aMessage selector withAll: aMessage arguments)\x0a\x09\x09do: [ :ans | aRemoteObject future resolve: ans ]\x0a\x09\x09onError: [ :x | (aRemoteObject future at: 'fail') value: x ].\x0a\x09\x09\x0a\x09^ aRemoteObject",
messageSends: ["sendCommand:do:onError:", "to:send:withAll:", "id", "selector", "arguments", "resolve:", "future", "value:", "at:"],
referencedClasses: ["RMS"]
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
globals.WebSocketAPI.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "protocol",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$1;
$2=self._isSSL();
if(smalltalk.assert($2)){
$1="wss:";
} else {
$1="ws:";
};
return $1;
}, function($ctx1) {$ctx1.fill(self,"protocol",{},globals.WebSocketAPI.klass)})},
args: [],
source: "protocol\x0a\x0a\x09^ self isSSL\x0a\x09\x09ifTrue:[ 'wss:' ]\x0a\x09\x09ifFalse:[ 'ws:' ]",
messageSends: ["ifTrue:ifFalse:", "isSSL"],
referencedClasses: []
}),
globals.WebSocketAPI.klass);


smalltalk.addClass('RR', globals.Mapless, [], 'Flow-API');
globals.RR.comment="##RR alias of RemoteReference \x0a\x0aInstances of RemoteReference are used when you cannot send as copy an object that is the answer of some remote command.\x0a\x0aThe remote end will be able to use aRemoteReference asRemote and send a message remotely to it.\x0a\x0aThe reason for the short name instead of the long explicit one is merely bandwith optimization";
smalltalk.addMethod(
smalltalk.method({
selector: "isRemoteReference",
protocol: 'testing',
fn: function (){
var self=this;
return true;
},
args: [],
source: "isRemoteReference\x0a\x0a\x09^ true",
messageSends: [],
referencedClasses: []
}),
globals.RR);



smalltalk.addClass('Remote', globals.ProtoObject, ['id', 'future'], 'Flow-API');
globals.Remote.comment="## RemoteObject\x0a\x0aIs a Proxy to an instance in the other side of the wire\x0a\x0aInstances of RemoteObject route messages and answers to the instance at the destination";
smalltalk.addMethod(
smalltalk.method({
selector: "doesNotUnderstand:",
protocol: 'actions',
fn: function (aMessage){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1,$2,$receiver;
$1=self["@future"];
if(($receiver = $1) == null || $receiver.isNil){
self._initializeFuture();
} else {
$1;
};
$2=_st(_st(self._class())._client())._sendMessage_on_(aMessage,self);
return $2;
}, function($ctx1) {$ctx1.fill(self,"doesNotUnderstand:",{aMessage:aMessage},globals.Remote)})},
args: ["aMessage"],
source: "doesNotUnderstand: aMessage\x0a\x09\x22Route aMessage to the client so it gets sent to the receiver in the other end.\x0a\x09It assumes that all reactions (like done, onError, etc) are properly pre-set\x22\x0a\x09\x0a\x09future ifNil:[ self initializeFuture ].\x0a\x09\x0a\x09^ self class client sendMessage: aMessage on: self",
messageSends: ["ifNil:", "initializeFuture", "sendMessage:on:", "client", "class"],
referencedClasses: []
}),
globals.Remote);

smalltalk.addMethod(
smalltalk.method({
selector: "future",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$receiver;
$2=self["@future"];
if(($receiver = $2) == null || $receiver.isNil){
self["@future"]=_st(jQuery)._Deferred();
$1=self["@future"];
} else {
$1=$2;
};
return $1;
}, function($ctx1) {$ctx1.fill(self,"future",{},globals.Remote)})},
args: [],
source: "future\x0a\x09\x22Answers the jQuery future\x0a\x09http://api.jquery.com/category/deferred-object/\x22\x0a\x09\x0a\x09^ future ifNil:[ future := jQuery Deferred ]",
messageSends: ["ifNil:", "Deferred"],
referencedClasses: []
}),
globals.Remote);

smalltalk.addMethod(
smalltalk.method({
selector: "id",
protocol: 'accessing',
fn: function (){
var self=this;
var $1;
$1=self["@id"];
return $1;
},
args: [],
source: "id\x0a\x0a\x09^ id",
messageSends: [],
referencedClasses: []
}),
globals.Remote);

smalltalk.addMethod(
smalltalk.method({
selector: "initializeFuture",
protocol: 'initialization',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
self["@future"]=_st(jQuery)._Deferred();
_st(self["@future"])._fail_((function(x){
return smalltalk.withContext(function($ctx2) {
return _st(x)._signal();
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,1)})}));
$1=self["@future"];
return $1;
}, function($ctx1) {$ctx1.fill(self,"initializeFuture",{},globals.Remote)})},
args: [],
source: "initializeFuture\x0a\x09\x0a\x09future := jQuery Deferred.\x0a\x09\x0a\x09future fail: [ :x | x signal ].\x0a\x09\x0a\x09^ future",
messageSends: ["Deferred", "fail:", "signal"],
referencedClasses: []
}),
globals.Remote);

smalltalk.addMethod(
smalltalk.method({
selector: "initializeOn:",
protocol: 'accessing',
fn: function (aString){
var self=this;
self["@id"]=aString;
return self},
args: ["aString"],
source: "initializeOn: aString\x0a\x0a\x09id := aString\x0a\x09",
messageSends: [],
referencedClasses: []
}),
globals.Remote);

smalltalk.addMethod(
smalltalk.method({
selector: "inspectOn:",
protocol: 'actions',
fn: function (anInspector){
var self=this;
var variables;
function $Dictionary(){return globals.Dictionary||(typeof Dictionary=="undefined"?nil:Dictionary)}
return smalltalk.withContext(function($ctx1) { 
var $1;
variables=_st($Dictionary())._new();
_st(variables)._at_put_("#self",self);
$ctx1.sendIdx["at:put:"]=1;
_st(_st(self._class())._allInstanceVariableNames())._do_((function(each){
return smalltalk.withContext(function($ctx2) {
return _st(variables)._at_put_(each,self._instVarAt_(each));
}, function($ctx2) {$ctx2.fillBlock({each:each},$ctx1,1)})}));
_st(anInspector)._setLabel_(self._printString());
$1=_st(anInspector)._setVariables_(variables);
return self}, function($ctx1) {$ctx1.fill(self,"inspectOn:",{anInspector:anInspector,variables:variables},globals.Remote)})},
args: ["anInspector"],
source: "inspectOn: anInspector\x0a\x09| variables |\x0a\x09variables := Dictionary new.\x0a\x09variables at: '#self' put: self.\x0a\x09self class allInstanceVariableNames do: [ :each |\x0a\x09\x09variables at: each put: (self instVarAt: each) ].\x0a\x09anInspector\x0a\x09\x09setLabel: self printString;\x0a\x09\x09setVariables: variables",
messageSends: ["new", "at:put:", "do:", "allInstanceVariableNames", "class", "instVarAt:", "setLabel:", "printString", "setVariables:"],
referencedClasses: ["Dictionary"]
}),
globals.Remote);

smalltalk.addMethod(
smalltalk.method({
selector: "isRemote",
protocol: 'testing',
fn: function (){
var self=this;
return true;
},
args: [],
source: "isRemote\x0a\x09\x22Answers true if this object is remote\x22\x0a\x0a\x09^ true",
messageSends: [],
referencedClasses: []
}),
globals.Remote);

smalltalk.addMethod(
smalltalk.method({
selector: "printOn:",
protocol: 'actions',
fn: function (aStream){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
($ctx1.supercall = true, globals.Remote.superclass.fn.prototype._printOn_.apply(_st(self), [aStream]));
$ctx1.supercall = false;
$1=_st("(".__comma(_st(self["@id"])._asString())).__comma(")");
$ctx1.sendIdx[","]=1;
_st(aStream)._nextPutAll_($1);
return self}, function($ctx1) {$ctx1.fill(self,"printOn:",{aStream:aStream},globals.Remote)})},
args: ["aStream"],
source: "printOn: aStream\x0a\x0a\x09super printOn: aStream.\x0a\x09\x0a\x09aStream nextPutAll: '(',id asString,')'",
messageSends: ["printOn:", "nextPutAll:", ",", "asString"],
referencedClasses: []
}),
globals.Remote);


globals.Remote.klass.iVarNames = ['client'];
smalltalk.addMethod(
smalltalk.method({
selector: "client",
protocol: 'accessing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$receiver;
$2=self["@client"];
if(($receiver = $2) == null || $receiver.isNil){
self["@client"]=_st(_st(_st(app)._session())._api())._ws();
$1=self["@client"];
} else {
$1=$2;
};
return $1;
}, function($ctx1) {$ctx1.fill(self,"client",{},globals.Remote.klass)})},
args: [],
source: "client\x0a\x09\x22Answers the client that RemoteObject instances should use for \x0a\x09accessing the destination instances in the other end.\x22\x0a\x0a\x09^ client ifNil:[ client := app session api ws ]",
messageSends: ["ifNil:", "ws", "api", "session"],
referencedClasses: []
}),
globals.Remote.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "client:",
protocol: 'accessing',
fn: function (aClient){
var self=this;
self["@client"]=aClient;
return self},
args: ["aClient"],
source: "client: aClient\x0a\x0a\x09client := aClient",
messageSends: [],
referencedClasses: []
}),
globals.Remote.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "for:",
protocol: 'actions',
fn: function (aString){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$3,$1;
$2=self._new();
_st($2)._initializeOn_(aString);
$3=_st($2)._yourself();
$1=$3;
return $1;
}, function($ctx1) {$ctx1.fill(self,"for:",{aString:aString},globals.Remote.klass)})},
args: ["aString"],
source: "for: aString\x0a\x09\x22Answer a new RemoteObject instance based on the id aString\x22\x0a\x09\x0a\x09^ self new\x0a\x09\x09initializeOn: aString;\x0a\x09\x09yourself",
messageSends: ["initializeOn:", "new", "yourself"],
referencedClasses: []
}),
globals.Remote.klass);


smalltalk.addClass('WebSocketCommand', globals.Mapless, [], 'Flow-API');
globals.WebSocketCommand.comment="## A WebSocketCommand is an abstraction.\x0a\x0aSubclasses are concrete objects that easily travel \x0a\x0a1. from the frontend to the backend and/or \x0a\x0a2. come from the backend to the frontend.\x0a\x0aThey have the concrete knowledge of how to react or who to delegate behaviour.\x0a\x0aThey also carry any information necessary to achieve some reaction at their destination.\x0a\x0aIt's a convention that commands without @answer are yet to be executed, and all executed commands have an answer set (they're an exception if they need to)\x0a\x0aNote: they are Mapless only as convenience for traveling over the wire. You can if you like to but, originally, they are not meant to be persisted.";
smalltalk.addMethod(
smalltalk.method({
selector: "executeOn:",
protocol: 'actions',
fn: function (anAPIClient){
var self=this;
function $Error(){return globals.Error||(typeof Error=="undefined"?nil:Error)}
return smalltalk.withContext(function($ctx1) { 
var $1;
_st((function(){
return smalltalk.withContext(function($ctx2) {
return self._processOn_(anAPIClient);
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}))._on_do_($Error(),(function(x){
return smalltalk.withContext(function($ctx2) {
self._isException_(true);
$1=self._answer_(_st(x)._asString());
return $1;
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,2)})}));
self._remoteAnswerOn_(anAPIClient);
return self}, function($ctx1) {$ctx1.fill(self,"executeOn:",{anAPIClient:anAPIClient},globals.WebSocketCommand)})},
args: ["anAPIClient"],
source: "executeOn: anAPIClient\x0a\x09\x22Executes this command comming from anAPIClient\x0a\x09and performs the remote answer.\x22\x0a\x09\x0a\x09[ self processOn: anAPIClient ]\x0a\x09\x09on: Error \x0a\x09\x09do:[ :x | \x0a\x09\x09\x09\x09self\x0a\x09\x09\x09\x09\x09isException: true;\x0a\x09\x09\x09\x09\x09answer: x asString ].\x0a\x09\x09\x09\x09\x09\x0a\x09self remoteAnswerOn: anAPIClient\x0a\x09",
messageSends: ["on:do:", "processOn:", "isException:", "answer:", "asString", "remoteAnswerOn:"],
referencedClasses: ["Error"]
}),
globals.WebSocketCommand);

smalltalk.addMethod(
smalltalk.method({
selector: "hasAnswer",
protocol: 'testing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self._answer())._notNil();
return $1;
}, function($ctx1) {$ctx1.fill(self,"hasAnswer",{},globals.WebSocketCommand)})},
args: [],
source: "hasAnswer\x0a\x09\x22Answers true if this command has an answer at all.\x22\x0a\x0a\x09^ self answer notNil\x0a\x09",
messageSends: ["notNil", "answer"],
referencedClasses: []
}),
globals.WebSocketCommand);

smalltalk.addMethod(
smalltalk.method({
selector: "isAnswer",
protocol: 'testing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self._hasAnswer();
return $1;
}, function($ctx1) {$ctx1.fill(self,"isAnswer",{},globals.WebSocketCommand)})},
args: [],
source: "isAnswer\x0a\x09\x22Answers true if this command is an answer.\x22\x0a\x0a\x09^ self hasAnswer",
messageSends: ["hasAnswer"],
referencedClasses: []
}),
globals.WebSocketCommand);

smalltalk.addMethod(
smalltalk.method({
selector: "isFromBackend",
protocol: 'testing',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(self._bId())._notNil();
return $1;
}, function($ctx1) {$ctx1.fill(self,"isFromBackend",{},globals.WebSocketCommand)})},
args: [],
source: "isFromBackend\x0a\x09\x22Answers true if this command was originated at the backend side.\x22\x0a\x09\x0a\x09^ self bId notNil",
messageSends: ["notNil", "bId"],
referencedClasses: []
}),
globals.WebSocketCommand);

smalltalk.addMethod(
smalltalk.method({
selector: "localAnswerOn:",
protocol: 'actions',
fn: function (anAPIClient){
var self=this;
function $APIRemoteException(){return globals.APIRemoteException||(typeof APIRemoteException=="undefined"?nil:APIRemoteException)}
return smalltalk.withContext(function($ctx1) { 
var $3,$2,$1,$4;
$3=self._isException();
$ctx1.sendIdx["isException"]=1;
$2=_st($3)._notNil();
$1=_st($2)._and_((function(){
return smalltalk.withContext(function($ctx2) {
return self._isException();
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}));
if(smalltalk.assert($1)){
$4=_st(_st(anAPIClient)._localErrorFor_(self))._value_(_st($APIRemoteException())._for_(self));
return $4;
};
_st(anAPIClient)._answerLocallyFor_(self);
return self}, function($ctx1) {$ctx1.fill(self,"localAnswerOn:",{anAPIClient:anAPIClient},globals.WebSocketCommand)})},
args: ["anAPIClient"],
source: "localAnswerOn:  anAPIClient\x0a\x09\x22Tells the API to perform whatever is pending\x0a\x09in the local answer of this command\x22\x0a\x09\x0a\x09(self isException notNil and:[\x0a\x09self isException ]) ifTrue:[\x0a\x09\x09^ (anAPIClient localErrorFor: self) value: (APIRemoteException for: self) ].\x0a\x09\x0a\x09anAPIClient answerLocallyFor: self",
messageSends: ["ifTrue:", "and:", "notNil", "isException", "value:", "localErrorFor:", "for:", "answerLocallyFor:"],
referencedClasses: ["APIRemoteException"]
}),
globals.WebSocketCommand);

smalltalk.addMethod(
smalltalk.method({
selector: "onAboutToAnswer",
protocol: 'reactions',
fn: function (){
var self=this;
return self},
args: [],
source: "onAboutToAnswer\x0a\x09\x22This command is about to execute its answer callback.\x22\x0a\x09\x0a\x09\x22no-op\x22",
messageSends: [],
referencedClasses: []
}),
globals.WebSocketCommand);

smalltalk.addMethod(
smalltalk.method({
selector: "onAboutToSend",
protocol: 'reactions',
fn: function (){
var self=this;
return self},
args: [],
source: "onAboutToSend\x0a\x09\x22This command is about to be sent to the remote end.\x22\x0a\x09\x0a\x09\x22no-op\x22",
messageSends: [],
referencedClasses: []
}),
globals.WebSocketCommand);

smalltalk.addMethod(
smalltalk.method({
selector: "onAfterSent",
protocol: 'reactions',
fn: function (){
var self=this;
return self},
args: [],
source: "onAfterSent\x0a\x09\x22This command was just sent to the remote end.\x22\x0a\x09\x0a\x09\x22no-op\x22",
messageSends: [],
referencedClasses: []
}),
globals.WebSocketCommand);

smalltalk.addMethod(
smalltalk.method({
selector: "onAnsweredBy:",
protocol: 'reactions',
fn: function (anAPIClient){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._localAnswerOn_(anAPIClient);
return self}, function($ctx1) {$ctx1.fill(self,"onAnsweredBy:",{anAPIClient:anAPIClient},globals.WebSocketCommand)})},
args: ["anAPIClient"],
source: "onAnsweredBy: anAPIClient\x0a\x09\x22This command arrived with an answer\x22\x0a\x0a\x09self localAnswerOn: anAPIClient",
messageSends: ["localAnswerOn:"],
referencedClasses: []
}),
globals.WebSocketCommand);

smalltalk.addMethod(
smalltalk.method({
selector: "onCommandFrom:",
protocol: 'reactions',
fn: function (anAPIClient){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._executeOn_(anAPIClient);
return self}, function($ctx1) {$ctx1.fill(self,"onCommandFrom:",{anAPIClient:anAPIClient},globals.WebSocketCommand)})},
args: ["anAPIClient"],
source: "onCommandFrom: anAPIClient\x0a\x09\x22This command arrived from anAPIClient, time to execute and answer it\x22\x0a\x09\x0a\x09self executeOn: anAPIClient",
messageSends: ["executeOn:"],
referencedClasses: []
}),
globals.WebSocketCommand);

smalltalk.addMethod(
smalltalk.method({
selector: "printOn:",
protocol: 'actions',
fn: function (aStream){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $3,$2,$1,$4;
($ctx1.supercall = true, globals.WebSocketCommand.superclass.fn.prototype._printOn_.apply(_st(self), [aStream]));
$ctx1.supercall = false;
$3=self._isException();
$ctx1.sendIdx["isException"]=1;
$2=_st($3)._notNil();
$1=_st($2)._and_((function(){
return smalltalk.withContext(function($ctx2) {
return self._isException();
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}));
if(smalltalk.assert($1)){
$4=_st("(".__comma(_st(self._answer())._printString())).__comma(")");
$ctx1.sendIdx[","]=1;
_st(aStream)._nextPutAll_($4);
};
return self}, function($ctx1) {$ctx1.fill(self,"printOn:",{aStream:aStream},globals.WebSocketCommand)})},
args: ["aStream"],
source: "printOn: aStream\x0a\x0a\x09super printOn: aStream.\x0a\x09\x0a\x09(self isException notNil and:[\x0a\x09self isException ]) ifTrue:[\x0a\x09\x09aStream nextPutAll: '(',self answer printString,')' ]",
messageSends: ["printOn:", "ifTrue:", "and:", "notNil", "isException", "nextPutAll:", ",", "printString", "answer"],
referencedClasses: []
}),
globals.WebSocketCommand);

smalltalk.addMethod(
smalltalk.method({
selector: "processOn:",
protocol: 'actions',
fn: function (anAPIClient){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._subclassResponsibility();
return self}, function($ctx1) {$ctx1.fill(self,"processOn:",{anAPIClient:anAPIClient},globals.WebSocketCommand)})},
args: ["anAPIClient"],
source: "processOn: anAPIClient\x0a\x09\x22Executes this command comming from anAPIClient\x0a\x09loading the answer in it.\x22\x0a\x09\x0a\x09self subclassResponsibility\x09",
messageSends: ["subclassResponsibility"],
referencedClasses: []
}),
globals.WebSocketCommand);

smalltalk.addMethod(
smalltalk.method({
selector: "receivedOn:",
protocol: 'actions',
fn: function (anAPIClient){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self._isAnswer();
if(smalltalk.assert($1)){
self._onAnsweredBy_(anAPIClient);
} else {
self._onCommandFrom_(anAPIClient);
};
return self}, function($ctx1) {$ctx1.fill(self,"receivedOn:",{anAPIClient:anAPIClient},globals.WebSocketCommand)})},
args: ["anAPIClient"],
source: "receivedOn: anAPIClient\x0a\x09\x22This command has been received by anAPIClient.\x0a\x09Time to react depending in this being an answer or not...\x22\x0a\x09\x0a\x09self isAnswer \x0a\x09\x09ifTrue:[ \x0a\x09\x09\x09\x22Is backend's answer of a previous command\x22\x0a\x09\x09\x09self onAnsweredBy: anAPIClient ]\x0a\x09\x09ifFalse:[ \x0a\x09\x09\x09\x22Is the backend taking initiative\x22\x0a\x09\x09\x09self onCommandFrom: anAPIClient ]\x0a\x09",
messageSends: ["ifTrue:ifFalse:", "isAnswer", "onAnsweredBy:", "onCommandFrom:"],
referencedClasses: []
}),
globals.WebSocketCommand);

smalltalk.addMethod(
smalltalk.method({
selector: "remoteAnswerOn:",
protocol: 'actions',
fn: function (anAPIClient){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(anAPIClient)._remoteAnswerFor_(self);
return self}, function($ctx1) {$ctx1.fill(self,"remoteAnswerOn:",{anAPIClient:anAPIClient},globals.WebSocketCommand)})},
args: ["anAPIClient"],
source: "remoteAnswerOn:  anAPIClient\x0a\x09\x22Tells the API to respond to the backend \x0a\x09with this command (assumes it's loading the answer already)\x22\x0a\x09\x0a\x09anAPIClient remoteAnswerFor: self",
messageSends: ["remoteAnswerFor:"],
referencedClasses: []
}),
globals.WebSocketCommand);


smalltalk.addMethod(
smalltalk.method({
selector: "for:",
protocol: 'actions',
fn: function (anEvent){
var self=this;
var parsed;
function $Mapless(){return globals.Mapless||(typeof Mapless=="undefined"?nil:Mapless)}
function $Error(){return globals.Error||(typeof Error=="undefined"?nil:Error)}
return smalltalk.withContext(function($ctx1) { 
var $1;
_st((function(){
return smalltalk.withContext(function($ctx2) {
parsed=_st($Mapless())._fromJSONString_(_st(anEvent)._data());
return parsed;
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}))._on_do_($Error(),(function(x){
parsed=nil;
return parsed;
}));
$1=parsed;
return $1;
}, function($ctx1) {$ctx1.fill(self,"for:",{anEvent:anEvent,parsed:parsed},globals.WebSocketCommand.klass)})},
args: ["anEvent"],
source: "for: anEvent\x0a\x09\x22Answers a new instance of a command corresponding to\x0a\x09the message comming in anEvent or nil.\x22\x0a\x0a\x09| parsed |\x0a\x0a\x09[ parsed := Mapless fromJSONString: anEvent data ]\x0a\x09\x09on: Error\x0a\x09\x09do:[ :x | parsed := nil ].\x0a\x09^ parsed",
messageSends: ["on:do:", "fromJSONString:", "data"],
referencedClasses: ["Mapless", "Error"]
}),
globals.WebSocketCommand.klass);


smalltalk.addClass('BadCommand', globals.WebSocketCommand, [], 'Flow-API');
globals.BadCommand.comment="## BadCommand \x0a\x0aThis command useful when there is trouble during the reception/processing of a remote command.\x0a\x0aMeant more for production than for development.";


smalltalk.addClass('Echo', globals.WebSocketCommand, [], 'Flow-API');
globals.Echo.comment="##Echo\x0a\x0aIs a command that will send content to the server and the server will send back (in @echoes)";
smalltalk.addMethod(
smalltalk.method({
selector: "processOn:",
protocol: 'actions',
fn: function (anAPIClient){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._answer_(globals.HashedCollection._newFromPairs_(["echoes",self._content()]));
return self}, function($ctx1) {$ctx1.fill(self,"processOn:",{anAPIClient:anAPIClient},globals.Echo)})},
args: ["anAPIClient"],
source: "processOn: anAPIClient\x0a\x09\x22Executes this command comming from anAPIClient\x0a\x09loading the answer in it.\x22\x0a\x09\x0a\x09self answer: #{ #echoes -> self content }",
messageSends: ["answer:", "content"],
referencedClasses: []
}),
globals.Echo);


smalltalk.addMethod(
smalltalk.method({
selector: "for:",
protocol: 'actions',
fn: function (aString){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$3,$1;
$2=self._new();
_st($2)._content_(aString);
$3=_st($2)._yourself();
$1=$3;
return $1;
}, function($ctx1) {$ctx1.fill(self,"for:",{aString:aString},globals.Echo.klass)})},
args: ["aString"],
source: "for: aString\x0a\x0a\x09^ self new\x0a\x09\x09content: aString;\x0a\x09\x09yourself",
messageSends: ["content:", "new", "yourself"],
referencedClasses: []
}),
globals.Echo.klass);


smalltalk.addClass('Ping', globals.WebSocketCommand, [], 'Flow-API');
globals.Ping.comment="##Ping\x0a\x0aIs a command that, when all goes smooth, will receive a Date set by the server @pongOn";
smalltalk.addMethod(
smalltalk.method({
selector: "processOn:",
protocol: 'actions',
fn: function (anAPIClient){
var self=this;
function $Date(){return globals.Date||(typeof Date=="undefined"?nil:Date)}
return smalltalk.withContext(function($ctx1) { 
self._answer_(globals.HashedCollection._newFromPairs_(["pongOn",_st($Date())._now()]));
return self}, function($ctx1) {$ctx1.fill(self,"processOn:",{anAPIClient:anAPIClient},globals.Ping)})},
args: ["anAPIClient"],
source: "processOn: anAPIClient\x0a\x09\x22Executes this command comming from anAPIClient\x0a\x09loading the answer in it.\x22\x0a\x09\x0a\x09self answer: #{ #pongOn -> Date now }",
messageSends: ["answer:", "now"],
referencedClasses: ["Date"]
}),
globals.Ping);



smalltalk.addClass('RMS', globals.WebSocketCommand, [], 'Flow-API');
globals.RMS.comment="##RMS alias RemoteMessageSend\x0a\x0aIs a command to send a message to a remote object published in the backend.\x0a\x0aOr..\x0a\x0aThe command received from the backend to send a message to an object published here in the frontend.\x0a\x0aRemoteMessageSends have @answer set before responding to the sender side and if an exception happens they set @isException in true and a print of the exception.\x0a\x0aThe reason for the short name instead of the long explicit one is merely bandwith optimization";
smalltalk.addMethod(
smalltalk.method({
selector: "getReceiverOn:",
protocol: 'actions',
fn: function (anAPIClient){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(_st(anAPIClient)._published())._at_ifAbsent_(self._receiverId(),(function(){
return nil;
}));
return $1;
}, function($ctx1) {$ctx1.fill(self,"getReceiverOn:",{anAPIClient:anAPIClient},globals.RMS)})},
args: ["anAPIClient"],
source: "getReceiverOn: anAPIClient\x0a\x09\x22Returns the published at anAPIClient corresponding to the receiver of this message send.\x22\x0a\x09\x0a\x09^ anAPIClient published \x0a\x09\x09at:\x09self receiverId\x0a\x09\x09ifAbsent:[ nil ]",
messageSends: ["at:ifAbsent:", "published", "receiverId"],
referencedClasses: []
}),
globals.RMS);

smalltalk.addMethod(
smalltalk.method({
selector: "printOn:",
protocol: 'actions',
fn: function (aStream){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$7,$6,$5,$9,$8,$4,$3,$10;
($ctx1.supercall = true, globals.RMS.superclass.fn.prototype._printOn_.apply(_st(self), [aStream]));
$ctx1.supercall = false;
$2=self._answer();
$ctx1.sendIdx["answer"]=1;
$1=_st($2)._notNil();
if(smalltalk.assert($1)){
$7=_st(self._answer())._asString();
$ctx1.sendIdx["asString"]=1;
$6="(".__comma($7);
$ctx1.sendIdx[","]=4;
$5=_st($6).__comma(" #");
$ctx1.sendIdx[","]=3;
$9=self._selector();
$ctx1.sendIdx["selector"]=1;
$8=_st($9)._asString();
$ctx1.sendIdx["asString"]=2;
$4=_st($5).__comma($8);
$ctx1.sendIdx[","]=2;
$3=_st($4).__comma(")");
$ctx1.sendIdx[","]=1;
_st(aStream)._nextPutAll_($3);
$ctx1.sendIdx["nextPutAll:"]=1;
} else {
$10=_st("(#".__comma(_st(self._selector())._asString())).__comma(")");
$ctx1.sendIdx[","]=5;
_st(aStream)._nextPutAll_($10);
};
return self}, function($ctx1) {$ctx1.fill(self,"printOn:",{aStream:aStream},globals.RMS)})},
args: ["aStream"],
source: "printOn: aStream\x0a\x0a\x09super printOn: aStream.\x0a\x09\x0a\x09self answer notNil\x0a\x09\x09ifTrue:[ aStream nextPutAll: '(',self answer asString,' #',self selector asString,')' ]\x0a\x09\x09ifFalse:[ aStream nextPutAll: '(#',self selector asString,')' ]\x0a\x09",
messageSends: ["printOn:", "ifTrue:ifFalse:", "notNil", "answer", "nextPutAll:", ",", "asString", "selector"],
referencedClasses: []
}),
globals.RMS);

smalltalk.addMethod(
smalltalk.method({
selector: "processOn:",
protocol: 'actions',
fn: function (anAPIClient){
var self=this;
var ans;
return smalltalk.withContext(function($ctx1) { 
ans=_st(self._getReceiverOn_(anAPIClient))._perform_withArguments_(self._selector(),self._arguments());
self._answer_(_st(anAPIClient)._remoteReferenceFor_(ans));
return self}, function($ctx1) {$ctx1.fill(self,"processOn:",{anAPIClient:anAPIClient,ans:ans},globals.RMS)})},
args: ["anAPIClient"],
source: "processOn: anAPIClient\x0a\x09\x22Executes this command comming from anAPIClient\x0a\x09loading the answer in it.\x22\x0a\x09\x0a\x09| ans |\x0a\x09\x0a\x09ans := (self getReceiverOn: anAPIClient)\x0a\x09\x09\x09\x09\x09perform: self selector\x0a\x09\x09\x09\x09\x09withArguments: self arguments.\x0a\x0a\x09self answer: (anAPIClient remoteReferenceFor: ans)",
messageSends: ["perform:withArguments:", "getReceiverOn:", "selector", "arguments", "answer:", "remoteReferenceFor:"],
referencedClasses: []
}),
globals.RMS);


smalltalk.addMethod(
smalltalk.method({
selector: "to:send:withAll:",
protocol: 'actions',
fn: function (aReceiverId,aSelector,someArguments){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$3,$1;
$2=self._new();
_st($2)._receiverId_(aReceiverId);
_st($2)._selector_(aSelector);
_st($2)._arguments_(_st(someArguments)._asArray());
$3=_st($2)._yourself();
$1=$3;
return $1;
}, function($ctx1) {$ctx1.fill(self,"to:send:withAll:",{aReceiverId:aReceiverId,aSelector:aSelector,someArguments:someArguments},globals.RMS.klass)})},
args: ["aReceiverId", "aSelector", "someArguments"],
source: "to: aReceiverId send: aSelector withAll: someArguments\x0a\x09\x22Answers a new instance of a RemoteMessageSend so it's\x0a\x09ready to be sent to the remote object reachable with aReceiverId\x0a\x09with the message aSelector with someArguments.\x22\x0a\x09\x0a\x09^ self new\x0a\x09\x09receiverId: aReceiverId;\x0a\x09\x09selector: aSelector;\x0a\x09\x09arguments: someArguments asArray;\x0a\x09\x09yourself",
messageSends: ["receiverId:", "new", "selector:", "arguments:", "asArray", "yourself"],
referencedClasses: []
}),
globals.RMS.klass);

});
