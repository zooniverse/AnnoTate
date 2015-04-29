'use strict';

require('./transcribe.module.js')
    .directive('transcribeToolbar', transcribeToolbar);

/**
 * @ngInject
 */
function transcribeToolbar() {
    var directive = {
        scope: {},
        restrict: 'A',
        replace: true,
        templateUrl: 'transcribe/toolbar.html',
        link: transcribeToolbarLink
    };
    return directive;

    function transcribeToolbarLink(scope) {

        var transcribeCtrl = scope.$parent;

        scope.rotate = rotate;
        scope.centre = centre;
        scope.activate = activate;
        scope.next = next;

        function rotate(value) {
            transcribeCtrl.$emit('rotate', value);
        }

        function centre() {
            transcribeCtrl.$emit('centre');
        }

        function activate() {
            transcribeCtrl.$emit('activate');
        }

        function next() {
            transcribeCtrl.$emit('next');
        }

    }
}
