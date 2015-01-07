(function (angular, $) {

    'use strict';

    var app = angular.module('app');

    app.directive('tempTextAnnotation', [
        function () {
            return {
                scope: {
                    data: '='
                },
                restrict: 'A',
                replace: true,
                templateUrl: 'directives/temp-text-annotation.html',
                link: function (scope, element, attrs) {

                    scope.r = 20;
                    console.log(scope)
                }

            }
        }
    ]);

}(window.angular, window.$));
