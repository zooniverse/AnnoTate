'use strict';

require('./transcribe.module.js')
    .directive('ngHeight', ngHeight);

// @ngInject
function ngHeight() {
    var directive = {
        link: linkFunction
    };
    return directive;

    function linkFunction(scope, element, attrs) {
        scope.$watch(attrs.ngHeight, function (value) {
            element.attr('height', value);
        });
    }
}
