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

        var surface = angular.element('.transcription-interface');

        scope.$on('openContextMenu', openContextMenu);
        scope.doAction = doAction;

        function doAction(action) {
            action();
            scope.active = false;
        }

        function openContextMenu(event, data) {
            scope.active = true;
            scope.menuOptions = data.menuOptions;
            scope.$apply();
        }

        function closeContextMenu(event) {
            scope.active = false;
            scope.$apply();
        }


    }
}
