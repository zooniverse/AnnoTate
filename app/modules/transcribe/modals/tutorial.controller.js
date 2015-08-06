'use strict';

require('./modals.module.js')
    .controller('TutorialController', TutorialController);

// @ngInject
function TutorialController($modalInstance) {

    var vm = this;
    vm.close = close;
    vm.page = 0;

    function close() {
        $modalInstance.close();
    }

}
