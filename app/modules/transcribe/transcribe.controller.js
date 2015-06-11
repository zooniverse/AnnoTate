'use strict';

require('./transcribe.module.js')
    .controller('TranscribeController', TranscribeController);

// @ngInject
function TranscribeController($modal, $scope, SubjectsFactory, TranscribeConstants) {

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
        var modal = $modal.open(TranscribeConstants.modals.next);
        modal.result.then(function (isComplete) {
            console.log(isComplete)
            // Classifications.submit(isComplete)
                // .then(function () {
                    // Annotations.reset();
                    // SubjectsFactory.$advanceQueue()
                    //     .then(loadSubject)
                // });
        });
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
        if (result === 'outOfData') {
            $scope.$broadcast('subject:outOfData');
        } else {
            console.error('Error loading subject', result);
        }
    }

}
