(function (angular, _) {

    'use strict';

    var app = angular.module('app');

    app.factory('AnnotationsFactory', [
        '$rootScope',
        function ($rootScope) {

            var _annotations = [];

            var reset = function () {
                _annotations = [];
            };

            var add = function (value) {
                _annotations.push(angular.copy(value));
                $rootScope.$apply();
                console.log(_annotations);
            };

            var list = function () {
                return _annotations;
            };

            var destroy = function (data) {
                _.remove(_annotations, { $$hashKey: data.$$hashKey });
                $rootScope.$apply();
            };

            return {
                add: add,
                destroy: destroy,
                list: list,
                reset: reset
            };

        }

    ]);

}(window.angular, window._));
