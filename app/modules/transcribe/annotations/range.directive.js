'use strict';

var _ = require('lodash');
var Hammer = require('hammerjs');

require('./annotations.module.js')
    .directive('rangeAnnotation', rangeAnnotation);

// @ngInject
function rangeAnnotation($rootScope, AnnotationsFactory) {
    var directive = {
        link: rangeAnnotationLink,
        replace: true,
        restrict: 'A',
        scope: {
            data: '='
        },
        templateUrl: 'annotations/range-bar.html',
    };
    return directive;

    // @ngInject
    function rangeAnnotationLink(scope, element) {

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
                menuOptions: [{
                    name: 'Delete',
                    action: _.partial(AnnotationsFactory.destroy, scope.data)
                }]
            });
        }
    }

}
