(function (angular, zooAPI) {

    'use strict';

    var app = angular.module('app');

    app.factory('SubjectsFactory', [
        '$http',
        '$localStorage',
        '$q',
        'Config',
        function ($http, $localStorage, $q, Config) {

            if (_.isUndefined($localStorage.activeSubject)) {
                $localStorage.activeSubject = {};
            }

            var _get = function (endpoint, params) {
                // var url = Config.api + endpoint;
                // var config = {
                //     params: _.extend(Config.apiParams, params),
                //     headers: {
                //         Accept: 'application/vnd.api+json; version=1'
                //     }
                // };
                // return $http.get(url, config);

                return window.zooAPI.get(endpoint);

            };

            var getSubject = function () {
                return _get('/projects/6', { limit: 1 })
                    .then(_constructSubject)
                    .then(_setActiveSubject);
            };

            var getDummySubject = function () {
                return $q.when({
                    image: {
                        url: 'images/image_03.jpg'
                    }
                });
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

            return {
                get: getDummySubject,
                active: $localStorage.activeSubject,
                resetActive: resetActiveSubject
            };

        }]);

})(window.angular, window.zooAPI);
