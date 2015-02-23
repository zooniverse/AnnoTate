(function (angular, _) {

    'use strict';

    var module = angular.module('transcribe.classify');

    module.controller('ClassifyCtrl', [
        '$scope',
        '$modal',
        'AnnotationsFactory',
        'DummySubjectsFactory',
        'MetadataFactory',
        function ($scope, $modal, Annotations, Subjects, Metadata) {

            $scope.subject = { isLoaded: false };
            $scope.metadata = { isLoaded: false };
            $scope.activeTool = null;
            $scope.editingTextAnnotation = null;

            $scope.setTool = function (tool) {
                if ($scope.activeTool) {
                    $scope.activeTool.deactivate();
                }
                if (!$scope.activeTool || ($scope.activeTool && $scope.activeTool.name !== tool.name )) {
                    $scope.activeTool = tool;
                    $scope.activeTool.activate();
                } else {
                    $scope.activeTool = null;
                }
            };

            var getNextSubject = function (id) {
                $scope.subject.isLoaded = false;
                id = id || false;
                console.log('Getting', id)
                Subjects.get(id)
                    .then(function (response) {
                        $scope.subject.data = response;
                        $scope.subject.isLoaded = true;
                        $scope.annotations = Annotations.list();
                        return $scope.subject.data.tga;
                    })
                    .then(function (tga) {
                        return Metadata.get(tga);
                    })
                    .then(function (response) {
                        $scope.metadata.isLoaded = true;
                        $scope.metadata.data = response;
                    });
            };

            var submitThenGetNextSubject = function (transcriptionComplete) {
                $scope.subject.data.transcriptionComplete = transcriptionComplete;
                Annotations.submit($scope.subject.data).then(function (response) {
                    console.log('complete', response);
                });
                Annotations.reset();
                // Why you no, two-way binding?
                $scope.annotations = Annotations.list();
                getNextSubject($scope.subject.data.links.next);
            };

            $scope.next = function () {

                var modalInstance = $modal.open({
                    templateUrl: 'classify/templates/modal-next.html',
                    controller: 'ClassifyModalNextCtrl',
                    size: 'sm',
                    backdrop: 'static'
                });

                modalInstance.result.then(submitThenGetNextSubject);

            };

            // Go!
            getNextSubject();

        }

    ]);

}(window.angular, window._));
