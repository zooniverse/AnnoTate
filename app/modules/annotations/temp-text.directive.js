'use strict';

require('./annotations.module.js')
    .directive('tempTextAnnotation', tempTextAnnotation);

/**
 * @ngInject
 */
function tempTextAnnotation() {
    var directive = {
        scope: {
            data: '='
        },
        restrict: 'A',
        replace: true,
        templateUrl: 'annotations/temp-text.html',
        link: linkFunction
    };
    return directive;

    function linkFunction(scope, element, attrs) {

        var ClassifyCtrl = scope.$parent.$parent;
        var panZoom = ClassifyCtrl.panZoom;
        var viewport = angular.element(ClassifyCtrl.svg.viewport);

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
            var point = ClassifyCtrl.svg.$getPoint(event);
            element.attr('cx', point.x);
            element.attr('cy', point.y);
            event.preventDefault();
            event.stopPropagation();
        };

        scope.endDrag = function ($event) {
            var point = ClassifyCtrl.svg.$getPoint(event);
            scope.data.x = point.x;
            scope.data.y = point.y;
            viewport.off('mousemove');
        };

        scope.stopClick = function ($event) {
            event.stopPropagation();
        };

    }
}
