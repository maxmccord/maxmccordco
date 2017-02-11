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
      copy: {
         vendorFiles: {
            files: [
               // copy bower components to the statically served vendor directory
               { expand: true, cwd: './bower_components/bootstrap/dist/', src: '**', dest: './build/public/vendor/bootstrap/' },
               { expand: true, cwd: './bower_components/jquery/dist/', src: '**', dest: './build/public/vendor/jquery/' }
            ]
         },
         srcFiles: {
            files: [
               { expand: true, cwd: './src/css', src: '*.css', dest: './build/public/css/' },
               { src: './src/resume-2017-02.pdf', dest: './build/resume.pdf' }
            ]
         }
      },
      clean: {
         // completely removes the build directory
         buildDir: {
            src: [ './build' ]
         }
      }
   });

   // load plugins
   grunt.loadNpmTasks('grunt-contrib-htmlmin');
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-clean');

   // register tasks
   grunt.registerTask(
      'build',
      'Creates a build of the site. This task must ben run before running server.js.',
      ['htmlmin', 'copy']
      );

   // default task is to build the site
   grunt.registerTask('default', ['build']);
};
