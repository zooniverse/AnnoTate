'use strict';

require('./annotations.module.js')
    .factory('AnnotationsUtils', AnnotationsUtils);

// @ngInject
function AnnotationsUtils() {

    var factory;

    factory = {
        namespace: namespace
    };

    return factory;

    // creates an event namespace based on annotation type and id
    function namespace(eventType, annotation) {
        var eventNamespace = '.' + annotation.type + 'Annotation.' + annotation.$$hashKey;
        if (eventType) {
            return eventType + eventNamespace;
        }
        return eventNamespace;
    }

}
