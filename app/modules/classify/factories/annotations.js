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

            var _updateStorage = function () {
                var annotationsToStore = _.reject(_annotations, { temp: true });
                storage.set('annotations', annotationsToStore);
            };

            var add = function (annotation) {
                var copied = angular.copy(annotation);
                _annotations.push(copied);
                _updateStorage();
                $rootScope.$apply();
                return copied;
            };

            var destroy = function (annotation) {
                _.remove(_annotations, { $$hashKey: annotation.$$hashKey });
                _updateStorage();
                $rootScope.$apply();
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
