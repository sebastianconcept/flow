define("app/Flow-Binding-Tests", ["amber/boot", "app/MiniMapless", "app/Flow-Binding"], function($boot){
var smalltalk=$boot.vm,nil=$boot.nil,_st=$boot.asReceiver,globals=$boot.globals;
smalltalk.addPackage('Flow-Binding-Tests');
smalltalk.packages["Flow-Binding-Tests"].transport = {"type":"amd","amdNamespace":"app"};

smalltalk.addClass('MockPerson', globals.MaplessModel, [], 'Flow-Binding-Tests');


smalltalk.addClass('RivetsJSTestsController', globals.BindingController, [], 'Flow-Binding-Tests');
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
return self}, function($ctx1) {$ctx1.fill(self,"initialize",{},globals.RivetsJSTestsController)})},
args: [],
source: "initialize\x0a\x09\x22Initializes the controller of the rivets test view\x22\x0a\x09\x0a\x09super initialize.\x0a\x09\x0a\x09\x22As the controller's model we're using a new mapless\x22\x0a\x09self model: self newPerson.",
messageSends: ["initialize", "model:", "newPerson"],
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
source: "newPerson\x0a\x09\x22Answers a new MockPerson to be used as model for the demo.\x0a\x09Note that its attributes are probably used from the template (read and write)\x22\x0a\x0a\x09^ MockPerson new\x0a\x09\x09name: 'John Galt';\x0a\x09\x09age: 42;\x0a\x09\x09yourself",
messageSends: ["name:", "new", "age:", "yourself"],
referencedClasses: ["MockPerson"]
}),
globals.RivetsJSTestsController);

smalltalk.addMethod(
smalltalk.method({
selector: "onAha",
protocol: 'reactions',
fn: function (){
var self=this;
function $Transcript(){return globals.Transcript||(typeof Transcript=="undefined"?nil:Transcript)}
return smalltalk.withContext(function($ctx1) { 
var $1;
_st($Transcript())._cr();
$1=_st($Transcript())._show_("Woha! it was you who clicked that?");
return self}, function($ctx1) {$ctx1.fill(self,"onAha",{},globals.RivetsJSTestsController)})},
args: [],
source: "onAha\x0a\x0a\x09Transcript cr; show: 'Woha! it was you who clicked that?'",
messageSends: ["cr", "show:"],
referencedClasses: ["Transcript"]
}),
globals.RivetsJSTestsController);

smalltalk.addMethod(
smalltalk.method({
selector: "onMhm",
protocol: 'reactions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(window)._alert_("Nicely clicked!");
return self}, function($ctx1) {$ctx1.fill(self,"onMhm",{},globals.RivetsJSTestsController)})},
args: [],
source: "onMhm\x0a\x0a\x09window alert: 'Nicely clicked!'",
messageSends: ["alert:"],
referencedClasses: []
}),
globals.RivetsJSTestsController);


smalltalk.addMethod(
smalltalk.method({
selector: "viewPath",
protocol: 'accessing',
fn: function (){
var self=this;
return "bower_components/text/text!views/demo/";
},
args: [],
source: "viewPath\x0a\x09\x22Returns the path where the template of the view should be found\x22\x0a\x09\x0a\x09^ 'bower_components/text/text!views/demo/'",
messageSends: [],
referencedClasses: []
}),
globals.RivetsJSTestsController.klass);

});
