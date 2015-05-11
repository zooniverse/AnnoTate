'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');
var stylus       = require('gulp-stylus');
var sourcemaps   = require('gulp-sourcemaps');
var nib          = require('nib');
var bootstrap    = require('bootstrap-styl');

gulp.task('styles', function () {

  return gulp.src(config.styles.src)
    .pipe(sourcemaps.init())
    .pipe(stylus({
        compress: global.isProd ? true : false,
        use: [nib(), bootstrap()]
    }))
    .pipe(sourcemaps.write())
    .on('error', handleErrors)
    .pipe(gulp.dest(config.styles.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));

});
