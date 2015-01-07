(function () {

    'use strict';

    var app = angular.module('app');

    app.controller('ClassifyCtrl', [
        '$scope',
        'AnnotationsFactory',
        'SubjectsFactory',
        function ($scope, Annotations, Subjects) {

            $scope.activeTool = null;

            $scope.setTool = function (tool) {
                if ($scope.activeTool && $scope.activeTool.name === tool.name) {
                    $scope.activeTool.deactivate();
                    $scope.activeTool = null;
                    $scope.panZoom.on();
                } else {
                    $scope.activeTool = tool;
                    $scope.activeTool.activate();
                    $scope.panZoom.off();
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
