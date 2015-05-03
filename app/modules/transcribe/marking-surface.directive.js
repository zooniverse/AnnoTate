'use strict';

var svgPanZoom = require('svg-pan-zoom');

require('./transcribe.module.js')
    .directive('markingSurface', markingSurface);

/**
 * @ngInject
 */
function markingSurface() {
    var directive = {
        scope: {},
        restrict: 'A',
        controller: markingSurfaceController,
        controllerAs: 'vm',
        link: markingSurfaceLink
    };
    return directive;

    function markingSurfaceController($scope, $element) {
        var vm = this;

        vm.svg = $element[0];

        vm.panZoom = svgPanZoom(vm.svg, {
            dblClickZoomEnabled: false,
            fit: false,
            minZoom: 0.2,
            zoomScaleSensitivity: 0.05
        });

        vm.$centre = centre;
        vm.$rotate = rotate;

        function centre() {
            vm.panZoom.updateBBox();
            vm.panZoom.resize();
            vm.panZoom.center();
            vm.panZoom.fit();
        }

        // TODO: Fix so that centre and rotate work together normally - centre
        // doesn't work when rotated.
        function rotate(event, theta) {
            var container;
            var rotateTransform;
            var transformList;
            var centre;

            container = vm.svg.getElementsByClassName('rotate-container')[0];
            centre = {
                x: container.getBBox().width / 2,
                y: container.getBBox().height / 2
            };

            rotateTransform = vm.svg.createSVGTransform();
            rotateTransform.setRotate(theta, centre.x, centre.y);
            transformList = container.transform.baseVal;
            transformList.appendItem(rotateTransform);
        }
    }

    function markingSurfaceLink(scope, element, attr, vm) {
        scope.$on('centre', vm.$centre);
        scope.$on('rotate', vm.$rotate);
        scope.$on('activateTool', triggerActivateTool);
        scope.$on('deactivateTool', triggerDeactivateTool);

        function triggerActivateTool(event, tool) {
            tool.activate(element);
        }

        function triggerDeactivateTool(event, tool) {
            tool.deactivate();
        }
    }

}
