(function (angular, _, zooAPI) {

    'use strict';

    var module = angular.module('transcribe.classify');

    module.factory('SubjectsFactory', [
        '$http',
        '$localStorage',
        '$q',
        'Config',
        function ($http, $localStorage, $q, Config) {

            if (_.isUndefined($localStorage.activeSubject)) {
                $localStorage.activeSubject = {};
            }

            var _get = function (endpoint, params) {
                return window.zooAPI.get(endpoint);
            };

            var getSubject = function () {
                return _get('/projects/6', { limit: 1 })
                    .then(_constructSubject)
                    .then(_setActiveSubject);
            };

            var _constructSubject = function (response) {
                var original = response.data.subjects[0];
                var image = original.locations[0];
                var subject = {
                    id: original.id,
                    rawSubject: original,
                    rawResponse: response,
                    image: {
                        type: Object.keys(image)[0],
                        url: image[Object.keys(image)[0]]
                    }
                };
                return subject;
            };

            var _setActiveSubject = function (subject) {
                $localStorage.activeSubject = subject;
                return subject;
            };

            var resetActiveSubject = function () {
                $localStorage.activeSubject = {};
            };

            var checkForSubject = function () {
                if (!_.isEmpty($localStorage.activeSubject)) {
                    return $q.when($localStorage.activeSubject)
                } else {
                    return getSubject();
                }
            };

            return {
                get: checkForSubject,
                resetActive: resetActiveSubject
            };

        }]);

})(window.angular, window._, window.zooAPI);
