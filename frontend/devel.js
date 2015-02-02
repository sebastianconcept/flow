define([
    'amber/devel',
    './deploy',
    // --- packages used only during development begin here ---
    'domevents/DOMEvents-Tests',
    'amber-attic/IDE',
    'minimapless/MiniMapless-Tests',
    'amber-flow/Flow-Scaffolding',
    'amber-flow/Flow-Tests',
    'flow-app/App-Tests'
    // --- packages used only during development end here ---
], function (amber) {
    return amber;
});
