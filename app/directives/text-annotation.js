(function (angular) {

    'use strict';

    var app = angular.module('app');

    app.directive('textAnnotation', [
        'Config',
        function (Config) {
            return {
                scope: {
                    data: '='
                },
                restrict: 'A',
                replace: true,
                templateUrl: 'directives/text-annotation.html',
                link: function (scope, element, attrs) {

                    var ClassifyCtrl = scope.$parent.$parent;
                    var panZoom = ClassifyCtrl.panZoom;
                    var viewport = angular.element(ClassifyCtrl.viewport);

                    scope.r = Config.svg.pointSize;

                    scope.addHoverClass = function () {
                        element.addClass('hover');
                    };

                    scope.removeHoverClass = function () {
                        element.removeClass('hover');
                    };

                    scope.click = function ($event) {
                        $event.preventDefault();
                        $event.stopImmediatePropagation();
                        ClassifyCtrl.editingTextAnnotation = scope.data;
                    };

                }
            }
        }
    ]);

}(window.angular));
