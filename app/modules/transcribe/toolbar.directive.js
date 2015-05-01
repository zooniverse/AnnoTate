'use strict';

require('./transcribe.module.js')
    .directive('transcribeToolbar', transcribeToolbar);

/**
 * @ngInject
 */
function transcribeToolbar(toolSet) {
    var directive = {
        scope: {},
        restrict: 'A',
        replace: true,
        templateUrl: 'transcribe/toolbar.html',
        link: transcribeToolbarLink
    };
    return directive;

    function transcribeToolbarLink(scope, element, attrs) {

        var transcribeCtrl = scope.$parent;

        scope.rotate = rotate;
        scope.centre = centre;
        scope.next = next;
        scope.tools = toolSet;

        function rotate(value) {
            transcribeCtrl.$broadcast('rotate', value);
        }

        function centre() {
            transcribeCtrl.$broadcast('centre');
        }

        function next() {
            transcribeCtrl.$broadcast('next');
        }

    }
}
