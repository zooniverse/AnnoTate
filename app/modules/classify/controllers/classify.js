(function (angular, _) {

    'use strict';

    var module = angular.module('transcribe.classify');

    module.controller('ClassifyCtrl', [
        '$log',
        '$scope',
        '$modal',
        'AnnotationsFactory',
        'ClassificationsFactory',
        'SubjectsFactory',
        function ($log, $scope, $modal, Annotations, Classifications, Subjects) {

            $scope.subject = { isLoaded: false };
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

            var getSubject = function () {
                $scope.subject.isLoaded = false;
                Subjects.get()
                    .then(function (response) {
                        $scope.subject.data = response;
                        $scope.subject.isLoaded = true;
                        $scope.annotations = Annotations.list();
                    }, function (error) {
                        alert('That\'s all the data - thanks for your help!');
                    });
            };

            $scope.next = function () {

                var modalInstance = $modal.open({
                    templateUrl: 'classify/templates/modal-next.html',
                    controller: 'ClassifyModalNextCtrl',
                    size: 'sm',
                    backdrop: 'static'
                });

                modalInstance.result.then(function (isComplete) {
                    Classifications.submit(isComplete)
                        .then(function () {
                            Annotations.reset();
                            Subjects.advance();
                            getSubject();
                        });
                });

            };

            $scope.tutorial = function () {

                $modal.open({
                    templateUrl: 'classify/templates/modal-tutorial.html',
                    controller: 'ClassifyModalTutorialCtrl',
                    size: 'lg',
                    backdrop: 'static'
                });

            };


            // Go!
            getSubject();

        }

    ]);

}(window.angular, window._));
