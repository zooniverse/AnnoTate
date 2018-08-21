'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', ['clean'], function(callback) {

  callback = callback || function() {};

  return runSequence(['styles', 'images', 'fonts', 'views'], callback);

});
