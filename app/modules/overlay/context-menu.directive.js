'use strict';

var _ = require('lodash');
var angular = require('angular');
var Hammer = require('hammerjs');

require('./overlay.module.js')
    .directive('contextMenu', contextMenu);

// TODO: Add escape hotkey to close
// TODO: Add arrow key / spacebar support
// TODO: Find out what ngInject isn't working properly for contextMenuController

// @ngInject
function contextMenu($rootScope, $window, hotkeys) {
    var directive = {
        controller: ['$scope', contextMenuController],
        link: contextMenuLink,
        replace: true,
        scope: true,
        templateUrl: 'overlay/context-menu.html'
    };
    return directive;

    // @ngInject
    function contextMenuController($scope) {
        var vm = this;

        vm.close = closeMenu;
        vm.open = openMenu;

        function closeMenu() {
            $scope.active = false;
            hotkeys.del('esc');
        }

        function openMenu(data) {
            $scope.active = true;
            $scope.menuOptions = data.menuOptions;
            hotkeys.add({
                combo: 'esc',
                callback: closeMenu
            });
        }
    }

    // @ngInject
    function contextMenuLink(scope, element, attrs, contextMenu) {
        // There's a bug in the current version of Hammer preventing event
        // binding to the window object, so we use body as a workaround.
        // https://github.com/hammerjs/hammer.js/issues/759
        var bodyEvent = new Hammer(element.parents('body')[0]);
        var overlay = angular.element('.overlay').first();

        scope.$on('contextMenu:open', openContextMenu);
        scope.position = {};

        function openContextMenu(event, data) {
            $rootScope.$broadcast('panZoom:disable');
            $rootScope.$broadcast('markingTools:disable');
            contextMenu.open(data);
            positionContextMenu(data);
            bodyEvent.on('tap', closeContextMenu);
        }

        function positionContextMenu(data) {
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
        }

        function closeContextMenu() {
            $rootScope.$broadcast('panZoom:enable');
            $rootScope.$broadcast('markingTools:enable');
            contextMenu.close();
            scope.$apply();
            bodyEvent.off('tap', this);
        }
    }
}
