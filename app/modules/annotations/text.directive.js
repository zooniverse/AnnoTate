'use strict';

var Hammer = require('hammerjs');

require('./annotations.module.js')
    .directive('textAnnotation', textAnnotation);

// @ngInject
function textAnnotation($rootScope, Annotations) {
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
        var vm = this;
        vm.destroy = destroy;
        vm.update = update;
        vm.transcribe = transcribe;

        function destroy() {
            Annotations.destroy($scope.data);
        }

        function transcribe() {
            $rootScope.$broadcast('openTranscribeDialog', {
                annotation: $scope.data,
                element: $element
            });
        }

        function update() {
            Annotations.upsert($scope.data);
        }
    }

    // @ngInject
    function textAnnotationLink(scope, element, attrs, ctrl) {
        var hammer = new Hammer(element[0]);
        hammer.on('tap', openContextMenu);
        scope.$on('$destroy', destroy);

        function destroy() {
            hammer.destroy();
        }

        function openContextMenu(event) {
            var contextMenuData = {
                event: event,
                menuOptions: [{ name: 'Delete', action: ctrl.destroy }]
            };
            if (scope.data.complete) {
                contextMenuData.menuOptions.unshift({ name: 'Edit', action: ctrl.transcribe });
            }
            $rootScope.$broadcast('openContextMenu', contextMenuData);
        }
    }

}
