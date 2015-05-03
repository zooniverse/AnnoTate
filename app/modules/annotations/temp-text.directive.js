'use strict';

require('./annotations.module.js')
    .directive('tempTextAnnotation', tempTextAnnotation);

/**
 * @ngInject
 */
function tempTextAnnotation(annotationsConfig) {
    var directive = {
        scope: {
            data: '='
        },
        restrict: 'A',
        replace: true,
        templateUrl: 'annotations/temp-text.html'
    };
    return directive;

}
