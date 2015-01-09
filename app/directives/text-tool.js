(function (angular, _) {

    'use strict';

    var module = angular.module('app');

    module.directive('textTool', [
        'hotkeys',
        'AnnotationsFactory',
        function (hotkeys, Annotations) {
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
                            combo: 't',
                            description: 'Activate the text tool',
                            callback: scope.toggle
                        });

                    scope.tool = {

                        name: 'Text',
                        icon: 'font',
                        tempPoint: false,

                        activate: function () {
                            console.log(this.name, 'active');
                            viewport.on('click', this.click.bind(this));
                        },

                        deactivate: function () {
                            console.log(this.name, 'inactive');
                            viewport.off('click');
                        },

                        click: function (event) {
                            (!this.tempPoint) ? this.addTempPoint(event) : this.removeTempPoint();
                        },

                        addTempPoint: function (event)  {
                            this.tempPoint = Annotations.add(_.extend(ClassifyCtrl.getPoint(event), {
                                type: 'tempText'
                            }));
                        },

                        removeTempPoint: function ()  {
                            Annotations.destroy(this.tempPoint);
                            this.tempPoint = null;
                        }
                    };

                }
            };
        }
    ]);

}(window.angular, window._));
