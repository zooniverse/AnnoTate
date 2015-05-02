'use strict';

require('./annotations.module.js')
    .directive('textAnnotation', textAnnotation);

/**
 * @ngInject
 */
function textAnnotation(annotationsConfig) {
    var directive = {
        scope: {
            data: '='
        },
        restrict: 'A',
        replace: true,
        templateUrl: 'annotations/text.html',
        link: linkFunction
    };
    return directive;

    function linkFunction(scope) {
        scope.r = annotationsConfig.pointRadius;
    }

}
