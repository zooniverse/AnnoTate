'use strict';

var Hammer = require('hammerjs');

require('./annotations.module.js')
    .directive('textAnnotation', textAnnotation);

// @ngInject
function textAnnotation($rootScope, annotationsConfig, AnnotationsFactory) {
    var directive = {
        controller: ['$scope', '$element', textAnnotationController],
        link: textAnnotationLink,
        replace: true,
        restrict: 'A',
        scope: {
            data: '='
        },
        templateUrl: 'annotations/text.html'
    };
    return directive;

    function textAnnotationController($scope, $element) {

        // Setup
        var vm = this;
        vm.destroy = destroy;
        vm.update = update;
        vm.transcribe = transcribe;
        $scope.r = annotationsConfig.pointRadius;

        // Methods
        function destroy() {
            AnnotationsFactory.destroy($scope.data);
        }

        function transcribe() {
            $rootScope.$broadcast('transcribeDialog:open', {
                annotation: $scope.data,
                element: $element
            });
        }

        function update() {
            AnnotationsFactory.upsert($scope.data);
        }

    }

    function textAnnotationLink(scope, element, attrs, ctrl) {

        // Setup
        var hammerElement;

        // Events
        hammerElement = new Hammer(element[0]);
        hammerElement.on('tap', openContextMenu);
        scope.$on('$destroy', $destroy);

        // Methods
        function $destroy() {
            hammerElement.destroy();
        }

        function openContextMenu(event) {
            var contextMenuData = {
                event: event,
                menuOptions: [{ name: 'Delete', action: ctrl.destroy }]
            };
            if (scope.data.complete) {
                contextMenuData.menuOptions.unshift({ name: 'Edit', action: ctrl.transcribe });
            }
            $rootScope.$broadcast('contextMenu:open', contextMenuData);
        }
    }

}
