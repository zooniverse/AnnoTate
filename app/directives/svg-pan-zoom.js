(function (angular, svgPanZoom) {

    'use strict';

    var module = angular.module('app');

    module.directive('svgPanZoom', [
        '$log',
        function ($log) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {

                    var svg = element[0];

                    scope.svg = svg;
                    scope.panZoom = svgPanZoom(svg, {
                        fit: false
                    });
                    scope.viewport = svg.getElementsByClassName('svg-pan-zoom_viewport')[0];
                    var rotateContainer = svg.getElementsByClassName('rotate-container')[0];

                    scope.rotation = 0;

                    scope.getPoint = function (event) {
                        var rect = rotateContainer.getBoundingClientRect();
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
                        degrees = degrees || 0;
                        $log.log('Rotating', rotateContainer, { current: scope.rotation, delta: degrees, new: scope.rotation + degrees});

                        scope.rotation = scope.rotation + degrees;

                        var rect = rotateContainer.getBoundingClientRect();
                        $log.log(rect)
                        var transform = [scope.rotation, rect.width / 2, rect.height / 2];

                        angular.element(rotateContainer).attr('transform', 'rotate(' + transform.join(' ') + ')');

                    };

                }
            };
        }
    ]);

}(window.angular, window.svgPanZoom));
