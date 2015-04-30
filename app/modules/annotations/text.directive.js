'use strict';

require('./annotations.module.js')
    .directive('textAnnotation', textAnnotation);

/**
 * @ngInject
 */
function textAnnotation() {
    var directive = {
        scope: {
            data: '='
        },
        restrict: 'A',
        replace: true,
        templateUrl: 'annotations/text.html',
        link: linkFunction
    };
    return directive;

    function linkFunction(scope, element, attrs) {

        var ClassifyCtrl = scope.$parent.$parent;
        var viewport = angular.element(ClassifyCtrl.svg.viewport);

        scope.r = Config.svg.pointSize;

        scope.addHoverClass = function () {
            element.addClass('hover');
        };

        scope.removeHoverClass = function () {
            element.removeClass('hover');
        };

        scope.click = function ($event) {
            $event.preventDefault();
            $event.stopImmediatePropagation();
            ClassifyCtrl.editingTextAnnotation = scope.data;
        };

    }

}
