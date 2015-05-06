'use strict';

var Draggabilly = require('draggabilly');

require('./overlay.module.js')
    .directive('transcribeDialog', transcribeDialog);

// TODO: Add escape hotkey to close

/**
 * @ngInject
 */
function transcribeDialog($rootScope, $timeout, Annotations) {
    var directive = {
        link: transcribeDialogLink,
        controller: transcribeDialogController,
        replace: true,
        scope: true,
        templateUrl: 'overlay/transcribe-dialog.html'
    };
    return directive;

    function transcribeDialogController($scope, $element) {
        $scope.active = true;
        $scope.data = {};
        $scope.transcription = '';
        $scope.buttons = [
            { name: 'Insertion', tag: 'insertion' },
            { name: 'Deletion', tag: 'deletion' },
            { name: 'Illegible', tag: 'illegible' },
            { name: 'Foreign Language', tag: 'foreign' }
        ];

        var textarea = $element.find('textarea').first();

        var vm = this;
        this.close = closeDialog;
        this.open = openDialog;
        this.saveAndClose = saveAndCloseDialog;

        function closeDialog() {
            $scope.active = false;
        }

        function openDialog(data) {
            $scope.active = true;
            $scope.data = data;
            $scope.transcription = data.text;
        }

        function saveAndCloseDialog() {
            if ($scope.transcription !== $scope.data.text) {
                $scope.data.text = $scope.transcription;
                Annotations.upsert($scope.data);
            }
            closeDialog();
        }
    }

    function transcribeDialogLink(scope, element, attrs, dialog) {
        scope.close = dialog.close;
        scope.saveAndClose = dialog.saveAndClose;
        scope.$on('openTranscribeDialog', openTranscribeDialog);

        var draggie = new Draggabilly(element[0], {
            containment: '.overlay',
            handle: '.heading'
        });

        function openTranscribeDialog(event, data) {
            dialog.open(data);
        }

    }

}
