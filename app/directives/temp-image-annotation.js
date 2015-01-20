(function (angular) {

    'use strict';

    var app = angular.module('app');

    app.directive('tempImageAnnotation', [
        'Config',
        function (Config) {
            return {
                scope: {
                    data: '='
                },
                restrict: 'A',
                replace: true,
                templateUrl: 'directives/temp-image-annotation.html'
            }
        }
    ]);

}(window.angular));
