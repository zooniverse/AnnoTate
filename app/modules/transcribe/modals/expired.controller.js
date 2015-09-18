'use strict';

require('./modals.module.js')
    .controller('ExpiredController', ExpiredController);

// @ngInject
function ExpiredController($modalInstance) {

    var vm = this;
    vm.close = close;

    function close() {
        $modalInstance.close();
    }

}
