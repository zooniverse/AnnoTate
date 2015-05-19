'use strict';

var angular = require('angular');
var Hammer = require('hammerjs');

require('./annotations.module.js')
    .directive('draggable', draggable);

// @ngInject
function draggable($rootScope, Annotations, toolUtils) {
    var directive = {
        link: draggableLink,
        require: ['^markingSurface'],
        restrict: 'A'
    };
    return directive;

    function draggableLink(scope, element, attrs, ctrl) {

        // Setup
        var data = {};
        var hammerElement;
        var hammerSurface;
        var markingSurface = ctrl[0];
        var markingSurfaceWasEnabled;
        var offset = {};
        var x;
        var y;

        if (scope.annotation) {
            data = scope.annotation;
        }

        switch (element[0].nodeName) {
            case 'rect':
                x = 'x';
                y = 'y'
                break;
            case 'circle':
                x = 'cx';
                y = 'cy'
                break;
        }

        // Events
        hammerSurface = new Hammer(markingSurface.svg);
        hammerElement = new Hammer.Manager(element[0]);
        hammerElement.add(new Hammer.Press({ time: 5 }));
        hammerElement.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL }));
        hammerElement.on('press', startDrag);

        // Methods
        function getPoint(event) {
            event = event.srcEvent || event;
            return toolUtils.getPoint(angular.element(markingSurface.svg), event);
        }

        function startDrag(hammerEvent) {
            $rootScope.$broadcast('markingTools:disable');
            markingSurfaceWasEnabled = markingSurface.$isEnabled();
            if (markingSurfaceWasEnabled) {
                $rootScope.$broadcast('panZoom:disable');
            }
            hammerSurface.on('panmove', moveDrag);
            hammerSurface.on('panend', endDrag);

            var point = getPoint(hammerEvent);
            offset = {
                x: data.x - point.x,
                y: data.y - point.y
            };
        }

        function moveDrag(hammerEvent) {
            var point = getPoint(hammerEvent);
            element[0].setAttribute(x, point.x + offset.x);
            element[0].setAttribute(y, point.y + offset.y);
        }

        function endDrag(hammerEvent) {
            if (markingSurfaceWasEnabled) {
                $rootScope.$broadcast('panZoom:enable');
            }
            $rootScope.$broadcast('markingTools:enable');
            hammerSurface.off('panmove', moveDrag);
            hammerSurface.off('panend', endDrag);

            data.x = parseFloat(element[0].getAttribute(x));
            data.y = parseFloat(element[0].getAttribute(y));

            Annotations.updateCache();
            scope.$apply();
        }

    }

}
