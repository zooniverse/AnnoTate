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
                            this.addTempPoint(event);
                        },

                        getPoint: function (event) {
                            var rect = event.target.getBoundingClientRect();
                            var zoom = parseFloat(ClassifyCtrl.panZoom.getSizes().realZoom);
                            return {
                               x: Math.round((event.clientX - rect.left) / zoom),
                               y: Math.round((event.clientY - rect.top) / zoom),
                            };
                        },

                        addTempPoint: function (event)  {
                            Annotations.add(_.extend(this.getPoint(event), {
                                type: 'tempText'
                            }));
                        }

                    };


                }
            };
        }
    ]);

}(window.angular, window._));
