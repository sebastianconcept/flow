// Configuration file for require.js on how to make the distributable `all.js` file
// This will take all your frontend app needs and make one js file 

({
    preserveLicenseComments: false,
    paths: {
        'jquery': 'bower_components/jquery.min',
        'amber': 'bower_components/amber/support',
        'amber_core': 'bower_components/amber/src',
        'amber_lib': 'bower_components',
        'app': 'src'
    },
    include: [
        'bower_components/amber/support/requirejs/require.min',

        'amber_core/Kernel-Objects',
        'amber_core/Kernel-Classes',
        'amber_core/Kernel-Methods',
        'amber_core/Kernel-Collections',
        'amber_core/Kernel-Infrastructure',
        'amber_core/Kernel-Exceptions',
        'amber_core/Kernel-Transcript',
        'amber_core/Kernel-Announcements',
        'amber_core/Web',

        'app/MiniMapless',
        'app/Flow',
        'app/Flow-Core',
        'app/Flow-API',
        'app/Flow-Templates',
        'app/Flow-Binding',
        'app/App',
    ],
    out: '../public/js/app.js'
})