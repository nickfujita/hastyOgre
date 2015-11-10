require('load-grunt-tasks')(grunt);

module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
     scripts: {
       files: ['./server/**/*.js'],
       tasks: ['jshint'],
       options: {
         spawn: false,
       },
     },
   },
   babel: {
    options: {
      sourceMap: true,
      presets: ['es2015']
    },
    dist: {
      files: {
        'dist/app.js': 'src/app.js'
      }
    }
  }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);

};