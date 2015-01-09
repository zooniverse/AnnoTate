(function (angular) {

    'use strict';

    var app = angular.module('app');

    app.directive('tempTextAnnotation', [
        'Config',
        function (Config) {
            return {
                scope: {
                    data: '='
                },
                restrict: 'A',
                replace: true,
                templateUrl: 'directives/temp-text-annotation.html',
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

                    scope.startDrag = function ($event) {
                        event.stopPropagation();
                        viewport.on('mousemove', drag);
                    };

                    var drag = function (event) {
                        var point = ClassifyCtrl.getPoint(event);
                        element.attr('cx', point.x);
                        element.attr('cy', point.y);
                        event.preventDefault();
                        event.stopPropagation();
                    };

                    scope.endDrag = function ($event) {
                        var point = ClassifyCtrl.getPoint(event);
                        scope.data.x = point.x;
                        scope.data.y = point.y;
                        viewport.off('mousemove');
                    };

                    scope.stopClick = function ($event) {
                        event.stopPropagation();
                    };

                }
            }
        }
    ]);

}(window.angular));
