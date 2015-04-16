(function () {

    'use strict';

    var module = angular.module('transcribe.classify');

    module.controller('ClassifyModalTutorialCtrl', [
        '$scope',
        '$modalInstance',
        function ($scope, $modalInstance) {

            $scope.ok = function () {
                $modalInstance.close();
            }

        }

    ]);

}());
