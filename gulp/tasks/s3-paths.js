'use strict';

var config = require('../config');
var gulp = require('gulp');
var gutil = require('gulp-util');
var Q = require('q');
var replace = require('gulp-replace');

gulp.task('s3Paths', function () {
    var promises = [];

    function processFile(filename) {
        var deferred = Q.defer();
        var baseUrl = process.env.BASE_URL;
        var dest = filename.substring(0, filename.lastIndexOf('/'));

        gulp.src(filename)

            .pipe(replace(/[ ](href|src)="(?!http)/g, ' $1="' + baseUrl + '/'))
            .pipe(replace(/(url\(")/g, ' $1' + baseUrl))

            // Base tag, needed for ui-router
            .pipe(replace('<base href="/">', '<base href="' + baseUrl + '">'))

            .pipe(gulp.dest(dest))
                .on('end', deferred.resolve)
                .on('error', deferred.reject);
        return deferred.promise;
    }

    config.s3Paths.src.forEach(function (file) {
        promises.push(processFile(file));
    });

    return Q.all(promises)
});
