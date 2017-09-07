'usestrict';

var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	del = require('del'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    newer = require('gulp-newer'),
    useref = require('gulp-useref'),
    runSequence = require('run-sequence');


// Compile and automatically prefix css
gulp.task("styles", function () {
    var AUTOPREFIXER_BROWSERS = [
        'ie >= 10',
        'ie_mob >= 10',
        'ff >= 30',
        'chrome >= 34',
        'safari >= 7',
        'opera >= 23',
        'ios >= 7',
        'android >= 4.4',
        'bb >= 10'
    ];

	return gulp.src("app/styles/scss/main.scss")
        .pipe(newer('.tmp/styles'))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest('.temp/styles'))
        // minify css
        .pipe(cssnano())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/styles'))
        .pipe(gulp.dest('.tmp/styles'));
});


// Concatinate and minify Javascript
gulp.task('scripts', function () {
    gulp.src([
        //explicitly list scripts to be included in right order
        'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js',
        './app/scripts/main.js'
    ])
    .pipe(newer('.tmp/scripts'))
    .pipe(sourcemaps.init())
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(gulp.dest('.tmp/scripts'));
});


// Scan HTML for assets & optimize them
gulp.task('html', function () {
    return gulp.src('app/**/*.html')
        .pipe(useref({
            searchPath: '{.tmp,app}',
            noAssets: true
        }))
        .pipe(gulp.dest('dist'));
});


// Clean output directory
gulp.task('clean', function () {
    del(['.tmp', 'dist/*', '!dist/.git'], {dot: true});
});


// Watch files for changes & reload
gulp.task('serve', ['scripts', 'styles'], function () {
    browserSync.init({
        notify: true,
        // Allow scroll syncing across breakpoints
        scrollElementMapping: ['main', '.mdl-layout'],
        server: ['.tmp', 'app'],
        port: 3000
    });

    gulp.watch(['app/**/*.html'], browserSync.reload);
    gulp.watch(['app/styles/**/*.{scss,css}'], ['styles', browserSync.reload]);
    gulp.watch(['app/scripts/**/*.js'], ['scripts', browserSync.reload]);
    gulp.watch(['app/images/**/*'], browserSync.reload);
});


// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function () {
    browserSync.init({
        notify: true,
        // Allow scroll syncing across breakpoints
        scrollElementMapping: ['main', '.mdl-layout'],
        server: ['dist'],
        port: 3001
    });
});


// Build production files, the default task
gulp.task('default', ['clean'], function (cb) {
    runSequence(
        'styles',
        ['html', 'scripts'],
        cb
    );
});
