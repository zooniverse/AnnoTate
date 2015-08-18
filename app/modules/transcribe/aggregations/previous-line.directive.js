'use strict';

require('./aggregations.module.js')
    .directive('previousLine', previousLine);

// @ngInject
function previousLine() {
    var directive = {
        replace: true,
        restrict: 'A',
        scope: {
            data: '='
        },
        templateUrl: 'aggregations/previous-line.html'
    };
    return directive;
}

