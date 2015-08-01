'use strict';

var angular = require('angular');
var moment = require('moment');

require('./transcribe.module.js')
    .factory('ClassificationFactory', ClassificationFactory);

// @ngInject
function ClassificationFactory($q, AnnotationsFactory, appConfig, SubjectsFactory, zooAPI, zooAPIProject) {

    var factory;

    factory = {
        submitBlank: submitBlank,
        submitComplete: submitComplete,
        submitIncomplete: submitIncomplete
    };

    return factory;

    function _createNewClassification() {
        var classification = {
            metadata: {
                user_agent: appConfig.appTitle,
                user_language: 'en_GB',
                started_at: SubjectsFactory.current.data.started_at,
                finished_at: moment().format()
            },
            links: {
                subjects: [SubjectsFactory.current.data.id]
            },
            annotations: []
        };
        return zooAPIProject.get()
            .then(function (project) {
                classification.links.project = project.id;
                classification.links.workflow = project.links.workflows[0];
                return zooAPI.type('workflows').get(classification.links.workflow);
            })
            .then(function (workflow) {
                classification.metadata.workflow_version = workflow.version;
                return classification;
            });
    }

    function _submitToApi(data) {
        var classification = zooAPI.type('classifications').create(data);
        return classification.save();
    }

    function submitBlank() {
        return _createNewClassification()
            .then(function addBlankData(classification) {
                classification.annotations.push({ task: 'T0', value: true });
                return classification;
            })
            .then(_submitToApi);
    }

    function submitComplete() {
        return _createNewClassification()
            .then(function addCompleteData(classification) {
                classification.annotations.push({ task: 'T0', value: false });
                classification.annotations.push({ task: 'T2', value: angular.copy(AnnotationsFactory.list()) });
                classification.annotations.push({ task: 'T3', value: true });
                return classification;
            })
            .then(_submitToApi);
    }

    function submitIncomplete() {
        return _createNewClassification()
            .then(function addIncompleteData(classification) {
                classification.annotations.push({ task: 'T0', value: false });
                classification.annotations.push({ task: 'T2', value: angular.copy(AnnotationsFactory.list()) });
                classification.annotations.push({ task: 'T3', value: false });
                return classification;
            })
            .then(_submitToApi);
    }

}
