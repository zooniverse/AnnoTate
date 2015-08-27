'use strict';

require('./modals.module.js')
    .controller('TranscribeNextController', TranscribeNextController);

// @ngInject
function TranscribeNextController($modalInstance, ClassificationFactory) {

    var vm = this;
    vm.cancel = cancel;

    vm.submitBlank = submitBlank;
    vm.submitComplete = submitComplete;
    vm.submitIncomplete = submitIncomplete;

    function cancel() {
        $modalInstance.dismiss('cancel');
    }

    function close(result) {
        $modalInstance.close(result);
    }

    function submitBlank() {
        ClassificationFactory.submitBlank();
        return close();
    }

    function submitComplete() {
        ClassificationFactory.submitComplete();
        return close();
    }

    function submitIncomplete() {
        ClassificationFactory.submitIncomplete();
        return close();
    }

}
