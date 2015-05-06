'use strict';


require('./overlay.module.js')
    .directive('transcribeDialog', transcribeDialog);

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

    function transcribeDialogController() {

        var vm = this;
        this.close = close;

        function close() {
            console.log('close')
        }

    }

    function transcribeDialogLink(scope, element, attrs, dialog) {
        scope.close = dialog.close;
    }

}
