'use strict';

var _ = require('lodash');
var angular = require('angular');
var Hammer = require('hammerjs');

require('./overlay.module.js')
    .directive('contextMenu', contextMenu);

// TODO: Add escape hotkey to close
// TODO: Add arrow key / spacebar support

// @ngInject
function contextMenu(hotkeys) {
    var directive = {
        controller: contextMenuController,
        controllerAs: 'vm',
        link: contextMenuLink,
        replace: true,
        scope: true,
        templateUrl: 'overlay/context-menu.html'
    };
    return directive;

    function contextMenuLink(scope, element, attrs, contextMenu) {

        // Setup
        var bodyEvent;
        var overlay;
        overlay = angular.element('.overlay').first();
        scope.position = {};

        // Events
        scope.$on('contextMenu:open', openContextMenu);

        // There's a bug in the current version of Hammer preventing event
        // binding to the window object, so we use body as a workaround.
        // https://github.com/hammerjs/hammer.js/issues/759
        bodyEvent = new Hammer(element.parents('body')[0]);

        // Methods

        function closeContextMenu() {
            contextMenu.close();
            hotkeys.del('esc');
            bodyEvent.off('tap', closeContextMenu);
        }

        function openContextMenu(event, data) {
            contextMenu.open(data);
            bodyEvent.on('tap', closeContextMenu);
            hotkeys.add({
                combo: 'esc',
                callback: closeContextMenu
            });
        }

    }
}

// @ngInject
function contextMenuController($rootScope, $scope, $timeout, MarkingSurfaceFactory) {

    // Setup
    var vm = this;
    vm.close = closeMenu;
    vm.open = openMenu;

    // Methods
    function closeMenu() {
        $rootScope.$broadcast('markingTools:enable');
        MarkingSurfaceFactory.enable();
        vm.active = false;
        // Might be called by the event or the hotkey, so need to optionally run a digest
        $timeout(function () {
            $scope.$digest();
        });
    }

    function openMenu(data) {
        $rootScope.$broadcast('markingTools:disable');
        MarkingSurfaceFactory.disable();
        _positionMenu(data);
        vm.active = true;
        vm.menuOptions = data.menuOptions;
        $scope.$digest();
    }

    function _positionMenu(data) {
        var click = data.event.srcEvent;
        vm.position = {
            left: click.offsetX,
            top: click.offsetY
        };

        // Firefox doesn't support offset, so we need to polyfill here.
        if (_.isUndefined(click.offsetX) || _.isUndefined(click.offsetY)) {
            vm.position = {
                left: click.pageX - overlay.offset().left,
                top: click.pageY - overlay.offset().top
            };
        }
    }
}
