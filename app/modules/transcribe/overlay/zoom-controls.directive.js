'use strict';

require('./overlay.module.js')
    .directive('zoomControls', zoomControls);

// @ngInject
function zoomControls($interval, MarkingSurfaceFactory) {
    var directive = {
        link: zoomControlsLink,
        replace: true,
        restrict: 'A',
        templateUrl: 'overlay/zoom-controls.html'
    };
    return directive;

    function zoomControlsLink(scope) {
        var promise;
        scope.zoomStart = function (direction) {
            MarkingSurfaceFactory[direction]();
            promise = $interval(function () {
                MarkingSurfaceFactory[direction]();
            }, 150);
        }
        scope.zoomStop = function () {
            $interval.cancel(promise);
        }
    }
}
