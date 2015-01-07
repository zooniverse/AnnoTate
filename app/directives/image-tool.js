(function (angular, _) {

    'use strict';

    var module = angular.module('app');

    module.directive('imageTool', [
        function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {},
                templateUrl: 'directives/tool-button.html',
                link: function (scope, element, attrs) {

                    var ClassifyCtrl = scope.$parent;

                    scope.toggle = function () {
                        ClassifyCtrl.setTool(scope.tool);
                    };

                    scope.tool = {

                        name: 'Image',
                        icon: 'picture',

                        activate: function () {
                            console.log(this.name, 'active');
                        },

                        deactivate: function () {
                            console.log(this.name, 'inactive');
                        }

                    };

                }
            };
        }
    ]);

}(window.angular, window._));
