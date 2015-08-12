'use strict';

// A simple close button for use in modal

require('./modals.module.js')
    .directive('closeButton', closeButton);

// @ngInject
function closeButton() {
    var directive = {
        templateUrl: 'modals/close-button.html',
        restrict: 'E',
        replace: true
    };
    return directive;
}
