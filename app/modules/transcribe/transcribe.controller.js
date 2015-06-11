'use strict';

require('./transcribe.module.js')
    .controller('TranscribeController', TranscribeController);

// @ngInject
function TranscribeController($scope, SubjectsFactory) {

    // Setup controller
    var vm = this;
    vm.loading = SubjectsFactory.loading;
    vm.subject = SubjectsFactory.current;
    vm.$loadNext = loadNext;

    // Watchers
    $scope.$watch(getLoadingStatus, setLoadingStatus);

    // Init
    loadSubject();

    // Functions / methods
    function getLoadingStatus() {
        return SubjectsFactory.loading;
    }

    function loadNext() {
        SubjectsFactory.$advanceQueue()
            .then(loadSubject)
    }

    function loadSubject() {
        SubjectsFactory.$getData()
            .then(subjectLoaded, subjectLoadError);
    }

    function setLoadingStatus() {
        vm.loading = SubjectsFactory.loading;
    }

    function subjectLoaded() {
        vm.subject = SubjectsFactory.current;
    }

    function subjectLoadError(result) {
        console.log('fail', result)
    }

}
