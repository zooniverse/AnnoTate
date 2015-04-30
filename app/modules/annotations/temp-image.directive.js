'use strict';

require('./annotations.module.js')
    .directive('tempImageAnnotation', tempImageAnnotation);

/**
 * @ngInject
 */
function tempImageAnnotation() {
    var directive = {
        scope: {
            data: '='
        },
        restrict: 'A',
        replace: true,
        templateUrl: 'annotations/temp-image.html'
    };
    return directive;
}
