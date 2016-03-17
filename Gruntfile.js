module.exports = function(grunt) {

    grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	connect: {
	    firestorm: {
		port: 14742,
	    }
	}
    });

    grunt.loadNpmTasks('grunt-connect');
    grunt.registerTask('default', 'connect:firestorm');

};
