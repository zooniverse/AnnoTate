'use strict';

require('./transcribe.module.js')
    .controller('TranscribeController', TranscribeController);

// @ngInject
function TranscribeController($rootScope, $scope, Annotations) {

    // ViewModel
    var vm = this;
    vm.annotations = Annotations.list();

    $scope.$on('next', loadNextSubject);

    vm.centre = function () {
        $rootScope.$broadcast('panZoom:centre');
    };

    function loadNextSubject() {
        Annotations.reset();
        // TODO: reset tools
    }

}
