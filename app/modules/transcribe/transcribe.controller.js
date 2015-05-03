'use strict';

require('./transcribe.module.js')
    .controller('TranscribeCtrl', TranscribeCtrl);

/**
 * @ngInject
 */
function TranscribeCtrl($scope, Annotations, toolSet) {

    // ViewModel
    var vm = this;
    vm.annotations = Annotations.list();

    $scope.$on('next', loadNextSubject);

    function loadNextSubject() {
        Annotations.reset();
        // TODO: reset tools
    }

}
