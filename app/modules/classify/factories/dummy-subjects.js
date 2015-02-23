(function (angular, _, zooAPI) {

    'use strict';

    var module = angular.module('transcribe.classify');

    module.factory('DummySubjectsFactory', [
        '$http',
        '$localStorage',
        '$q',
        'DummySubjects',
        function ($http, $localStorage, $q, DummySubjects) {

            if (_.isUndefined($localStorage.activeSubject)) {
                $localStorage.activeSubject = false;
            }

            var _dummySubjects = DummySubjects;

            var getDummySubject = function (id) {
                var subject;
                if (id) {
                    subject = _.find(_dummySubjects, { 'id': id });
                } else {
                    subject = _dummySubjects[0];
                }
                $localStorage.activeSubject = subject;
                return $q.when(subject);
            };

            var resetActiveSubject = function () {
                $localStorage.activeSubject = false;
            };

            var checkForSubject = function (id) {
                if (!$localStorage.activeSubject) {
                    return $q.when($localStorage.activeSubject)
                } else {
                    return getDummySubject(id);
                }
            };

            return {
                get: checkForSubject,
                resetActive: resetActiveSubject
            };

        }]);

})(window.angular, window._, window.zooAPI);
