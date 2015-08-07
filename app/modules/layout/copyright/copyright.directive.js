'use strict';

require('./copyright.module.js')
    .directive('appCopyright', appCopyright);

// @ngInject
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
function CopyrightController($scope, CopyrightFactory) {
    var vm = this;

    $scope.$watch(CopyrightFactory.get, function () {
        vm.copyright = CopyrightFactory.get();
    });
}
