'use strict';

require('./annotations.module.js')
    .directive('imageAnnotation', imageAnnotation);

/**
 * @ngInject
 */
function imageAnnotation() {
    var directive = {
        scope: {
            data: '='
        },
        restrict: 'A',
        replace: true,
        templateUrl: 'annotations/image.html',
        link: linkFunction
    };
    return directive;

    function linkFunction(scope, element, attrs) {

    }
}
