(function (angular, svgPanZoom) {

    'use strict';

    var module = angular.module('app');

    module.directive('svgPanZoom', [
        function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {

                    var svg = element[0];

                    scope.svg = svg;
                    scope.panZoom = svgPanZoom(svg, {
                        fit: false
                    });
                    scope.viewport = svg.getElementsByClassName('svg-pan-zoom_viewport')[0];

                    scope.getPoint = function (event) {
                        var rect = scope.viewport.getBoundingClientRect();
                        var zoom = parseFloat(scope.panZoom.getSizes().realZoom);
                        return {
                           x: Math.round((event.clientX - rect.left) / zoom),
                           y: Math.round((event.clientY - rect.top) / zoom),
                        };
                    };

                    scope.centre = function () {
                        scope.panZoom.updateBBox();
                        scope.panZoom.resize();
                        scope.panZoom.center();
                        scope.panZoom.fit();
                    };

                    scope.rotate = function (degrees) {
                        var rotateContainer = svg.getElementsByClassName('rotate-container');
                        console.log(rotateContainer);
                    };

                }
            };
        }
    ]);

}(window.angular, window.svgPanZoom));
