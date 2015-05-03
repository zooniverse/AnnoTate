'use strict';

require('./annotations.module.js')
    .directive('editTextAnnotation', editTextAnnotation);

/**
 * @ngInject
 */
function editTextAnnotation($rootScope) {
    var directive = {
        scope: true,
        restrict: 'A',
        replace: true,
        // templateUrl: 'annotations/image.html',
        link: linkFunction,
        require: '^markingSurface'
    };
    return directive;

    function linkFunction(scope, element, attrs, markingSurface) {
    }
}
