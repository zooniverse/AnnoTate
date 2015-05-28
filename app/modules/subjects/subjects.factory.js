'use strict';

require('./subjects.module.js')
    .factory('subjectsFactory', subjectsFactory);

// @ngInject
function subjectsFactory($q, $timeout, zooAPIProject) {

    var factory;

    factory = {
        get: getDummy
    };

    return factory;

    function getDummy() {
        zooAPIProject.get().then(function (r) { console.log(r); });


        return $timeout(function () {
            // return null;
            return {
                height: '2500',
                url: 'images/TGA_8812_1_3_2036_1.jpg',
                width: '1648'
            };
        }, 1000);
    }

}
