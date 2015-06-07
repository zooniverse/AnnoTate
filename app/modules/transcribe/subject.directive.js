'use strict';

require('./transcribe.module.js')
    .directive('subject', subject);

// @ngInject
function subject() {
    var directive = {
        restrict: 'A',
        templateUrl: 'transcribe/subject.html'
    };
    return directive;
}
