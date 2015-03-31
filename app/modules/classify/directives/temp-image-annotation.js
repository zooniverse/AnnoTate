(function (angular) {

    'use strict';

    var module = angular.module('transcribe.classify');

    module.directive('tempImageAnnotation', [
        'Config',
        function (Config) {
            return {
                scope: {
                    data: '='
                },
                restrict: 'A',
                replace: true,
                templateUrl: 'classify/templates/directives/temp-image-annotation.html'
            }
        }
    ]);

}(window.angular));
