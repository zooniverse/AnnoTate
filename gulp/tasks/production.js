'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('production', function (callback) {
    runSequence(
        'build',
        'browserify',
        'analytics',
        's3Paths',
        'gzip',
        callback);
});
