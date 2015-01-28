(function (angular) {

    'use strict';

    var app = angular.module('app');

    app.factory('SubjectsFactory', [
        '$http',
        '$q',
        'Config',
        'PanoptesFactory',
        function ($http, $q, Config, Panoptes) {

            var _get = function (endpoint, params) {
                var url = Config.api + endpoint;
                var config = {
                    params: _.extend(Config.apiParams, params),
                    headers: {
                        Accept: 'application/vnd.api+json; version=1'
                    }
                };
                return $http.get(url, config);
            };

            var _getSubject = function () {
                return _get('/subjects', { limit: 1 })
                    .then(_constructSubject);
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
                // return {
                //     image: {
                //         url: 'images/image_03.jpg'
                //     }
                // }
            };

            return {
                get: _getSubject
            };

        }]);

})(window.angular);
