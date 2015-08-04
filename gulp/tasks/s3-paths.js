'use strict';

var config = require('../config');
var gulp = require('gulp');
var gutil = require('gulp-util');
var Q = require('q');
var replace = require('gulp-replace');

gulp.task('s3Paths', function () {
    var promises = [];
    var isS3 = typeof global.s3Params !== 'undefined';

    function processFile(filename) {
        var deferred = Q.defer();
        var prefix = '//' + global.s3Params.Prefix;
        var dest = filename.substring(0, filename.lastIndexOf('/'));
        gulp.src(filename)

            // Links
            // .pipe(replace(/(href=")(?![http|\/\/])/g, '$1' + prefix))

            // Images
            .pipe(replace(/(src=")(?![http|\/\/])/g, '$1' + prefix))

            // CSS Urls
            .pipe(replace(/(url\("\/)/g, '$1' + prefix.substring(1)))

            // Base tag, needed for ui-router
            .pipe(replace('<base href="/">', '<base href="' + prefix + '">'))

            .pipe(gulp.dest(dest))
            .on('end', deferred.resolve)
            .on('error', deferred.reject);
        return deferred.promise;
    }

    if (isS3) {
        config.s3Paths.src.forEach(function (file) {
            promises.push(processFile(file));
        });
    }

    return Q.all(promises)
});

