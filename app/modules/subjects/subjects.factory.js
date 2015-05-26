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
        // return $q.when(null);

        return $q.when({
            height: '2500',
            url: 'images/TGA_8812_1_3_2036_1.jpg',
            width: '1648'
        });
    }

}
