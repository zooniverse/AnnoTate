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

            var _annotations = storage.get('annotations');

            var _defer = function (fn) {
                ($rootScope.$$phase) ? fn() : $rootScope.$apply(fn);
            };

            var _updateStorage = function () {
                var annotationsToStore = _.reject(_annotations, { temp: true });
                storage.set('annotations', annotationsToStore);
            };

            var add = function (annotation) {
                var copied = angular.copy(annotation);
                _defer(function () {
                    _annotations.push(copied);
                    _updateStorage();
                });
                return copied;
            };

            var destroy = function (annotation) {
                _defer(function () {
                    _.remove(_annotations, { $$hashKey: annotation.$$hashKey });
                    _updateStorage();
                });
            };

            var list = function () {
                return _annotations;
            };

            return {
                add: add,
                destroy: destroy,
                list: list,
            //     reset: reset,
            //     submit: submit
            };

        }

    ]);

}(window.angular, window._));
