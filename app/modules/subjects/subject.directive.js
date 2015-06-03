'use strict';

require('./subjects.module.js')
    .directive('subject', subject);

// @ngInject
function subject($q, $rootScope, $timeout, subjectsFactory) {
    var directive = {
        link: subjectLink,
        restrict: 'A',
        templateUrl: 'subjects/subject.html'
    };
    return directive;

    function subjectLink(scope) {

        // Setup
        var vm = scope.vm;
        vm.subject = {
            isLoaded: false,
            data: null
        };

        loadSubject();

        function loadSubject() {
            var deferred = $q.defer();

            subjectsFactory.get()
                .then(function (subject) {
                    if (!subject) {
                        $timeout(function () {
                            $rootScope.$broadcast('subject:outOfData');
                            deferred.resolve();
                        }, 300);
                    } else {
                        var image = new Image();
                        image.src = subject.locations[0]['image/jpeg'];
                        image.onload = function () {
                            $timeout(function () {
                                vm.subject.data = {
                                    height: image.height,
                                    url: image.src,
                                    width: image.width
                                };
                                $rootScope.$broadcast('panZoom:centre');
                                deferred.resolve();
                            }, 300);
                        };
                    }
                })
                .then(function () {
                    $timeout(function () {
                        vm.subject.isLoaded = true;
                    }, 300);
                });

            return deferred.promise;
        }



    }

}
