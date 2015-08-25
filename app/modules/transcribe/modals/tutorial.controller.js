'use strict';

require('./modals.module.js')
    .controller('TutorialController', TutorialController);

// @ngInject
function TutorialController($modalInstance) {

    var vm = this;
    vm.close = close;
    vm.page = 1;

    function close() {
        $modalInstance.close();
    }

}
