(function (angular, _) {

    'use strict';

    var app = angular.module('app');

    app.factory('Utils', [
        function () {

            var getCoords = function (event) {
                return {
                    x: event.clientX - event.offsetX,
                    y: event.clientY - event.offsetY
                };
            };

            return {
                getCoords: getCoords
            };

        }

    ]);

}(window.angular, window._));
