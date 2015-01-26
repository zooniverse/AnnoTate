(function () {

    'use strict';

    var app = angular.module('app');

    app.controller('ClassifyCtrl', [
        '$scope',
        'AnnotationsFactory',
        'PanoptesFactory',
        'SubjectsFactory',
        function ($scope, Annotations, Panoptes, Subjects) {

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
                    $scope.subject = response;
                    $scope.panZoom.setMinZoom($scope.panZoom.getSizes().realZoom);
                });

            $scope.annotations = Annotations.list();

            console.log('Panoptes', Panoptes)

        }

    ]);

}());
