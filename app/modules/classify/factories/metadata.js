(function (angular, _) {

    'use strict';

    var module = angular.module('transcribe.classify');

    module.factory('MetadataFactory', [
        '$http',
        function ($http) {

            var get = function (tga) {
                var query = encodeURIComponent(tga.replace(/\/[^/]+$/, ''));
                return $http.get('http://localhost:8080/metadata?query=' + query)
                    .then(function (response) {
                        response.data.body = JSON.parse(response.data.body);
                        if (!_.isEmpty(response.data.body.results[0])) {
                            return response.data.body.results[0];
                        } else {
                            return false
                        }
                    });
            };

            return {
                get: get
            };

        }

    ]);

}(window.angular, window._));


