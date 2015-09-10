'use strict';

var _ = require('lodash');

require('./aggregations.module.js')
    .factory('AggregationsFactory', AggregationsFactory);

// @ngInject
function AggregationsFactory($q, SubjectsFactory, zooAPI, zooAPIProject) {

    var factory;
    var _aggregations = [];

    factory = {
        $getData: $getData,
        list: list
    };

    return factory;

    function $getData() {
        _aggregations.length = 0;
        return _createParamsObject()
            .then(_getAggregations)
            .then(function (newAggregations) {
                _aggregations = _aggregations.concat(newAggregations);
            });

    }

    function list() {
        return _aggregations;
    }

    function _createParamsObject() {
        return zooAPIProject.get()
            .then(function (project) {
                return {
                    subject_id: SubjectsFactory.current.data.id,
                    workflow_id: project.links.workflows[0]
                };
            });
    }

    function _getAggregations(params) {
        return zooAPI.type('aggregations').get(params)
            .then(_formatAggregations);
    }

    function _formatAggregations(aggregations) {
        if (aggregations.length === 0) {
            return;
        } else {
            var rawAggs = _.omit(aggregations[0].aggregation.T2['text clusters'], 'param');
            rawAggs = _.filter(rawAggs, function (line) {
                return line['num users'] > 4;
            });
            return _.map(rawAggs, function (line) {
                return {
                    startPoint: {
                        x: line.center[0],
                        y: line.center[2],
                    },
                    endPoint: {
                        x: line.center[1],
                        y: line.center[3],
                    },
                    text: line.center[4]
                };
            });
        }
    }
}
