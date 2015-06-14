'use strict';

var angular = require('angular');
var Hammer = require('hammerjs');
var lunar = require('lunar.js/dist/lunar.js')();

require('./annotations.module.js')
    .directive('draggable', draggable);

// Common functionality for allowing dragging on annotations

// @ngInject
function draggable($rootScope, Annotations, MarkingSurfaceFactory) {
    var directive = {
        // link: draggableLink,
        restrict: 'A',
        scope: {
            data: '=draggable'
        }
    };
    return directive;

//     function draggableLink(scope, element, attrs) {

//         // Setup
//         var data = scope.data;
//         var hammerElement;
//         var hammerSurface;
//         var markingSurfaceWasEnabled;
//         var offset = {};
//         var subjectDimensions;
//         var x;
//         var y;

//         switch (element[0].nodeName) {
//             case 'rect':
//                 x = 'x';
//                 y = 'y';
//                 break;
//             case 'circle':
//                 x = 'cx';
//                 y = 'cy';
//                 break;
//         }

//         // Events
//         hammerSurface = new Hammer(MarkingSurfaceFactory.svg[0]);
//         hammerElement = new Hammer.Manager(element[0]);
//         hammerElement.add(new Hammer.Press({ time: 5 }));
//         hammerElement.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL }));
//         hammerElement.on('press', startDrag);

//         // Methods
//         function getPoint(event) {
//             event = event.srcEvent || event;
//             return MarkingSurfaceFactory.getPoint(event);
//         }

//         function startDrag(hammerEvent) {
//             // $rootScope.$broadcast('markingTools:disable');
//             markingSurfaceWasEnabled = MarkingSurfaceFactory.isEnabled;
//             if (markingSurfaceWasEnabled) {
//                 MarkingSurfaceFactory.disable();
//             }
//             hammerSurface.on('panmove', moveDrag);
//             hammerSurface.on('panend', endDrag);

//             lunar.addClass(MarkingSurfaceFactory.svg[0], '-dragging');
//             lunar.addClass(element[0], '-dragging');

//             var point = getPoint(hammerEvent);
//             offset = {
//                 x: data.x - point.x,
//                 y: data.y - point.y
//             };
//             subjectDimensions = angular.element(MarkingSurfaceFactory.svg).find('.subject').first()[0].getBBox();
//         }

//         function moveDrag(hammerEvent) {
//             var point = getPoint(hammerEvent);
//             element.attr(x, point.x + offset.x);
//             element.attr(y, point.y + offset.y);
//             checkOutOfBounds();
//         }

//         function checkOutOfBounds() {
//             // Out of bounds - left
//             if (element.attr(x) < 0) {
//                 element.attr(x, 0);
//             }

//             // Out of bounds - right
//             if (element.attr(x) > subjectDimensions.width) {
//                 element.attr(x, subjectDimensions.width);
//             }
//             if (element.attr('width') && element.attr('width') > (subjectDimensions.width - element.attr(x))) {
//                 element.attr(x, subjectDimensions.width - element.attr('width'));
//             }

//             // Out of bounds - top
//             if (element.attr(y) < 0) {
//                 element.attr(y, 0);
//             }

//             // Out of bounds - bottom
//             if (element.attr(y) > subjectDimensions.height) {
//                 element.attr(y, subjectDimensions.height);
//             }
//             if (element.attr('height') && element.attr('height') > (subjectDimensions.height - element.attr(y))) {
//                 element.attr(y, subjectDimensions.height - element.attr('height'));
//             }
//         }

//         function endDrag() {
//             // $rootScope.$broadcast('markingTools:enable');
//             if (markingSurfaceWasEnabled) {
//                 MarkingSurfaceFactory.enable();
//             }
//             hammerSurface.off('panmove', moveDrag);
//             hammerSurface.off('panend', endDrag);

//             data.x = parseFloat(element.attr(x));
//             data.y = parseFloat(element.attr(y));

//             lunar.removeClass(MarkingSurfaceFactory.svg[0], '-dragging');
//             lunar.removeClass(element[0], '-dragging');

//             Annotations.updateCache();
//             scope.$digest();
//         }

//     }

}
