'use strict';

require('./overlay.module.js')
    .directive('outOfData', outOfData);

// @ngInject
function outOfData($rootScope, $window, hotkeys) {
    var directive = {
        link: outOfDataLink,
        replace: true,
        scope: true,
        templateUrl: 'overlay/out-of-data.html'
    };
    return directive;

    function outOfDataLink(scope) {
        scope.show = false;

        scope.$on('subject:outOfData', function () {
            scope.show = true;
        });
    }
}
