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
        var deferred = $q.defer();

        var cache = localStorageService.get('project');
        if (cache) {
            deferred.resolve(cache);
        }

        zooAPI.type('projects').get({ display_name: zooAPIConfig.display_name })
            .then(function (response) {
                localStorageService.set('project', response[0]);
                deferred.resolve(localStorageService.get('project'));
            });

        return deferred.promise;
    }
}
