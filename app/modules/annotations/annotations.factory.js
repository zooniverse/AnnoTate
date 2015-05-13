'use strict';

var _ = require('lodash');

require('./annotations.module.js')
    .factory('Annotations', Annotations);

// @ngInject
function Annotations(localStorageService) {

    var factory;
    var _annotations;

    if (localStorageService.get('annotations') === null) {
        localStorageService.set('annotations', []);
    }

    _annotations = localStorageService.get('annotations');

    factory = {
        destroy: destroy,
        list: list,
        reset: reset,
        upsert: upsert
    };

    return factory;

    // TODO: fix so that it only removes a point if it's passed an annotation;
    // a blank / undefined object will wipe everything
    function destroy(annotation) {
        _.remove(_annotations, annotation);
        _updateLocalStorage();
        return _annotations;
    }

    function list() {
        return _annotations;
    }

    function reset() {
        _annotations.length = 0;
        _updateLocalStorage();
        return _annotations;
    }

    // Update if an annotation exists, create if it doesn't
    function upsert(annotation) {
        var inCollection = _.find(_annotations, { $$hashKey: annotation.$$hashKey });
        if (inCollection) {
            inCollection = _.extend(inCollection, annotation);
        } else {
            _annotations.push(annotation);
        }
        _updateLocalStorage();
        return annotation;
    }

    function _updateLocalStorage() {
        var annotations = _.reject(_annotations, { complete: false });
        localStorageService.set('annotations', annotations);
    }

}
