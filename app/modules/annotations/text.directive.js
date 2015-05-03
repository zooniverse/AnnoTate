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

        vm.edit = edit;
        vm.update = update;

        function edit() {
            // $rootScope('editAnnotation', $scope.data);
        }

        function update(data) {
            Annotations.upsert($scope.data);
        }

    }

    function textAnnotationLink(scope, element, attrs, ctrl) {
    }

}
