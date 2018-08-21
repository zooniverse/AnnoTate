'use strict';

var config      = require('../config');
var changed     = require('gulp-changed');
var gulp        = require('gulp');
var gulpif      = require('gulp-if');
var browserSync = require('browser-sync');

gulp.task('favicons', function() {
    return gulp.src(config.favicons.src)
        .pipe(changed(config.favicons.dest)) // Ignore unchanged files
        .pipe(gulp.dest(config.favicons.dest))
        .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true, once: true })));
});
