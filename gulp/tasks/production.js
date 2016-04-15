'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('production', ['clean'], function(callback) {
    global.isProd = true;
    runSequence(
        ['styles', 'images', 'fonts', 'views'],
        'browserify',
        'analytics',
        's3Paths',
        'gzip',
        callback);

});
