'use strict';

var config = require('../config');
var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var dir = require('node-dir');
var Q = require('q');

// Views task
gulp.task('views', function() {

    // We could have a lot of async tasks, so let's return a big array
    // of promises
    var viewsPromises = [];

    // Put our index.html in the dist folder
    var copyIndexHtml = function() {
        var deferred = Q.defer();
        gulp.src('app/index.html')
            .pipe(gulp.dest(config.dist.root))
            .on('end', deferred.resolve);
        return deferred.promise;
    };
    viewsPromises.push(copyIndexHtml())

    // Process any other view files from app/modules
    var processModuleTemplates = function(subdir) {
        var deferred = Q.defer();
        var moduleName = subdir.split('/').pop();

        gulp.src(subdir + '/*.html')
            .pipe(templateCache(moduleName + '.templates.js', {
            module: 'app.' + moduleName,
            root: moduleName,
            standalone: false,
            templateHeader: '"use strict"; require("./' + moduleName + '.module.js").run(["$templateCache", function($templateCache) {'
        }))
            .pipe(gulp.dest(subdir))
            .on('end', deferred.resolve);

        return deferred.promise;
    };

    // Look in each module for templates
    var processModules = function(err, subdirs) {
        if (err) throw err;
        subdirs.forEach(function(subdir) {
            viewsPromises.push(processModuleTemplates(subdir))
        });
    };

    dir.subdirs(config.modules.src, processModules)

    return Q.all(viewsPromises);

});
