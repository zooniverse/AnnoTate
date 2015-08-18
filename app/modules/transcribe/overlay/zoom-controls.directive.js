'use strict';

require('./overlay.module.js')
    .directive('zoomControls', zoomControls);

// @ngInject
function zoomControls($interval, MarkingSurfaceFactory) {
    var directive = {
        link: zoomControlsLink,
        replace: true,
        restrict: 'A',
        scope: true,
        templateUrl: 'overlay/zoom-controls.html'
    };
    return directive;

    function zoomControlsLink(scope) {
        var promise;
        scope.zoomStart = zoomStart;
        scope.zoomStop = zoomStop;

        function zoomStart(direction) {
            MarkingSurfaceFactory[direction]();
            promise = $interval(function () {
                MarkingSurfaceFactory[direction]();
            }, 150);
        }

        function zoomStop() {
            $interval.cancel(promise);
        }
    }
}
