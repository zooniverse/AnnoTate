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

    function HeaderController() {
        var vm = this;

        vm.links = [
            {
                label: 'Start Transcribing',
                state: 'Transcribe'
            },
            {
                label: 'About annoTate',
                state: 'About'
            },
            {
                label: 'The Team',
                state: 'Team'
            }
        ];
    }
}
