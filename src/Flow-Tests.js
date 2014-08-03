define("app/Flow-Tests", ["amber/boot", "amber_core/SUnit", "app/Flow-API"], function($boot){
var smalltalk=$boot.vm,nil=$boot.nil,_st=$boot.asReceiver,globals=$boot.globals;
smalltalk.addPackage('Flow-Tests');
smalltalk.packages["Flow-Tests"].transport = {"type":"amd","amdNamespace":"app"};

smalltalk.addClass('FlowTest', globals.TestCase, [], 'Flow-Tests');
smalltalk.addMethod(
smalltalk.method({
selector: "testConnect",
protocol: 'tests',
fn: function (){
var self=this;
function $Error(){return globals.Error||(typeof Error=="undefined"?nil:Error)}
return smalltalk.withContext(function($ctx1) { 
var $4,$3,$2,$1,$9,$8,$7,$6,$5,$14,$13,$12,$11,$10,$18,$17,$16,$15,$24,$23,$22,$21,$20,$29,$28,$27,$26,$25,$19;
self._shouldnt_raise_((function(){
return smalltalk.withContext(function($ctx2) {
$4=_st(window)._app();
$ctx2.sendIdx["app"]=1;
$3=_st($4)._session();
$ctx2.sendIdx["session"]=1;
$2=_st($3)._api();
$ctx2.sendIdx["api"]=1;
$1=_st($2)._ws();
$ctx2.sendIdx["ws"]=1;
return _st($1)._connect();
$ctx2.sendIdx["connect"]=1;
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}),$Error());
$ctx1.sendIdx["shouldnt:raise:"]=1;
_st((function(){
return smalltalk.withContext(function($ctx2) {
$9=_st(window)._app();
$ctx2.sendIdx["app"]=2;
$8=_st($9)._session();
$ctx2.sendIdx["session"]=2;
$7=_st($8)._api();
$ctx2.sendIdx["api"]=2;
$6=_st($7)._ws();
$ctx2.sendIdx["ws"]=2;
$5=_st($6)._hasSocket();
self._assert_($5);
$ctx2.sendIdx["assert:"]=1;
$14=_st(window)._app();
$ctx2.sendIdx["app"]=3;
$13=_st($14)._session();
$ctx2.sendIdx["session"]=3;
$12=_st($13)._api();
$ctx2.sendIdx["api"]=3;
$11=_st($12)._ws();
$ctx2.sendIdx["ws"]=3;
$10=_st($11)._isConnected();
$ctx2.sendIdx["isConnected"]=1;
self._assert_($10);
$ctx2.sendIdx["assert:"]=2;
self._shouldnt_raise_((function(){
return smalltalk.withContext(function($ctx3) {
$18=_st(window)._app();
$ctx3.sendIdx["app"]=4;
$17=_st($18)._session();
$ctx3.sendIdx["session"]=4;
$16=_st($17)._api();
$ctx3.sendIdx["api"]=4;
$15=_st($16)._ws();
$ctx3.sendIdx["ws"]=4;
return _st($15)._connect();
}, function($ctx3) {$ctx3.fillBlock({},$ctx2,3)})}),$Error());
$24=_st(window)._app();
$ctx2.sendIdx["app"]=5;
$23=_st($24)._session();
$ctx2.sendIdx["session"]=5;
$22=_st($23)._api();
$ctx2.sendIdx["api"]=5;
$21=_st($22)._ws();
$ctx2.sendIdx["ws"]=5;
$20=_st($21)._socket();
$ctx2.sendIdx["socket"]=1;
$29=_st(window)._app();
$ctx2.sendIdx["app"]=6;
$28=_st($29)._session();
$ctx2.sendIdx["session"]=6;
$27=_st($28)._api();
$ctx2.sendIdx["api"]=6;
$26=_st($27)._ws();
$ctx2.sendIdx["ws"]=6;
$25=_st($26)._socket();
$19=_st($20).__eq_eq($25);
self._assert_($19);
$ctx2.sendIdx["assert:"]=3;
return self._assert_(_st(_st(_st(_st(_st(window)._app())._session())._api())._ws())._isConnected());
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,2)})}))._valueWithTimeout_((1000));
return self}, function($ctx1) {$ctx1.fill(self,"testConnect",{},globals.FlowTest)})},
args: [],
source: "testConnect\x0a\x0a\x09self shouldnt:[\x0a\x09\x09window app session api ws connect ] raise: Error.\x0a\x09\x0a\x09[\x22The >>valueWithTimeout: is there because connecting a ws takes time\x22 \x0a\x09self assert: window app session api ws hasSocket.\x0a\x09self assert: window app session api ws isConnected.\x0a\x0a\x09self shouldnt:[\x0a\x09\x09window app session api ws connect ] raise: Error.\x0a\x0a\x09self assert: window app session api ws socket == window app session api ws socket.\x0a\x09self assert: window app session api ws isConnected ] valueWithTimeout: 1000\x0a\x09",
messageSends: ["shouldnt:raise:", "connect", "ws", "api", "session", "app", "valueWithTimeout:", "assert:", "hasSocket", "isConnected", "==", "socket"],
referencedClasses: ["Error"]
}),
globals.FlowTest);

smalltalk.addMethod(
smalltalk.method({
selector: "testEcho",
protocol: 'tests',
fn: function (){
var self=this;
var echo;
function $Echo(){return globals.Echo||(typeof Echo=="undefined"?nil:Echo)}
return smalltalk.withContext(function($ctx1) { 
var $5,$4,$3,$2,$1,$10,$9,$8,$7,$6,$11,$13,$12,$15,$14,$18,$17,$16;
$5=_st(window)._app();
$ctx1.sendIdx["app"]=1;
$4=_st($5)._session();
$ctx1.sendIdx["session"]=1;
$3=_st($4)._api();
$ctx1.sendIdx["api"]=1;
$2=_st($3)._ws();
$ctx1.sendIdx["ws"]=1;
$1=_st($2)._hasSocket();
self._assert_($1);
$ctx1.sendIdx["assert:"]=1;
$10=_st(window)._app();
$ctx1.sendIdx["app"]=2;
$9=_st($10)._session();
$ctx1.sendIdx["session"]=2;
$8=_st($9)._api();
$ctx1.sendIdx["api"]=2;
$7=_st($8)._ws();
$ctx1.sendIdx["ws"]=2;
$6=_st($7)._isConnected();
self._assert_($6);
$ctx1.sendIdx["assert:"]=2;
echo=_st($Echo())._for_("Do you follow?");
$11=_st(_st(echo)._content()).__eq("Do you follow?");
$ctx1.sendIdx["="]=1;
self._assert_($11);
$ctx1.sendIdx["assert:"]=3;
$13=_st(echo)._answer();
$ctx1.sendIdx["answer"]=1;
$12=_st($13)._isNil();
self._assert_($12);
$ctx1.sendIdx["assert:"]=4;
_st(_st(_st(_st(_st(window)._app())._session())._api())._ws())._sendCommand_do_(echo,(function(ans){
return smalltalk.withContext(function($ctx2) {
$15=_st(ans)._answer();
$ctx2.sendIdx["answer"]=2;
$14=_st($15)._notNil();
$ctx2.sendIdx["notNil"]=1;
self._assert_($14);
$ctx2.sendIdx["assert:"]=5;
$18=_st(ans)._answer();
$ctx2.sendIdx["answer"]=3;
$17=_st($18)._echoes();
$ctx2.sendIdx["echoes"]=1;
$16=_st($17)._notNil();
self._assert_($16);
$ctx2.sendIdx["assert:"]=6;
return self._assert_(_st(_st(_st(ans)._answer())._echoes()).__eq("Do you follow?"));
}, function($ctx2) {$ctx2.fillBlock({ans:ans},$ctx1,1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"testEcho",{echo:echo},globals.FlowTest)})},
args: [],
source: "testEcho\x0a\x0a\x09| echo |\x0a\x0a\x09self assert: window app session api ws hasSocket.\x0a\x09self assert: window app session api ws isConnected.\x0a\x0a\x09echo := Echo for: 'Do you follow?'.\x0a\x09\x0a\x09self assert: echo content = 'Do you follow?'.\x0a\x09self assert: echo answer isNil.\x0a\x09\x0a\x09window app session api ws \x0a\x09\x09sendCommand: echo\x0a\x09\x09do:[ :ans | \x0a\x09\x09\x09self assert: ans answer notNil.\x0a\x09\x09\x09self assert: ans answer echoes notNil.\x0a\x09\x09\x09self assert: ans answer echoes = 'Do you follow?' ] \x09\x09\x09",
messageSends: ["assert:", "hasSocket", "ws", "api", "session", "app", "isConnected", "for:", "=", "content", "isNil", "answer", "sendCommand:do:", "notNil", "echoes"],
referencedClasses: ["Echo"]
}),
globals.FlowTest);

smalltalk.addMethod(
smalltalk.method({
selector: "testErrorHandlingAfterResponded",
protocol: 'tests',
fn: function (){
var self=this;
var faulty;
function $WillFailAfterResponded(){return globals.WillFailAfterResponded||(typeof WillFailAfterResponded=="undefined"?nil:WillFailAfterResponded)}
return smalltalk.withContext(function($ctx1) { 
var $5,$4,$3,$2,$1,$10,$9,$8,$7,$6,$12,$11,$14,$13;
$5=_st(window)._app();
$ctx1.sendIdx["app"]=1;
$4=_st($5)._session();
$ctx1.sendIdx["session"]=1;
$3=_st($4)._api();
$ctx1.sendIdx["api"]=1;
$2=_st($3)._ws();
$ctx1.sendIdx["ws"]=1;
$1=_st($2)._hasSocket();
self._assert_($1);
$ctx1.sendIdx["assert:"]=1;
$10=_st(window)._app();
$ctx1.sendIdx["app"]=2;
$9=_st($10)._session();
$ctx1.sendIdx["session"]=2;
$8=_st($9)._api();
$ctx1.sendIdx["api"]=2;
$7=_st($8)._ws();
$ctx1.sendIdx["ws"]=2;
$6=_st($7)._isConnected();
self._assert_($6);
$ctx1.sendIdx["assert:"]=2;
faulty=_st($WillFailAfterResponded())._new();
$12=_st(faulty)._answer();
$ctx1.sendIdx["answer"]=1;
$11=_st($12)._isNil();
self._assert_($11);
$ctx1.sendIdx["assert:"]=3;
_st(_st(_st(_st(_st(window)._app())._session())._api())._ws())._sendCommand_do_onError_(faulty,(function(ans){
return smalltalk.withContext(function($ctx2) {
$14=_st(ans)._answer();
$ctx2.sendIdx["answer"]=2;
$13=_st($14)._notNil();
self._assert_($13);
$ctx2.sendIdx["assert:"]=4;
return self._assert_(_st(ans)._answer());
$ctx2.sendIdx["assert:"]=5;
}, function($ctx2) {$ctx2.fillBlock({ans:ans},$ctx1,1)})}),(function(x){
return smalltalk.withContext(function($ctx2) {
return self._assert_(_st(_st(x)._messageText()).__eq("Failing just after the answer"));
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,2)})}));
return self}, function($ctx1) {$ctx1.fill(self,"testErrorHandlingAfterResponded",{faulty:faulty},globals.FlowTest)})},
args: [],
source: "testErrorHandlingAfterResponded\x0a\x0a\x09| faulty |\x0a\x0a\x09self assert: window app session api ws hasSocket.\x0a\x09self assert: window app session api ws isConnected.\x0a\x0a\x09faulty := WillFailAfterResponded new.\x0a\x09\x0a\x09self assert: faulty answer isNil.\x0a\x09\x0a\x09window app session api ws \x0a\x09\x09sendCommand: faulty\x0a\x09\x09do:[ :ans | \x0a\x09\x09\x09self assert: ans answer notNil.\x0a\x09\x09\x09self assert: ans answer ]\x0a\x09\x09onError:[ :x | \x0a\x09\x09\x09self assert: (x messageText = 'Failing just after the answer') ]\x0a\x09",
messageSends: ["assert:", "hasSocket", "ws", "api", "session", "app", "isConnected", "new", "isNil", "answer", "sendCommand:do:onError:", "notNil", "=", "messageText"],
referencedClasses: ["WillFailAfterResponded"]
}),
globals.FlowTest);

smalltalk.addMethod(
smalltalk.method({
selector: "testErrorHandlingAfterSent",
protocol: 'tests',
fn: function (){
var self=this;
var faulty;
function $WillFailAfterSent(){return globals.WillFailAfterSent||(typeof WillFailAfterSent=="undefined"?nil:WillFailAfterSent)}
return smalltalk.withContext(function($ctx1) { 
var $5,$4,$3,$2,$1,$10,$9,$8,$7,$6,$12,$11,$14,$13;
$5=_st(window)._app();
$ctx1.sendIdx["app"]=1;
$4=_st($5)._session();
$ctx1.sendIdx["session"]=1;
$3=_st($4)._api();
$ctx1.sendIdx["api"]=1;
$2=_st($3)._ws();
$ctx1.sendIdx["ws"]=1;
$1=_st($2)._hasSocket();
self._assert_($1);
$ctx1.sendIdx["assert:"]=1;
$10=_st(window)._app();
$ctx1.sendIdx["app"]=2;
$9=_st($10)._session();
$ctx1.sendIdx["session"]=2;
$8=_st($9)._api();
$ctx1.sendIdx["api"]=2;
$7=_st($8)._ws();
$ctx1.sendIdx["ws"]=2;
$6=_st($7)._isConnected();
self._assert_($6);
$ctx1.sendIdx["assert:"]=2;
faulty=_st($WillFailAfterSent())._new();
$12=_st(faulty)._answer();
$ctx1.sendIdx["answer"]=1;
$11=_st($12)._isNil();
self._assert_($11);
$ctx1.sendIdx["assert:"]=3;
_st(_st(_st(_st(_st(window)._app())._session())._api())._ws())._sendCommand_do_onError_(faulty,(function(ans){
return smalltalk.withContext(function($ctx2) {
$14=_st(ans)._answer();
$ctx2.sendIdx["answer"]=2;
$13=_st($14)._notNil();
self._assert_($13);
$ctx2.sendIdx["assert:"]=4;
return self._assert_(_st(ans)._answer());
$ctx2.sendIdx["assert:"]=5;
}, function($ctx2) {$ctx2.fillBlock({ans:ans},$ctx1,1)})}),(function(x){
return smalltalk.withContext(function($ctx2) {
return self._assert_(_st(_st(x)._messageText()).__eq("Failing just after sent"));
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,2)})}));
return self}, function($ctx1) {$ctx1.fill(self,"testErrorHandlingAfterSent",{faulty:faulty},globals.FlowTest)})},
args: [],
source: "testErrorHandlingAfterSent\x0a\x0a\x09| faulty |\x0a\x0a\x09self assert: window app session api ws hasSocket.\x0a\x09self assert: window app session api ws isConnected.\x0a\x0a\x09faulty := WillFailAfterSent new.\x0a\x09\x0a\x09self assert: faulty answer isNil.\x0a\x09\x0a\x09window app session api ws \x0a\x09\x09sendCommand: faulty\x0a\x09\x09do:[ :ans | \x0a\x09\x09\x09self assert: ans answer notNil.\x0a\x09\x09\x09self assert: ans answer ]\x0a\x09\x09onError:[ :x | self assert: (x messageText = 'Failing just after sent') ]\x0a\x09\x09",
messageSends: ["assert:", "hasSocket", "ws", "api", "session", "app", "isConnected", "new", "isNil", "answer", "sendCommand:do:onError:", "notNil", "=", "messageText"],
referencedClasses: ["WillFailAfterSent"]
}),
globals.FlowTest);

smalltalk.addMethod(
smalltalk.method({
selector: "testErrorHandlingBeforeSend",
protocol: 'tests',
fn: function (){
var self=this;
var faulty;
function $WillFailBeforeSend(){return globals.WillFailBeforeSend||(typeof WillFailBeforeSend=="undefined"?nil:WillFailBeforeSend)}
return smalltalk.withContext(function($ctx1) { 
var $5,$4,$3,$2,$1,$10,$9,$8,$7,$6,$12,$11;
$5=_st(window)._app();
$ctx1.sendIdx["app"]=1;
$4=_st($5)._session();
$ctx1.sendIdx["session"]=1;
$3=_st($4)._api();
$ctx1.sendIdx["api"]=1;
$2=_st($3)._ws();
$ctx1.sendIdx["ws"]=1;
$1=_st($2)._hasSocket();
self._assert_($1);
$ctx1.sendIdx["assert:"]=1;
$10=_st(window)._app();
$ctx1.sendIdx["app"]=2;
$9=_st($10)._session();
$ctx1.sendIdx["session"]=2;
$8=_st($9)._api();
$ctx1.sendIdx["api"]=2;
$7=_st($8)._ws();
$ctx1.sendIdx["ws"]=2;
$6=_st($7)._isConnected();
self._assert_($6);
$ctx1.sendIdx["assert:"]=2;
faulty=_st($WillFailBeforeSend())._new();
$12=_st(faulty)._answer();
$ctx1.sendIdx["answer"]=1;
$11=_st($12)._isNil();
$ctx1.sendIdx["isNil"]=1;
self._assert_($11);
$ctx1.sendIdx["assert:"]=3;
_st(_st(_st(_st(_st(window)._app())._session())._api())._ws())._sendCommand_do_onError_(faulty,(function(ans){
return smalltalk.withContext(function($ctx2) {
return self._assert_(_st(_st(ans)._answer())._isNil());
$ctx2.sendIdx["assert:"]=4;
}, function($ctx2) {$ctx2.fillBlock({ans:ans},$ctx1,1)})}),(function(x){
return smalltalk.withContext(function($ctx2) {
return self._assert_(_st(_st(x)._messageText()).__eq("Failing just before sending"));
}, function($ctx2) {$ctx2.fillBlock({x:x},$ctx1,2)})}));
return self}, function($ctx1) {$ctx1.fill(self,"testErrorHandlingBeforeSend",{faulty:faulty},globals.FlowTest)})},
args: [],
source: "testErrorHandlingBeforeSend\x0a\x0a\x09| faulty |\x0a\x0a\x09self assert: window app session api ws hasSocket.\x0a\x09self assert: window app session api ws isConnected.\x0a\x0a\x09faulty := WillFailBeforeSend new.\x0a\x09\x0a\x09self assert: faulty answer isNil.\x0a\x09\x0a\x09\x0a\x09window app session api ws \x0a\x09\x09sendCommand: faulty\x0a\x09\x09do:[ :ans | \x0a\x09\x09\x09self assert: ans answer isNil ]\x0a\x09\x09onError:[ :x | self assert: (x messageText = 'Failing just before sending') ]\x0a\x09",
messageSends: ["assert:", "hasSocket", "ws", "api", "session", "app", "isConnected", "new", "isNil", "answer", "sendCommand:do:onError:", "=", "messageText"],
referencedClasses: ["WillFailBeforeSend"]
}),
globals.FlowTest);

smalltalk.addMethod(
smalltalk.method({
selector: "testPing",
protocol: 'tests',
fn: function (){
var self=this;
var ping;
function $Ping(){return globals.Ping||(typeof Ping=="undefined"?nil:Ping)}
return smalltalk.withContext(function($ctx1) { 
var $5,$4,$3,$2,$1,$10,$9,$8,$7,$6,$12,$11,$14,$13;
$5=_st(window)._app();
$ctx1.sendIdx["app"]=1;
$4=_st($5)._session();
$ctx1.sendIdx["session"]=1;
$3=_st($4)._api();
$ctx1.sendIdx["api"]=1;
$2=_st($3)._ws();
$ctx1.sendIdx["ws"]=1;
$1=_st($2)._hasSocket();
self._assert_($1);
$ctx1.sendIdx["assert:"]=1;
$10=_st(window)._app();
$ctx1.sendIdx["app"]=2;
$9=_st($10)._session();
$ctx1.sendIdx["session"]=2;
$8=_st($9)._api();
$ctx1.sendIdx["api"]=2;
$7=_st($8)._ws();
$ctx1.sendIdx["ws"]=2;
$6=_st($7)._isConnected();
self._assert_($6);
$ctx1.sendIdx["assert:"]=2;
ping=_st($Ping())._new();
$12=_st(ping)._answer();
$ctx1.sendIdx["answer"]=1;
$11=_st($12)._isNil();
self._assert_($11);
$ctx1.sendIdx["assert:"]=3;
_st(_st(_st(_st(_st(window)._app())._session())._api())._ws())._sendCommand_do_(ping,(function(ans){
return smalltalk.withContext(function($ctx2) {
$14=_st(ans)._answer();
$ctx2.sendIdx["answer"]=2;
$13=_st($14)._notNil();
$ctx2.sendIdx["notNil"]=1;
self._assert_($13);
$ctx2.sendIdx["assert:"]=4;
return self._assert_(_st(_st(_st(ans)._answer())._pongOn())._notNil());
}, function($ctx2) {$ctx2.fillBlock({ans:ans},$ctx1,1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"testPing",{ping:ping},globals.FlowTest)})},
args: [],
source: "testPing\x0a\x0a\x09| ping |\x0a\x0a\x09self assert: window app session api ws hasSocket.\x0a\x09self assert: window app session api ws isConnected.\x0a\x0a\x09ping := Ping new.\x0a\x09\x0a\x09self assert: ping answer isNil.\x0a\x09\x0a\x09window app session api ws \x0a\x09\x09sendCommand: ping\x0a\x09\x09do:[ :ans | \x0a\x09\x09\x09self assert: ans answer notNil.\x0a\x09\x09\x09self assert: ans answer pongOn notNil ] \x09\x09\x09\x0a\x09\x09",
messageSends: ["assert:", "hasSocket", "ws", "api", "session", "app", "isConnected", "new", "isNil", "answer", "sendCommand:do:", "notNil", "pongOn"],
referencedClasses: ["Ping"]
}),
globals.FlowTest);



smalltalk.addClass('RemoteReferenceTest', globals.TestCase, [], 'Flow-Tests');
smalltalk.addMethod(
smalltalk.method({
selector: "testBoolean",
protocol: 'tests',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$3,$5,$4;
$2=true._asRemoteReference();
$ctx1.sendIdx["asRemoteReference"]=1;
$1=_st($2)._isRemoteReference();
$ctx1.sendIdx["isRemoteReference"]=1;
self._deny_($1);
$ctx1.sendIdx["deny:"]=1;
$3=true._asRemoteReference();
$ctx1.sendIdx["asRemoteReference"]=2;
self._assert_($3);
$ctx1.sendIdx["assert:"]=1;
$5=false._asRemoteReference();
$ctx1.sendIdx["asRemoteReference"]=3;
$4=_st($5)._isRemoteReference();
self._deny_($4);
self._assert_(_st(false._asRemoteReference())._isBoolean());
return self}, function($ctx1) {$ctx1.fill(self,"testBoolean",{},globals.RemoteReferenceTest)})},
args: [],
source: "testBoolean\x0a\x0a\x09self deny: true asRemoteReference isRemoteReference.\x0a\x09self assert: true asRemoteReference.\x0a\x0a\x09self deny: false asRemoteReference isRemoteReference.\x0a\x09self assert: false asRemoteReference isBoolean.",
messageSends: ["deny:", "isRemoteReference", "asRemoteReference", "assert:", "isBoolean"],
referencedClasses: []
}),
globals.RemoteReferenceTest);

smalltalk.addMethod(
smalltalk.method({
selector: "testClass",
protocol: 'tests',
fn: function (){
var self=this;
function $Class(){return globals.Class||(typeof Class=="undefined"?nil:Class)}
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$5,$4,$3;
$2=_st($Class())._asRemoteReference();
$ctx1.sendIdx["asRemoteReference"]=1;
$1=_st($2)._isRemoteReference();
$ctx1.sendIdx["isRemoteReference"]=1;
self._assert_($1);
$ctx1.sendIdx["assert:"]=1;
$5=[]._class();
$ctx1.sendIdx["class"]=1;
$4=_st($5)._asRemoteReference();
$ctx1.sendIdx["asRemoteReference"]=2;
$3=_st($4)._isRemoteReference();
$ctx1.sendIdx["isRemoteReference"]=2;
self._assert_($3);
$ctx1.sendIdx["assert:"]=2;
self._assert_(_st(_st((42)._class())._asRemoteReference())._isRemoteReference());
return self}, function($ctx1) {$ctx1.fill(self,"testClass",{},globals.RemoteReferenceTest)})},
args: [],
source: "testClass\x0a\x0a\x09self assert: Class asRemoteReference isRemoteReference.\x0a\x09self assert: #() class asRemoteReference isRemoteReference.\x0a\x09self assert: 42 class asRemoteReference isRemoteReference.",
messageSends: ["assert:", "isRemoteReference", "asRemoteReference", "class"],
referencedClasses: ["Class"]
}),
globals.RemoteReferenceTest);

smalltalk.addMethod(
smalltalk.method({
selector: "testFloat",
protocol: 'tests',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$1;
$2=(4.2)._asRemoteReference();
$ctx1.sendIdx["asRemoteReference"]=1;
$1=_st($2)._isRemoteReference();
self._deny_($1);
self._assert_(_st((4.2)._asRemoteReference()).__eq((4.2)));
return self}, function($ctx1) {$ctx1.fill(self,"testFloat",{},globals.RemoteReferenceTest)})},
args: [],
source: "testFloat\x0a\x0a\x09self deny: 4.2 asRemoteReference isRemoteReference.\x0a\x09self assert: 4.2 asRemoteReference = 4.2\x0a\x09",
messageSends: ["deny:", "isRemoteReference", "asRemoteReference", "assert:", "="],
referencedClasses: []
}),
globals.RemoteReferenceTest);

smalltalk.addMethod(
smalltalk.method({
selector: "testInteger",
protocol: 'tests',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$1;
$2=(42)._asRemoteReference();
$ctx1.sendIdx["asRemoteReference"]=1;
$1=_st($2)._isRemoteReference();
self._deny_($1);
self._assert_(_st((42)._asRemoteReference()).__eq((42)));
return self}, function($ctx1) {$ctx1.fill(self,"testInteger",{},globals.RemoteReferenceTest)})},
args: [],
source: "testInteger\x0a\x0a\x09self deny: 42 asRemoteReference isRemoteReference.\x0a\x09self assert: 42 asRemoteReference = 42",
messageSends: ["deny:", "isRemoteReference", "asRemoteReference", "assert:", "="],
referencedClasses: []
}),
globals.RemoteReferenceTest);

smalltalk.addMethod(
smalltalk.method({
selector: "testMetaclass",
protocol: 'tests',
fn: function (){
var self=this;
function $Metaclass(){return globals.Metaclass||(typeof Metaclass=="undefined"?nil:Metaclass)}
return smalltalk.withContext(function($ctx1) { 
self._assert_(_st(_st($Metaclass())._asRemoteReference())._isRemoteReference());
return self}, function($ctx1) {$ctx1.fill(self,"testMetaclass",{},globals.RemoteReferenceTest)})},
args: [],
source: "testMetaclass \x0a\x0a\x09self assert: Metaclass asRemoteReference isRemoteReference",
messageSends: ["assert:", "isRemoteReference", "asRemoteReference"],
referencedClasses: ["Metaclass"]
}),
globals.RemoteReferenceTest);

smalltalk.addMethod(
smalltalk.method({
selector: "testUndefinedObject",
protocol: 'tests',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $2,$1;
$2=nil._asRemoteReference();
$ctx1.sendIdx["asRemoteReference"]=1;
$1=_st($2)._isRemoteReference();
self._deny_($1);
self._assert_(_st(nil._asRemoteReference()).__eq(nil));
return self}, function($ctx1) {$ctx1.fill(self,"testUndefinedObject",{},globals.RemoteReferenceTest)})},
args: [],
source: "testUndefinedObject \x0a\x0a\x09self deny: nil asRemoteReference isRemoteReference.\x0a\x09self assert: nil asRemoteReference = nil",
messageSends: ["deny:", "isRemoteReference", "asRemoteReference", "assert:", "="],
referencedClasses: []
}),
globals.RemoteReferenceTest);



smalltalk.addClass('WillFailAfterResponded', globals.WebSocketCommand, [], 'Flow-Tests');
smalltalk.addMethod(
smalltalk.method({
selector: "onAboutToAnswer",
protocol: 'reactions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._error_("Failing just after the answer");
return self}, function($ctx1) {$ctx1.fill(self,"onAboutToAnswer",{},globals.WillFailAfterResponded)})},
args: [],
source: "onAboutToAnswer\x0a\x09\x22This command is about to execute its answer callback.\x22\x0a\x09\x09\x0a\x09self error: 'Failing just after the answer'",
messageSends: ["error:"],
referencedClasses: []
}),
globals.WillFailAfterResponded);



smalltalk.addClass('WillFailAfterSent', globals.WebSocketCommand, [], 'Flow-Tests');
smalltalk.addMethod(
smalltalk.method({
selector: "onAfterSent",
protocol: 'reactions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._error_("Failing just after sent");
return self}, function($ctx1) {$ctx1.fill(self,"onAfterSent",{},globals.WillFailAfterSent)})},
args: [],
source: "onAfterSent\x0a\x09\x22This command was just sent to the remote end.\x22\x0a\x09\x0a\x09self error: 'Failing just after sent'",
messageSends: ["error:"],
referencedClasses: []
}),
globals.WillFailAfterSent);



smalltalk.addClass('WillFailBeforeSend', globals.WebSocketCommand, [], 'Flow-Tests');
smalltalk.addMethod(
smalltalk.method({
selector: "onAboutToSend",
protocol: 'reactions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
self._error_("Failing just before sending");
return self}, function($ctx1) {$ctx1.fill(self,"onAboutToSend",{},globals.WillFailBeforeSend)})},
args: [],
source: "onAboutToSend\x0a\x09\x22This command is about to be sent to the remote end.\x22\x0a\x09\x0a\x09self error: 'Failing just before sending'",
messageSends: ["error:"],
referencedClasses: []
}),
globals.WillFailBeforeSend);



smalltalk.addClass('WillFailRemotely', globals.WebSocketCommand, [], 'Flow-Tests');

});
