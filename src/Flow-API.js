define("app/Flow-API", ["amber/boot", "amber_core/Kernel-Objects"], function($boot){
var smalltalk=$boot.vm,nil=$boot.nil,_st=$boot.asReceiver,globals=$boot.globals;
smalltalk.addPackage('Flow-API');
smalltalk.packages["Flow-API"].transport = {"type":"amd","amdNamespace":"app"};

smalltalk.addClass('API', globals.Object, [], 'Flow-API');


smalltalk.addClass('RESTfulAPI', globals.API, [], 'Flow-API');
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



smalltalk.addClass('WebSocketAPI', globals.API, [], 'Flow-API');


smalltalk.addClass('Client', globals.Object, ['rest', 'webSocket'], 'Flow-API');

});
