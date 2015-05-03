'use strict';

require('./annotations.module.js')
    .factory('Annotations', Annotations);

var _ = require('lodash');

/**
 * @ngInject
 */
function Annotations(localStorageService) {

    if (localStorageService.get('annotations') === null) {
        localStorageService.set('annotations', []);
    }

    var factory;
    var _annotations = localStorageService.get('annotations');

    factory = {
        add: add,
        destroy: destroy,
        list: list,
        reset: reset,
        update: update
    };

    return factory;

    function add(annotation) {
        _annotations.push(angular.copy(annotation));
        update();
        return annotation;
    }

    // TODO: fix so that it only removes a point if it's passed an annotation;
    // a blank / undefined object will wipe everything
    function destroy(annotation) {
        _.remove(_annotations, annotation);
        update();
        return _annotations;
    }

    function list() {
        return _annotations;
    }

    function reset() {
        _annotations.length = 0;
        update();
        return _annotations;
    }

    function update() {
        var annotations = _.reject(_annotations, { temp: true });
        localStorageService.set('annotations', annotations);
    }

}
