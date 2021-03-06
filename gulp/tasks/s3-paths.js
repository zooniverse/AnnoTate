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
        var lastChar = baseUrl.slice(-1);
        baseUrl = lastChar === '/' ? baseUrl : baseUrl + '/';

        gulp.src(filename)

            // Base tag, needed for ui-router
            .pipe(replace('<base href="/">', '<base href="' + baseUrl + '">'))
            // Search for URLs that begin with / and rewrite them as fully-qualified URLs.
            // This allows the browser to resolve linked files correctly on
            // preview.zooniverse.org/annotate/ and on anno.tate.org.uk/
            .pipe(replace(/[ ](href|src)="\//g, ' $1="' + baseUrl))
            .pipe(replace(/(url\(")\//g, ' $1' + baseUrl))

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
