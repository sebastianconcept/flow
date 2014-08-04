define("app/Flow-Binding-Tests", ["amber/boot", "app/MiniMapless", "app/Flow-Binding"], function($boot){
var smalltalk=$boot.vm,nil=$boot.nil,_st=$boot.asReceiver,globals=$boot.globals;
smalltalk.addPackage('Flow-Binding-Tests');
smalltalk.packages["Flow-Binding-Tests"].transport = {"type":"amd","amdNamespace":"app"};

smalltalk.addClass('MockPerson', globals.MaplessModel, [], 'Flow-Binding-Tests');


smalltalk.addClass('RivetsJSTestsController', globals.BindingController, [], 'Flow-Binding-Tests');
smalltalk.addMethod(
smalltalk.method({
selector: "getView",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1="#rivetsTests"._asJQuery();
return $1;
}, function($ctx1) {$ctx1.fill(self,"getView",{},globals.RivetsJSTestsController)})},
args: [],
source: "getView\x0a\x09\x22Gets and answer the element which is \x0a\x09the parent html element of the view of this controller.\x22\x0a\x09\x0a\x09^ '#rivetsTests' asJQuery\x0a\x09",
messageSends: ["asJQuery"],
referencedClasses: []
}),
globals.RivetsJSTestsController);

smalltalk.addMethod(
smalltalk.method({
selector: "initialize",
protocol: 'initialization',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
($ctx1.supercall = true, globals.RivetsJSTestsController.superclass.fn.prototype._initialize.apply(_st(self), []));
$ctx1.supercall = false;
self._model_(self._newPerson());
_st(window)._at_put_("r",self);
return self}, function($ctx1) {$ctx1.fill(self,"initialize",{},globals.RivetsJSTestsController)})},
args: [],
source: "initialize\x0a\x0a\x09super initialize.\x0a\x09\x0a\x09self model: self newPerson.\x0a\x09\x0a\x09window at: 'r' put: self",
messageSends: ["initialize", "model:", "newPerson", "at:put:"],
referencedClasses: []
}),
globals.RivetsJSTestsController);

smalltalk.addMethod(
smalltalk.method({
selector: "newPerson",
protocol: 'actions',
fn: function (){
var self=this;
function $MockPerson(){return globals.MockPerson||(typeof MockPerson=="undefined"?nil:MockPerson)}
return smalltalk.withContext(function($ctx1) { 
var $2,$3,$1;
$2=_st($MockPerson())._new();
_st($2)._name_("John Galt");
_st($2)._age_((42));
$3=_st($2)._yourself();
$1=$3;
return $1;
}, function($ctx1) {$ctx1.fill(self,"newPerson",{},globals.RivetsJSTestsController)})},
args: [],
source: "newPerson\x0a\x0a\x09^ MockPerson new\x0a\x09\x09name: 'John Galt';\x0a\x09\x09age: 42;\x0a\x09\x09yourself",
messageSends: ["name:", "new", "age:", "yourself"],
referencedClasses: ["MockPerson"]
}),
globals.RivetsJSTestsController);


});
