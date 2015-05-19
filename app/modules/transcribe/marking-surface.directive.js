'use strict';

var svgPanZoom = require('svg-pan-zoom');

require('./transcribe.module.js')
    .directive('markingSurface', markingSurface);

// TODO: Find out what ngInject isn't working properly for markingSurfaceController

// @ngInject
function markingSurface() {
    var directive = {
        scope: {},
        restrict: 'A',
        controller: ['$scope', '$element', markingSurfaceController],
        controllerAs: 'vm',
        link: markingSurfaceLink
    };
    return directive;

    /**
     * @ngInject
     */
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
        vm.$enable = enable;
        vm.$disable = disable;
        vm.$isEnabled = isEnabled;

        function centre() {
            vm.panZoom.updateBBox();
            vm.panZoom.resize();
            vm.panZoom.center();
            vm.panZoom.fit();
        }

        function disable() {
            vm.panZoom.disablePan();
            vm.panZoom.disableZoom();
        }

        function enable() {
            vm.panZoom.enablePan();
            vm.panZoom.enableZoom();
        }

        function isEnabled() {
            return vm.panZoom.isPanEnabled() && vm.panZoom.isZoomEnabled();
        }

        // TODO: Fix so that centre and rotate work together normally - centre
        // doesn't work when rotated.
        function rotate(event, theta) {
            var container;
            var rotateTransform;
            var transformList;
            var centre;

            container = $element.find('.rotate-container')[0];
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

    /**
     * @ngInject
     */
    function markingSurfaceLink(scope, element, attr, vm) {
        scope.$on('panZoom:centre', vm.$centre);
        scope.$on('panZoom:rotate', vm.$rotate);
        scope.$on('panZoom:disable', vm.$disable);
        scope.$on('panZoom:enable', vm.$enable);

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
