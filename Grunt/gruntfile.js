module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			dist: {
				options: {
					sourcemap: 'none',
				},
				files: [
					{
						expand: true,
						cwd: 'src/scss',
						src: ['**/*.scss'],
						dest: 'src/css',
						ext: '.css',
					},
				],
			},
		},

		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass', 'concat', 'clean'],
			},
		},

		concat: {
			options: {
				separator: '',
			},
			dist: {
				src: ['src/css/*.css'],
				dest: 'public/css/style.css',
			},
		},

		clean: {
			css: ['src/css'],
		},
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.registerTask('run', ['sass', 'concat', 'clean', 'watch']);
};
