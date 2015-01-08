(function (angular, _) {

    'use strict';

    var module = angular.module('app');

    module.directive('imageTool', [
        'hotkeys',
        function (hotkeys) {
            return {
                restrict: 'E',
                replace: true,
                scope: {},
                templateUrl: 'directives/tool-button.html',
                link: function (scope, element, attrs) {

                    var ClassifyCtrl = scope.$parent;
                    var viewport = angular.element(ClassifyCtrl.viewport);

                    scope.toggle = function () {
                        ClassifyCtrl.setTool(scope.tool);
                    };

                    hotkeys.bindTo(ClassifyCtrl)
                        .add({
                            combo: 'i',
                            description: 'Activate the image tool',
                            callback: scope.toggle
                        });

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
