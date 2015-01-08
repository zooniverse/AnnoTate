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
                var copied = angular.copy(value);
                _annotations.push(copied);
                $rootScope.$apply();
                return copied;
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
