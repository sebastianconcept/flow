define("app/App", ["amber/boot", "app/Flow-Core"], function($boot){
var smalltalk=$boot.vm,nil=$boot.nil,_st=$boot.asReceiver,globals=$boot.globals;
smalltalk.addPackage('App');
smalltalk.packages["App"].transport = {"type":"amd","amdNamespace":"app"};

smalltalk.addClass('AppController', globals.FlowAppController, [], 'App');
globals.AppController.comment="##AppController\x0a\x0aThe AppController is the main/root controller of your flow-based application.";
smalltalk.addMethod(
smalltalk.method({
selector: "onOpen",
protocol: 'reactions',
fn: function (){
var self=this;
function $Transcript(){return globals.Transcript||(typeof Transcript=="undefined"?nil:Transcript)}
return smalltalk.withContext(function($ctx1) { 
($ctx1.supercall = true, globals.AppController.superclass.fn.prototype._onOpen.apply(_st(self), []));
$ctx1.supercall = false;
_st(_st(self._session())._api())._publish_($Transcript());
return self}, function($ctx1) {$ctx1.fill(self,"onOpen",{},globals.AppController)})},
args: [],
source: "onOpen\x0a\x09\x22All is loaded, ready to rock!\x22\x0a\x09\x0a\x09super onOpen.\x0a\x09\x0a\x09\x22Time for the app to do its own particular thigns...\x22\x0a\x09\x0a\x09\x22do this\x0a\x09and\x0a\x09that\x22\x0a\x09\x0a\x09self session api publish: Transcript",
messageSends: ["onOpen", "publish:", "api", "session"],
referencedClasses: ["Transcript"]
}),
globals.AppController);


});
