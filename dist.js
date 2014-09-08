({
    //mainConfigFile: 'config.js',
    paths: {
        'lib/jquery-migrate': 'bower_components/jquery/jquery-migrate',
        'app': 'frontend'
    },
    'shim': {
        'lib/jquery-migrate': [ 'jquery' ]
    },
    include: [
        'bower_components/amber/support/requirejs/require.min',
        //'bower_components/amber/support/deploy',
        'app/MiniMapless',
        'app/Flow',
        'app/Flow-Core',
        'app/Flow-API',
        'app/Flow-Templates',
        'app/Flow-Binding',
        'app/App',
    ],
    out: 'all.js'
})