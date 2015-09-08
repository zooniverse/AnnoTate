'use strict';

var config = require('../config');
var gulp = require('gulp');
var gutil = require('gulp-util');
var replace = require('gulp-replace');

gulp.task('analytics', function () {

    var analytics = '';
    config.analytics.containers.forEach(function (container) {
        analytics = analytics.concat('<!-- ' + container.name + ' Google Tag Manager -->\r' +
            '<noscript><iframe src="//www.googletagmanager.com/ns.html?id=' + container.tag + '" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>\r' +
            '<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({"gtm.start":new Date().getTime(),event:"gtm.js"});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!="dataLayer"?"&l="+l:"";j.async=true;j.src="//www.googletagmanager.com/gtm.js?id="+i+dl;f.parentNode.insertBefore(j,f);})(window,document,"script","' + container.dataLayer + '","' + container.tag + '");</script>\r' +
            '<!-- End ' + container.name + ' Google Tag Manager -->\r\r');
    });

    return gulp.src(config.analytics.src)
        .pipe(replace('<!-- @@analytics -->', function (string) {
            return (global.isProd) ? analytics : false;
        }))
        .pipe(gulp.dest(config.analytics.dest));

});

