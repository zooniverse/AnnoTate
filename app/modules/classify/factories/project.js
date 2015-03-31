(function (angular, zooAPI) {

    'use strict';

    var module = angular.module('transcribe.classify');

    module.factory('ProjectFactory', [
        '$log',
        '$window',
        'Config',
        function ($log, $window, Config) {

            var project = function () {
                $log.log('Retrieving project data...');
                return $window.zooAPI.type('projects').get({ display_name: Config.projectName }).index(0);
            };

            return project;

        }]);

})(window.angular, window.zooAPI);


