'use strict';

require('./transcribe.module.js')
    .directive('transcribeToolbar', transcribeToolbar);

// @ngInject
function transcribeToolbar($rootScope, toolSet) {
    var directive = {
        scope: {},
        restrict: 'A',
        replace: true,
        templateUrl: 'transcribe/toolbar.html',
        link: transcribeToolbarLink
    };
    return directive;

    function transcribeToolbarLink(scope) {
        scope.rotate = rotate;
        scope.centre = centre;
        scope.next = next;
        scope.tools = toolSet;

        function rotate(theta) {
            $rootScope.$broadcast('rotate', theta);
        }

        function centre() {
            $rootScope.$broadcast('centre');
        }

        function next() {
            $rootScope.$broadcast('next');
        }
    }
}
