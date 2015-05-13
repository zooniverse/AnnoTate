'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('production', ['clean'], function(cb) {

    cb = cb || function() {};

    global.isProd = true;

    runSequence(['styles', 'images', 'fonts', 'views', 'copyIndex'], 'browserify', 'gzip', cb);

});
