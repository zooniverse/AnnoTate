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
                } else {
                    $scope.activeTool = tool;
                    $scope.activeTool.activate();
                }
            };

            $scope.subject = SubjectsFactory.get();


        }

    ]);

}());
