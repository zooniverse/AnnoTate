'use strict';

var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var buffer = require('vinyl-buffer');
var config = require('../config');
var debowerify = require('debowerify');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var handleErrors = require('../util/handleErrors');
var ngAnnotate = require('browserify-ngannotate');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var watchify = require('watchify');

// Based on: http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
function buildScript(file) {

    var bundler = browserify({
        entries: config.browserify.entries,
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    }, watchify.args);

    if (!global.isProd) {
        bundler = watchify(bundler);
        bundler.on('update', function() {
            rebundle();
        });
    }

    var transforms = [
        babelify,
        debowerify,
        ngAnnotate,
        'brfs',
        'bulkify',
        'browserify-shim'
    ];

    transforms.forEach(function(transform) {
        bundler.transform(transform);
    });

    function rebundle() {
        var stream = bundler.bundle();
        var createSourcemap = global.isProd && config.browserify.sourcemap;

        gutil.log('Rebundle...');

        return stream.on('error', handleErrors)
            .pipe(source(file))
            .pipe(gulpif(createSourcemap, buffer()))
            .pipe(gulpif(createSourcemap, sourcemaps.init()))
            .pipe(gulpif(global.isProd, streamify(uglify({
                compress: { drop_console: true }
            }))))
            .pipe(gulpif(createSourcemap, sourcemaps.write('./')))
            .pipe(gulp.dest(config.scripts.dest))
            .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true, once: true })));
    }

    return rebundle();
}

gulp.task('browserify', function() {
    return buildScript('main.js');
});
