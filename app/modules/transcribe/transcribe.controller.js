'use strict';

require('./transcribe.module.js')
    .controller('TranscribeController', TranscribeController);

// @ngInject
function TranscribeController($stateParams, $modal, $scope, $window, AggregationsFactory, AnnotationsFactory, SubjectsFactory, ModalsFactory, localStorageService) {

    // Setup controller
    var vm = this;
    vm.loading = SubjectsFactory.loading;
    vm.subject = SubjectsFactory.current;
    vm.transcription = true;
    vm.$loadNext = loadNext;
    vm.$openTutorial = openTutorial;
    vm.$viewOriginal = viewOriginal;

    // Watchers
    $scope.$watch(getLoadingStatus, setLoadingStatus);

    // Init
    activate();

    // Functions / methods
    function activate() {
        if (localStorageService.get('viewedTutorial') === null) {
           localStorageService.set('viewedTutorial', true);
            openTutorial();
        }

        loadSubject()
            .then(function () {
                vm.annotations = AnnotationsFactory.list();
            });
    }

    function getLoadingStatus() {
        return SubjectsFactory.loading;
    }

    function loadAggregations() {
        return AggregationsFactory.$getData()
            .then(function () {
                vm.aggregations = AggregationsFactory.list();
            });
    }

    function loadNext() {
        var modal1 = ModalsFactory.openNext();
        modal1.result
            .then(function () {
                var modal2 = ModalsFactory.openTalk();
                modal2.result
                    .then(function () {
                        AnnotationsFactory.reset();
                        SubjectsFactory.$advanceQueue()
                            .then(loadSubject);
                    });
            });
    }

    function loadSubject() {
        return SubjectsFactory.$getData($stateParams.subjectSet)
            .then(subjectLoaded, subjectLoadError)
            .then(loadAggregations);
    }

    function openTutorial() {
        ModalsFactory.openTutorial();
    }

    function setLoadingStatus() {
        vm.loading = SubjectsFactory.loading;
    }

    function subjectLoaded() {
        vm.subject = SubjectsFactory.current;

        var metadata = vm.subject.data.metadata;
        vm.copyright = metadata.acno.substring(0, metadata.acno.lastIndexOf('/')) + ' ' + metadata.copyright + '.';
    }

    function subjectLoadError(result) {
        if (result === 'outOfData') {
            $scope.$broadcast('subject:outOfData');
        } else {
            console.error('Error loading subject', result);
        }
    }

    function viewOriginal() {
        var url = 'http://www.tate.org.uk/art/archive/';
        url = url + vm.subject.data.metadata.acno.replace(/[\s|\/]/g, '-').toLowerCase();
        $window.open(url, '_blank');
    }

}
