define("app/Flow-Templates-Tests", ["amber/boot", "app/Flow-Binding"], function($boot){
var smalltalk=$boot.vm,nil=$boot.nil,_st=$boot.asReceiver,globals=$boot.globals;
smalltalk.addPackage('Flow-Templates-Tests');
smalltalk.packages["Flow-Templates-Tests"].transport = {"type":"amd","amdNamespace":"app"};

smalltalk.addClass('StuffController', globals.BindingController, [], 'Flow-Templates-Tests');
globals.StuffController.comment="StuffController is a Controller composed by ThingControllers that are created based in the model's content.\x0a\x0aStuff has a collection of Thing(s)";
smalltalk.addMethod(
smalltalk.method({
selector: "addThing",
protocol: 'actions',
fn: function (){
var self=this;
function $Transcript(){return globals.Transcript||(typeof Transcript=="undefined"?nil:Transcript)}
return smalltalk.withContext(function($ctx1) { 
var $3,$2,$1;
_st(_st(window)._console())._log_(self);
_st($Transcript())._cr();
$3=self._inspiration();
$ctx1.sendIdx["inspiration"]=1;
$2=_st($3)._atRandom();
$ctx1.sendIdx["atRandom"]=1;
$1=_st($Transcript())._show_($2);
_st(_st(self._inspiration())._atRandom())._inspect();
return self}, function($ctx1) {$ctx1.fill(self,"addThing",{},globals.StuffController)})},
args: [],
source: "addThing\x0a\x0a\x09window console log: self.\x0a\x09\x0a\x09Transcript cr; show: self inspiration atRandom.\x0a\x09self inspiration atRandom inspect.\x0a\x09\x0a\x09\x22self inspiration atRandom inspect.\x22\x0a\x09\x0a\x09\x22Transcript cr; show: self model things\x22\x0a\x09\x0a\x09\x22Transcript cr; show: 6+5+11.\x22\x0a\x09\x22Transcript cr; show: self inspiration atRandom\x22",
messageSends: ["log:", "console", "cr", "show:", "atRandom", "inspiration", "inspect"],
referencedClasses: ["Transcript"]
}),
globals.StuffController);

smalltalk.addMethod(
smalltalk.method({
selector: "initialize",
protocol: 'initialization',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
($ctx1.supercall = true, globals.StuffController.superclass.fn.prototype._initialize.apply(_st(self), []));
$ctx1.supercall = false;
self._model_(self._newStuff());
return self}, function($ctx1) {$ctx1.fill(self,"initialize",{},globals.StuffController)})},
args: [],
source: "initialize\x0a\x0a\x09super initialize.\x0a\x09\x0a\x09self model: self newStuff",
messageSends: ["initialize", "model:", "newStuff"],
referencedClasses: []
}),
globals.StuffController);

smalltalk.addMethod(
smalltalk.method({
selector: "inspiration",
protocol: 'accessing',
fn: function (){
var self=this;
var $1;
$1=["so", "many", "cool", "things", "here", "wow", "great", "sweet", "groovy"];
return $1;
},
args: [],
source: "inspiration\x0a\x09\x22Answers a collection to inspire a name for something.\x22\x0a\x09\x0a\x09^ #(\x0a\x09so \x0a\x09many \x0a\x09cool \x0a\x09things \x0a\x09here \x0a\x09wow \x0a\x09great \x0a \x09sweet \x0a\x09groovy \x0a\x09)\x0a\x09",
messageSends: [],
referencedClasses: []
}),
globals.StuffController);

smalltalk.addMethod(
smalltalk.method({
selector: "newStuff",
protocol: 'actions',
fn: function (){
var self=this;
function $Stuff(){return globals.Stuff||(typeof Stuff=="undefined"?nil:Stuff)}
return smalltalk.withContext(function($ctx1) { 
var $2,$3,$1;
$2=_st($Stuff())._new();
_st($2)._name_("Hey... this stuff is new!");
$3=_st($2)._yourself();
$1=$3;
return $1;
}, function($ctx1) {$ctx1.fill(self,"newStuff",{},globals.StuffController)})},
args: [],
source: "newStuff\x0a\x0a\x09^ Stuff new\x0a\x09\x09name: 'Hey... this stuff is new!';\x0a\x09\x09yourself",
messageSends: ["name:", "new", "yourself"],
referencedClasses: ["Stuff"]
}),
globals.StuffController);


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
globals.StuffController.klass);


smalltalk.addClass('ThingController', globals.BindingController, [], 'Flow-Templates-Tests');

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
globals.ThingController.klass);

});
