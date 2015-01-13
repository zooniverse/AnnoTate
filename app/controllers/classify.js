(function () {

    'use strict';

    var app = angular.module('app');

    app.controller('ClassifyCtrl', [
        '$scope',
        'AnnotationsFactory',
        'SubjectsFactory',
        function ($scope, Annotations, Subjects) {

            $scope.activeTool = null;

            $scope.editingTextAnnotation = {x: 133, y: 278, type: "text", $$hashKey: "object:17", text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt' };

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
                });

            $scope.annotations = Annotations.list();

        }

    ]);

}());
