'use strict';

var config = require('../config');
var gutil = require('gulp-util');
var s3 = require('s3');

module.exports = function s3Upload(s3Params, callback) {

    var client = s3.createClient({
        s3Options: {
            accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
            secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY
        }
    });

    var params = {
        localDir: config.dist.root,
        s3Params: s3Params
    };

    var uploader = client.uploadDir(params);

    gutil.log('Uploading files to', gutil.colors.red(params.s3Params.Bucket + '/' + params.s3Params.Prefix) + '...');

    uploader.on('error', function (error) {
        gutil.log('Unable to sync:', error.stack);
    });

    uploader.on('fileUploadEnd', function (localFilePath) {
        gutil.log('Uploaded', gutil.colors.cyan(localFilePath));
    });

    uploader.on('end', function () {
        gutil.log('Upload complete');
        callback();
    });

}
