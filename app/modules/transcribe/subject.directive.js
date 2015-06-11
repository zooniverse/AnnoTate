'use strict';

require('./transcribe.module.js')
    .directive('subject', subject);

// @ngInject
function subject(MarkingSurfaceFactory) {
    var directive = {
        link: subjectLink,
        restrict: 'A'
    };
    return directive;

    function subjectLink(scope, element) {

        // Setup
        element.attr({ x: 0, y: 0 });

        // Watchers
        scope.$watch(getSubjectData, setSubjectImage);

        // Functions / methods
        function getSubjectData() {
            return scope.vm.subject;
        }

        function setSubjectImage(data) {
            if (data) {
                element.attr('height', data.image.height);
                element.attr('width', data.image.width);
                MarkingSurfaceFactory.resizeAndCentre();
                element[0].setAttributeNS('http://www.w3.org/1999/xlink', 'href', data.image.src);
            }
        }
    }
}
