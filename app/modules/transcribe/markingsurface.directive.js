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
        controller: function ($scope, $element) {

            var svg = $scope.svg = {
                root: $element[0],
                rotation: 0
            };


            svg.panZoom = svgPanZoom(svg.root, {
                fit: false,
                minZoom: 0.2,
                zoomScaleSensitivity: 0.05
            });




        }
    };
    return directive;
}
