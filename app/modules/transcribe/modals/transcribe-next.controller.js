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

    function error(result) {
        console.log('oh noes', result);
    }

    function submitBlank() {
        return ClassificationFactory.submitBlank()
            .then(close, error);
    }

    function submitComplete() {
        return ClassificationFactory.submitComplete()
            .then(close, error);
    }

    function submitIncomplete() {
        return ClassificationFactory.submitIncomplete()
            .then(close, error);
    }

}
