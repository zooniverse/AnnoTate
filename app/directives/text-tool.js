(function (angular, _) {

    'use strict';

    var module = angular.module('app');

    module.directive('textTool', [
        'AnnotationsFactory',
        function (Annotations) {
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

                    scope.tool = {

                        name: 'Text',
                        icon: 'font',

                        activate: function () {
                            console.log(this.name, 'active');
                            viewport.on('click', this.click.bind(this));
                        },

                        deactivate: function () {
                            console.log(this.name, 'inactive');
                            viewport.off('click');
                        },

                        click: function (event) {
                            this.addTempPoint(event);
                        },

                        addTempPoint: function (event)  {
                            Annotations.add(_.extend(ClassifyCtrl.getPoint(event), {
                                type: 'tempText'
                            }));
                        }

                    };


                }
            };
        }
    ]);

}(window.angular, window._));
