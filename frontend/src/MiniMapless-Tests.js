define("app/MiniMapless-Tests", ["amber/boot", "amber_core/SUnit", "app/MiniMapless"], function($boot){
var smalltalk=$boot.vm,nil=$boot.nil,_st=$boot.asReceiver,globals=$boot.globals;
smalltalk.addPackage('MiniMapless-Tests');
smalltalk.packages["MiniMapless-Tests"].transport = {"type":"amd","amdNamespace":"app"};

smalltalk.addClass('MaplessTest', globals.TestCase, [], 'MiniMapless-Tests');
smalltalk.addMethod(
smalltalk.method({
selector: "testLocalFresh",
protocol: 'tests',
fn: function (){
var self=this;
var createdOne,loadedOne;
function $Thing(){return globals.Thing||(typeof Thing=="undefined"?nil:Thing)}
function $Mapless(){return globals.Mapless||(typeof Mapless=="undefined"?nil:Mapless)}
function $Error(){return globals.Error||(typeof Error=="undefined"?nil:Error)}
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$4,$3;
createdOne=_st($Thing())._new();
_st(createdOne)._remember_((42));
$ctx1.sendIdx["remember:"]=1;
_st(createdOne)._localSave();
self._shouldnt_raise_((function(){
return smalltalk.withContext(function($ctx2) {
loadedOne=_st($Mapless())._localFindId_(_st(createdOne)._id());
loadedOne;
_st(loadedOne)._remember_("something");
$2=_st(loadedOne)._remember();
$ctx2.sendIdx["remember"]=1;
$1=_st($2).__eq("something");
$ctx2.sendIdx["="]=1;
self._assert_($1);
$ctx2.sendIdx["assert:"]=1;
_st(loadedOne)._localFresh();
$4=_st(loadedOne)._remember();
$ctx2.sendIdx["remember"]=2;
$3=_st($4).__eq("something");
$ctx2.sendIdx["="]=2;
self._deny_($3);
return self._assert_(_st(_st(loadedOne)._remember()).__eq((42)));
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}),$Error());
return self}, function($ctx1) {$ctx1.fill(self,"testLocalFresh",{createdOne:createdOne,loadedOne:loadedOne},globals.MaplessTest)})},
args: [],
source: "testLocalFresh\x0a\x0a\x09| createdOne loadedOne |\x0a\x09\x0a\x09createdOne := Thing new.\x0a\x09\x0a\x09createdOne remember: 42.\x0a\x09createdOne localSave.\x0a\x09\x0a\x09self shouldnt: [\x0a\x09\x09\x09loadedOne := Mapless localFindId: createdOne id.\x0a\x09\x09\x09loadedOne remember: 'something'.\x0a\x09\x09\x09self assert: loadedOne remember = 'something'.\x0a\x09\x09\x09loadedOne localFresh.\x0a\x09\x09\x09self deny: loadedOne remember = 'something'.\x0a\x09\x09\x09self assert: loadedOne remember = 42.\x0a\x09\x09] raise: Error\x0a\x0a\x0a\x09",
messageSends: ["new", "remember:", "localSave", "shouldnt:raise:", "localFindId:", "id", "assert:", "=", "remember", "localFresh", "deny:"],
referencedClasses: ["Thing", "Mapless", "Error"]
}),
globals.MaplessTest);

smalltalk.addMethod(
smalltalk.method({
selector: "testLocalSaveAndDelete",
protocol: 'tests',
fn: function (){
var self=this;
var createdOne,loadedOne;
function $Thing(){return globals.Thing||(typeof Thing=="undefined"?nil:Thing)}
function $Mapless(){return globals.Mapless||(typeof Mapless=="undefined"?nil:Mapless)}
function $Error(){return globals.Error||(typeof Error=="undefined"?nil:Error)}
return smalltalk.withContext(function($ctx1) { 
var $3,$4,$2,$1,$7,$8,$6,$5,$9,$12,$13,$11,$10;
createdOne=_st($Thing())._new();
_st(createdOne)._remember_("something");
$3=_st(window)._localStorage();
$ctx1.sendIdx["localStorage"]=1;
$4=_st(createdOne)._id();
$ctx1.sendIdx["id"]=1;
$2=_st($3)._getItem_($4);
$ctx1.sendIdx["getItem:"]=1;
$1=_st($2)._notNil();
$ctx1.sendIdx["notNil"]=1;
self._deny_($1);
_st(createdOne)._localSave();
self._shouldnt_raise_((function(){
return smalltalk.withContext(function($ctx2) {
$7=_st(window)._localStorage();
$ctx2.sendIdx["localStorage"]=2;
$8=_st(createdOne)._id();
$ctx2.sendIdx["id"]=2;
$6=_st($7)._getItem_($8);
$ctx2.sendIdx["getItem:"]=2;
$5=_st($6)._notNil();
self._assert_($5);
$ctx2.sendIdx["assert:"]=1;
$9=_st(createdOne)._id();
$ctx2.sendIdx["id"]=3;
loadedOne=_st($Mapless())._localFindId_($9);
$ctx2.sendIdx["localFindId:"]=1;
loadedOne;
self._assert_(_st(_st(loadedOne)._remember()).__eq("something"));
$ctx2.sendIdx["assert:"]=2;
_st(loadedOne)._localDelete();
$12=_st(window)._localStorage();
$13=_st(createdOne)._id();
$ctx2.sendIdx["id"]=4;
$11=_st($12)._getItem_($13);
$10=_st($11)._isNil();
$ctx2.sendIdx["isNil"]=1;
self._assert_($10);
$ctx2.sendIdx["assert:"]=3;
return self._assert_(_st(_st($Mapless())._localFindId_(_st(createdOne)._id()))._isNil());
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}),$Error());
return self}, function($ctx1) {$ctx1.fill(self,"testLocalSaveAndDelete",{createdOne:createdOne,loadedOne:loadedOne},globals.MaplessTest)})},
args: [],
source: "testLocalSaveAndDelete\x0a\x0a\x09| createdOne loadedOne |\x0a\x09\x0a\x09createdOne := Thing new.\x0a\x09\x0a\x09createdOne remember: 'something'.\x0a\x09\x0a\x09self deny: (window localStorage getItem: createdOne id) notNil.\x0a\x09\x0a\x09createdOne localSave.\x0a\x0a\x09self shouldnt: [\x0a\x09\x09self assert: (window localStorage getItem: createdOne id) notNil.\x0a\x09\x09loadedOne := Mapless localFindId: createdOne id.\x0a\x09\x09self assert: loadedOne remember = 'something'.\x0a\x09\x09\x0a\x09\x09loadedOne localDelete.\x0a\x09\x09self assert: (window localStorage getItem: createdOne id) isNil.\x0a\x09\x09self assert: (Mapless localFindId: createdOne id) isNil.\x0a\x09\x09] raise: Error\x0a\x0a\x09",
messageSends: ["new", "remember:", "deny:", "notNil", "getItem:", "localStorage", "id", "localSave", "shouldnt:raise:", "assert:", "localFindId:", "=", "remember", "localDelete", "isNil"],
referencedClasses: ["Thing", "Mapless", "Error"]
}),
globals.MaplessTest);

smalltalk.addMethod(
smalltalk.method({
selector: "testLocalSaveAndFindOne",
protocol: 'tests',
fn: function (){
var self=this;
var createdOne,loadedOne;
function $Thing(){return globals.Thing||(typeof Thing=="undefined"?nil:Thing)}
function $Mapless(){return globals.Mapless||(typeof Mapless=="undefined"?nil:Mapless)}
function $Error(){return globals.Error||(typeof Error=="undefined"?nil:Error)}
return smalltalk.withContext(function($ctx1) { 
var $3,$4,$2,$1,$7,$8,$6,$5,$9,$10,$12,$11;
createdOne=_st($Thing())._new();
_st(createdOne)._remember_("something");
$3=_st(window)._localStorage();
$ctx1.sendIdx["localStorage"]=1;
$4=_st(createdOne)._id();
$ctx1.sendIdx["id"]=1;
$2=_st($3)._getItem_($4);
$ctx1.sendIdx["getItem:"]=1;
$1=_st($2)._notNil();
$ctx1.sendIdx["notNil"]=1;
self._deny_($1);
_st(createdOne)._localSave();
$7=_st(window)._localStorage();
$8=_st(createdOne)._id();
$ctx1.sendIdx["id"]=2;
$6=_st($7)._getItem_($8);
$5=_st($6)._notNil();
self._assert_($5);
$ctx1.sendIdx["assert:"]=1;
self._shouldnt_raise_((function(){
return smalltalk.withContext(function($ctx2) {
$9=_st(createdOne)._id();
$ctx2.sendIdx["id"]=3;
loadedOne=_st($Mapless())._localFindId_($9);
loadedOne;
$10=_st(_st(loadedOne)._class()).__eq($Thing());
$ctx2.sendIdx["="]=1;
self._assert_($10);
$ctx2.sendIdx["assert:"]=2;
$12=_st(loadedOne)._id();
$ctx2.sendIdx["id"]=4;
$11=_st($12).__eq(_st(createdOne)._id());
$ctx2.sendIdx["="]=2;
self._assert_($11);
$ctx2.sendIdx["assert:"]=3;
return self._assert_(_st(_st(loadedOne)._remember()).__eq("something"));
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}),$Error());
return self}, function($ctx1) {$ctx1.fill(self,"testLocalSaveAndFindOne",{createdOne:createdOne,loadedOne:loadedOne},globals.MaplessTest)})},
args: [],
source: "testLocalSaveAndFindOne\x0a\x0a\x09| createdOne loadedOne |\x0a\x09\x0a\x09createdOne := Thing new.\x0a\x09\x0a\x09createdOne remember: 'something'.\x0a\x09\x0a\x09self deny: (window localStorage getItem: createdOne id) notNil.\x0a\x09\x0a\x09createdOne localSave.\x0a\x0a\x09self assert: (window localStorage getItem: createdOne id) notNil.\x0a\x0a\x09self shouldnt: [\x0a\x09\x09\x09loadedOne := Mapless localFindId: createdOne id.\x0a\x09\x09\x09self assert: loadedOne class = Thing.\x0a\x09\x09\x09self assert: loadedOne id = createdOne id.\x0a\x09\x09\x09self assert: loadedOne remember = 'something'.\x0a\x09\x09] raise: Error\x0a\x0a\x09",
messageSends: ["new", "remember:", "deny:", "notNil", "getItem:", "localStorage", "id", "localSave", "assert:", "shouldnt:raise:", "localFindId:", "=", "class", "remember"],
referencedClasses: ["Thing", "Mapless", "Error"]
}),
globals.MaplessTest);

smalltalk.addMethod(
smalltalk.method({
selector: "testLocalSaveComposedMany",
protocol: 'tests',
fn: function (){
var self=this;
var createdOne,composed1,composed2,loadedOne,part1,part2;
function $Thing(){return globals.Thing||(typeof Thing=="undefined"?nil:Thing)}
function $Stuff(){return globals.Stuff||(typeof Stuff=="undefined"?nil:Stuff)}
function $Array(){return globals.Array||(typeof Array=="undefined"?nil:Array)}
function $Mapless(){return globals.Mapless||(typeof Mapless=="undefined"?nil:Mapless)}
function $Error(){return globals.Error||(typeof Error=="undefined"?nil:Error)}
return smalltalk.withContext(function($ctx1) { 
var $3,$4,$2,$1,$5,$6,$8,$9,$7,$10,$13,$14,$12,$11,$15,$16,$17,$18,$22,$21,$20,$23,$19,$27,$26,$25,$28,$24,$32,$31,$30,$33,$29,$37,$36,$35,$38,$34,$42,$41,$40,$39,$44,$45,$43,$48,$49,$47,$46,$52,$53,$51,$50,$56,$57,$55,$54,$60,$59,$58,$63,$62,$61;
createdOne=_st($Thing())._new();
$ctx1.sendIdx["new"]=1;
composed1=_st($Stuff())._new();
$ctx1.sendIdx["new"]=2;
composed2=_st($Thing())._new();
$ctx1.sendIdx["new"]=3;
_st(createdOne)._remember_("something");
$3=_st(window)._localStorage();
$ctx1.sendIdx["localStorage"]=1;
$4=_st(createdOne)._id();
$ctx1.sendIdx["id"]=1;
$2=_st($3)._getItem_($4);
$ctx1.sendIdx["getItem:"]=1;
$1=_st($2)._notNil();
$ctx1.sendIdx["notNil"]=1;
self._deny_($1);
_st(composed1)._localSave();
$ctx1.sendIdx["localSave"]=1;
_st(composed2)._localSave();
$ctx1.sendIdx["localSave"]=2;
$5=createdOne;
$6=$5;
$8=_st($Array())._new();
_st($8)._add_(composed1);
$ctx1.sendIdx["add:"]=1;
_st($8)._add_(composed2);
$9=_st($8)._yourself();
$7=$9;
_st($6)._parts_($7);
$10=_st($5)._localSave();
self._shouldnt_raise_((function(){
return smalltalk.withContext(function($ctx2) {
$13=_st(window)._localStorage();
$ctx2.sendIdx["localStorage"]=2;
$14=_st(createdOne)._id();
$ctx2.sendIdx["id"]=2;
$12=_st($13)._getItem_($14);
$ctx2.sendIdx["getItem:"]=2;
$11=_st($12)._notNil();
self._assert_($11);
$ctx2.sendIdx["assert:"]=1;
$15=_st(createdOne)._id();
$ctx2.sendIdx["id"]=3;
loadedOne=_st($Mapless())._localFindId_($15);
$ctx2.sendIdx["localFindId:"]=1;
loadedOne;
$16=_st(composed1)._id();
$ctx2.sendIdx["id"]=4;
part1=_st($Mapless())._localFindId_($16);
$ctx2.sendIdx["localFindId:"]=2;
part1;
$17=_st(composed2)._id();
$ctx2.sendIdx["id"]=5;
part2=_st($Mapless())._localFindId_($17);
$ctx2.sendIdx["localFindId:"]=3;
part2;
$18=_st(_st(loadedOne)._remember()).__eq("something");
$ctx2.sendIdx["="]=1;
self._assert_($18);
$ctx2.sendIdx["assert:"]=2;
$22=_st(loadedOne)._parts();
$ctx2.sendIdx["parts"]=1;
$21=_st($22)._first();
$ctx2.sendIdx["first"]=1;
$20=_st($21)._class();
$ctx2.sendIdx["class"]=1;
$23=_st(composed1)._class();
$ctx2.sendIdx["class"]=2;
$19=_st($20).__eq($23);
$ctx2.sendIdx["="]=2;
self._assert_($19);
$ctx2.sendIdx["assert:"]=3;
$27=_st(loadedOne)._parts();
$ctx2.sendIdx["parts"]=2;
$26=_st($27)._first();
$ctx2.sendIdx["first"]=2;
$25=_st($26)._class();
$ctx2.sendIdx["class"]=3;
$28=_st(part1)._class();
$ctx2.sendIdx["class"]=4;
$24=_st($25).__eq($28);
$ctx2.sendIdx["="]=3;
self._assert_($24);
$ctx2.sendIdx["assert:"]=4;
$32=_st(loadedOne)._parts();
$ctx2.sendIdx["parts"]=3;
$31=_st($32)._first();
$30=_st($31)._id();
$ctx2.sendIdx["id"]=6;
$33=_st(part1)._id();
$ctx2.sendIdx["id"]=7;
$29=_st($30).__eq($33);
$ctx2.sendIdx["="]=4;
self._assert_($29);
$ctx2.sendIdx["assert:"]=5;
$37=_st(loadedOne)._parts();
$ctx2.sendIdx["parts"]=4;
$36=_st($37)._second();
$ctx2.sendIdx["second"]=1;
$35=_st($36)._class();
$ctx2.sendIdx["class"]=5;
$38=_st(composed2)._class();
$ctx2.sendIdx["class"]=6;
$34=_st($35).__eq($38);
$ctx2.sendIdx["="]=5;
self._assert_($34);
$ctx2.sendIdx["assert:"]=6;
$42=_st(loadedOne)._parts();
$ctx2.sendIdx["parts"]=5;
$41=_st($42)._second();
$ctx2.sendIdx["second"]=2;
$40=_st($41)._class();
$ctx2.sendIdx["class"]=7;
$39=_st($40).__eq(_st(part2)._class());
$ctx2.sendIdx["="]=6;
self._assert_($39);
$ctx2.sendIdx["assert:"]=7;
$44=_st(_st(_st(loadedOne)._parts())._second())._id();
$ctx2.sendIdx["id"]=8;
$45=_st(part2)._id();
$ctx2.sendIdx["id"]=9;
$43=_st($44).__eq($45);
self._assert_($43);
$ctx2.sendIdx["assert:"]=8;
_st(loadedOne)._localDelete();
$ctx2.sendIdx["localDelete"]=1;
_st(composed1)._localDelete();
$ctx2.sendIdx["localDelete"]=2;
_st(composed2)._localDelete();
$48=_st(window)._localStorage();
$ctx2.sendIdx["localStorage"]=3;
$49=_st(createdOne)._id();
$ctx2.sendIdx["id"]=10;
$47=_st($48)._getItem_($49);
$ctx2.sendIdx["getItem:"]=3;
$46=_st($47)._isNil();
$ctx2.sendIdx["isNil"]=1;
self._assert_($46);
$ctx2.sendIdx["assert:"]=9;
$52=_st(window)._localStorage();
$ctx2.sendIdx["localStorage"]=4;
$53=_st(composed1)._id();
$ctx2.sendIdx["id"]=11;
$51=_st($52)._getItem_($53);
$ctx2.sendIdx["getItem:"]=4;
$50=_st($51)._isNil();
$ctx2.sendIdx["isNil"]=2;
self._assert_($50);
$ctx2.sendIdx["assert:"]=10;
$56=_st(window)._localStorage();
$57=_st(composed2)._id();
$ctx2.sendIdx["id"]=12;
$55=_st($56)._getItem_($57);
$54=_st($55)._isNil();
$ctx2.sendIdx["isNil"]=3;
self._assert_($54);
$ctx2.sendIdx["assert:"]=11;
$60=_st(createdOne)._id();
$ctx2.sendIdx["id"]=13;
$59=_st($Mapless())._localFindId_($60);
$ctx2.sendIdx["localFindId:"]=4;
$58=_st($59)._isNil();
$ctx2.sendIdx["isNil"]=4;
self._assert_($58);
$ctx2.sendIdx["assert:"]=12;
$63=_st(composed1)._id();
$ctx2.sendIdx["id"]=14;
$62=_st($Mapless())._localFindId_($63);
$ctx2.sendIdx["localFindId:"]=5;
$61=_st($62)._isNil();
$ctx2.sendIdx["isNil"]=5;
self._assert_($61);
$ctx2.sendIdx["assert:"]=13;
return self._assert_(_st(_st($Mapless())._localFindId_(_st(composed2)._id()))._isNil());
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}),$Error());
return self}, function($ctx1) {$ctx1.fill(self,"testLocalSaveComposedMany",{createdOne:createdOne,composed1:composed1,composed2:composed2,loadedOne:loadedOne,part1:part1,part2:part2},globals.MaplessTest)})},
args: [],
source: "testLocalSaveComposedMany\x0a\x0a\x09| createdOne composed1 composed2 loadedOne part1 part2 |\x0a\x09\x0a\x09createdOne := Thing new.\x0a\x09composed1 := Stuff new.\x0a\x09composed2 := Thing new.\x0a\x09\x0a\x09createdOne remember: 'something'.\x0a\x09\x0a\x09self deny: (window localStorage getItem: createdOne id) notNil.\x0a\x09\x0a\x09composed1 localSave.\x0a\x09composed2 localSave.\x0a\x09createdOne\x0a\x09\x09parts: (Array new\x0a\x09\x09\x09\x09\x09add: composed1;\x0a\x09\x09\x09\x09\x09add: composed2;\x0a\x09\x09\x09\x09\x09yourself);\x0a\x09\x09localSave.\x0a\x0a\x09self shouldnt: [\x0a\x09\x09self assert: (window localStorage getItem: createdOne id) notNil.\x0a\x09\x09loadedOne := Mapless localFindId: createdOne id.\x0a\x09\x09part1 := Mapless localFindId: composed1 id.\x0a\x09\x09part2 := Mapless localFindId: composed2 id.\x0a\x09\x09self assert: loadedOne remember = 'something'.\x0a\x09\x09self assert: loadedOne parts first class = composed1 class.\x0a\x09\x09self assert: loadedOne parts first class = part1 class.\x0a\x09\x09self assert: loadedOne parts first id = part1 id.\x0a\x0a\x09\x09self assert: loadedOne parts second class = composed2 class.\x0a\x09\x09self assert: loadedOne parts second class = part2 class.\x0a\x09\x09self assert: loadedOne parts second id = part2 id.\x0a\x0a\x09\x09loadedOne localDelete.\x0a\x09\x09composed1 localDelete.\x0a\x09\x09composed2 localDelete.\x0a\x09\x09self assert: (window localStorage getItem: createdOne id) isNil.\x0a\x09\x09self assert: (window localStorage getItem: composed1 id) isNil.\x0a\x09\x09self assert: (window localStorage getItem: composed2 id) isNil.\x0a\x09\x09self assert: (Mapless localFindId: createdOne id) isNil.\x0a\x09\x09self assert: (Mapless localFindId: composed1 id) isNil.\x0a\x09\x09self assert: (Mapless localFindId: composed2 id) isNil.\x0a\x09\x09] raise: Error\x0a\x0a\x09",
messageSends: ["new", "remember:", "deny:", "notNil", "getItem:", "localStorage", "id", "localSave", "parts:", "add:", "yourself", "shouldnt:raise:", "assert:", "localFindId:", "=", "remember", "class", "first", "parts", "second", "localDelete", "isNil"],
referencedClasses: ["Thing", "Stuff", "Array", "Mapless", "Error"]
}),
globals.MaplessTest);

smalltalk.addMethod(
smalltalk.method({
selector: "testLocalSaveComposedOne",
protocol: 'tests',
fn: function (){
var self=this;
var createdOne,composedOne,loadedOne,part;
function $Thing(){return globals.Thing||(typeof Thing=="undefined"?nil:Thing)}
function $Stuff(){return globals.Stuff||(typeof Stuff=="undefined"?nil:Stuff)}
function $Mapless(){return globals.Mapless||(typeof Mapless=="undefined"?nil:Mapless)}
function $Error(){return globals.Error||(typeof Error=="undefined"?nil:Error)}
return smalltalk.withContext(function($ctx1) { 
var $3,$4,$2,$1,$5,$6,$9,$10,$8,$7,$11,$12,$13,$16,$15,$17,$14,$20,$19,$18,$22,$23,$21,$26,$27,$25,$24,$30,$31,$29,$28,$34,$33,$32;
createdOne=_st($Thing())._new();
$ctx1.sendIdx["new"]=1;
composedOne=_st($Stuff())._new();
_st(createdOne)._remember_("something");
$3=_st(window)._localStorage();
$ctx1.sendIdx["localStorage"]=1;
$4=_st(createdOne)._id();
$ctx1.sendIdx["id"]=1;
$2=_st($3)._getItem_($4);
$ctx1.sendIdx["getItem:"]=1;
$1=_st($2)._notNil();
$ctx1.sendIdx["notNil"]=1;
self._deny_($1);
_st(composedOne)._localSave();
$ctx1.sendIdx["localSave"]=1;
$5=createdOne;
_st($5)._hasOneOf_(composedOne);
$6=_st($5)._localSave();
self._shouldnt_raise_((function(){
return smalltalk.withContext(function($ctx2) {
$9=_st(window)._localStorage();
$ctx2.sendIdx["localStorage"]=2;
$10=_st(createdOne)._id();
$ctx2.sendIdx["id"]=2;
$8=_st($9)._getItem_($10);
$ctx2.sendIdx["getItem:"]=2;
$7=_st($8)._notNil();
self._assert_($7);
$ctx2.sendIdx["assert:"]=1;
$11=_st(createdOne)._id();
$ctx2.sendIdx["id"]=3;
loadedOne=_st($Mapless())._localFindId_($11);
$ctx2.sendIdx["localFindId:"]=1;
loadedOne;
$12=_st(composedOne)._id();
$ctx2.sendIdx["id"]=4;
part=_st($Mapless())._localFindId_($12);
$ctx2.sendIdx["localFindId:"]=2;
part;
$13=_st(_st(loadedOne)._remember()).__eq("something");
$ctx2.sendIdx["="]=1;
self._assert_($13);
$ctx2.sendIdx["assert:"]=2;
$16=_st(loadedOne)._hasOneOf();
$ctx2.sendIdx["hasOneOf"]=1;
$15=_st($16)._class();
$ctx2.sendIdx["class"]=1;
$17=_st(composedOne)._class();
$ctx2.sendIdx["class"]=2;
$14=_st($15).__eq($17);
$ctx2.sendIdx["="]=2;
self._assert_($14);
$ctx2.sendIdx["assert:"]=3;
$20=_st(loadedOne)._hasOneOf();
$ctx2.sendIdx["hasOneOf"]=2;
$19=_st($20)._class();
$ctx2.sendIdx["class"]=3;
$18=_st($19).__eq(_st(part)._class());
$ctx2.sendIdx["="]=3;
self._assert_($18);
$ctx2.sendIdx["assert:"]=4;
$22=_st(_st(loadedOne)._hasOneOf())._id();
$ctx2.sendIdx["id"]=5;
$23=_st(part)._id();
$ctx2.sendIdx["id"]=6;
$21=_st($22).__eq($23);
self._assert_($21);
$ctx2.sendIdx["assert:"]=5;
_st(loadedOne)._localDelete();
$ctx2.sendIdx["localDelete"]=1;
_st(composedOne)._localDelete();
$26=_st(window)._localStorage();
$ctx2.sendIdx["localStorage"]=3;
$27=_st(createdOne)._id();
$ctx2.sendIdx["id"]=7;
$25=_st($26)._getItem_($27);
$ctx2.sendIdx["getItem:"]=3;
$24=_st($25)._isNil();
$ctx2.sendIdx["isNil"]=1;
self._assert_($24);
$ctx2.sendIdx["assert:"]=6;
$30=_st(window)._localStorage();
$31=_st(composedOne)._id();
$ctx2.sendIdx["id"]=8;
$29=_st($30)._getItem_($31);
$28=_st($29)._isNil();
$ctx2.sendIdx["isNil"]=2;
self._assert_($28);
$ctx2.sendIdx["assert:"]=7;
$34=_st(createdOne)._id();
$ctx2.sendIdx["id"]=9;
$33=_st($Mapless())._localFindId_($34);
$ctx2.sendIdx["localFindId:"]=3;
$32=_st($33)._isNil();
$ctx2.sendIdx["isNil"]=3;
self._assert_($32);
$ctx2.sendIdx["assert:"]=8;
return self._assert_(_st(_st($Mapless())._localFindId_(_st(composedOne)._id()))._isNil());
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}),$Error());
return self}, function($ctx1) {$ctx1.fill(self,"testLocalSaveComposedOne",{createdOne:createdOne,composedOne:composedOne,loadedOne:loadedOne,part:part},globals.MaplessTest)})},
args: [],
source: "testLocalSaveComposedOne\x0a\x0a\x09| createdOne composedOne loadedOne part |\x0a\x09\x0a\x09createdOne := Thing new.\x0a\x09composedOne := Stuff new.\x0a\x09\x0a\x09createdOne remember: 'something'.\x0a\x09\x0a\x09self deny: (window localStorage getItem: createdOne id) notNil.\x0a\x09\x0a\x09composedOne localSave.\x0a\x09createdOne \x0a\x09\x09hasOneOf: composedOne;\x0a\x09\x09localSave.\x0a\x0a\x09self shouldnt: [\x0a\x09\x09self assert: (window localStorage getItem: createdOne id) notNil.\x0a\x09\x09loadedOne := Mapless localFindId: createdOne id.\x0a\x09\x09part := Mapless localFindId: composedOne id.\x0a\x09\x09self assert: loadedOne remember = 'something'.\x0a\x09\x09self assert: loadedOne hasOneOf class = composedOne class.\x0a\x09\x09self assert: loadedOne hasOneOf class = part class.\x0a\x09\x09self assert: loadedOne hasOneOf id = part id.\x0a\x09\x09\x0a\x09\x09loadedOne localDelete.\x0a\x09\x09composedOne localDelete.\x0a\x09\x09self assert: (window localStorage getItem: createdOne id) isNil.\x0a\x09\x09self assert: (window localStorage getItem: composedOne id) isNil.\x0a\x09\x09self assert: (Mapless localFindId: createdOne id) isNil.\x0a\x09\x09self assert: (Mapless localFindId: composedOne id) isNil.\x0a\x09\x09] raise: Error\x0a\x0a\x09",
messageSends: ["new", "remember:", "deny:", "notNil", "getItem:", "localStorage", "id", "localSave", "hasOneOf:", "shouldnt:raise:", "assert:", "localFindId:", "=", "remember", "class", "hasOneOf", "localDelete", "isNil"],
referencedClasses: ["Thing", "Stuff", "Mapless", "Error"]
}),
globals.MaplessTest);

smalltalk.addMethod(
smalltalk.method({
selector: "testLocalUpdate",
protocol: 'tests',
fn: function (){
var self=this;
var createdOne,loadedOne;
function $Thing(){return globals.Thing||(typeof Thing=="undefined"?nil:Thing)}
function $Mapless(){return globals.Mapless||(typeof Mapless=="undefined"?nil:Mapless)}
function $Error(){return globals.Error||(typeof Error=="undefined"?nil:Error)}
return smalltalk.withContext(function($ctx1) { 
var $3,$4,$2,$1,$7,$8,$6,$5,$9,$10,$12,$13,$11,$15,$14,$17,$16,$19,$18,$21,$20;
createdOne=_st($Thing())._new();
_st(createdOne)._remember_("something");
$ctx1.sendIdx["remember:"]=1;
$3=_st(window)._localStorage();
$ctx1.sendIdx["localStorage"]=1;
$4=_st(createdOne)._id();
$ctx1.sendIdx["id"]=1;
$2=_st($3)._getItem_($4);
$ctx1.sendIdx["getItem:"]=1;
$1=_st($2)._notNil();
$ctx1.sendIdx["notNil"]=1;
self._deny_($1);
$ctx1.sendIdx["deny:"]=1;
_st(createdOne)._localSave();
$ctx1.sendIdx["localSave"]=1;
$7=_st(window)._localStorage();
$8=_st(createdOne)._id();
$ctx1.sendIdx["id"]=2;
$6=_st($7)._getItem_($8);
$5=_st($6)._notNil();
self._assert_($5);
$ctx1.sendIdx["assert:"]=1;
self._shouldnt_raise_((function(){
return smalltalk.withContext(function($ctx2) {
$9=_st(createdOne)._id();
$ctx2.sendIdx["id"]=3;
loadedOne=_st($Mapless())._localFindId_($9);
$ctx2.sendIdx["localFindId:"]=1;
loadedOne;
$10=_st(_st(loadedOne)._class()).__eq($Thing());
$ctx2.sendIdx["="]=1;
self._assert_($10);
$ctx2.sendIdx["assert:"]=2;
$12=_st(loadedOne)._id();
$ctx2.sendIdx["id"]=4;
$13=_st(createdOne)._id();
$ctx2.sendIdx["id"]=5;
$11=_st($12).__eq($13);
$ctx2.sendIdx["="]=2;
self._assert_($11);
$ctx2.sendIdx["assert:"]=3;
$15=_st(loadedOne)._remember();
$ctx2.sendIdx["remember"]=1;
$14=_st($15).__eq("something");
$ctx2.sendIdx["="]=3;
self._assert_($14);
$ctx2.sendIdx["assert:"]=4;
$17=_st(loadedOne)._remember();
$ctx2.sendIdx["remember"]=2;
$16=_st($17).__eq("else");
$ctx2.sendIdx["="]=4;
self._deny_($16);
$ctx2.sendIdx["deny:"]=2;
_st(loadedOne)._remember_("else");
$19=_st(loadedOne)._remember();
$ctx2.sendIdx["remember"]=3;
$18=_st($19).__eq("else");
$ctx2.sendIdx["="]=5;
self._assert_($18);
$ctx2.sendIdx["assert:"]=5;
_st(loadedOne)._localSave();
loadedOne=_st($Mapless())._localFindId_(_st(createdOne)._id());
loadedOne;
$21=_st(loadedOne)._remember();
$ctx2.sendIdx["remember"]=4;
$20=_st($21).__eq("something");
$ctx2.sendIdx["="]=6;
self._deny_($20);
return self._assert_(_st(_st(loadedOne)._remember()).__eq("else"));
}, function($ctx2) {$ctx2.fillBlock({},$ctx1,1)})}),$Error());
return self}, function($ctx1) {$ctx1.fill(self,"testLocalUpdate",{createdOne:createdOne,loadedOne:loadedOne},globals.MaplessTest)})},
args: [],
source: "testLocalUpdate\x0a\x0a\x09| createdOne loadedOne |\x0a\x09\x0a\x09createdOne := Thing new.\x0a\x09\x0a\x09createdOne remember: 'something'.\x0a\x09\x0a\x09self deny: (window localStorage getItem: createdOne id) notNil.\x0a\x09\x0a\x09createdOne localSave.\x0a\x0a\x09self assert: (window localStorage getItem: createdOne id) notNil.\x0a\x0a\x09self shouldnt: [\x0a\x09\x09\x09loadedOne := Mapless localFindId: createdOne id.\x0a\x09\x09\x09\x0a\x09\x09\x09self assert: loadedOne class = Thing.\x0a\x09\x09\x09self assert: loadedOne id = createdOne id.\x0a\x09\x09\x09self assert: loadedOne remember = 'something'.\x0a\x09\x09\x09self deny: loadedOne remember = 'else'.\x0a\x09\x09\x09loadedOne remember: 'else'.\x0a\x09\x09\x09self assert: loadedOne remember = 'else'.\x0a\x09\x09\x09loadedOne localSave.\x0a\x09\x09\x09loadedOne := Mapless localFindId: createdOne id.\x0a\x09\x09\x09self deny: loadedOne remember = 'something'.\x0a\x09\x09\x09self assert: loadedOne remember = 'else'.\x0a\x09\x09] raise: Error\x0a\x0a\x09",
messageSends: ["new", "remember:", "deny:", "notNil", "getItem:", "localStorage", "id", "localSave", "assert:", "shouldnt:raise:", "localFindId:", "=", "class", "remember"],
referencedClasses: ["Thing", "Mapless", "Error"]
}),
globals.MaplessTest);

smalltalk.addMethod(
smalltalk.method({
selector: "testPath",
protocol: 'tests',
fn: function (){
var self=this;
function $Thing(){return globals.Thing||(typeof Thing=="undefined"?nil:Thing)}
function $Stuff(){return globals.Stuff||(typeof Stuff=="undefined"?nil:Stuff)}
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$4,$3;
$2=_st($Thing())._path();
$ctx1.sendIdx["path"]=1;
$1=_st($2).__eq("api/1.0/thing");
$ctx1.sendIdx["="]=1;
self._deny_($1);
$4=_st($Thing())._path();
$ctx1.sendIdx["path"]=2;
$3=_st($4).__eq("api/1.0/things");
$ctx1.sendIdx["="]=2;
self._assert_($3);
$ctx1.sendIdx["assert:"]=1;
self._assert_(_st(_st($Stuff())._path()).__eq("api/1.0/stuff"));
return self}, function($ctx1) {$ctx1.fill(self,"testPath",{},globals.MaplessTest)})},
args: [],
source: "testPath\x0a\x0a\x09self deny: Thing path = 'api/1.0/thing'.\x0a\x09self assert: Thing path = 'api/1.0/things'.\x0a\x0a\x09\x22ok, but what about irregulars?\x22\x0a\x09self assert: Stuff path = 'api/1.0/stuff'.\x0a\x09\x0a\x09",
messageSends: ["deny:", "=", "path", "assert:"],
referencedClasses: ["Thing", "Stuff"]
}),
globals.MaplessTest);

smalltalk.addMethod(
smalltalk.method({
selector: "testRemoteCreate",
protocol: 'tests',
fn: function (){
var self=this;
var createdOne,loadedOne;
function $Thing(){return globals.Thing||(typeof Thing=="undefined"?nil:Thing)}
function $MaplessError(){return globals.MaplessError||(typeof MaplessError=="undefined"?nil:MaplessError)}
return smalltalk.withContext(function($ctx1) { 
var $2,$1;
createdOne=_st($Thing())._new();
_st(createdOne)._remember_("something");
_st(createdOne)._createDo_((function(res){
return smalltalk.withContext(function($ctx2) {
self._shouldnt_raise_((function(){
return smalltalk.withContext(function($ctx3) {
_st(createdOne)._onAfterCreated_(res);
$ctx3.sendIdx["onAfterCreated:"]=1;
$2=_st(res)._status();
$ctx3.sendIdx["status"]=1;
$1=_st($2).__eq((201));
$ctx3.sendIdx["="]=1;
return self._assert_($1);
$ctx3.sendIdx["assert:"]=1;
}, function($ctx3) {$ctx3.fillBlock({},$ctx2,2)})}),$MaplessError());
return _st(createdOne)._createDo_((function(resp){
return smalltalk.withContext(function($ctx3) {
return _st((function(){
return smalltalk.withContext(function($ctx4) {
return _st(createdOne)._onAfterCreated_(resp);
}, function($ctx4) {$ctx4.fillBlock({},$ctx3,4)})}))._on_do_($MaplessError(),(function(x){
return smalltalk.withContext(function($ctx4) {
return self._assert_(_st(_st(resp)._status()).__eq((409)));
}, function($ctx4) {$ctx4.fillBlock({x:x},$ctx3,5)})}));
}, function($ctx3) {$ctx3.fillBlock({resp:resp},$ctx2,3)})}));
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})}));
$ctx1.sendIdx["createDo:"]=1;
return self}, function($ctx1) {$ctx1.fill(self,"testRemoteCreate",{createdOne:createdOne,loadedOne:loadedOne},globals.MaplessTest)})},
args: [],
source: "testRemoteCreate\x0a\x0a\x09| createdOne loadedOne |\x0a\x09\x0a\x09createdOne := Thing new.\x0a\x09\x0a\x09createdOne remember: 'something'.\x0a\x09\x09\x0a\x09createdOne createDo:[ :res |\x0a\x09\x09self shouldnt: [\x0a\x09\x09\x09\x09createdOne onAfterCreated: res.\x0a\x09\x09\x09\x09self assert: res status = 201 ]\x0a\x09\x09\x09raise: MaplessError. \x0a\x0a\x09\x09createdOne createDo:[ :resp |\x0a\x09\x09[ createdOne onAfterCreated: resp ]\x0a\x09\x09\x09on: MaplessError\x0a\x09\x09\x09do:[ :x | self assert: resp status = 409 ] ]\x0a\x09].",
messageSends: ["new", "remember:", "createDo:", "shouldnt:raise:", "onAfterCreated:", "assert:", "=", "status", "on:do:"],
referencedClasses: ["Thing", "MaplessError"]
}),
globals.MaplessTest);

smalltalk.addMethod(
smalltalk.method({
selector: "testRemoteDelete",
protocol: 'tests',
fn: function (){
var self=this;
var createdOne,loadedOne;
function $Thing(){return globals.Thing||(typeof Thing=="undefined"?nil:Thing)}
function $MaplessError(){return globals.MaplessError||(typeof MaplessError=="undefined"?nil:MaplessError)}
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$4,$3;
createdOne=_st($Thing())._new();
_st(createdOne)._remember_("something");
_st(createdOne)._createDo_((function(res){
return smalltalk.withContext(function($ctx2) {
self._shouldnt_raise_((function(){
return smalltalk.withContext(function($ctx3) {
_st(createdOne)._onAfterCreated_(res);
$2=_st(res)._status();
$ctx3.sendIdx["status"]=1;
$1=_st($2).__eq((201));
$ctx3.sendIdx["="]=1;
return self._assert_($1);
$ctx3.sendIdx["assert:"]=1;
}, function($ctx3) {$ctx3.fillBlock({},$ctx2,2)})}),$MaplessError());
_st(createdOne)._deleteDo_((function(resp){
return smalltalk.withContext(function($ctx3) {
_st(createdOne)._onAfterDeleted_(resp);
$4=_st(resp)._status();
$ctx3.sendIdx["status"]=2;
$3=_st($4).__eq((200));
$ctx3.sendIdx["="]=2;
return self._assert_($3);
}, function($ctx3) {$ctx3.fillBlock({resp:resp},$ctx2,3)})}));
return _st($Thing())._findId_do_(_st(createdOne)._id(),(function(response){
return smalltalk.withContext(function($ctx3) {
return _st(_st(response)._status()).__eq((404));
}, function($ctx3) {$ctx3.fillBlock({response:response},$ctx2,4)})}));
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"testRemoteDelete",{createdOne:createdOne,loadedOne:loadedOne},globals.MaplessTest)})},
args: [],
source: "testRemoteDelete\x0a\x0a\x09| createdOne loadedOne |\x0a\x09\x0a\x09createdOne := Thing new.\x0a\x09\x0a\x09createdOne remember: 'something'.\x0a\x09\x09\x0a\x09createdOne createDo:[ :res |\x0a\x09\x09self shouldnt: [\x0a\x09\x09\x09\x09createdOne onAfterCreated: res.\x0a\x09\x09\x09\x09self assert: res status = 201 ]\x0a\x09\x09\x09raise: MaplessError. \x0a\x0a\x09\x09createdOne deleteDo:[ :resp |\x0a\x09\x09\x09createdOne onAfterDeleted: resp.\x0a\x09\x09\x09self assert: resp status = 200 ].\x09\x0a\x09\x09\x09\x0a\x09\x09Thing findId: createdOne id do:[ :response |\x0a\x09\x09\x09response status = 404 ]\x0a\x09].\x0a\x0a\x0a\x09",
messageSends: ["new", "remember:", "createDo:", "shouldnt:raise:", "onAfterCreated:", "assert:", "=", "status", "deleteDo:", "onAfterDeleted:", "findId:do:", "id"],
referencedClasses: ["Thing", "MaplessError"]
}),
globals.MaplessTest);

smalltalk.addMethod(
smalltalk.method({
selector: "testRemoteRead",
protocol: 'tests',
fn: function (){
var self=this;
var createdOne,loadedOne;
function $Thing(){return globals.Thing||(typeof Thing=="undefined"?nil:Thing)}
function $MaplessError(){return globals.MaplessError||(typeof MaplessError=="undefined"?nil:MaplessError)}
return smalltalk.withContext(function($ctx1) { 
var $1,$2,$3,$4,$5;
createdOne=_st($Thing())._new();
$1=createdOne;
_st($1)._remember_("something");
_st($1)._remarkable_("today");
$2=_st($1)._youself();
_st(createdOne)._createDo_((function(res){
return smalltalk.withContext(function($ctx2) {
self._shouldnt_raise_((function(){
return smalltalk.withContext(function($ctx3) {
_st(createdOne)._onAfterCreated_(res);
$3=_st(_st(res)._status()).__eq((201));
$ctx3.sendIdx["="]=1;
return self._assert_($3);
$ctx3.sendIdx["assert:"]=1;
}, function($ctx3) {$ctx3.fillBlock({},$ctx2,2)})}),$MaplessError());
return _st($Thing())._findId_do_(_st(createdOne)._id(),(function(response){
return smalltalk.withContext(function($ctx3) {
loadedOne=_st($Thing())._onAfterRead_(response);
loadedOne;
$4=_st(_st(loadedOne)._class()).__eq($Thing());
$ctx3.sendIdx["="]=2;
self._assert_($4);
$ctx3.sendIdx["assert:"]=2;
$5=_st(_st(loadedOne)._remember()).__eq("something");
$ctx3.sendIdx["="]=3;
self._assert_($5);
$ctx3.sendIdx["assert:"]=3;
return self._assert_(_st(_st(loadedOne)._remarkable()).__eq("today"));
}, function($ctx3) {$ctx3.fillBlock({response:response},$ctx2,3)})}));
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"testRemoteRead",{createdOne:createdOne,loadedOne:loadedOne},globals.MaplessTest)})},
args: [],
source: "testRemoteRead\x0a\x0a\x09| createdOne loadedOne |\x0a\x09\x0a\x09createdOne := Thing new.\x0a\x09\x0a\x09createdOne \x0a\x09\x09remember: 'something';\x0a\x09\x09remarkable: 'today';\x0a\x09\x09youself.\x0a\x09\x09\x0a\x09createdOne createDo:[ :res |\x0a\x09\x09self shouldnt: [\x0a\x09\x09\x09\x09createdOne onAfterCreated: res.\x0a\x09\x09\x09\x09self assert: res status = 201 ]\x0a\x09\x09\x09raise: MaplessError. \x0a\x09\x09\x09\x0a\x09\x09Thing findId: createdOne id do:[ :response | \x0a\x09\x09\x09loadedOne := Thing onAfterRead: response.\x0a\x09\x09\x09self assert: loadedOne class = Thing.\x0a\x09\x09\x09self assert: loadedOne remember = 'something'.\x0a\x09\x09\x09self assert: loadedOne remarkable = 'today'\x0a\x09\x09]\x0a\x09].",
messageSends: ["new", "remember:", "remarkable:", "youself", "createDo:", "shouldnt:raise:", "onAfterCreated:", "assert:", "=", "status", "findId:do:", "id", "onAfterRead:", "class", "remember", "remarkable"],
referencedClasses: ["Thing", "MaplessError"]
}),
globals.MaplessTest);

smalltalk.addMethod(
smalltalk.method({
selector: "testRemoteReadAll",
protocol: 'tests',
fn: function (){
var self=this;
var createdOne,loadedOnes;
function $Thing(){return globals.Thing||(typeof Thing=="undefined"?nil:Thing)}
function $MaplessError(){return globals.MaplessError||(typeof MaplessError=="undefined"?nil:MaplessError)}
return smalltalk.withContext(function($ctx1) { 
var $1,$2,$3,$4,$5,$7,$6;
createdOne=_st($Thing())._new();
$1=createdOne;
_st($1)._remember_("something");
_st($1)._remarkable_("today");
$2=_st($1)._youself();
_st(createdOne)._createDo_((function(res){
return smalltalk.withContext(function($ctx2) {
self._shouldnt_raise_((function(){
return smalltalk.withContext(function($ctx3) {
_st(createdOne)._onAfterCreated_(res);
$3=_st(_st(res)._status()).__eq((201));
$ctx3.sendIdx["="]=1;
return self._assert_($3);
$ctx3.sendIdx["assert:"]=1;
}, function($ctx3) {$ctx3.fillBlock({},$ctx2,2)})}),$MaplessError());
return _st($Thing())._findAllDo_((function(response){
return smalltalk.withContext(function($ctx3) {
loadedOnes=_st($Thing())._onAfterReadAll_(response);
loadedOnes;
$4=_st(loadedOnes)._allSatisfy_((function(e){
return smalltalk.withContext(function($ctx4) {
return _st(_st(e)._class()).__eq($Thing());
$ctx4.sendIdx["="]=2;
}, function($ctx4) {$ctx4.fillBlock({e:e},$ctx3,4)})}));
$ctx3.sendIdx["allSatisfy:"]=1;
self._assert_($4);
$ctx3.sendIdx["assert:"]=2;
self._assert_(_st(loadedOnes)._allSatisfy_((function(e){
return smalltalk.withContext(function($ctx4) {
$5=_st(e)._id();
$ctx4.sendIdx["id"]=1;
return _st($5)._notNil();
}, function($ctx4) {$ctx4.fillBlock({e:e},$ctx3,5)})})));
$ctx3.sendIdx["assert:"]=3;
$6=_st(loadedOnes)._anySatisfy_((function(e){
return smalltalk.withContext(function($ctx4) {
$7=_st(e)._id();
$ctx4.sendIdx["id"]=2;
return _st($7).__eq(_st(createdOne)._id());
$ctx4.sendIdx["="]=3;
}, function($ctx4) {$ctx4.fillBlock({e:e},$ctx3,6)})}));
$ctx3.sendIdx["anySatisfy:"]=1;
self._assert_($6);
$ctx3.sendIdx["assert:"]=4;
return self._assert_(_st(loadedOnes)._anySatisfy_((function(e){
return smalltalk.withContext(function($ctx4) {
return _st(e).__eq(createdOne);
}, function($ctx4) {$ctx4.fillBlock({e:e},$ctx3,7)})})));
}, function($ctx3) {$ctx3.fillBlock({response:response},$ctx2,3)})}));
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"testRemoteReadAll",{createdOne:createdOne,loadedOnes:loadedOnes},globals.MaplessTest)})},
args: [],
source: "testRemoteReadAll\x0a\x0a\x09| createdOne loadedOnes |\x0a\x09\x0a\x09createdOne := Thing new.\x0a\x09\x0a\x09createdOne \x0a\x09\x09remember: 'something';\x0a\x09\x09remarkable: 'today';\x0a\x09\x09youself.\x0a\x09\x09\x0a\x09createdOne createDo:[ :res |\x0a\x09\x09self shouldnt: [\x0a\x09\x09\x09\x09createdOne onAfterCreated: res.\x0a\x09\x09\x09\x09self assert: res status = 201 ]\x0a\x09\x09\x09raise: MaplessError. \x0a\x09\x0a\x09\x09Thing findAllDo:[ :response |\x0a\x09\x09\x09loadedOnes := Thing onAfterReadAll: response.\x0a\x09\x09\x09self assert: (loadedOnes allSatisfy:[ :e | e class = Thing ]).\x0a\x09\x09\x09self assert: (loadedOnes allSatisfy:[ :e | e id notNil ]).\x0a\x09\x09\x09self assert: (loadedOnes anySatisfy:[ :e | e id = createdOne id ]).\x0a\x09\x09\x09self assert: (loadedOnes anySatisfy:[ :e | e = createdOne ]).\x0a\x09\x09\x09].\x0a\x09]",
messageSends: ["new", "remember:", "remarkable:", "youself", "createDo:", "shouldnt:raise:", "onAfterCreated:", "assert:", "=", "status", "findAllDo:", "onAfterReadAll:", "allSatisfy:", "class", "notNil", "id", "anySatisfy:"],
referencedClasses: ["Thing", "MaplessError"]
}),
globals.MaplessTest);

smalltalk.addMethod(
smalltalk.method({
selector: "testRemoteReadSome",
protocol: 'tests',
fn: function (){
var self=this;
var createdOne,query,loadedOnes;
function $Thing(){return globals.Thing||(typeof Thing=="undefined"?nil:Thing)}
function $MaplessError(){return globals.MaplessError||(typeof MaplessError=="undefined"?nil:MaplessError)}
return smalltalk.withContext(function($ctx1) { 
var $1,$2,$3,$4,$5,$7,$6;
createdOne=_st($Thing())._new();
$1=createdOne;
_st($1)._remember_("some");
$2=_st($1)._youself();
_st(createdOne)._createDo_((function(res){
return smalltalk.withContext(function($ctx2) {
self._shouldnt_raise_((function(){
return smalltalk.withContext(function($ctx3) {
_st(createdOne)._onAfterCreated_(res);
$3=_st(_st(res)._status()).__eq((201));
$ctx3.sendIdx["="]=1;
return self._assert_($3);
$ctx3.sendIdx["assert:"]=1;
}, function($ctx3) {$ctx3.fillBlock({},$ctx2,2)})}),$MaplessError());
query="{\x22remember\x22:\x22some\x22}";
query;
return _st($Thing())._find_do_(query,(function(response){
return smalltalk.withContext(function($ctx3) {
loadedOnes=_st($Thing())._onAfterReadSome_(response);
loadedOnes;
$4=_st(loadedOnes)._allSatisfy_((function(e){
return smalltalk.withContext(function($ctx4) {
return _st(_st(e)._class()).__eq($Thing());
$ctx4.sendIdx["="]=2;
}, function($ctx4) {$ctx4.fillBlock({e:e},$ctx3,4)})}));
$ctx3.sendIdx["allSatisfy:"]=1;
self._assert_($4);
$ctx3.sendIdx["assert:"]=2;
self._assert_(_st(loadedOnes)._allSatisfy_((function(e){
return smalltalk.withContext(function($ctx4) {
$5=_st(e)._id();
$ctx4.sendIdx["id"]=1;
return _st($5)._notNil();
}, function($ctx4) {$ctx4.fillBlock({e:e},$ctx3,5)})})));
$ctx3.sendIdx["assert:"]=3;
$6=_st(loadedOnes)._anySatisfy_((function(e){
return smalltalk.withContext(function($ctx4) {
$7=_st(e)._id();
$ctx4.sendIdx["id"]=2;
return _st($7).__eq(_st(createdOne)._id());
$ctx4.sendIdx["="]=3;
}, function($ctx4) {$ctx4.fillBlock({e:e},$ctx3,6)})}));
$ctx3.sendIdx["anySatisfy:"]=1;
self._assert_($6);
$ctx3.sendIdx["assert:"]=4;
return self._assert_(_st(loadedOnes)._anySatisfy_((function(e){
return smalltalk.withContext(function($ctx4) {
return _st(e).__eq(createdOne);
}, function($ctx4) {$ctx4.fillBlock({e:e},$ctx3,7)})})));
}, function($ctx3) {$ctx3.fillBlock({response:response},$ctx2,3)})}));
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"testRemoteReadSome",{createdOne:createdOne,query:query,loadedOnes:loadedOnes},globals.MaplessTest)})},
args: [],
source: "testRemoteReadSome\x0a\x0a\x09| createdOne query loadedOnes |\x0a\x09\x0a\x09createdOne := Thing new.\x0a\x09\x0a\x09createdOne \x0a\x09\x09remember: 'some';\x0a\x09\x09youself.\x0a\x09\x09\x0a\x09createdOne createDo:[ :res |\x0a\x09\x09self shouldnt: [\x0a\x09\x09\x09\x09createdOne onAfterCreated: res.\x0a\x09\x09\x09\x09self assert: res status = 201 ]\x0a\x09\x09\x09raise: MaplessError. \x0a\x0a\x09\x09query := '{\x22remember\x22:\x22some\x22}'.\x0a\x09\x09\x0a\x09\x09Thing find: query do:[ :response |\x0a\x09\x09\x09loadedOnes := Thing onAfterReadSome: response.\x0a\x09\x09\x09self assert: (loadedOnes allSatisfy:[ :e | e class = Thing ]).\x0a\x09\x09\x09self assert: (loadedOnes allSatisfy:[ :e | e id notNil ]).\x0a\x09\x09\x09self assert: (loadedOnes anySatisfy:[ :e | e id = createdOne id ]).\x0a\x09\x09\x09self assert: (loadedOnes anySatisfy:[ :e | e = createdOne ]).\x0a\x09\x09\x09].\x0a\x09]",
messageSends: ["new", "remember:", "youself", "createDo:", "shouldnt:raise:", "onAfterCreated:", "assert:", "=", "status", "find:do:", "onAfterReadSome:", "allSatisfy:", "class", "notNil", "id", "anySatisfy:"],
referencedClasses: ["Thing", "MaplessError"]
}),
globals.MaplessTest);

smalltalk.addMethod(
smalltalk.method({
selector: "testRemoteSave",
protocol: 'tests',
fn: function (){
var self=this;
var createdOne,loadedOne;
function $Thing(){return globals.Thing||(typeof Thing=="undefined"?nil:Thing)}
function $MaplessError(){return globals.MaplessError||(typeof MaplessError=="undefined"?nil:MaplessError)}
return smalltalk.withContext(function($ctx1) { 
var $1,$2,$4,$3,$5,$6,$7;
createdOne=_st($Thing())._new();
$1=createdOne;
_st($1)._thereIs_("noMap");
_st($1)._in_("mapless");
$2=_st($1)._yourself();
_st(createdOne)._saveDo_((function(res){
return smalltalk.withContext(function($ctx2) {
self._shouldnt_raise_((function(){
return smalltalk.withContext(function($ctx3) {
_st(createdOne)._onAfterSaved_(res);
$4=_st(res)._status();
$ctx3.sendIdx["status"]=1;
$3=_st($4).__eq((200));
$ctx3.sendIdx["="]=1;
return self._assert_($3);
$ctx3.sendIdx["assert:"]=1;
}, function($ctx3) {$ctx3.fillBlock({},$ctx2,2)})}),$MaplessError());
_st(createdOne)._createDo_((function(resp){
return smalltalk.withContext(function($ctx3) {
return _st((function(){
return smalltalk.withContext(function($ctx4) {
return _st(createdOne)._onAfterCreated_(resp);
}, function($ctx4) {$ctx4.fillBlock({},$ctx3,4)})}))._on_do_($MaplessError(),(function(x){
return smalltalk.withContext(function($ctx4) {
$5=_st(_st(resp)._status()).__eq((409));
$ctx4.sendIdx["="]=2;
return self._assert_($5);
$ctx4.sendIdx["assert:"]=2;
}, function($ctx4) {$ctx4.fillBlock({x:x},$ctx3,5)})}));
}, function($ctx3) {$ctx3.fillBlock({resp:resp},$ctx2,3)})}));
return _st($Thing())._findId_do_(_st(createdOne)._id(),(function(response){
return smalltalk.withContext(function($ctx3) {
loadedOne=_st($Thing())._onAfterRead_(response);
loadedOne;
$6=_st(_st(loadedOne)._class()).__eq($Thing());
$ctx3.sendIdx["="]=3;
self._assert_($6);
$ctx3.sendIdx["assert:"]=3;
$7=_st(_st(loadedOne)._thereIs()).__eq("noMap");
$ctx3.sendIdx["="]=4;
self._assert_($7);
$ctx3.sendIdx["assert:"]=4;
return self._assert_(_st(_st(loadedOne)._in()).__eq("mapless"));
}, function($ctx3) {$ctx3.fillBlock({response:response},$ctx2,6)})}));
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})}));
return self}, function($ctx1) {$ctx1.fill(self,"testRemoteSave",{createdOne:createdOne,loadedOne:loadedOne},globals.MaplessTest)})},
args: [],
source: "testRemoteSave\x0a\x0a\x09| createdOne loadedOne |\x0a\x09\x0a\x09createdOne := Thing new.\x0a\x09\x0a\x09createdOne \x0a\x09\x09thereIs: 'noMap';\x0a\x09\x09in: 'mapless';\x0a\x09\x09yourself.\x0a\x09\x09\x0a\x09createdOne saveDo:[ :res |\x0a\x09\x09self shouldnt: [\x0a\x09\x09\x09\x09createdOne onAfterSaved: res.\x0a\x09\x09\x09\x09self assert: res status = 200 ]\x0a\x09\x09\x09raise: MaplessError.\x0a\x0a\x09\x09createdOne createDo:[ :resp |\x0a\x09\x09[ createdOne onAfterCreated: resp ]\x0a\x09\x09\x09on: MaplessError\x0a\x09\x09\x09do:[ :x | self assert: resp status = 409 ] ].\x0a\x09\x09\x0a\x09\x09Thing findId: createdOne id do:[ :response | \x0a\x09\x09\x09loadedOne := Thing onAfterRead: response.\x0a\x09\x09\x09self assert: loadedOne class = Thing.\x0a\x09\x09\x09self assert: loadedOne thereIs = 'noMap'.\x0a\x09\x09\x09self assert: loadedOne in = 'mapless'\x0a\x09\x09]\x0a\x09].",
messageSends: ["new", "thereIs:", "in:", "yourself", "saveDo:", "shouldnt:raise:", "onAfterSaved:", "assert:", "=", "status", "createDo:", "on:do:", "onAfterCreated:", "findId:do:", "id", "onAfterRead:", "class", "thereIs", "in"],
referencedClasses: ["Thing", "MaplessError"]
}),
globals.MaplessTest);

smalltalk.addMethod(
smalltalk.method({
selector: "testRemoteUpdate",
protocol: 'tests',
fn: function (){
var self=this;
var createdOne,loadedOne,updatedOne;
function $Thing(){return globals.Thing||(typeof Thing=="undefined"?nil:Thing)}
function $MaplessError(){return globals.MaplessError||(typeof MaplessError=="undefined"?nil:MaplessError)}
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$3,$4,$5,$7,$6,$9,$8,$11,$10,$12,$14,$15,$13,$17,$16,$19,$18,$20,$21,$23,$24,$22,$26,$25;
createdOne=_st($Thing())._new();
_st(createdOne)._thereIs_("noMap");
$ctx1.sendIdx["thereIs:"]=1;
_st(createdOne)._saveDo_((function(res){
return smalltalk.withContext(function($ctx2) {
self._shouldnt_raise_((function(){
return smalltalk.withContext(function($ctx3) {
_st(createdOne)._onAfterSaved_(res);
$2=_st(res)._status();
$ctx3.sendIdx["status"]=1;
$1=_st($2).__eq((200));
$ctx3.sendIdx["="]=1;
return self._assert_($1);
$ctx3.sendIdx["assert:"]=1;
}, function($ctx3) {$ctx3.fillBlock({},$ctx2,2)})}),$MaplessError());
_st(createdOne)._createDo_((function(resp){
return smalltalk.withContext(function($ctx3) {
return _st((function(){
return smalltalk.withContext(function($ctx4) {
return _st(createdOne)._onAfterCreated_(resp);
}, function($ctx4) {$ctx4.fillBlock({},$ctx3,4)})}))._on_do_($MaplessError(),(function(x){
return smalltalk.withContext(function($ctx4) {
$3=_st(_st(resp)._status()).__eq((409));
$ctx4.sendIdx["="]=2;
return self._assert_($3);
$ctx4.sendIdx["assert:"]=2;
}, function($ctx4) {$ctx4.fillBlock({x:x},$ctx3,5)})}));
}, function($ctx3) {$ctx3.fillBlock({resp:resp},$ctx2,3)})}));
$4=_st(createdOne)._id();
$ctx2.sendIdx["id"]=1;
return _st($Thing())._findId_do_($4,(function(response){
return smalltalk.withContext(function($ctx3) {
loadedOne=_st($Thing())._onAfterRead_(response);
$ctx3.sendIdx["onAfterRead:"]=1;
loadedOne;
$5=_st(_st(loadedOne)._class()).__eq($Thing());
$ctx3.sendIdx["="]=3;
self._assert_($5);
$ctx3.sendIdx["assert:"]=3;
$7=_st(loadedOne)._thereIs();
$ctx3.sendIdx["thereIs"]=1;
$6=_st($7).__eq("noMap");
$ctx3.sendIdx["="]=4;
self._assert_($6);
$ctx3.sendIdx["assert:"]=4;
_st(loadedOne)._thereIs_("LOLWAT?");
$9=_st(createdOne)._thereIs();
$ctx3.sendIdx["thereIs"]=2;
$8=_st($9).__eq("noMap");
$ctx3.sendIdx["="]=5;
self._assert_($8);
$ctx3.sendIdx["assert:"]=5;
$11=_st(loadedOne)._thereIs();
$ctx3.sendIdx["thereIs"]=3;
$10=_st($11).__eq("LOLWAT?");
$ctx3.sendIdx["="]=6;
self._assert_($10);
$ctx3.sendIdx["assert:"]=6;
return _st(loadedOne)._saveDo_((function(aResponse){
return smalltalk.withContext(function($ctx4) {
_st(loadedOne)._onAfterSave_(aResponse);
$12=_st(loadedOne)._id();
$ctx4.sendIdx["id"]=2;
return _st($Thing())._findId_do_($12,(function(aResp){
return smalltalk.withContext(function($ctx5) {
updatedOne=_st($Thing())._onAfterRead_(aResp);
updatedOne;
$14=_st(updatedOne)._id();
$ctx5.sendIdx["id"]=3;
$15=_st(loadedOne)._id();
$ctx5.sendIdx["id"]=4;
$13=_st($14).__eq($15);
$ctx5.sendIdx["="]=7;
self._assert_($13);
$ctx5.sendIdx["assert:"]=7;
$17=_st(updatedOne)._id();
$ctx5.sendIdx["id"]=5;
$16=_st($17).__eq(_st(createdOne)._id());
$ctx5.sendIdx["="]=8;
self._assert_($16);
$ctx5.sendIdx["assert:"]=8;
$19=_st(updatedOne)._thereIs();
$ctx5.sendIdx["thereIs"]=4;
$18=_st($19).__eq("LOLWAT?");
$ctx5.sendIdx["="]=9;
self._assert_($18);
$ctx5.sendIdx["assert:"]=9;
$20=_st(updatedOne).__eq(loadedOne);
$ctx5.sendIdx["="]=10;
self._assert_($20);
$ctx5.sendIdx["assert:"]=10;
$21=_st(createdOne).__eq(updatedOne);
$ctx5.sendIdx["="]=11;
self._assert_($21);
$ctx5.sendIdx["assert:"]=11;
$23=_st(createdOne)._thereIs();
$ctx5.sendIdx["thereIs"]=5;
$24=_st(updatedOne)._thereIs();
$ctx5.sendIdx["thereIs"]=6;
$22=_st($23).__eq($24);
$ctx5.sendIdx["="]=12;
self._deny_($22);
$26=_st(loadedOne)._thereIs();
$ctx5.sendIdx["thereIs"]=7;
$25=_st($26).__eq(_st(updatedOne)._thereIs());
return self._assert_($25);
}, function($ctx5) {$ctx5.fillBlock({aResp:aResp},$ctx4,8)})}));
}, function($ctx4) {$ctx4.fillBlock({aResponse:aResponse},$ctx3,7)})}));
}, function($ctx3) {$ctx3.fillBlock({response:response},$ctx2,6)})}));
$ctx2.sendIdx["findId:do:"]=1;
}, function($ctx2) {$ctx2.fillBlock({res:res},$ctx1,1)})}));
$ctx1.sendIdx["saveDo:"]=1;
return self}, function($ctx1) {$ctx1.fill(self,"testRemoteUpdate",{createdOne:createdOne,loadedOne:loadedOne,updatedOne:updatedOne},globals.MaplessTest)})},
args: [],
source: "testRemoteUpdate\x0a\x0a\x09| createdOne loadedOne updatedOne |\x0a\x09\x0a\x09createdOne := Thing new.\x0a\x09\x0a\x09createdOne thereIs: 'noMap'.\x0a\x09\x09\x0a\x09createdOne saveDo:[ :res |\x0a\x09\x09self shouldnt: [\x0a\x09\x09\x09\x09createdOne onAfterSaved: res.\x0a\x09\x09\x09\x09self assert: res status = 200 ]\x0a\x09\x09\x09raise: MaplessError.\x0a\x0a\x09\x09createdOne createDo:[ :resp |\x0a\x09\x09[ createdOne onAfterCreated: resp ]\x0a\x09\x09\x09on: MaplessError\x0a\x09\x09\x09do:[ :x | self assert: resp status = 409 ] ].\x0a\x09\x09\x0a\x09\x09Thing findId: createdOne id do:[ :response | \x0a\x09\x09\x09loadedOne := Thing onAfterRead: response.\x09\x09\x09\x0a\x09\x09\x09self assert: loadedOne class = Thing.\x0a\x09\x09\x09self assert: loadedOne thereIs = 'noMap'.\x0a\x0a\x09\x09\x09loadedOne thereIs: 'LOLWAT?'.\x0a\x09\x09\x09self assert: createdOne thereIs = 'noMap'.\x0a\x09\x09\x09self assert: loadedOne thereIs = 'LOLWAT?'.\x0a\x09\x09\x0a\x09\x09\x09loadedOne saveDo:[ :aResponse | loadedOne onAfterSave: aResponse.\x0a\x09\x09\x09\x09Thing findId: loadedOne id do:[ :aResp |\x0a\x09\x09\x09\x09\x09updatedOne := Thing onAfterRead: aResp.\x0a\x09\x09\x09\x09\x09self assert: updatedOne id = loadedOne id.\x0a\x09\x09\x09\x09\x09self assert: updatedOne id = createdOne id.\x0a\x09\x09\x09\x09\x09self assert: updatedOne thereIs = 'LOLWAT?'.\x0a\x09\x09\x09\x09\x09self assert: updatedOne = loadedOne.\x0a\x09\x09\x09\x09\x09self assert: createdOne = updatedOne.\x0a\x09\x09\x09\x09\x09self deny: createdOne thereIs = updatedOne thereIs.\x0a\x09\x09\x09\x09\x09self assert: loadedOne thereIs = updatedOne thereIs.\x0a\x09\x09\x09\x09] \x0a\x09\x09\x09]\x0a\x09\x09].\x0a\x09]\x0a\x0a\x09",
messageSends: ["new", "thereIs:", "saveDo:", "shouldnt:raise:", "onAfterSaved:", "assert:", "=", "status", "createDo:", "on:do:", "onAfterCreated:", "findId:do:", "id", "onAfterRead:", "class", "thereIs", "onAfterSave:", "deny:"],
referencedClasses: ["Thing", "MaplessError"]
}),
globals.MaplessTest);

smalltalk.addMethod(
smalltalk.method({
selector: "testURI",
protocol: 'tests',
fn: function (){
var self=this;
var thing;
function $Thing(){return globals.Thing||(typeof Thing=="undefined"?nil:Thing)}
return smalltalk.withContext(function($ctx1) { 
var $2,$1;
thing=_st($Thing())._new();
$2=_st(thing)._id();
$ctx1.sendIdx["id"]=1;
$1=_st($2)._notNil();
self._assert_($1);
$ctx1.sendIdx["assert:"]=1;
self._assert_(_st(_st(thing)._uri()).__eq("api/1.0/things/".__comma(_st(thing)._id())));
return self}, function($ctx1) {$ctx1.fill(self,"testURI",{thing:thing},globals.MaplessTest)})},
args: [],
source: "testURI\x0a\x09| thing |\x0a\x09\x0a\x09thing := Thing new.\x0a\x09\x0a\x09self assert: thing id notNil.\x0a\x09\x0a\x09self assert: thing uri = ('api/1.0/things/', thing id)",
messageSends: ["new", "assert:", "notNil", "id", "=", "uri", ","],
referencedClasses: ["Thing"]
}),
globals.MaplessTest);



smalltalk.addClass('Stuff', globals.MaplessModel, [], 'MiniMapless-Tests');
smalltalk.addMethod(
smalltalk.method({
selector: "things",
protocol: 'accessing',
fn: function (){
var self=this;
function $OrderedCollection(){return globals.OrderedCollection||(typeof OrderedCollection=="undefined"?nil:OrderedCollection)}
return smalltalk.withContext(function($ctx1) { 
var $2,$1,$receiver;
$2=($ctx1.supercall = true, globals.Stuff.superclass.fn.prototype._things.apply(_st(self), []));
$ctx1.supercall = false;
$ctx1.sendIdx["things"]=1;
if(($receiver = $2) == null || $receiver.isNil){
self._things_(_st($OrderedCollection())._new());
$1=self._things();
} else {
$1=$2;
};
return $1;
}, function($ctx1) {$ctx1.fill(self,"things",{},globals.Stuff)})},
args: [],
source: "things\x0a\x0a\x09^ super things ifNil:[ \x0a\x09\x09self things: OrderedCollection new.\x0a\x09\x09self things ]",
messageSends: ["ifNil:", "things", "things:", "new"],
referencedClasses: ["OrderedCollection"]
}),
globals.Stuff);


smalltalk.addMethod(
smalltalk.method({
selector: "pluralName",
protocol: 'accessing',
fn: function (){
var self=this;
return "stuff";
},
args: [],
source: "pluralName\x0a\x0a\x09^ 'stuff'",
messageSends: [],
referencedClasses: []
}),
globals.Stuff.klass);


smalltalk.addClass('Thing', globals.MaplessModel, [], 'MiniMapless-Tests');

});
