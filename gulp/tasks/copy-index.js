'use strict';

var config = require('../config');
var gulp = require('gulp');
var replace = require('gulp-replace-task');

gulp.task('copyIndex', function () {

    var replaceParams = {
        patterns: [{
            match: 'base',
            replacement: (global.s3Params) ? '://' + global.s3Params.Prefix : ''
        }]
    };

    return gulp.src('app/index.html')
        .pipe(replace(replaceParams))
        .pipe(gulp.dest(config.dist.root));
});
