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
                        icon: 'picture',
                        tempRect: null,

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
                            event.stopImmediatePropagation();
                            this.tempRect = Annotations.add(_.extend(ClassifyCtrl.getPoint(event), {
                                type: 'tempImage',
                                width: 0,
                                height: 0
                            }));
                            viewport.on('mousemove', this.draw.bind(this));
                        },

                        draw: function (event) {
                            var newPoint = ClassifyCtrl.getPoint(event);
                            this.tempRect.width = newPoint.x - this.tempRect.x;
                            this.tempRect.height = newPoint.y - this.tempRect.y;
                            scope.$apply();
                        },

                        finishDraw: function (event) {
                            viewport.off('mousemove');
                        }

                    };

                }
            };
        }
    ]);

}(window.angular, window._));
