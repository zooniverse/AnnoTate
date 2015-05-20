'use strict';

require('./subjects.module.js')
    .directive('subject', subject);

// @ngInject
function subject() {
    var directive = {
        link: subjectLink,
        restrict: 'A',
        templateUrl: 'subjects/subject.html'
    };
    return directive;

    // @ngInject
    function subjectLink(scope, element, attr) {

    }

}
