(function () {

    'use strict';


    // Dependencies
    var express = require('express');
    var gutil = require('gulp-util');


    // Variables
    var baseDir = __dirname;
    var serverDir = baseDir + '/.tmp';
    var serverPort = process.env.PORT || 8080;
    var serverName = process.env.SERVER_NAME.replace(/\/$/, '');


    // Server
    exports = module.exports = function runServer () {

        var server = express();

        server.use(express.static(serverDir));

        server.listen(serverPort, function () {
            gutil.log('App running on ' + gutil.colors.magenta(serverName + ':' + serverPort));
        });

    }

})();
