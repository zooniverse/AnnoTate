'use strict';

require('./copyright.module.js')
    .directive('appCopyright', appCopyright);

function appCopyright() {
    var directive = {
        restrict: 'A',
        replace: true,
        templateUrl: 'copyright/copyright.html',
        controller: CopyrightController,
        controllerAs: 'vm'
    };
    return directive;
}

// @ngInject
function CopyrightController() {
    // var vm = this;
}
