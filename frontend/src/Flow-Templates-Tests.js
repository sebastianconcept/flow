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
return smalltalk.withContext(function($ctx1) { 
_st(_st(self._model())._things())._add_(self._newThing());
return self}, function($ctx1) {$ctx1.fill(self,"addThing",{},globals.StuffController)})},
args: [],
source: "addThing\x0a\x09\x0a\x09self model things add: self newThing",
messageSends: ["add:", "things", "model", "newThing"],
referencedClasses: []
}),
globals.StuffController);

smalltalk.addMethod(
smalltalk.method({
selector: "initialize",
protocol: 'initialization',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
($ctx1.supercall = true, globals.StuffController.superclass.fn.prototype._initialize.apply(_st(self), []));
$ctx1.supercall = false;
self._model_(self._newStuff());
self._addThing();
$ctx1.sendIdx["addThing"]=1;
$1=self._addThing();
return self}, function($ctx1) {$ctx1.fill(self,"initialize",{},globals.StuffController)})},
args: [],
source: "initialize\x0a\x0a\x09super initialize.\x0a\x09\x0a\x09self model: self newStuff.\x0a\x09self addThing; addThing",
messageSends: ["initialize", "model:", "newStuff", "addThing"],
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
selector: "newThing",
protocol: 'actions',
fn: function (){
var self=this;
function $Thing(){return globals.Thing||(typeof Thing=="undefined"?nil:Thing)}
return smalltalk.withContext(function($ctx1) { 
var $2,$3,$1;
$2=_st($Thing())._new();
_st($2)._name_(_st(self._inspiration())._atRandom());
$3=_st($2)._yourself();
$1=$3;
return $1;
}, function($ctx1) {$ctx1.fill(self,"newThing",{},globals.StuffController)})},
args: [],
source: "newThing\x0a\x0a\x09^ Thing new\x0a\x09\x09name: self inspiration atRandom;\x0a\x09\x09yourself",
messageSends: ["name:", "new", "atRandom", "inspiration", "yourself"],
referencedClasses: ["Thing"]
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


smalltalk.addClass('StuffUsingEachController', globals.BindingController, [], 'Flow-Templates-Tests');
globals.StuffUsingEachController.comment="StuffController is a Controller composed by ThingControllers that are created based in the model's content.\x0a\x0aStuff has a collection of Thing(s)";
smalltalk.addMethod(
smalltalk.method({
selector: "addThing",
protocol: 'actions',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
_st(_st(self._model())._things())._add_(self._newThing());
return self}, function($ctx1) {$ctx1.fill(self,"addThing",{},globals.StuffUsingEachController)})},
args: [],
source: "addThing\x0a\x09\x0a\x09self model things add: self newThing",
messageSends: ["add:", "things", "model", "newThing"],
referencedClasses: []
}),
globals.StuffUsingEachController);

smalltalk.addMethod(
smalltalk.method({
selector: "initialize",
protocol: 'initialization',
fn: function (){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
($ctx1.supercall = true, globals.StuffUsingEachController.superclass.fn.prototype._initialize.apply(_st(self), []));
$ctx1.supercall = false;
self._model_(self._newStuff());
self._addThing();
$ctx1.sendIdx["addThing"]=1;
$1=self._addThing();
return self}, function($ctx1) {$ctx1.fill(self,"initialize",{},globals.StuffUsingEachController)})},
args: [],
source: "initialize\x0a\x0a\x09super initialize.\x0a\x09\x0a\x09self model: self newStuff.\x0a\x09self addThing; addThing",
messageSends: ["initialize", "model:", "newStuff", "addThing"],
referencedClasses: []
}),
globals.StuffUsingEachController);

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
globals.StuffUsingEachController);

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
}, function($ctx1) {$ctx1.fill(self,"newStuff",{},globals.StuffUsingEachController)})},
args: [],
source: "newStuff\x0a\x0a\x09^ Stuff new\x0a\x09\x09name: 'Hey... this stuff is new!';\x0a\x09\x09yourself",
messageSends: ["name:", "new", "yourself"],
referencedClasses: ["Stuff"]
}),
globals.StuffUsingEachController);

smalltalk.addMethod(
smalltalk.method({
selector: "newThing",
protocol: 'actions',
fn: function (){
var self=this;
function $Thing(){return globals.Thing||(typeof Thing=="undefined"?nil:Thing)}
return smalltalk.withContext(function($ctx1) { 
var $2,$3,$1;
$2=_st($Thing())._new();
_st($2)._name_(_st(self._inspiration())._atRandom());
$3=_st($2)._yourself();
$1=$3;
return $1;
}, function($ctx1) {$ctx1.fill(self,"newThing",{},globals.StuffUsingEachController)})},
args: [],
source: "newThing\x0a\x0a\x09^ Thing new\x0a\x09\x09name: self inspiration atRandom;\x0a\x09\x09yourself",
messageSends: ["name:", "new", "atRandom", "inspiration", "yourself"],
referencedClasses: ["Thing"]
}),
globals.StuffUsingEachController);


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
globals.StuffUsingEachController.klass);


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
