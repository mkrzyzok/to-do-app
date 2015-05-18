
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.initConfig({
    
    concat : {
      js: {
        src: ['js/**/*.js'],
        dest: 'build/js/scripts.js',
      },
      css: {
        src: ['css/*.sass'],
        dest: 'css/final/styles.sass',
      },
    },

    watch : {
      js: {
        files: ['js/**/*.js'],
        tasks: ['concat:js'],
        options: {
          livereload: true,
        },
      },
      css: {
        files: ['css/*.sass'],
        tasks: ['concat:css', 'sass'],
        options: {
          livereload: true,
        },
      },
      html: {
        files: ['index.html'],
        options: {
          livereload: true,
        },
      },
    },

    sass : {
      dist: {
        files: {
          'build/css/styles.css': 'css/final/styles.sass',
        },
      },
    },

  });

  grunt.registerTask('default', ['concat', 'sass', 'watch']);

};