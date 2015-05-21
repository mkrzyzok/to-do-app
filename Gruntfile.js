require('harmonize')();

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-jest');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.initConfig({
    
    webpack: {
      someName: {
        entry: './js/list.js',
        output: {
          path: 'build/js/',
          filename: 'scripts.js'
        },
        module: {
          loaders: [
            { test: /\.js$/, loader: 'jsx-loader' }
          ]
        }
      }
    },

    concat : {
      // js: {
      //   src: ['js/*.js'],
      //   dest: 'js/final/scripts.js',
      // },
      css: {
        src: ['css/*.sass'],
        dest: 'css/final/styles.sass',
      },
    },

    watch : {
      tests: {
        files: ['__tests__/**/*.js'],
        tasks: ['jest']
      },
      js: {
        files: ['js/**/*.js'],
        tasks: ['webpack', 'jest'],
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

  grunt.registerTask('default', ['concat', 'sass', 'webpack', 'watch']);

};