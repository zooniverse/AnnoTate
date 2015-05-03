'use strict';

var _ = require('lodash');

require('./annotations.module.js')
    .directive('textAnnotation', textAnnotation);

/**
 * @ngInject
 */
function textAnnotation($rootScope, annotationsConfig, AnnotationsUtils) {
    var directive = {
        scope: {
            data: '='
        },
        restrict: 'A',
        replace: true,
        templateUrl: 'annotations/text.html',
        link: linkFunction,
        controller: controller
    };
    return directive;

    function controller() {

        var vm = this;

        vm.editing = false;

        vm.enableEdit = function() {
            console.log('enableEdit');
            vm.editing = true;
        };

        vm.disableEdit = function() {
            console.log('disableEdit');
            vm.editing = false;
        };

    }

    function linkFunction(scope, element, attrs, ctrl) {

        var namespace;

        namespace = _.partial(AnnotationsUtils.namespace, _, scope.data);
        scope.$on('$destroy', $destroy);
        scope.$on('editAnnotation', checkWhetherEditing);

        element.on(namespace('mousedown'), clickHandler);

        function clickHandler(event) {
            event.stopPropagation();

            var events;
            events = namespace('mouseup') + ' ' + namespace('mousemove');
            element.on(events, clickOrDrag);

            function clickOrDrag(event) {
                if (event.type === 'mouseup') {
                    $rootScope.$broadcast('editAnnotation', scope.data);
                }
                element.off(events, clickOrDrag);
            }
        }

        function checkWhetherEditing(event, annotation) {
            var match = annotation.$$hashKey === scope.data.$$hashKey;
            if (match && !scope.editing) {
                ctrl.enableEdit();
            } else if (!match && scope.editing) {
                ctrl.disableEdit();
            }
        }

        function $destroy() {
            element.off(namespace());
        }

    }

}
