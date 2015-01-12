(function (angular, _) {

    'use strict';

    var app = angular.module('app');

    app.factory('AnnotationsFactory', [
        '$rootScope',
        function ($rootScope) {

            var _defer = function (fn) {
                ($rootScope.$$phase) ? fn() : $rootScope.$apply(fn);
            };

            var _annotations = [];

            var reset = function () {
                _annotations = [];
            };

            var add = function (value) {
                var copied = angular.copy(value);
                _annotations.push(copied);
                $rootScope.$apply();
                return copied;
            };

            var list = function () {
                return _annotations;
            };

            var destroy = function (data) {
                _defer(function () {
                    _.remove(_annotations, { $$hashKey: data.$$hashKey });
                });
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
