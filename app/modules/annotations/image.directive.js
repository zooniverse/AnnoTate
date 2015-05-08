'use strict';

require('./annotations.module.js')
    .directive('imageAnnotation', imageAnnotation);

/**
 * @ngInject
 */
function imageAnnotation($rootScope) {
    var directive = {
        scope: {
            data: '='
        },
        restrict: 'A',
        replace: true,
        templateUrl: 'annotations/image.html',
    };
    return directive;
}
