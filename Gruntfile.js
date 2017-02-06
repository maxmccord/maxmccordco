module.exports = function(grunt) {

   grunt.initConfig({
      htmlmin: {
         dist: {
            options: {
               removeComments: true,
               collapseWhitespace: true
            },
            files: {
               'dist/index.html': 'src/index.html'
            }
         }
      },
      copy: {
         main: {
            files: [
               // copy bower components to the statically served vendor directory
               { expand: true, cwd: './bower_components/bootstrap/dist/', src: '**', dest: './public/vendor/bootstrap/' },
               { expand: true, cwd: './bower_components/jquery/dist/', src: '**', dest: './public/vendor/jquery/' }
            ]
         }
      }
   });

   // load plugins
   grunt.loadNpmTasks('grunt-contrib-htmlmin');
   grunt.loadNpmTasks('grunt-contrib-copy');

   // run the copy command by default
   grunt.registerTask('default', ['htmlmin', 'copy']);
};
