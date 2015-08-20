'use strict';

require('./header.module.js')
    .directive('appHeader', appHeader);

function appHeader() {
    var directive = {
        restrict: 'A',
        replace: true,
        templateUrl: 'header/header.html',
        controller: HeaderController,
        controllerAs: 'vm'
    };
    return directive;
}

// @ngInject
function HeaderController($scope, $state) {
    var vm = this;

    $scope.$watch(function () {
        return $state.current.params;
    }, function (params) {
        vm.hideHook = (params && params.hideHook) ? true : false;
        vm.overlap = (params && params.overlap) ? true : false;
    });

    vm.links = [
        {
            label: 'Start Transcribing',
            state: 'Transcribe'
        },
        {
            label: 'About AnnoTate',
            state: 'About'
        },
        {
            label: 'The Team',
            state: 'Team'
        }
    ];
}
