'use strict';

var _ = require('lodash');

require('./set-selector.module.js')
    .factory('ArtistsFactory', ArtistsFactory);

var _artists = [{
    id: 1,
    name: 'Some Guy'
}, {
    id: 2,
    name: 'Some Other Guy'
}];

// @ngInject
function ArtistsFactory($q, zooAPIProject, zooAPI) {

    var factory;
    // var _artists;

    factory = {
        $getData: getData,
        list: list,
        get: get
    };

    return factory;

    function getData() {
        return zooAPIProject.get()
            .then(function getSets(project) {
                var promises = [];
                project.links.subject_sets.forEach(function getSet(setId) {
                    promises.push(zooAPI.type('subject_sets').get(setId));
                });
                return $q.all(promises);
            })
            .then(function (data) {
                console.log(data)
                return data;
            })
    }

    function get(id) {
        id = parseInt(id, 10);
        return _.find(_artists, { id: id });
    }

    function list() {
        return _artists;
    }

}
