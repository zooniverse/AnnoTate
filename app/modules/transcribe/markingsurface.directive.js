'use strict';

var svgPanZoom = require('svg-pan-zoom');

require('./transcribe.module.js')
    .directive('markingSurface', markingSurface);

/**
 * @ngInject
 */
function markingSurface() {
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
        var viewport = svg.getElementsByClassName('svg-pan-zoom_viewport')[0];
        var rotateContainer = svg.getElementsByClassName('rotate-container')[0];
        var rotation = 0;

        var panZoom = svgPanZoom(svg, {
            fit: false,
            minZoom: 0.2,
            zoomScaleSensitivity: 0.05
        });

        vm.$centre = centre;
        vm.$rotate = rotate;

        // vm.$getPoint = function getPoint(event) {
        //     var point = svg.root.createSVGPoint();
        //     point.x = event.clientX;
        //     point.y = event.clientY;
        //     return point.matrixTransform(svg.rotateContainer.getScreenCTM().inverse());
        // };

        function centre() {
            panZoom.updateBBox();
            panZoom.resize();
            panZoom.center();
            panZoom.fit();
        }

        function getPoint(event) {
            var point = svg.createSVGPoint();
            point.x = event.clientX;
            point.y = event.clientY;
            return point.matrixTransform(rotateContainer.getScreenCTM().inverse());
        }

        // We could add on a rotate to the transform as another parameter to the
        // transform attribute, but that gets overwritten by svg-pan-zoom. So we
        // do a bit of maths and apply a rotation matrix to the original transform.
        // via https://developer.mozilla.org/en/docs/Web/SVG/Attribute/transform
        function rotate(d) {

            var panZoom;
            var currentTransform;
            var rotateTransform;
            var newTransform;

            rotateTransform = [Math.cos(d), Math.sin(d), Math.sin(d) * -1,
                Math.cos(d)];

            panZoom = svg.getElementsByClassName('svg-pan-zoom_viewport')[0];
            currentTransform = panZoom.getAttribute('transform');
            currentTransform = currentTransform.substr(7, currentTransform.length - 1).split(',');
            currentTransform = currentTransform.map(function (value) {
                return parseFloat(value);
            });

            var newTransform = currentTransform.slice(0);

            for (var i = 0; i < rotateTransform.length; i++) {
                newTransform[i] = newTransform[i] * rotateTransform[i];
            }





            // // newTransform = math.multiply(math.matrix(currentTransform), math.matrix(rotateTransform));
            // // newTransform = 'matrix(' + newTransform.join(',') + ')';


            panZoom.setAttribute('transform', 'matrix(' + newTransform.join(',') + ')');
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
