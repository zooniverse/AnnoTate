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

            // $firebase(_ref).then(function (res) {
            //     console.log(res)
            // });
            console.log($firebase(_ref))

            var submit = function (subject, annotations) {
                console.log('Submitting to Firebase');
                console.info(subject, annotations);
            };

            return {
                submit: submit
            };

        }

    ]);

}(window.angular, window._));
