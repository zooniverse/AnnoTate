'use strict';

require('./subjects.module.js')
    .directive('subject', subject);

// @ngInject
function subject($rootScope, subjectsFactory) {
    var directive = {
        link: subjectLink,
        restrict: 'A',
        templateUrl: 'subjects/subject.html'
    };
    return directive;

    // @ngInject
    function subjectLink(scope, element, attr) {

        // Setup
        var vm = scope.vm;

        vm.subject = {
            isLoaded: false,
            data: null
        };

        loadSubject();

        function loadSubject() {
            subjectsFactory.get()
                .then(function (subject) {
                    vm.subject.isLoaded = true;
                    if (!subject) {
                        $timeout(function () {
                            $rootScope.$broadcast('subject:outOfData');
                        });
                    } else {
                        vm.subject.data = subject;
                    }
                });
        }


    }

}
