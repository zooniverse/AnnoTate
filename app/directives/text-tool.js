(function (angular, _) {

    'use strict';

    var module = angular.module('app');

    module.directive('textTool', [
        function () {
            return {
                restrict: 'E',
                replace: true,
                scope: {},
                templateUrl: 'directives/tool-button.html',
                link: function (scope, element, attrs) {

                    var ClassifyCtrl = scope.$parent;
                    var svg = angular.element(ClassifyCtrl.svg);

                    scope.toggle = function () {
                        ClassifyCtrl.setTool(scope.tool);
                    };

                    scope.tool = {

                        name: 'Text',
                        icon: 'font',

                        activate: function () {
                            console.log(this.name, 'active');
                            svg.on('click', this.click.bind(this));
                        },

                        deactivate: function () {
                            console.log(this.name, 'inactive');
                            svg.off('click');
                        },

                        click: function (event) {
                            console.log('click', event);
                        }

                    };


                }
            };
        }
    ]);

}(window.angular, window._));
