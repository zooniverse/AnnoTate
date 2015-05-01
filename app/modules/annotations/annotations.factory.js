'use strict';

require('./annotations.module.js')
    .factory('Annotations', Annotations);

var _ = require('lodash');

/**
 * @ngInject
 */
function Annotations() {

    var factory;
    var _annotations;

    factory = {
        add: add,
        destroy: destroy,
        list: list,
        reset: reset
    }

    return factory;

    function add(annotation) {
        _annotations.push(annotation);
    }

    function destroy(annotation) {
        _.remove(_annotations, { $$hashKey: annotation.$$hashKey });
    }

    function list() {
        return _annotations;
    }

    function reset() {
        _annotations.length = 0;
        return _annotations;
    }

}
