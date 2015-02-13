(function (angular) {

    'use strict';

    var module = angular.module('transcribe');

    module.directive('header', [
        'Config',
        'AuthFactory',
        function (Config, Auth) {
            return {
                restrict: 'A',
                templateUrl: 'core/templates/directives/header.html',
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
