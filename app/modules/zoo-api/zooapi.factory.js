'use strict';

require('./zooapi.module.js')
    .factory('zooAPI', zooAPI);

var Panoptes = require('panoptes-client');

// @ngInject
function zooAPI(zooAPIConfig) {
    return Panoptes.apiClient;
}
