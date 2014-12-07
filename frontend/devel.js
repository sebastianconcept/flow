define([
    'amber/devel',
    './deploy',
    // --- packages used only during development begin here ---
   	'flow/Flow-Binding-Tests',
	'flow/MiniMapless-Tests',
	'flow/Flow-Templates-Tests',
	'flow/Flow-Tests',
	'app/App-Tests'
    // --- packages used only during development end here ---
], function (amber) {
    return amber;
});
