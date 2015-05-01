'use strict';

require('./annotations.module.js')
    .factory('Annotations', Annotations);

var _ = require('lodash');

/**
 * @ngInject
 */
function Annotations($rootScope) {

    var factory;
    var _annotations = [];

    factory = {
        add: add,
        destroy: destroy,
        list: list,
        reset: reset
    }

    return factory;

    function add(annotation) {
        _annotations.push(annotation);
        return annotation;
    }

    // TODO: fix so that it only removes a point if it's passed an annotation;
    // a blank / undefined object will wipe everything
    function destroy(annotation) {
        _.remove(_annotations, annotation);
        return _annotations;
    }

    function list() {
        return _annotations;
    }

    function reset() {
        _annotations.length = 0;
        return _annotations;
    }

}
