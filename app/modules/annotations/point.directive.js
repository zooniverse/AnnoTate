'use strict';

var _ = require('lodash');

require('./annotations.module.js')
    .directive('point', point);

// Handles dragging and click behaviour for text points

/**
 * @ngInject
 */
function point(annotationsConfig, AnnotationsUtils, toolUtils) {
    var directive = {
        controller: pointController,
        link: pointLink,
        replace: true,
        require: ['point', '^textAnnotation', '^markingSurface'],
        restrict: 'A',
        scope: {
            data: '=point',
            complete: '='
        },
        templateUrl: 'annotations/point.html'
    };
    return directive;

    function pointController($scope) {
        $scope.r = annotationsConfig.pointRadius;
    }

    function pointLink(scope, element, attrs, ctrl) {

        // TODO: Prevent points being dragged off surface

        var dragData;
        var markingSurface;
        var namespace;
        var panZoom;
        var surface;
        var svg;
        var textAnnotation;

        // Controllers
        markingSurface = ctrl[2];
        textAnnotation = ctrl[1];

        // Data structures
        dragData = {};
        panZoom = markingSurface.panZoom;
        scope.dragging = false;
        svg = angular.element(markingSurface.svg);
        surface = svg.find('.pan-zoom');

        // Functions
        namespace = _.partial(AnnotationsUtils.namespace, _, scope.data);

        function clickHandler() {
            var events = namespace('mouseup') + ' ' + namespace('mousemove');
            element.on(events, clickOrDrag);
            function clickOrDrag(event) {
                if (event.type === 'mousemove') {
                    startDrag(event);
                } else {
                    textAnnotation.edit();
                }
                element.off(events, clickOrDrag);
            }
        }

        function destroy() {
            element.off(namespace());
            surface.off(namespace());
        }

        function endDrag() {
            // Update model
            scope.data.x = parseFloat(dragData.target.getAttribute('cx'));
            scope.data.y = parseFloat(dragData.target.getAttribute('cy'));
            scope.$apply();
            textAnnotation.update();

            // Reset
            dragData = {};
            scope.dragging = false;
            scope.$apply();
            surface.off(namespace());
        }

        function moveDrag(event) {
            // We update the element, because it's faster than the model.
            var point = toolUtils.getPoint(svg, event);
            dragData.target.setAttribute('cx', point.x - dragData.offset.x);
            dragData.target.setAttribute('cy', point.y - dragData.offset.y);
        }

        function startDrag(event) {
            var point = toolUtils.getPoint(svg, event);
            dragData.target = event.target;
            dragData.offset = {
                x: scope.data.x - point.x,
                y: scope.data.y - point.y
            }
            surface.on(namespace('mousemove'), moveDrag);
            surface.on(namespace('mouseup'), endDrag);
            scope.dragging = true;
            scope.$apply();
        }

        function toggleDragging(dragging) {
            var surfaceClass = surface.attr('class');
            if (dragging) {
                panZoom.disablePan();
                surface.attr('class', surfaceClass + ' -dragging');
            } else {
                panZoom.enablePan();
                surface.attr('class', surfaceClass.replace(/-dragging/, '').trim());
            }
        }

        // Event listeners
        element.on(namespace('mousedown'), clickHandler);
        scope.$on('$destroy', destroy);
        scope.$watch('dragging', toggleDragging);

    }

}
