'use strict';

var _ = require('lodash');

require('./set-selector.module.js')
    .factory('ArtistsFactory', ArtistsFactory);

// @ngInject
function ArtistsFactory($q, ArtistListConstants, zooAPIConfig, zooAPI) {

    var factory;
    var _artistSets = {};

    factory = {
        detail: detail,
        list: list
    };

    return factory;

    function _getSets(artistId) {
        return zooAPI.type('subject_sets')
            .get({
                'project_id': zooAPIConfig.project_id,
                'metadata.artistId': artistId,
                'page_size': 150
            })
            .then(function (sets) {
                _artistSets[artistId] = sets;
                return sets;
            })
            .catch(function (error) {
                console.error('Error getting sets for artist ID ' + artist, error);
            });
    }

    function detail(artistId) {
        var artist = _.assign({}, _.find(ArtistListConstants, { artistId: artistId }));
        return $q.when(_artistSets[artistId] || _getSets(artistId))
            .then(function (sets) {
                artist.sets = sets;
                return artist;
            });
    }

    function list(listLength) {
        return (listLength) ? _.sample(ArtistListConstants, listLength) : ArtistListConstants;
    }

}
