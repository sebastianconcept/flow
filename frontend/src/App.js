define("app/App", ["amber/boot", "app/Flow-Core"], function($boot){
var smalltalk=$boot.vm,nil=$boot.nil,_st=$boot.asReceiver,globals=$boot.globals;
smalltalk.addPackage('App');
smalltalk.packages["App"].transport = {"type":"amd","amdNamespace":"app"};

smalltalk.addClass('AppController', globals.FlowAppController, [], 'App');
globals.AppController.comment="##AppController\x0a\x0aThe AppController is the main/root controller of your flow-based application.\x0a";
smalltalk.addMethod(
smalltalk.method({
selector: "onOpen",
protocol: 'reactions',
fn: function (){
var self=this;
function $Transcript(){return globals.Transcript||(typeof Transcript=="undefined"?nil:Transcript)}
return smalltalk.withContext(function($ctx1) { 
var $1,$2;
($ctx1.supercall = true, globals.AppController.superclass.fn.prototype._onOpen.apply(_st(self), []));
$ctx1.supercall = false;
$1=_st(_st(self._session())._api())._ws();
_st($1)._publish_at_(app,"app");
$ctx1.sendIdx["publish:at:"]=1;
_st($1)._publish_at_(_st($Transcript())._current(),"Transcript");
$ctx1.sendIdx["publish:at:"]=2;
_st($1)._publish_at_(console,"console");
$ctx1.sendIdx["publish:at:"]=3;
_st($1)._publish_at_((function(sent){
return sent;
}),"echo");
$ctx1.sendIdx["publish:at:"]=4;
_st($1)._publish_at_((function(ping){
return "pong";
}),"ping");
$ctx1.sendIdx["publish:at:"]=5;
_st($1)._publish_at_((function(a,b){
return smalltalk.withContext(function($ctx2) {
return _st(a).__plus(b);
}, function($ctx2) {$ctx2.fillBlock({a:a,b:b},$ctx1,3)})}),"sum");
$2=_st($1)._yourself();
return self}, function($ctx1) {$ctx1.fill(self,"onOpen",{},globals.AppController)})},
args: [],
source: "onOpen\x0a\x09\x22All is loaded, ready to rock!\x22\x0a\x09\x0a\x09super onOpen.\x0a\x09\x0a\x09\x22Time for the app to do its own particular thigns...\x22\x0a\x09\x0a\x09\x22do this\x0a\x09and\x0a\x09that\x22\x0a\x0a\x09self session api ws\x0a\x09\x09publish: app at: 'app';\x0a\x09\x09publish: Transcript current at: 'Transcript';\x0a\x09\x09publish: console at: 'console';\x0a\x09\x09publish: [ :sent | sent ] at: 'echo';\x0a\x09\x09publish: [ :ping | #pong ] at: 'ping';\x09\x09\x0a\x09\x09publish: [ :a :b | a + b ] at: 'sum';\x09\x0a\x09\x09yourself",
messageSends: ["onOpen", "publish:at:", "ws", "api", "session", "current", "+", "yourself"],
referencedClasses: ["Transcript"]
}),
globals.AppController);

smalltalk.addMethod(
smalltalk.method({
selector: "tellMe",
protocol: 'reactions',
fn: function (){
var self=this;
return "again how cool this is";
},
args: [],
source: "tellMe\x0a\x0a\x09^ 'again how cool this is'",
messageSends: [],
referencedClasses: []
}),
globals.AppController);

smalltalk.addMethod(
smalltalk.method({
selector: "you",
protocol: 'reactions',
fn: function (){
var self=this;
return self;
},
args: [],
source: "you\x0a\x0a\x09^ self",
messageSends: [],
referencedClasses: []
}),
globals.AppController);


});
