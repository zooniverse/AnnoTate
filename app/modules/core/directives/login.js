(function (angular) {

    'use strict';

    var module = angular.module('transcribe');

    module.directive('login', [
        'Config',
        'AuthFactory',
        function (Config, Auth) {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: 'core/templates/directives/login.html',
                link: function (scope, element, attrs) {

                    scope.preventClose = function ($event) {
                       $event.stopPropagation();
                    };

                    scope.signIn = function (args) {
                        Auth.signIn(args);
                    };

                }
            }
        }
    ]);

}(window.angular));
