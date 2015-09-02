'use strict';

var _ = require('lodash');

require('./set-selector.module.js')
    .factory('ArtistsFactory', ArtistsFactory);

// @ngInject
function ArtistsFactory($q, ArtistListConstants, localStorageService, zooAPIConfig, zooAPI) {

    if (localStorageService.get('artistSets') === null) {
        localStorageService.set('artistSets', {});
    }

    var factory;
    var _artists = _.filter(ArtistListConstants, { active: true });
    var _artistSets = localStorageService.get('artistSets');

    factory = {
        detail: detail,
        list: list
    };

    return factory;

    function _getSets(artist) {
        return zooAPI.type('subject_sets').get({
            'project_id': zooAPIConfig.project_id,
            'metadata.artistId': parseInt(artist.artistId, 10),
            'page_size': 150
        }).then(function (sets) {
            artist.sets = sets;
            _artistSets[artist.artistId] = sets;
            localStorageService.set('artistSets', _artistSets);
            return artist;
        }, function (response) {
            console.error('Error getting sets', response);
            return artist;
        });
    }

    function detail(artistId) {
        var artist = _.find(_artists, { artistId: artistId });
        if (_artistSets[artistId]) {
            artist.sets = _artistSets[artistId];
            _getSets(artist);
            return $q.when(artist);
        } else {
            return _getSets(artist);
        }
    }

    function list(listLength) {
        return (listLength) ? _.sample(_artists, listLength) : _artists;
    }

}
