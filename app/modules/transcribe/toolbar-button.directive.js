'use strict';

require('./transcribe.module.js')
    .directive('toolbarButton', toolbarButton);

// @ngInject
function toolbarButton() {
    var directive = {
        scope: {
            label: '@'
        },
        replace: true,
        restrict: 'E',
        templateUrl: 'transcribe/toolbar-button.html'
    };
    return directive;
}
