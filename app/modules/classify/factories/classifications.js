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

            var _createObject = function () {

                var times = Time.getTimes();

                var newClassification = {
                    metadata: {
                        user_agent: Config.projectName,
                        user_language: 'en_GB',
                        started_at: times[0],
                        finished_at: times[1]
                    },
                    links: {},
                    annotations: []
                };

                var deferred = $q.defer();

                Project()
                    .then(function (project) {
                        newClassification.links.project = project.id;
                        newClassification.links.workflow = project.links.workflows[0];
                        return $window.zooAPI.type('workflows').get(newClassification.links.workflow);
                    })
                    .then(function (workflow) {
                        newClassification.metadata.workflow_version = workflow.version;
                    })
                    .then(Subjects.get)
                    .then(function (subject) {
                        newClassification.links.subjects = [subject.id];
                    })
                    .then(function () {
                        newClassification.annotations.push({
                            task: 'init',
                            value: angular.copy(Annotations.list())
                        });
                    })
                    .then(function () {
                        deferred.resolve(newClassification);
                    });

                return deferred.promise;

            };

            var submit = function () {
                return _createObject()
                    .then(function (data) {
                        var classification = $window.zooAPI.type('classifications').create(data);
                        classification.save();
                        return classification;
                    })
            };

            return {
                submit: submit
            }

        }
    ]);

}(window.angular, window.moment, window.zooAPI));
