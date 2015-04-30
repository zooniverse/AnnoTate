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
        link: transcribeToolbarLink,
        controller: transcribeToolbarController
    };
    return directive;

    function transcribeToolbarController() {

        var vm = this;

        vm.activeTool = null;

        vm.tools = {
            text: { name: 'text' },
            image: { name: 'image' }
        };

    }

    function transcribeToolbarLink(scope, element, attrs, ctrl) {

        var transcribeCtrl = scope.$parent;

        scope.rotate = rotate;
        scope.centre = centre;
        scope.toggle = toggle;
        scope.next = next;

        function rotate(value) {
            transcribeCtrl.$broadcast('rotate', value);
        }

        function centre() {
            transcribeCtrl.$broadcast('centre');
        }

        function toggle(toolName) {
            var newTool;

            if (ctrl.activeTool && ctrl.activeTool.name === toolName) {
                newTool = null;
            } else {
                newTool = ctrl.tools[toolName];
            }

            ctrl.activeTool = newTool;
            transcribeCtrl.$broadcast('setTool', newTool);
        }

        function next() {
            transcribeCtrl.$broadcast('next');
        }

    }
}
