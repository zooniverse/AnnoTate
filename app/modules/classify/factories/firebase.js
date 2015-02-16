(function (angular, _) {

    'use strict';

    var module = angular.module('transcribe.classify');

    module.factory('FirebaseFactory', [
        '$firebase',
        '$localStorage',
        '$rootScope',
        'Config',
        function ($firebase, $localStorage, $rootScope, Config) {

            var _ref = new Firebase(Config.firebase + '/classifications/');
            var _sync = $firebase(_ref);

            var _clean = function (subject, annotations) {

                annotations = _.each(annotations, function (annotation) {
                    delete annotation.$$hashKey;
                })

                return {
                    subject: subject,
                    annotations: annotations
                };

            };

            var submit = function (subject, annotations) {
                var data = _clean(subject, annotations);
                return _sync.$push(data);
            };

            return {
                submit: submit
            };

        }

    ]);

}(window.angular, window._));
