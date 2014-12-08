define([
    'amber/devel',
    './deploy',
    // --- packages used only during development begin here ---
   	'amber-flow-app/Flow-Binding-Tests',
	'amber-flow-app/MiniMapless-Tests',
	'amber-flow-app/Flow-Templates-Tests',
	'amber-flow-app/Flow-Tests',
	'amber-flow-app/App-Tests'
    // --- packages used only during development end here ---
], function (amber) {
    return amber;
});
