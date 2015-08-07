'use strict';

var _ = require('lodash');

require('./set-selector.module.js')
    .factory('ArtistsFactory', ArtistsFactory);

// @ngInject
function ArtistsFactory($q, ArtistListConstants, zooAPIProject, zooAPI) {

    var factory;

    var _artistsAndSets = [];

    factory = {
        $getData: getData,
        extractCopyright: extractCopyright,
        list: list,
        get: get
    };

    return factory;

    function getData() {
        return zooAPIProject.get()
            .then(function getSets(project) {
                var deferred = [];
                project.links.subject_sets.forEach(function getSet(setId) {
                    deferred.push(zooAPI.type('subject_sets').get(setId));
                });
                return $q.all(deferred);
            })
            .then(function (data) {
                var artistsList = _.clone(ArtistListConstants);
                _.forEach(artistsList, function (artist) {
                    artist.sets = _.filter(data, function (set) {
                        return artist.artistId === set.metadata.artistId.toString();
                    });
                });
                _artistsAndSets = _.filter(artistsList, function (artist) {
                    return artist.sets.length > 0
                });
                return _artistsAndSets;
            });
    }

    function get(id) {
        return _.find(_artistsAndSets, { artistId: id });
    }

    function list(listLength) {
        return (listLength) ? _.sample(_artistsAndSets, listLength) : _artistsAndSets;
    }

    function extractCopyright(list) {
        return _.pluck(list, 'imageCopyright');
    }

}
