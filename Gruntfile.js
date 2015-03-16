module.exports = function(grunt) {
	var config = grunt.file.readJSON('config/production.json');
	var app = grunt.file.readJSON('package.json');
	grunt.initConfig({
		clean : [ 'target/' ],
		exec : {
			build : {
				command : 'node node_modules/requirejs/bin/r.js -o require-config.js'
			}
		},
		environments : {
			production : {
				options : {
					host : config.host,
					username : config.username,
					privateKey : require('fs').readFileSync(config.privateKeyFile),
					deploy_path : config.path,
					local_path : 'target/build',
					current_symlink : 'current',
				},
			},
		},
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-ssh-deploy');

	grunt.registerTask('copy-require', function() {
		grunt.file.mkdir('target/build/js/lib');
		grunt.file.copy('node_modules/requirejs/require.js', 'target/build/js/lib/require.js');
	});

	grunt.registerTask('build', [ 'clean', 'exec', 'copy-require' ]);
	grunt.registerTask('deploy', [ 'ssh_deploy:production' ]);

};
