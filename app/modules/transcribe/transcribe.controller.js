'use strict';

require('./transcribe.module.js')
    .controller('TranscribeController', TranscribeController);

// @ngInject
function TranscribeController($rootScope, $scope, Annotations, zooAPI, zooAPIProject) {

    // ViewModel
    var vm = this;
    vm.annotations = Annotations.list();

    $scope.$on('next', loadNextSubject);

    vm.centre = function () {
        $rootScope.$broadcast('panZoom:centre');
    }

    // zooAPIProject.get().then(function (r) { console.log(r) })
    // zooAPIProject.get()
    //     .then(function (project) {
    //         return zooAPI.type('')
    //     })


    // zooAPI.type('subject_sets').get

    function loadNextSubject() {
        Annotations.reset();
        // TODO: reset tools
    }

}
