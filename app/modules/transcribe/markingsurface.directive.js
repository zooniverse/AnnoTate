'use strict';

var svgPanZoom = require('svg-pan-zoom');

require('./transcribe.module.js')
    .directive('markingSurface', markingSurface);

/**
 * @ngInject
 */
function markingSurface(transcribeUtils) {
    var directive = {
        restrict: 'A',
        controller: markingSurfaceController,
        controllerAs: 'vm',
        link: markingSurfaceLink
    };
    return directive;

    function markingSurfaceController($scope, $element) {

        var vm = this;
        var svg = $element[0];
        var rotation = 0;

        var panZoom = svgPanZoom(svg, {
            fit: false,
            minZoom: 0.2,
            zoomScaleSensitivity: 0.05
        });

        vm.$centre = centre;
        vm.$rotate = rotate;

        function centre() {
            panZoom.updateBBox();
            panZoom.resize();
            panZoom.center();
            panZoom.fit();
        }


        // We could add on a rotate to the transform as another parameter to the
        // transform attribute, but that gets overwritten by svg-pan-zoom. So we
        // do a bit of maths and apply a rotation matrix to the original transform.
        // via https://developer.mozilla.org/en/docs/Web/SVG/Attribute/transform
        function rotate(theta) {

            var panZoom;
            var size;
            var transformList;

            // Reset rotation to 0 if it's equivalent to a full rotation
            rotation = (Math.abs(theta + rotation) / 360 === 1) ? 0 : theta + rotation;

            panZoom = svg.getElementsByClassName('svg-pan-zoom_viewport')[0];
            transformList = panZoom.transform.baseVal;
            size = panZoom.getBBox()




            var rotate = svg.createSVGTransform();
            rotate.setRotate(rotation, size.width / 2, size.height / 2)

            transformList.insertItemBefore(rotate, 0)
            transformList.consolidate()



        }

    }

    function markingSurfaceLink(scope, element, attr, vm) {

        scope.$on('centre', triggerCentre);
        scope.$on('rotate', triggerRotate);

        function triggerCentre(event, data) {
            vm.$centre();
        }

        function triggerRotate(event, data) {
            vm.$rotate(data);
        }

    }

}
