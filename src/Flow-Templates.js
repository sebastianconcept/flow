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
return smalltalk.withContext(function($ctx1) { 
_st(self._jQueryElement())._html_(data);
return self}, function($ctx1) {$ctx1.fill(self,"onTemplate:",{data:data},globals.TemplateController)})},
args: ["data"],
source: "onTemplate: data\x0a\x09\x22Receives data once requirejs have received it from the server.\x22\x0a\x0a\x09\x22Make it to be the contents of this controllers element\x22\x0a\x09self jQueryElement html: data.",
messageSends: ["html:", "jQueryElement"],
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
var $1,$3,$2;
$1=require;
$3=_st("bower_components/text/text!views/".__comma(_st(self._class())._keyword())).__comma(".html");
$ctx1.sendIdx[","]=1;
$2=_st($Array())._with_($3);
_st($1)._value_value_($2,(function(template){
return smalltalk.withContext(function($ctx2) {
return self._onTemplate_(template);
}, function($ctx2) {$ctx2.fillBlock({template:template},$ctx1,1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"renderOn:",{html:html},globals.TemplateController)})},
args: ["html"],
source: "renderOn: html\x0a\x0a\x09require \x0a\x09\x09value:(Array with: 'bower_components/text/text!views/',self class keyword,'.html')\x0a\x09\x09value:[\x09:template | \x0a\x09\x09\x09self onTemplate: template]\x09",
messageSends: ["value:value:", "with:", ",", "keyword", "class", "onTemplate:"],
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


smalltalk.addClass('HelloWorldController', globals.TemplateController, [], 'Flow-Templates');

});
