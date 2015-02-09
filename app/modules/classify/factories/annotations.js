(function (angular, _) {

    'use strict';

    var module = angular.module('transcribe');

    module.factory('AnnotationsFactory', [
        '$localStorage',
        '$rootScope',
        function ($localStorage, $rootScope) {

            if (_.isUndefined($localStorage.annotations)) {
                $localStorage.annotations = [];
            }

            var _defer = function (fn) {
                ($rootScope.$$phase) ? fn() : $rootScope.$apply(fn);
            };

            var reset = function () {
                $localStorage.annotations.length = 0;
            };

            var add = function (value) {
                var copied = angular.copy(value);
                $localStorage.annotations.push(copied);
                $rootScope.$apply();
                return copied;
            };

            var list = function () {
                return $localStorage.annotations;
            };

            var destroy = function (data) {
                _defer(function () {
                    _.remove($localStorage.annotations, { $$hashKey: data.$$hashKey });
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
