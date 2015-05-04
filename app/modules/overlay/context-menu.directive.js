'use strict';

require('./overlay.module.js')
    .directive('contextMenu', contextMenu);

/**
 * @ngInject
 */
function contextMenu() {
    var directive = {
        link: contextMenuLink,
        replace: true,
        templateUrl: 'overlay/context-menu.html'
    };
    return directive;

    function contextMenuLink(scope) {

        scope.$on('openContextMenu', openContextMenu);
        scope.doAction = doAction;

        function doAction(action) {
            action();
            closeContextMenu();
        }

        function openContextMenu(event, data) {
            scope.active = true;
            scope.menuOptions = data.menuOptions;
            scope.$apply();
        }

        function closeContextMenu() {
            scope.active = false;
            scope.menuOptions = null;
        }

    }
}
