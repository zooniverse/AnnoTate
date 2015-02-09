(function (angular) {

    'use strict';

    var app = angular.module('app');

    app.directive('login', [
        'Config',
        'AuthFactory',
        function (Config, Auth) {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: 'directives/login.html',
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
