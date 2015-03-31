(function (angular, _) {

    'use strict';

    var module = angular.module('transcribe.classify');

    module.factory('AnnotationsFactory', [
        'localStorageService',
        '$rootScope',
        function (storage, $rootScope) {

            if (storage.get('annotations') === null) {
                storage.set('annotations', []);
            }

            // var _defer = function (fn) {
            //     ($rootScope.$$phase) ? fn() : $rootScope.$apply(fn);
            // };

            // var reset = function () {
            //     $localStorage.annotations.length = 0;
            // };

            // var add = function (value) {
            //     var copied = angular.copy(value);
            //     $localStorage.annotations.push(copied);
            //     $rootScope.$apply();
            //     return copied;
            // };

            var list = function () {
                // return $localStorage.annotations;
            };

            // var destroy = function (data) {
            //     _defer(function () {
            //         _.remove($localStorage.annotations, { $$hashKey: data.$$hashKey });
            //     });
            // };

            // var submit = function () {
            //     console.log('Submitting...');
            // };

            return {
            //     add: add,
            //     destroy: destroy,
                list: list,
            //     reset: reset,
            //     submit: submit
            };

            // return {};

        }

    ]);

}(window.angular, window._));
