(function (angular, zooAPI) {

    'use strict';

    var module = angular.module('transcribe.classify');

    module.factory('ProjectFactory', [
        '$log',
        '$q',
        '$window',
        'Config',
        'localStorageService',
        function ($log, $q, $window, Config, storage) {

            var _config = { display_name: Config.projectName };

            var _storedProject = storage.get('project');

            var project = function () {

                $log.log('Retrieving project data...');

                var deferred = $q.defer();

                if (_storedProject) {
                    deferred.resolve(_storedProject);
                } else {

                    var request = $window.zooAPI.type('projects').get(_config).index(0);
                    // var request = $window.zooAPI.type('projects').get('251');

                    request.then(function (response) {
                        console.log(response)
                        if (response.id) {
                            $log.info('Project', response);
                            storage.set('project', response);
                            deferred.resolve(response);
                        } else {
                            $log.error('Error retrieving project data', response);
                            deferred.reject();
                        }
                    });

                }

                return deferred.promise;

            };

            return project;

        }]);

})(window.angular, window.zooAPI);


