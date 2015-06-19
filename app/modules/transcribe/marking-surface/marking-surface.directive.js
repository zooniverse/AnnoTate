'use strict';

require('./marking-surface.module.js')
    .directive('markingSurface', markingSurface);

// @ngInject
function markingSurface(MarkingSurfaceFactory) {
    var directive = {
        compile: markingSurfaceCompile,
        restrict: 'A',
        scope: false
    };
    return directive;

    function markingSurfaceCompile(tElement) {
        MarkingSurfaceFactory.$init(tElement);
    }
}


