module.exports = function(grunt) {
  "use strict";

  // Loading third party tasks
  grunt.loadNpmTasks('grunt-type');
  grunt.loadNpmTasks('grunt-reload');

  // Project configuration.
  var lintFiles = ['grunt.js', 'src/**/*.js', 'test/**/*.js'];
  var typeScriptFiles = ['src/ts/*.ts', 'src/ts.def/**/*.ts'];

  grunt.initConfig({
    pkg: '<json:package.json>',
    test: {
      files: ['test/**/*.js']
    },
    /*lint: {
      files: lintFiles
    }, */
    watch: {
      files: ["**"],
      tasks: 'default reload'
    },
    type: {
      compile: {
        files: {
          'src/app/js/app.js': typeScriptFiles
        },
        options: {
          target: 'ES5',
          comments: true
        }
      },
      options: {
        module: 'amd',
        style: 'eqeqeq;bitwise'
      }
    },
    reload: {
          port: 6001,
          proxy: {
              host: 'localhost'
          }
      },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true
      },
      globals: {
        exports: true
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'type test');

};