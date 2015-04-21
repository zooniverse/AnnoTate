(function (angular, _) {

    'use strict';

    var module = angular.module('transcribe.classify');

    module.directive('textTool', [
        '$log',
        'hotkeys',
        'AnnotationsFactory',
        function ($log, hotkeys, Annotations) {
            return {
                restrict: 'E',
                replace: true,
                scope: {},
                templateUrl: 'classify/templates/directives/tool-button.html',
                link: function (scope, element, attrs) {

                    var ClassifyCtrl = scope.$parent;
                    var viewport = angular.element(ClassifyCtrl.svg.viewport);

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
                        label: 'Annotate Text',
                        icon: 'font',
                        tempPoint: null,

                        activate: function () {
                            viewport.on('click', this.click.bind(this));
                            $log.info(this.name, 'activated');
                        },

                        deactivate: function () {
                            viewport.off('click');
                            $log.info(this.name, 'deactivated');
                            if (this.tempPoint) {
                                this.removeTempPoint();
                            }
                        },

                        click: function (event) {
                            if (ClassifyCtrl.editingTextAnnotation) {
                                return false;
                            }

                            if (!this.tempPoint) {
                               this.addTempPoint(event);
                            } else {
                                this.addAnnotation(event);
                                this.removeTempPoint();
                            }
                        },

                        addAnnotation: function (event) {
                            var endPoint = ClassifyCtrl.svg.$getPoint(event);
                            var annotation = Annotations.add({
                                type: 'text',
                                x1: this.tempPoint.x,
                                y1: this.tempPoint.y,
                                x2: endPoint.x,
                                y2: endPoint.y
                            });
                            ClassifyCtrl.editingTextAnnotation = annotation;
                        },

                        addTempPoint: function (event)  {
                            var SVGPoints = ClassifyCtrl.svg.$getPoint(event);
                            var points = {
                                x: SVGPoints.x,
                                y: SVGPoints.y
                            };
                            this.tempPoint = Annotations.add(_.extend({}, points, {
                                type: 'tempText',
                                temp: true
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
