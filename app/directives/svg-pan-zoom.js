(function (angular, svgPanZoom) {

    'use strict';

    var module = angular.module('app');

    module.directive('svgPanZoom', [
        '$log',
        function ($log) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {

                    var svg = scope.svg = {
                        root: element[0],
                        rotation: 0
                    };




                    scope.panZoom = svgPanZoom(svg.root, {
                        fit: false
                    });
                    scope.viewport = svg.root.getElementsByClassName('svg-pan-zoom_viewport')[0];
                    var rotateContainer = svg.root.getElementsByClassName('rotate-container')[0];


                    scope.getPoint = function (event) {
                        var point = svg.root.createSVGPoint();
                        point.x = event.clientX;
                        point.y = event.clientY;
                        return point.matrixTransform(rotateContainer.getScreenCTM().inverse());
                    };

                    scope.centre = function () {
                        scope.panZoom.updateBBox();
                        scope.panZoom.resize();
                        scope.panZoom.center();
                        scope.panZoom.fit();
                    };

                    scope.rotate = function (degrees) {
                        degrees = degrees || 0;
                        $log.log('Rotating', rotateContainer, { current: svg.rotation, delta: degrees, new: svg.rotation + degrees});

                        svg.rotation = svg.rotation + degrees;

                        var rect = rotateContainer.getBoundingClientRect();
                        var transform = [svg.rotation, rect.width / 2, rect.height / 2];

                        angular.element(rotateContainer).attr('transform', 'rotate(' + transform.join(' ') + ')');

                    };

                }
            };
        }
    ]);

}(window.angular, window.svgPanZoom));
