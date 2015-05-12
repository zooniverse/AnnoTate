'use strict';

var config = require('../config');
var gulp = require('gulp');
var s3Upload = require('../util/s3upload');

gulp.task('deploy-alpha', ['production'], function (callback) {
    callback = callback || function() {};
    s3Upload(config.deploy.alpha, callback);
});
