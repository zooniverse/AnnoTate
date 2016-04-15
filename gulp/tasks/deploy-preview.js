'use strict';

var config = require('../config');
var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('deploy-staging', function (callback) {
    global.s3Params = config.deploy.staging;
    runSequence('production', 'deploy', callback);
});
