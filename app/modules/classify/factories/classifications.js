(function (angular, moment, zooAPI) {

    'use strict';

    var module = angular.module('transcribe.classify');

    module.factory('ClassificationsFactory', [
        '$q',
        '$window',
        'AnnotationsFactory',
        'Config',
        'ProjectFactory',
        'SubjectsFactory',
        'TimeFactory',
        function ($q, $window, Annotations, Config, Project, Subjects, Time) {

            var submit = function () {

                var times = Time.getTimes();

                var newClassification = {
                    metadata: {
                        user_agent: Config.projectName,
                        user_language: 'en_GB',
                        started_at: times[0],
                        finished_at: times[1]
                    },
                    links: {}
                };

                var deferred = $q.defer();

                Project()
                    .then(function (project) {
                        newClassification.links.project = project.id;
                        newClassification.links.workflow = project.links.workflows[0];
                    })
                    .then(Subjects.get)
                    .then(function (subject) {
                        newClassification.links.subjects = [subject.id];
                    })
                    .then(function () {
                        console.log(newClassification);
                        deferred.resolve(newClassification);
                    });

                return deferred.promise;

            };

            return {
                submit: submit
            }

        }
    ]);

}(window.angular, window.moment, window.zooAPI));
