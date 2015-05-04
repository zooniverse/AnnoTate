'use strict';

require('./annotations.module.js')
    .directive('textAnnotation', textAnnotation);

/**
 * @ngInject
 */
function textAnnotation($rootScope, Annotations) {
    var directive = {
        controller: textAnnotationController,
        replace: true,
        restrict: 'A',
        scope: {
            data: '='
        },
        templateUrl: 'annotations/text.html'
    };
    return directive;

    function textAnnotationController($scope) {

        var vm = this;
        vm.update = update;
        vm.destroy = destroy;

        function update() {
            Annotations.upsert($scope.data);
        }

        function destroy() {
            Annotations.destroy($scope.data);
        }

    }

}
