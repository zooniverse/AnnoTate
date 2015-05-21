'use strict';

var Spinner = require('spin');

require('./overlay.module.js')
    .directive('loadingSpinner', loadingSpinner);

// @ngInject
function loadingSpinner($rootScope, $window, hotkeys) {
    var directive = {
        link: loadingSpinnerLink,
        replace: true,
        templateUrl: 'overlay/loading-spinner.html'
    };
    return directive;

    // @ngInject
    function loadingSpinnerLink(scope, element) {
        // Setup
        var spinner = new Spinner({
            color: '#fff'
        }).spin(element[0]);
    }

}
