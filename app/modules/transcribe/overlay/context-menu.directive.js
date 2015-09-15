'use strict';

var _ = require('lodash');
var angular = require('angular');
var Hammer = require('hammerjs');

require('./overlay.module.js')
    .directive('contextMenu', contextMenu);

// TODO: Add arrow key / spacebar support

// @ngInject
function contextMenu(hotkeys, $timeout) {
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
        scope.overlay = angular.element('.overlay').first();
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
            hotkeys.add({
                combo: 'esc',
                callback: closeContextMenu
            });
            $timeout(function () {
                bodyEvent.on('tap', closeContextMenu);
            });
        }

    }
}

// @ngInject
function contextMenuController($rootScope, $scope, $timeout, MarkingSurfaceFactory) {

    // Setup
    var reactivateMarkingSurface;
    var vm = this;
    vm.close = closeMenu;
    vm.open = openMenu;


    // Methods
    function closeMenu() {
        console.info('closing menu!')
        $rootScope.$broadcast('markingTools:enable');
        if (reactivateMarkingSurface === true) {
            MarkingSurfaceFactory.enable();
        }
        vm.active = false;
        // Might be called by the event or the hotkey, so need to optionally run a digest
        $timeout(function () {
            $scope.$digest();
        });
    }

    function openMenu(data) {
        $rootScope.$broadcast('markingTools:disable');
        reactivateMarkingSurface = (MarkingSurfaceFactory.isEnabled()) ? true : false;
        if (MarkingSurfaceFactory.isEnabled()) {
            MarkingSurfaceFactory.disable();
        }
        _positionMenu(data);
        vm.menuOptions = data.menuOptions;
        $timeout(function () {
            vm.active = true;
        });
    }

    function _positionMenu(data) {
        var click = data.event.center;
        $timeout(function () {
            vm.position = {
                left: click.x - $scope.overlay.offset().left,
                top: click.y - $scope.overlay.offset().top
            };
        });
    }
}
