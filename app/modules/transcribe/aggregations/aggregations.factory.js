'use strict';

var _ = require('lodash');
var GraphQLClient = require('graphql-request').GraphQLClient;

var MIN_NUMBER_VIEWS = 4;
var MIN_CONSENSUS_SCORE = 2.5;

require('./aggregations.module.js')
    .factory('AggregationsFactory', AggregationsFactory);

// @ngInject
function AggregationsFactory($q, SubjectsFactory, zooAPI, zooAPIProject, appConfig) {

    var factory;

    var _aggregations = [];
    var _client = new GraphQLClient(appConfig.graphqlEndpoint);
    var _query = `query Aggregation($workflowId: ID!, $subjectId: ID!) {\
        workflow(id: $workflowId) {\
            subject_reductions(subjectId: $subjectId, reducerKey: "poly_line_text") {\
                data\
            }\
        }\
    }`;

    factory = {
        $getData: $getData,
        list: list
    };

    return factory;

    function $getData() {
        _aggregations.length = 0;
        return _createParamsObject()
            .then(_getAggregations)

            .then(_filterAggregations)
            .then(_formatAggregations)
            .then(function (newAggregations) {
                _aggregations = _aggregations.concat(newAggregations);
            })
            .catch(function (error) {
                console.error('Error fetching aggregations', error);
            });
    }

    function list() {
        return _aggregations;
    }

    function _createParamsObject() {
        return zooAPIProject.get()
            .then(function (project) {
                return {
                    subjectId: SubjectsFactory.current.data.id,
                    workflowId: project.links.workflows[0]
                };
            });
    }

    function _getAggregations(params) {
        return _client.request(_query, params)
            .then(function (aggregations) {
                var path = 'workflow.subject_reductions[0].data.frame0';
                return _.get(aggregations, path, []);
            });
    }

    function _filterAggregations(aggregations) {
        if (aggregations.length === 0) {
            return aggregations;
        }

        return aggregations.filter(function (aggregation) {
            return aggregation.number_views >= MIN_NUMBER_VIEWS ||
                aggregation.consensus_score >= MIN_CONSENSUS_SCORE;
        });
    }

    function _formatAggregations(aggregations) {
        if (aggregations.length === 0) {
            return aggregations;
        }

        return aggregations.map(function (aggregation) {
            return {
                startPoint: {
                    x: aggregation.clusters_x[0],
                    y: aggregation.clusters_y[0],
                },
                endPoint: {
                    x: aggregation.clusters_x[1],
                    y: aggregation.clusters_y[1],
                }
            };
        });
    }
}
