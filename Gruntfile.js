module.exports = function(grunt) {

   grunt.initConfig({
      copy: {
         main: {
            files: [
               // copy bower components to the statically served vendor directory
               { expand: true, cwd: './bower_components/bootstrap/dist/', src: '**', dest: './public/vendor/' },
               { expand: true, cwd: './bower_components/jquery/dist/', src: '**', dest: './public/vendor/js/' }
            ]
         }
      }
   });

   // load plugins
   grunt.loadNpmTasks('grunt-contrib-copy');

   // run the copy command by default
   grunt.registerTask('default', ['copy']);
};
