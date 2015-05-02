'use strict';

var config = require('../config');
var gulp   = require('gulp');
var jshint = require('gulp-jshint');

var jshintOptions = {
    latedef: 'nofunc'
};

gulp.task('lint', function() {
  return gulp.src([config.scripts.src, '!app/modules/**/*.templates.js'])
    .pipe(jshint(jshintOptions))
    .pipe(jshint.reporter('jshint-stylish'));
});
