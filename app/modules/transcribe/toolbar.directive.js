'use strict';

require('./transcribe.module.js')
    .directive('transcribeToolbar', transcribeToolbar);

/**
 * @ngInject
 */
function transcribeToolbar() {
    var directive = {
        restrict: 'A',
        replace: true,
        templateUrl: 'transcribe/toolbar.html'
    };
    return directive;
}
