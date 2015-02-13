(function (angular) {

    'use strict';

    var module = angular.module('transcribe');

    module.directive('footer', [
        function () {
            return {
                restrict: 'A',
                templateUrl: 'core/templates/directives/footer.html'
            }
        }
    ]);

}(window.angular));
