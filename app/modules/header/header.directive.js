'use strict';

require('./header.module.js')
    .directive('appHeader', appHeader);

/**
 * @ngInject
 */
function appHeader() {
    var directive = {
        restrict: 'A',
        replace: true,
        templateUrl: 'header/header.html',
        controller: HeaderController,
        controllerAs: 'vm'
    };
    return directive;

    function HeaderController() {
        var vm = this;

        // TODO: reset this on resize
        vm.headerCollapse = true;

        vm.links = [
            {
                label: 'Home',
                state: 'Home'
            },
            {
                label: 'Start Transcribing',
                state: 'Transcribe'
            }
        ];
    }

}
