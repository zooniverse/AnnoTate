'use strict';

require('./zooapi.module.js')
    .factory('zooAPI', zooAPI);

var Panoptes = require('panoptes-client');

// @ngInject
function zooAPI(zooAPIConfig) {

    var _client;

    _client = new Panoptes({
        appID: zooAPIConfig.app_id,
        host: 'https://panoptes.zooniverse.org'
    });

    return _client.api;

}
