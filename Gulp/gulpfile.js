const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concatCSS = require('gulp-concat-css');

// Компиляция sass в css, browser-sync, авто-префиксы + конкатенация sass(css) файлов
function style(done) {
	gulp
		.src('src/sass/*.sass')
		.pipe(
			sass({
				errLogToConsole: true,
			})
		)
		.on('error', console.error.bind(console))
		.pipe(autoprefixer({ cascade: false }))
		.pipe(concatCSS('style.css'))
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.stream());
	done();
}

// Сервер + слежение за html/sass/js файлами
function watch(done) {
	browserSync.init({
		server: 'src/',
	});
	gulp.watch('src/sass/*.sass', style);
	gulp.watch('src/*.html').on('change', () => {
		browserSync.reload();
		done();
	});
	gulp.watch('src/js/*.js').on('change', () => {
		browserSync.reload();
		done();
	});
	done();
}

exports.default = gulp.series(style, watch);
