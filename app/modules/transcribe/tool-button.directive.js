'use strict';

require('./transcribe.module.js')
    .directive('toolButton', toolButton);

/**
 * @ngInject
 */
function toolButton() {
    var directive = {
        scope: {
            name: '@toolButton'
        },
        restrict: 'A',
        replace: true,
        link: toolButtonLink
    };
    return directive;

    function toolButtonLink(scope, element, attrs, ctrl) {

        scope.$on('setTool', setActiveClass)

        function setActiveClass(event, tool) {
            if (tool && tool.name === scope.name) {
                element.addClass('-active');
            } else {
                element.removeClass('-active');
            }
        }

    }
}
