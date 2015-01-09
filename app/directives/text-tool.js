(function (angular, _) {

    'use strict';

    var module = angular.module('app');

    module.directive('textTool', [
        '$log',
        'hotkeys',
        'AnnotationsFactory',
        function ($log, hotkeys, Annotations) {
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
                        tempPoint: null,

                        activate: function () {
                            viewport.on('click', this.click.bind(this));
                            $log.info(this.name, 'activated');
                        },

                        deactivate: function () {
                            viewport.off('click');
                            $log.info(this.name, 'deactivated');
                        },

                        click: function (event) {
                            if (!this.tempPoint) {
                               this.addTempPoint(event);
                            } else {
                                this.addAnnotation(event);
                                this.removeTempPoint();
                            }
                        },

                        addAnnotation: function (event) {
                            var endPoint = ClassifyCtrl.getPoint(event);
                            var annotation = Annotations.add({
                                type: 'text',
                                x1: this.tempPoint.x,
                                y1: this.tempPoint.y,
                                x2: endPoint.x,
                                y2: endPoint.y
                            });
                        },

                        addTempPoint: function (event)  {
                            this.tempPoint = Annotations.add(_.extend(ClassifyCtrl.getPoint(event), {
                                type: 'tempText'
                            }));
                            $log.log('Added tempPoint', this.tempPoint);
                        },

                        removeTempPoint: function ()  {
                            Annotations.destroy(this.tempPoint);
                            this.tempPoint = null;
                            $log.log('Removed tempPoint');
                        }
                    };

                }
            };
        }
    ]);

}(window.angular, window._));
