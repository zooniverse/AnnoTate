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
        templateUrl: 'annotations/temp-text.html',
        link: linkFunction
    };
    return directive;

    function linkFunction(scope) {
        scope.r = annotationsConfig.pointRadius;
    }
}
