'use strict';

var Hammer = require('hammerjs');

require('./annotations.module.js')
    .directive('imageAnnotation', imageAnnotation);

// @ngInject
function imageAnnotation($rootScope, Annotations) {
    var directive = {
        controller: ['$scope', imageAnnotationController],
        link: imageAnnotationLink,
        replace: true,
        restrict: 'A',
        scope: {
            data: '='
        },
        templateUrl: 'annotations/image.html',
    };
    return directive;

    function imageAnnotationController($scope) {

        // Setup
        var vm = this;
        vm.destroy = destroy;

        // Methods
        function destroy() {
            Annotations.destroy($scope.data);
        }
    }

    // @ngInject
    function imageAnnotationLink(scope, element, attrs, ctrl) {

        // Setup
        var hammerElement;

        // Events
        hammerElement = new Hammer(element[0]);
        hammerElement.on('tap', openContextMenu);
        scope.$on('$destroy', $destroy);

        // Methods
        function $destroy() {
            hammerElement.destroy();
        }

        function openContextMenu(event) {
            $rootScope.$broadcast('contextMenu:open', {
                event: event,
                menuOptions: [{ name: 'Delete', action: ctrl.destroy }]
            });
        }
    }

}
