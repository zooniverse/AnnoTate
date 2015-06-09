'use strict';

var Spinner = require('spin');

require('./overlay.module.js')
    .directive('loadingSpinner', loadingSpinner);

// @ngInject
function loadingSpinner() {
    var directive = {
        compile: loadingSpinnerCompile,
        replace: true,
        template: '<div class="loading-spinner" ng-show="vm.loading"></div>'
    };
    return directive;

    function loadingSpinnerCompile(tElement) {
        new Spinner({
            color: '#f8f8f8'
        }).spin(tElement[0]);
    }
}
