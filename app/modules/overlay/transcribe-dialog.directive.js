'use strict';

var Draggabilly = require('draggabilly');

require('./overlay.module.js')
    .directive('transcribeDialog', transcribeDialog);

// TODO: Add escape hotkey to close

/**
 * @ngInject
 */
function transcribeDialog($rootScope) {
    var directive = {
        link: transcribeDialogLink,
        controller: transcribeDialogController,
        replace: true,
        scope: true,
        templateUrl: 'overlay/transcribe-dialog.html'
    };
    return directive;

    function transcribeDialogController($scope) {
        $scope.active = true;
        $scope.data = {};

        var vm = this;
        this.close = closeDialog;

        function closeDialog() {
            $scope.active = false;
        }
    }

    function transcribeDialogLink(scope, element, attrs, dialog) {
        scope.close = dialog.close;

        var draggie = new Draggabilly(element[0], {
            containment: '.overlay',
            handle: '.heading'
        });
    }

}
