(function (angular, _, svgPanZoom) {

    'use strict';

    var module = angular.module('app');

    module.directive('svgPanZoom', [
        function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {

                    scope.panZoom = svgPanZoom(element[0]);

                    scope.panZoom.on = function () {
                        scope.panZoom.enablePan();
                        scope.panZoom.enableZoom();
                    };

                    scope.panZoom.off = function () {
                        scope.panZoom.disablePan();
                        scope.panZoom.disableZoom();
                    };

                }
            };
        }
    ]);

}(window.angular, window._, window.svgPanZoom));
