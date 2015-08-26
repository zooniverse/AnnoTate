'use strict';

require('./zooapi.module.js')
    .factory('zooAPIProject', zooAPIProject);

// @ngInject
function zooAPIProject($q, localStorageService, zooAPIConfig, zooAPI) {

    var factory;

    factory = {
        get: get
    };

    return factory;

    function get() {
        var cache = localStorageService.get('project');
        if (cache) {
            _retrieveAndCache();
            return $q.when(cache);
        } else {
            return _retrieveAndCache();
        }
    }

    function _retrieveAndCache() {
        return zooAPI.type('projects').get(zooAPIConfig.project_id)
            .then(function (response) {
                localStorageService.set('project', response);
                return response;
            });
    }

}
