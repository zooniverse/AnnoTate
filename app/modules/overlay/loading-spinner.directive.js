'use strict';

var Spinner = require('spin');

require('./overlay.module.js')
    .directive('loadingSpinner', loadingSpinner);

// @ngInject
function loadingSpinner($rootScope, $window, hotkeys) {
    var directive = {
        compile: loadingSpinnerCompile,
        replace: true,
        templateUrl: 'overlay/loading-spinner.html'
    };
    return directive;

    function loadingSpinnerCompile(tElement) {
        new Spinner({
            color: '#fff'
        }).spin(tElement[0]);
    }
}
