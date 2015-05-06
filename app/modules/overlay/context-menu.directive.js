'use strict';

var _ = require('lodash');
var Hammer = require('hammerjs');

require('./overlay.module.js')
    .directive('contextMenu', contextMenu);

/**
 * @ngInject
 */
function contextMenu($rootScope, $window) {
    var directive = {
        controller: contextMenuController,
        link: contextMenuLink,
        replace: true,
        scope: true,
        templateUrl: 'overlay/context-menu.html'
    };
    return directive;

    function contextMenuController($scope) {
        var vm = this;

        vm.close = close;
        vm.open = open;

        function close() {
            $scope.active = false;
        }

        function open(data) {
            $scope.active = true;
            $scope.menuOptions = data.menuOptions;
        }
    }

    function contextMenuLink(scope, element, attrs, contextMenu) {
        // There's a bug in the current version of Hammer preventing event
        // binding to the window object, so we use body as a workaround.
        // https://github.com/hammerjs/hammer.js/issues/759
        var bodyEvent = new Hammer(element.parents('body')[0]);
        var overlay = angular.element('.overlay').first();

        scope.$on('openContextMenu', openContextMenu);
        scope.$on('closeContextMenu', closeContextMenu);
        scope.position = {};

        function openContextMenu(event, data) {
            contextMenu.open(data);

            var click = data.event.srcEvent;
            scope.position = {
                left: click.offsetX,
                top: click.offsetY
            };

            // Firefox doesn't support offset, so we need to polyfill here.
            if (_.isUndefined(click.offsetX) || _.isUndefined(click.offsetY)) {
                scope.position = {
                    left: click.pageX - overlay.offset().left,
                    top: click.pageY - overlay.offset().top
                };
            }

            scope.$apply();
            bodyEvent.on('tap', triggerClose);
        }

        function closeContextMenu() {
            contextMenu.close();
            scope.$apply();
            bodyEvent.off('tap', triggerClose);
        }

        function triggerClose() {
            $rootScope.$broadcast('closeContextMenu');
        }
    }
}
