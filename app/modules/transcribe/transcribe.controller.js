'use strict';

require('./transcribe.module.js')
    .controller('TranscribeCtrl', TranscribeCtrl);

/**
 * @ngInject
 */
function TranscribeCtrl($scope, Annotations) {

    // ViewModel
    var vm = this;

    vm.annotations = Annotations.list();

}
