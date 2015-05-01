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
        var svg = $element[0];

        var panZoom = svgPanZoom(svg, {
            fit: false,
            minZoom: 0.2,
            zoomScaleSensitivity: 0.05
        });

        vm.$centre = centre;
        vm.$loadTool = loadTool;
        vm.$rotate = rotate;

        function centre() {
            panZoom.updateBBox();
            panZoom.resize();
            panZoom.center();
            panZoom.fit();
        }

        function loadTool(tool) {
            if (activeTool) {
                activeTool.deactivate();
            }
            if (tool) {
                activeTool = tool;
                activeTool.activate();
            }

            console.log(tool);
        }

        // TODO: Fix so that centre and rotate work together normally - centre
        // doesn't work when rotated.
        function rotate(theta) {
            var container;
            var rotate;
            var transforms;
            var centre;

            container = svg.getElementsByClassName('rotate-container')[0];
            centre = {
                x: container.getBBox().width / 2,
                y: container.getBBox().height / 2
            };

            rotate = svg.createSVGTransform();
            rotate.setRotate(theta, centre.x, centre.y);
            transforms = container.transform.baseVal;
            transforms.appendItem(rotate);
        }
    }

    function markingSurfaceLink(scope, element, attr, vm) {
        scope.$on('centre', triggerCentre);
        scope.$on('rotate', triggerRotate);
        scope.$on('setTool', triggerLoadTool);

        function triggerCentre(event, data) {
            vm.$centre();
        }

        function triggerRotate(event, theta) {
            vm.$rotate(theta);
        }

        function triggerLoadTool(event, tool) {
            vm.$loadTool(tool);
        }
    }

}
