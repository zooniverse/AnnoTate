(function (angular, _) {

    'use strict';

    var module = angular.module('app');

    module.directive('imageTool', [
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
                            combo: 'i',
                            description: 'Activate the image tool',
                            callback: scope.toggle
                        });

                    scope.tool = {

                        name: 'Image',
                        label: 'Annotate Image',
                        icon: 'picture',
                        tempRect: null,
                        tempOrigin: null,
                        drawing: false,

                        activate: function () {
                            viewport.on('mousedown', this.startDraw.bind(this));
                            viewport.on('mouseup', this.finishDraw.bind(this));
                            $log.info(this.name, 'activated');
                        },

                        deactivate: function () {
                            viewport.off('mousedown');
                            viewport.off('mouseup');
                            $log.info(this.name, 'deactivated');
                        },

                        startDraw: function (event) {
                            if (ClassifyCtrl.editingTextAnnotation) {
                                return false;
                            }

                            event.stopImmediatePropagation();
                            this.drawing = true;
                            this.tempOrigin = ClassifyCtrl.getPoint(event);
                            this.tempRect = Annotations.add(_.extend(this.tempOrigin, {
                                type: 'tempImage',
                                width: 0,
                                height: 0
                            }));
                            viewport.on('mousemove', this.draw.bind(this));
                        },

                        draw: function (event) {
                            var newPoint = ClassifyCtrl.getPoint(event);
                            this.tempRect.x = (this.tempOrigin.x < newPoint.x) ? this.tempOrigin.x : newPoint.x;
                            this.tempRect.y = (this.tempOrigin.y < newPoint.y) ? this.tempOrigin.y : newPoint.y;
                            this.tempRect.width = (this.tempOrigin.x < newPoint.x) ? newPoint.x - this.tempRect.x : this.tempOrigin.x - newPoint.x;
                            this.tempRect.height = (this.tempOrigin.y < newPoint.y) ? newPoint.y - this.tempRect.y : this.tempOrigin.y - newPoint.y;
                            scope.$apply();
                        },

                        finishDraw: function (event) {
                            if (ClassifyCtrl.editingTextAnnotation) {
                                return false;
                            }

                            if (!this.drawing) {
                                return false;
                            }
                            Annotations.add(_.extend(angular.copy(this.tempRect), {
                                type: 'image'
                            }));
                            Annotations.destroy(this.tempRect);
                            this.drawing = false;
                            this.tempRect = null;
                            this.tempOrigin = null;
                            viewport.off('mousemove');
                        }

                    };

                }
            };
        }
    ]);

}(window.angular, window._));
