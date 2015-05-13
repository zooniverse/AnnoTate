'use strict';

var config = require('../config');
var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('deploy-preview', function (callback) {
    global.s3Params = config.deploy.preview;
    runSequence('production', 'deploy', callback);
});
