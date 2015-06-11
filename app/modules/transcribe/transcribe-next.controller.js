'use strict';

require('./transcribe.module.js')
    .controller('TranscribeNextController', TranscribeNextController);

// @ngInject
function TranscribeNextController($modalInstance) {

    var vm = this;
    vm.cancel = cancel;
    vm.submit = submit;

    function cancel() {
        $modalInstance.dismiss('cancel');
    }

    function submit(result) {
        $modalInstance.close(result);
    }

}
