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
                templateUrl: 'directives/temp-image-annotation.html',
                link: function (scope, element, attrs) {

                    var ClassifyCtrl = scope.$parent.$parent;
                    var panZoom = ClassifyCtrl.panZoom;
                    var viewport = angular.element(ClassifyCtrl.viewport);

                    scope.addHoverClass = function () {
                        element.addClass('hover');
                    };

                    scope.removeHoverClass = function () {
                        element.removeClass('hover');
                    };



                }
            }
        }
    ]);

}(window.angular));
