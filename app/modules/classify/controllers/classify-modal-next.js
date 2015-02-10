(function () {

    'use strict';

    var module = angular.module('transcribe.classify');

    module.controller('ClassifyModalNextCtrl', [
        '$scope',
        '$modalInstance',
        function ($scope, $modalInstance) {

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.ok = function () {
                $modalInstance.close('finished' === $scope.nextOption);
            }

        }

    ]);

}());
