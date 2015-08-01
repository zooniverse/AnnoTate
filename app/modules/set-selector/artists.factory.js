'use strict';

var _ = require('lodash');

require('./set-selector.module.js')
    .factory('ArtistsFactory', ArtistsFactory);

// @ngInject
function ArtistsFactory($q, ArtistListConstants, zooAPIProject, zooAPI) {

    var factory;

    factory = {
        $getData: getData,
        list: list,
        get: get
    };

    return factory;

    function getData() {
        return zooAPIProject.get()
            .then(function (project) {
                console.log(project)
            })
            // .then(function getSets(project) {
            //     var promises = [];
            //     project.links.subject_sets.forEach(function getSet(setId) {
            //         promises.push(zooAPI.type('subject_sets').get(setId));
            //     });
            //     return $q.all(promises);
            // })
            // .then(function (data) {
            //     console.log(data)
            //     return data;
            // });
    }

    function get(id) {
        return _.find(ArtistListConstants, { artistId: id });
    }

    function list() {
        return ArtistListConstants;
    }

}
