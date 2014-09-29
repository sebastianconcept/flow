define("app/Flow-Templates", ["amber/boot", "app/Flow-Core"], function($boot){
var smalltalk=$boot.vm,nil=$boot.nil,_st=$boot.asReceiver,globals=$boot.globals;
smalltalk.addPackage('Flow-Templates');
smalltalk.packages["Flow-Templates"].transport = {"type":"amd","amdNamespace":"app"};

smalltalk.addClass('TemplateController', globals.RouteableController, [], 'Flow-Templates');
globals.TemplateController.comment="## TemplateController is an abstraction\x0aThe concrete subclasses of TemplateController follow the convention of loading html from the server.\x0aThis convention uses the keyword of the controller as the name of the template to be found at views/";
smalltalk.addMethod(
smalltalk.method({
selector: "onTemplate:",
protocol: 'reactions',
fn: function (data){
var self=this;
var appended;
return smalltalk.withContext(function($ctx1) { 
appended=_st(self._parentElement())._append_(data);
self._view_(_st(_st(appended)._children())._last());
return self}, function($ctx1) {$ctx1.fill(self,"onTemplate:",{data:data,appended:appended},globals.TemplateController)})},
args: ["data"],
source: "onTemplate: data\x0a\x09\x22Receives the template's data after requirejs \x0a\x09have received it from the server (or cache).\x22\x0a\x0a\x09| appended |\x0a\x0a\x09\x22Make it to be the contents of this controllers parent element\x22\x0a\x09\x22self parentElement html: data.\x22\x0a\x09appended := self parentElement append: data.\x0a\x09\x0a\x09\x22And follow the convention that all templates are wrapped\x0a\x09in one element which is the view of this controller.\x22\x0a\x09self view: appended children last.\x0a\x09",
messageSends: ["append:", "parentElement", "view:", "last", "children"],
referencedClasses: []
}),
globals.TemplateController);

smalltalk.addMethod(
smalltalk.method({
selector: "renderOn:",
protocol: 'rendering',
fn: function (html){
var self=this;
function $Array(){return globals.Array||(typeof Array=="undefined"?nil:Array)}
return smalltalk.withContext(function($ctx1) { 
var $1,$6,$5,$4,$3,$2;
$1=require;
$6=self._class();
$ctx1.sendIdx["class"]=1;
$5=_st($6)._viewPath();
$4=_st($5).__comma(_st(self._class())._keyword());
$3=_st($4).__comma(".html");
$ctx1.sendIdx[","]=1;
$2=_st($Array())._with_($3);
_st($1)._value_value_($2,(function(template){
return smalltalk.withContext(function($ctx2) {
return self._onTemplate_(template);
}, function($ctx2) {$ctx2.fillBlock({template:template},$ctx1,1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"renderOn:",{html:html},globals.TemplateController)})},
args: ["html"],
source: "renderOn: html\x0a\x0a\x09require \x0a\x09\x09value:(Array with: self class viewPath, self class keyword,'.html')\x0a\x09\x09value:[\x09:template | \x0a\x09\x09\x09self onTemplate: template]\x09",
messageSends: ["value:value:", "with:", ",", "viewPath", "class", "keyword", "onTemplate:"],
referencedClasses: ["Array"]
}),
globals.TemplateController);


smalltalk.addMethod(
smalltalk.method({
selector: "isAbstract",
protocol: 'testing',
fn: function (){
var self=this;
function $TemplateController(){return globals.TemplateController||(typeof TemplateController=="undefined"?nil:TemplateController)}
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=self.__eq($TemplateController());
return $1;
}, function($ctx1) {$ctx1.fill(self,"isAbstract",{},globals.TemplateController.klass)})},
args: [],
source: "isAbstract\x0a\x09\x22Answers true if the receiver is abstract.\x22\x0a\x09\x0a\x09^ self = TemplateController",
messageSends: ["="],
referencedClasses: ["TemplateController"]
}),
globals.TemplateController.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "isValidFor:",
protocol: 'testing',
fn: function (anURI){
var self=this;
return smalltalk.withContext(function($ctx1) { 
var $1;
$1=_st(_st(self._isAbstract())._not())._and_((function(){
return smalltalk.withContext(function($ctx2) {
return _st(_st(anURI)._notEmpty())._and_((function(){
return smalltalk.withContext(function($ctx3) {
return _st(anURI).__eq(self._keyword());
}, function($ctx3) {$ctx3.fillBlock({},$ctx2,2)})}));
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}));
$ctx1.sendIdx["and:"]=1;
return $1;
}, function($ctx1) {$ctx1.fill(self,"isValidFor:",{anURI:anURI},globals.TemplateController.klass)})},
args: ["anURI"],
source: "isValidFor: anURI\x0a\x09\x22Answers true if this controller is the right route for anURI\x22\x0a\x09\x0a\x09^ self isAbstract not and:[\x0a\x09anURI notEmpty and:[\x0a\x09anURI = self keyword ] ]",
messageSends: ["and:", "not", "isAbstract", "notEmpty", "=", "keyword"],
referencedClasses: []
}),
globals.TemplateController.klass);

smalltalk.addMethod(
smalltalk.method({
selector: "viewPath",
protocol: 'accessing',
fn: function (){
var self=this;
return "bower_components/text/text!views/";
},
args: [],
source: "viewPath\x0a\x09\x22Returns the path where the template of the view should be found\x22\x0a\x09\x0a\x09^ 'bower_components/text/text!views/'",
messageSends: [],
referencedClasses: []
}),
globals.TemplateController.klass);


smalltalk.addClass('HelloWorldController', globals.TemplateController, [], 'Flow-Templates');

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
globals.HelloWorldController.klass);

});
