'use strict';

var config = require('../config');
var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('deploy-alpha', function (callback) {
    global.s3Params = config.deploy.alpha;
    runSequence('production', 'deploy', callback);
});
