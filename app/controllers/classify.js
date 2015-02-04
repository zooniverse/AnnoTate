(function () {

    'use strict';

    var app = angular.module('app');

    app.controller('ClassifyCtrl', [
        '$scope',
        'AnnotationsFactory',
        'SubjectsFactory',
        function ($scope, Annotations, Subjects) {

            $scope.activeTool = null;
            $scope.subjectLoaded = false;

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
                    $scope.subject = response;
                    console.log(response)
                    $scope.subjectLoaded = true;
                    $scope.annotations = Annotations.list();
                });

            $scope.subjectLoaded = true;

        }

    ]);

}());
