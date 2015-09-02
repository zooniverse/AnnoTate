'use strict';

var _ = require('lodash');

require('./set-selector.module.js')
    .factory('ArtistsFactory', ArtistsFactory);

// @ngInject
function ArtistsFactory($q, ArtistListConstants, localStorageService, zooAPIConfig, zooAPI) {

    var factory;
    var _artists = _.filter(ArtistListConstants, { active: true });

    factory = {
        detail: detail,
        list: list
    };

    return factory;

    function detail(artistId) {
        var artist = _.find(_artists, { artistId: artistId });
        return zooAPI.type('subject_sets').get({
            'project_id': zooAPIConfig.project_id,
            'metadata.artistId': parseInt(artistId, 10),
            'page_size': 150
        }).then(function (sets) {
            artist.sets = sets;
            return artist;
        }, function (response) {
            console.error('Error getting sets', response);
            return artist;
        });
    }

    function list(listLength) {
        return (listLength) ? _.sample(_artists, listLength) : _artists;
    }

}
