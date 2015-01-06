(function () {

    'use strict';


    // Dependencies
    var concat = require('gulp-concat');
    var del = require('del');
    var gulp = require('gulp');
    var gulpif = require('gulp-if');
    var gutil = require('gulp-util');
    var match = require('gulp-match')
    var replace = require('gulp-replace-task');
    var runSequence = require('run-sequence');
    var server = require('./server.js');
    var templateCache = require('gulp-angular-templatecache');
    var uglify = require('gulp-uglify');
    var useref = require('gulp-useref')


    // Check environment variables
    var PRODUCTION = process.env.ENVIRONMENT === 'production';


    // Directories
    var baseDir = __dirname;
    var serverDir = baseDir + '/.tmp';
    var appDir = baseDir + '/app';
    var cssDir = baseDir + '/css';
    var templatesDir = appDir + '/templates';


    // Tasks
    gulp.task('build', function (callback) {
        return runSequence('clean', ['processIndex', 'templates'], callback);
    });

    gulp.task('clean', function (callback) {
        return del([serverDir], callback);
    });

    gulp.task('default', ['dev']);

    gulp.task('dev', function (callback) {
        return runSequence('build', ['server', 'watch'], callback);
    });

    gulp.task('dist', function (callback) {
        return runSequence('build', 'server', callback);
    });

    gulp.task('processIndex', function () {
        var assets = useref.assets();
        return gulp.src(appDir + '/index.html')
            .pipe(assets)
            .pipe(gulpif(function (file) { return PRODUCTION && match(file, '*.js'); }, uglify()))
            .pipe(assets.restore())
            .pipe(useref())
            .pipe(gulp.dest(serverDir));
    });

    gulp.task('server', function () {
        return server();
    });

    gulp.task('templates', function () {
        return gulp.src(templatesDir + '/**/*.html')
            .pipe(templateCache({
                module: 'app',
                root: 'templates/'
            }))
            .pipe(concat('templates.js'))
            .pipe(gulp.dest(serverDir));
    });

    gulp.task('watch', function () {
        gulp.watch([
            appDir + '/index.html',
            appDir + '/**/*.js',
            cssDir + '/*'
        ], ['processIndex']);

        gulp.watch([
            templatesDir + '/**/*'
        ], ['templates']);
    });

})();
