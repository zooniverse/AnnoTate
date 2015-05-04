'use strict';

var Hammer = require('hammerjs');

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
        vm.destroy = destroy;

        function update() {
            Annotations.upsert($scope.data);
        }

        function destroy() {
            Annotations.destroy($scope.data);
        }

    }

    function textAnnotationLink(scope, element, attrs, ctrl) {

        var hammer = new Hammer(element[0]);

        hammer.on('tap', openContextMenu);
        scope.$on('$destroy', destroy);

        function destroy() {
            hammer.destroy();
        }

        function openContextMenu() {
            var contextMenuData = {
                menuOptions: [{
                    name: 'Edit',
                    action: function () { console.log('Edit'); }
                },
                {
                    name: 'Delete',
                    action: ctrl.destroy
                }]
            };
            $rootScope.$broadcast('openContextMenu', contextMenuData);
        }

    }

}
