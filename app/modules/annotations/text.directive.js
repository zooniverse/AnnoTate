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
        // require:
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

    function textAnnotationLink(scope, element, attrs, ctrl) {

        element.on(namespace('mousedown'), clickHandler);
        scope.$on('$destroy', destroy);

        function openContextMenu(event) {
            var contextMenuData = {
                menuOptions: [
                    {
                        name: 'Edit',
                        action: function () { console.log('Edit'); }
                    },
                    {
                        name: 'Delete',
                        action: ctrl.destroy
                    }
                ]
            };
            $rootScope.$broadcast('openContextMenu', contextMenuData);
        }

        function clickHandler() {
            var events = namespace('mouseup') + ' ' + namespace('mousemove');
            element.on(events, clickOrDrag);
            function clickOrDrag(event) {
                if (event.type === 'mouseup') {
                    openContextMenu(event);
                }
                element.off(events, clickOrDrag);
            }
        }

        function destroy() {
            element.off(namespace());
        }

        function namespace(name) {
            return (name) ? name + '.textAnnotation' : '.textAnnotation';
        }

    }

}
