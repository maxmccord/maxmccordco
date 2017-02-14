module.exports = function(grunt) {

   grunt.initConfig({
      htmlmin: {
         dist: {
            options: {
               removeComments: true,
               collapseWhitespace: true
            },
            files: {
               'build/index.html': 'src/index.html'
            }
         }
      },
      cssmin: {
         dist: {
            files: {
               'build/public/css/homepage.min.css': 'src/css/homepage.css'
            }
         }
      },
      copy: {
         vendorFiles: {
            files: [
               // copy bower components to the statically served vendor directory
               { expand: true, cwd: './bower_components/font-awesome/', src: [ 'css/*', 'fonts/*' ], dest: './build/public/vendor/font-awesome' },
               { expand: true, cwd: './bower_components/bootstrap/dist/', src: '**', dest: './build/public/vendor/bootstrap/' },
               { expand: true, cwd: './bower_components/jquery/dist/', src: '**', dest: './build/public/vendor/jquery/' }
            ]
         },
         scripts: {
            files: [
               { expand: true, cwd: './src/js', src: '*.js', dest: './build/public/js/' }
            ]
         },
         assets: {
            files: [
               { src: './src/pdf/resume-2017-02.pdf', dest: './build/pdf/resume.pdf' },
               { expand: true, cwd: './src/img/', src: '**/*.png', dest: './build/public/img/' }
            ]
         }
      },
      clean: {
         // completely removes the build directory
         buildDir: {
            src: [ './build' ]
         }
      },
      watch: {
         html: {
            files: [ './src/*.html' ],
            tasks: [ 'htmlmin' ]
         },
         styles: {
            files: [ './src/css/*.css' ],
            tasks: [ 'cssmin' ]
         },
         scripts: {
            files: [ './src/js/*.js' ],
            tasks: [ 'copy:scripts' ]
         },
         assets: {
            files: [
               './src/img/**',
               './src/pdf/**'
            ],
            tasks: [ 'copy:assets' ]
         }
      }
   });

   // load plugins
   grunt.loadNpmTasks('grunt-contrib-htmlmin');
   grunt.loadNpmTasks('grunt-contrib-cssmin');
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-contrib-watch');

   // register tasks
   grunt.registerTask(
      'build',
      'Creates a build of the site. This task must ben run before running server.js.',
      ['clean', 'htmlmin', 'cssmin', 'copy']
      );

   // default task is to build the site
   grunt.registerTask('default', ['build']);
};
