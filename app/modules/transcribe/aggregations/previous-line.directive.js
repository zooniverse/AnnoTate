'use strict';

require('./aggregations.module.js')
    .directive('previousLine', previousLine);

// @ngInject
function previousLine() {
    var directive = {
        restrict: 'A',
        scope: {
            data: '='
        },
        templateUrl: 'aggregations/previous-line.html'
    };
    return directive;
}

