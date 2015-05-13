'use strict';

var config = require('../config');
var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('deploy-production', function (callback) {
    global.s3Params = config.deploy.production;
    runSequence('production', 'deploy', callback);
});
