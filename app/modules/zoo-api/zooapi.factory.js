'use strict';

require('./zooapi.module.js')
    .factory('zooAPI', zooAPI);

var apiClient = require('panoptes-client/lib/api-client');

// @ngInject
function zooAPI(zooAPIConfig) {
    return apiClient;
}
