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
function contextMenuController($element, $rootScope, $scope, $timeout, MarkingSurfaceFactory) {

    // Setup
    var reactivateMarkingSurface;
    var vm = this;
    vm.close = closeMenu;
    vm.open = openMenu;


    // Methods
    function closeMenu() {
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
        $timeout(function () {
            vm.menuOptions = data.menuOptions;
            vm.active = true;
        });
        $timeout(function () {
            _positionMenu(data);
        }, 10);
    }

    // via http://stackoverflow.com/a/28857255/3122450
    function _getElementOffset(element) {
        var de = document.documentElement;
        var box = element.getBoundingClientRect();
        var top = box.top + window.pageYOffset - de.clientTop;
        var left = box.left + window.pageXOffset - de.clientLeft;
        return { top: top, left: left };
    }

    function _positionMenu(data) {
        var click = data.event.srcEvent;
        var overlay = document.getElementsByClassName('overlay-layer')[0];
        var overlaySize = overlay.getBoundingClientRect();
        var menuSize = $element[0].getBoundingClientRect();
        var newPosition = {
            left: click.clientX,
            top: click.clientY - _getElementOffset(overlay).top,
        };

        if (newPosition.left + menuSize.width > overlaySize.width) {
            newPosition.left = click.clientX - menuSize.width;
        }

        if (newPosition.top + menuSize.height > overlaySize.height) {
            newPosition.top = newPosition.top - menuSize.height;
        }

        console.log('click', click)
        vm.position = newPosition;

        // Firefox doesn't support offset, so we need to polyfill here.
        // if (_.isUndefined(click.offsetX) || _.isUndefined(click.offsetY)) {
        //     vm.position = {
        //         left: click.pageX - overlay.offset().left,
        //         top: click.pageY - overlay.offset().top
        //     };
        // }
    }
}
