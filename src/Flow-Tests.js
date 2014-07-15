define("app/Flow-Tests", ["amber/boot", "amber_core/SUnit"], function($boot){
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
$1=_st($2)._webSocket();
$ctx2.sendIdx["webSocket"]=1;
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
$6=_st($7)._webSocket();
$ctx2.sendIdx["webSocket"]=2;
$5=_st($6)._hasSocket();
self._assert_($5);
$ctx2.sendIdx["assert:"]=1;
$14=_st(window)._app();
$ctx2.sendIdx["app"]=3;
$13=_st($14)._session();
$ctx2.sendIdx["session"]=3;
$12=_st($13)._api();
$ctx2.sendIdx["api"]=3;
$11=_st($12)._webSocket();
$ctx2.sendIdx["webSocket"]=3;
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
$15=_st($16)._webSocket();
$ctx3.sendIdx["webSocket"]=4;
return _st($15)._connect();
}, function($ctx3) {$ctx3.fillBlock({},$ctx2,3)})}),$Error());
$24=_st(window)._app();
$ctx2.sendIdx["app"]=5;
$23=_st($24)._session();
$ctx2.sendIdx["session"]=5;
$22=_st($23)._api();
$ctx2.sendIdx["api"]=5;
$21=_st($22)._webSocket();
$ctx2.sendIdx["webSocket"]=5;
$20=_st($21)._socket();
$ctx2.sendIdx["socket"]=1;
$29=_st(window)._app();
$ctx2.sendIdx["app"]=6;
$28=_st($29)._session();
$ctx2.sendIdx["session"]=6;
$27=_st($28)._api();
$ctx2.sendIdx["api"]=6;
$26=_st($27)._webSocket();
$ctx2.sendIdx["webSocket"]=6;
$25=_st($26)._socket();
$19=_st($20).__eq_eq($25);
self._assert_($19);
$ctx2.sendIdx["assert:"]=3;
return self._assert_(_st(_st(_st(_st(_st(window)._app())._session())._api())._webSocket())._isConnected());
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,2)})}))._valueWithTimeout_((1000));
return self}, function($ctx1) {$ctx1.fill(self,"testConnect",{},globals.FlowTest)})},
args: [],
source: "testConnect\x0a\x0a\x09self shouldnt:[\x0a\x09\x09window app session api webSocket connect ] raise: Error.\x0a\x09\x0a\x09[\x22The >>valueWithTimeout: is there because connecting a ws takes time\x22 \x0a\x09self assert: window app session api webSocket hasSocket.\x0a\x09self assert: window app session api webSocket isConnected.\x0a\x0a\x09self shouldnt:[\x0a\x09\x09window app session api webSocket connect ] raise: Error.\x0a\x0a\x09self assert: window app session api webSocket socket == window app session api webSocket socket.\x0a\x09self assert: window app session api webSocket isConnected ] valueWithTimeout: 1000\x0a\x09",
messageSends: ["shouldnt:raise:", "connect", "webSocket", "api", "session", "app", "valueWithTimeout:", "assert:", "hasSocket", "isConnected", "==", "socket"],
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
var $5,$4,$3,$2,$1,$10,$9,$8,$7,$6,$11,$13,$12;
$5=_st(window)._app();
$ctx1.sendIdx["app"]=1;
$4=_st($5)._session();
$ctx1.sendIdx["session"]=1;
$3=_st($4)._api();
$ctx1.sendIdx["api"]=1;
$2=_st($3)._webSocket();
$ctx1.sendIdx["webSocket"]=1;
$1=_st($2)._hasSocket();
self._assert_($1);
$ctx1.sendIdx["assert:"]=1;
$10=_st(window)._app();
$ctx1.sendIdx["app"]=2;
$9=_st($10)._session();
$ctx1.sendIdx["session"]=2;
$8=_st($9)._api();
$ctx1.sendIdx["api"]=2;
$7=_st($8)._webSocket();
$ctx1.sendIdx["webSocket"]=2;
$6=_st($7)._isConnected();
self._assert_($6);
$ctx1.sendIdx["assert:"]=2;
echo=_st($Echo())._for_("Do you follow?");
$11=_st(_st(echo)._content()).__eq("Do you follow?");
$ctx1.sendIdx["="]=1;
self._assert_($11);
$ctx1.sendIdx["assert:"]=3;
$13=_st(echo)._echoes();
$ctx1.sendIdx["echoes"]=1;
$12=_st($13)._isNil();
self._assert_($12);
$ctx1.sendIdx["assert:"]=4;
_st(_st(_st(_st(_st(window)._app())._session())._api())._webSocket())._sendCommand_do_(echo,(function(ans){
return smalltalk.withContext(function($ctx2) {
return self._assert_(_st(_st(ans)._echoes()).__eq("Do you follow?"));
}, function($ctx2) {$ctx2.fillBlock({ans:ans},$ctx1,1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"testEcho",{echo:echo},globals.FlowTest)})},
args: [],
source: "testEcho\x0a\x0a\x09| echo |\x0a\x0a\x09self assert: window app session api webSocket hasSocket.\x0a\x09self assert: window app session api webSocket isConnected.\x0a\x0a\x09echo := Echo for: 'Do you follow?'.\x0a\x09\x0a\x09self assert: echo content = 'Do you follow?'.\x0a\x09self assert: echo echoes isNil.\x0a\x09\x0a\x09window app session api webSocket \x0a\x09\x09sendCommand: echo\x0a\x09\x09do:[ :ans | self assert: ans echoes = 'Do you follow?' ] ",
messageSends: ["assert:", "hasSocket", "webSocket", "api", "session", "app", "isConnected", "for:", "=", "content", "isNil", "echoes", "sendCommand:do:"],
referencedClasses: ["Echo"]
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
var $5,$4,$3,$2,$1,$10,$9,$8,$7,$6,$12,$11;
$5=_st(window)._app();
$ctx1.sendIdx["app"]=1;
$4=_st($5)._session();
$ctx1.sendIdx["session"]=1;
$3=_st($4)._api();
$ctx1.sendIdx["api"]=1;
$2=_st($3)._webSocket();
$ctx1.sendIdx["webSocket"]=1;
$1=_st($2)._hasSocket();
self._assert_($1);
$ctx1.sendIdx["assert:"]=1;
$10=_st(window)._app();
$ctx1.sendIdx["app"]=2;
$9=_st($10)._session();
$ctx1.sendIdx["session"]=2;
$8=_st($9)._api();
$ctx1.sendIdx["api"]=2;
$7=_st($8)._webSocket();
$ctx1.sendIdx["webSocket"]=2;
$6=_st($7)._isConnected();
self._assert_($6);
$ctx1.sendIdx["assert:"]=2;
ping=_st($Ping())._new();
$12=_st(ping)._pongOn();
$ctx1.sendIdx["pongOn"]=1;
$11=_st($12)._isNil();
self._assert_($11);
$ctx1.sendIdx["assert:"]=3;
_st(_st(_st(_st(_st(window)._app())._session())._api())._webSocket())._sendCommand_do_(ping,(function(ans){
return smalltalk.withContext(function($ctx2) {
return self._assert_(_st(_st(ans)._pongOn())._notNil());
}, function($ctx2) {$ctx2.fillBlock({ans:ans},$ctx1,1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"testPing",{ping:ping},globals.FlowTest)})},
args: [],
source: "testPing\x0a\x0a\x09| ping |\x0a\x0a\x09self assert: window app session api webSocket hasSocket.\x0a\x09self assert: window app session api webSocket isConnected.\x0a\x0a\x09ping := Ping new.\x0a\x09\x0a\x09self assert: ping pongOn isNil.\x0a\x09\x0a\x09window app session api webSocket \x0a\x09\x09sendCommand: ping\x0a\x09\x09do:[ :ans | self assert: ans pongOn notNil ] ",
messageSends: ["assert:", "hasSocket", "webSocket", "api", "session", "app", "isConnected", "new", "isNil", "pongOn", "sendCommand:do:", "notNil"],
referencedClasses: ["Ping"]
}),
globals.FlowTest);


});
