define([
    'amber/devel',
    './deploy',
    // --- packages used only during development begin here ---
   	'amber-retevendita/Flow-Binding-Tests',
	'amber-retevendita/MiniMapless-Tests',
	'amber-retevendita/Flow-Templates-Tests',
	'amber-retevendita/Flow-Tests'
    // --- packages used only during development end here ---
], function (amber) {
    return amber;
});
