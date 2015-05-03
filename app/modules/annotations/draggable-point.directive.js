'use strict';

var _ = require('lodash');

require('./annotations.module.js')
    .directive('draggablePoint', draggablePoint);

/**
 * @ngInject
 */
function draggablePoint($rootScope, annotationsConfig, Annotations, AnnotationsUtils) {
    var directive = {
        scope: {
            data: '=draggablePoint'
        },
        restrict: 'A',
        replace: true,
        link: linkFunction,
        templateUrl: 'annotations/draggable-point.html',
        require: '^markingSurface'
    };
    return directive;

    function linkFunction(scope, element, attrs, markingSurface) {

        var namespace;
        var svg;

        namespace = _.partial(AnnotationsUtils.namespace, _, scope.data);
        svg = angular.element(markingSurface.svg);

        scope.r = annotationsConfig.pointRadius;
        scope.$on('$destroy', destroy);

        element.on(namespace('mousedown'), clickHandler);

        function clickHandler(event) {
            var events = namespace('mouseup') + ' ' + namespace('mousemove');
            element.on(events, clickOrDrag);

            function clickOrDrag(event) {
                if (event.type === 'mousemove') {
                    startDrag();
                }
                element.off(events, clickOrDrag);
            }
        }

        function startDrag() {
            console.log('start dragging');
            scope.dragging = true;
            svg.on(namespace('mousemove'), moveDrag);
            svg.on(namespace('mouseup'), endDrag);
            scope.$apply();
        }

        function moveDrag(event) {
            console.log('dragging');
        }

        function endDrag() {
            console.log('endDrag')
            scope.dragging = false;
            svg.off(namespace());
            Annotations.update();
            scope.$apply();
        }

        function destroy() {
            element.off(namespace());
            svg.off(namespace());
        }

    }
}
