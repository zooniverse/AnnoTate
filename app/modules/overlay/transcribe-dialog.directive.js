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

        function openDialog(data) {
            $scope.active = true;
            $scope.data = data.annotation;
            $scope.transcription = data.annotation.text;
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
            var textBefore = text.substring(0, start);

            if (start === end) {
                var textAfter = text.substring(start, text.length);
                textarea.val(textBefore + startTag + endTag + textAfter);
            } else {
                var textInBetween = text.substring(start, end);
                var textAfter = text.substring(end, text.length);
                textarea.val(textBefore + startTag + textInBetween + endTag
                    + textAfter);
            }
            getFocus();
        }

    }

    function transcribeDialogLink(scope, element, attrs, dialog) {
        scope.close = dialog.close;
        scope.saveAndClose = dialog.saveAndClose;
        scope.tag = dialog.tag;
        scope.$on('openTranscribeDialog', openDialog);

        var draggie = new Draggabilly(element[0], {
            containment: '.overlay',
            handle: '.heading'
        });

        function openDialog(event, data) {
            dialog.open(data);
            positionDialog(event, data)
        }

        function positionDialog(event, data) {
            // Make sure that the dialog is positioned in a sensible place each
            // time it's opened. We always use the left and top positions, as
            // that's what Dragabilly uses to determine position.
            var overlay = angular.element('.overlay').first();
            var group = data.element;
            var constant = 10;
            var position = {
                left: group.offset().left - group[0].getBoundingClientRect().width - (element.width() / 2)
            };

            var inTopHalf = (group.offset().top + (group[0].getBoundingClientRect()
                .height / 2)) < (overlay.height() / 2);

            if (inTopHalf) {
                position.top = group.offset().top + group[0].getBoundingClientRect()
                    .height - overlay.offset().top + constant;
            } else {
                // So element.height is a valid value at this point, but .width
                // isn't. We could wrap it in a $timeout, but as this makes the
                // dialog jump around a bit, we'll hardcode it for now.
                // TODO: replace with element.height() somehow...
                var elementHeight = 197;
                position.top = group.offset().top - elementHeight - overlay.offset().top - constant;
            }

            // Sanity check
            if (position.left < 0) {
                position.left = constant;
            } else if ((position.left + element.width()) > overlay.width()) {
                position.left = overlay.width() - element.width() - constant;
            }

            element.css(position);
        }
    }
}
