(function () {

    'use strict';

    var module = angular.module('transcribe');

    module.controller('ClassifyCtrl', [
        '$scope',
        'AnnotationsFactory',
        'SubjectsFactory',
        function ($scope, Annotations, Subjects) {

            $scope.subject = {
                isLoaded: false
            };

            console.log($scope)

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

            Subjects.get()
                .then(function (response) {
                    $scope.subject.data = response;
                    $scope.subject.isLoaded = true;
                    $scope.annotations = Annotations.list();
                });

            $scope.finished = function () {
                console.log('Finished transcribing')
                Subjects.resetActive();
                Annotations.reset();
                // Why you no, two-way binding?
                $scope.annotations = Annotations.list();
            };

        }

    ]);

}());
