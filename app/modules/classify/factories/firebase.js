(function (angular, _) {

    'use strict';

    var module = angular.module('transcribe.classify');

    module.factory('FirebaseFactory', [
        '$localStorage',
        '$rootScope',
        function ($localStorage, $rootScope) {

            var submit = function (subject, annotations) {
                console.log('Submitting to Firebase');
            };

            return {
                submit: submit
            };

        }

    ]);

}(window.angular, window._));
