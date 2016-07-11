'use strict';

require('./annotations.module.js')
    .directive('textPoint', textPoint);

// @ngInject
function textPoint($timeout) {
    var directive = {
        link: textPointLink,
        restrict: 'A',
        scope: {
            pointData: '='
        },
    };
    return directive;

    function textPointLink(scope, element) {
        // There's a regression error in Angular that broke dynamic class
        // changes on SVG elements, including show/hide. It was supposedly fixed,
        // but I've still found issues in FF / Safari, so we use the point
        // coordinates to determine whether or not to show the annotation.
        element[0].setAttribute('visibility', 'hidden');
        scope.$watch('pointData', function(newVal) {
            $timeout(function() {
                element[0].setAttribute('visibility', (newVal) ? 'visible' : 'hidden');
            });
        });
    }
}
