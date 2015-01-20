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
                    scope.panZoom = svgPanZoom(svg, {});
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
                        scope.panZoom.resize();
                        scope.panZoom.updateBBox();
                        scope.panZoom.center();
                        scope.panZoom.fit();
                    };

                }
            };
        }
    ]);

}(window.angular, window.svgPanZoom));
