'use strict';

var Draggabilly = require('draggabilly');

require('./overlay.module.js')
    .directive('transcribeDialog', transcribeDialog);

// TODO: Add escape hotkey to close

/**
 * @ngInject
 */
function transcribeDialog($rootScope, $timeout, Annotations, hotkeys) {
    var directive = {
        link: transcribeDialogLink,
        controller: transcribeDialogController,
        replace: true,
        scope: true,
        templateUrl: 'overlay/transcribe-dialog.html'
    };
    return directive;

    function transcribeDialogController($scope, $element) {
        $scope.active = false;
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
        vm.close = closeDialog;
        vm.open = openDialog;
        vm.saveAndClose = saveAndCloseDialog;
        vm.tag = tag;

        function closeDialog() {
            $scope.active = false;
            hotkeys.del('esc');
        }

        function getFocus() {
            textarea[0].focus();
        }

        function openDialog(event, data) {
            $scope.active = true;
            $scope.data = data;
            $scope.transcription = data.text;
            hotkeys.add({
                allowIn: ['TEXTAREA'],
                callback: closeDialog,
                combo: 'esc'
            });
            $timeout(getFocus);
        }

        function saveAndCloseDialog() {
            if ($scope.transcription !== $scope.data.text) {
                $scope.data.text = $scope.transcription;
                Annotations.upsert($scope.data);
            }
            closeDialog();
        }

        function tag(tagText) {
            var startTag = '[' + tagText + ']';
            var endTag = '[/' + tagText + ']';

            var start = textarea.prop('selectionStart');
            var end = textarea.prop('selectionEnd');
            var text = textarea.val();

            if (start === end) {
                var textBefore = text.substring(0, start);
                var textAfter = text.substring(start, text.length);
                textarea.val(textBefore + startTag + endTag + textAfter);
            } else {
                var textBefore = text.substring(0, start);
                var textInBetween = text.substring(start, end);
                var textAfter = text.substring(end, text.length);
                textarea.val(textBefore + startTag + textInBetween + endTag + textAfter);
            }
            getFocus();
        }

    }

    function transcribeDialogLink(scope, element, attrs, dialog) {
        scope.close = dialog.close;
        scope.saveAndClose = dialog.saveAndClose;
        scope.tag = dialog.tag;
        scope.$on('openTranscribeDialog', dialog.open);

        var draggie = new Draggabilly(element[0], {
            containment: '.overlay',
            handle: '.heading'
        });
    }

}
