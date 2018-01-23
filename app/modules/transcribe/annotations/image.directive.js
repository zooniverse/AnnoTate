'use strict';

var _ = require('lodash');
var Hammer = require('hammerjs');

require('./annotations.module.js')
    .directive('imageAnnotation', imageAnnotation);

// @ngInject
function imageAnnotation($rootScope, AnnotationsFactory) {
    var directive = {
        link: imageAnnotationLink,
        restrict: 'A',
        scope: {
            data: '='
        },
        templateUrl: 'annotations/image.html',
    };
    return directive;

    // @ngInject
    function imageAnnotationLink(scope, element) {

        // Setup
        var hammerElement;
        hammerElement = new Hammer(element[0]);

        // Events
        hammerElement.on('tap', openContextMenu);
        scope.$on('$destroy', $destroy);

        // Methods
        function $destroy() {
            hammerElement.destroy();
        }

        function openContextMenu(event) {
            $rootScope.$broadcast('contextMenu:open', {
                event: event,
                menuOptions: [{ name: 'Delete', action: _.partial(AnnotationsFactory.destroy, scope.data) }]
            });
        }
    }

}
