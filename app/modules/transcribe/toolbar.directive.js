'use strict';

require('./transcribe.module.js')
    .directive('transcribeToolbar', transcribeToolbar);

// TODO: check if I can replace link with a controller inheriting parent scope

// @ngInject
function transcribeToolbar(MarkingSurfaceFactory, ToolsFactory) {
    var directive = {
        link: transcribeToolbarLink,
        restrict: 'A',
        replace: true,
        scope: true,
        templateUrl: 'transcribe/toolbar.html'
    };
    return directive;

    function transcribeToolbarLink(scope) {
        var vm = scope.vm;
        vm.rotate = MarkingSurfaceFactory.rotate;
        vm.centre = MarkingSurfaceFactory.resizeAndCentre;
        vm.tools = ToolsFactory;
    }
}
