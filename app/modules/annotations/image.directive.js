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
        link: linkFunction,
        require: '^markingSurface'
    };
    return directive;

    function linkFunction(scope, element, attrs, markingSurface) {

        scope.editing = false;

        function enableEdit(event) {
            scope.editing = true;
            $rootScope.$apply();
        }

        function disableEdit(event) {
            scope.editing = false;
            $rootScope.$apply();
        }

    }
}
