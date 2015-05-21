'use strict';

require('./subjects.module.js')
    .factory('subjectsFactory', subjectsFactory);

// @ngInject
function subjectsFactory($q) {

    var factory;

    factory = {
        get: get
    };

    return factory;

    function get() {
        return $q.when(null);
    }

}
