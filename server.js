(function () {

    'use strict';


    // Dependencies
    var express = require('express');
    var gutil = require('gulp-util');
    var request = require('request');

    // Variables
    var baseDir = __dirname;
    var serverDir = baseDir + '/.tmp';
    var serverPort = process.env.PORT || 8080;
    var serverName = process.env.SERVER_NAME.replace(/\/$/, '');

    // Server
    exports = module.exports = function runServer () {

        var server = express();

        server.get('/metadata', function (req, res) {
            var _url = 'http://www.tate.org.uk/art/search.json?q=' + req.query.query;
            gutil.log('Fetching ' + _url + '...');
            request(_url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    res.send(response)
                }
            });
        });

        server.use(express.static(serverDir));

        server.listen(serverPort, function () {
            gutil.log('App running on ' + gutil.colors.magenta(serverName + ':' + serverPort));
        });

    }

})();
