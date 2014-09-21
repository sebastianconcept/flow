'use strict';

module.exports = function(grunt) {
  var path = require('path');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('amber-dev');


  // Default task.
  grunt.registerTask('default', ['amberc:all']);
  grunt.registerTask('test', ['amberc:test_runner', 'execute:test_runner', 'clean:test_runner']);

  // flow: enable the 'watch' plugin and 'run'
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-run');

    
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    // pkg: grunt.file.readJSON(''),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // task configuration
    amberc: {
      options: {
        amber_dir: path.join(__dirname, "bower_components", "amber"),
        library_dirs: ['src'],
        closure_jar: ''
      },
      all: {
        src: [
            'src/App.st', // list all sources in dependency order
            'src/App-Tests.st' // list all tests in dependency order
        ],
        amd_namespace: 'app',
        libraries: ['SUnit', 'Web']
      },
      test_runner: {
        src: ['node_modules/amber-dev/lib/Test.st'],
        libraries: [
          /* add dependencies packages here */
          'App', /* add other code-to-test packages here */
          'SUnit',
          'App-Tests' /* add other test packages here */
        ],
        main_class: 'NodeTestRunner',
        output_name: 'test_runner'
      }
    },

    execute: {
      test_runner: {
        src: ['test_runner.js']
      }
    },

    clean: {
      test_runner: ['test_runner.js']
    },


    // flow: adds the tasks that run some bash scripts
    run: {
      // flow: adds the css task to build CSS
      buildCss: {
        cmd: './publishCss'
      },

      // flow: adds the views task to build the templates
      buildViews: {
        cmd: './publishViews'
      },

      // flow: adds the img task to build the images
      buildImg: {
        cmd: './publishImg'
      },

      // flow: adds the task that takes the javascript sources and makes one big ball of js
      buildJs: {
        cmd: './publishJs'
      }
    },

    // flow: observer that reacts rebuilding the static stuff
    watch: {
      files: [ 'css/**', 'views/**', 'src/**' ],
      tasks: [ 'run:buildCss', 'run:buildViews', 'run:buildImg', 'run:buildJs' ]

    }
  });

};
