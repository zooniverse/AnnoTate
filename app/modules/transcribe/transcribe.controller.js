'use strict';

require('./transcribe.module.js')
    .controller('TranscribeController', TranscribeController);

// @ngInject
function TranscribeController($modal, $scope, AnnotationsFactory, SubjectsFactory, ModalsFactory) {

    // Setup controller
    var vm = this;
    vm.loading = SubjectsFactory.loading;
    vm.subject = SubjectsFactory.current;
    vm.$loadNext = loadNext;

    // Watchers
    $scope.$watch(getLoadingStatus, setLoadingStatus);

    // Init
    activate();

    // Functions / methods
    function activate() {
        loadSubject()
            .then(function () {
                vm.annotations = AnnotationsFactory.list();
            });

    }

    function getLoadingStatus() {
        return SubjectsFactory.loading;
    }

    function loadNext() {
        var modal = ModalsFactory.openNext();
        modal.result.then(function () {
            AnnotationsFactory.reset();
            SubjectsFactory.$advanceQueue()
                .then(loadSubject)
        });
    }

    function loadSubject() {
        return SubjectsFactory.$getData()
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
