(function () {

    'use strict';

    var app = angular.module('app');

    app.controller('ClassifyCtrl', [
        '$scope',
        'SubjectsFactory',
        function ($scope, SubjectsFactory) {



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

            SubjectsFactory.get()
                .then(function (response) {
                    $scope.subject = response;
                });

        }

    ]);

}());
