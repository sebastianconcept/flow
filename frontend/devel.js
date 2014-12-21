define([
    'amber/devel',
    './deploy',
    // --- packages used only during development begin here ---
    'domevents/DOMEvents-Tests',
    'minimapless/MiniMapless-Tests',
   	'amber-flow/Flow-Binding-Tests',
	'amber-flow/Flow-Templates-Tests',
	'amber-flow/Flow-Tests',
	'flow-app/App-Tests'
    // --- packages used only during development end here ---
], function (amber) {
    return amber;
});
