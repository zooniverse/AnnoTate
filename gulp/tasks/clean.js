'use strict';

var config = require('../config');
var gulp   = require('gulp');
var del    = require('del');

gulp.task('clean', function(cb) {

  del([config.dist.root, config.modules.src + '/**/*.templates.js'], cb);

});
