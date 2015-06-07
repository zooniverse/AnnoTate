'use strict';

require('./subjects.module.js')
    .directive('ngWidth', ngWidth);

// @ngInject
function ngWidth() {
    var directive = {
        link: linkFunction
    };
    return directive;

    function linkFunction(scope, element, attrs) {
        scope.$watch(attrs.ngWidth, function (value) {
            element.attr('width', value);
        });
    }
}
