'use strict';

require('./annotations.module.js')
    .directive('textAnnotation', textAnnotation);

/**
 * @ngInject
 */
function textAnnotation($rootScope, Annotations) {
    var directive = {
        controller: textAnnotationController,
        link: textAnnotationLink,
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

        function update(data) {
            Annotations.upsert($scope.data);
        }

    }

    function textAnnotationLink(scope, element, attrs, ctrl) {
        console.log(scope.data)
    }

}
