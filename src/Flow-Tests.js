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
var $4,$3,$2,$1;
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
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}),$Error());
self._assert_(_st(_st(_st(_st(_st(_st(window)._app())._session())._api())._webSocket())._socket())._notNil());
return self}, function($ctx1) {$ctx1.fill(self,"testConnect",{},globals.FlowTest)})},
args: [],
source: "testConnect\x0a\x0a\x09self shouldnt:[\x0a\x09\x09window app session api webSocket connect ] raise: Error.\x0a\x09\x0a\x09self assert: window app session api webSocket socket notNil",
messageSends: ["shouldnt:raise:", "connect", "webSocket", "api", "session", "app", "assert:", "notNil", "socket"],
referencedClasses: ["Error"]
}),
globals.FlowTest);


});
