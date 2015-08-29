'use strict';

var _ = require('lodash');

require('./set-selector.module.js')
    .factory('ArtistsFactory', ArtistsFactory);

// @ngInject
function ArtistsFactory($q, ArtistListConstants, localStorageService, zooAPIConfig, zooAPI) {

    if (localStorageService.get('artistsAndSets') === null) {
        localStorageService.set('artistsAndSets', []);
    }

    var factory;

    var _artistsAndSets = localStorageService.get('artistsAndSets');

    factory = {
        $getData: getData,
        extractCopyright: extractCopyright,
        list: list,
        get: get
    };

    return factory;

    function getData() {
        if (_artistsAndSets.length > 0) {
            _getSetsFromApi();
            return $q.when(_artistsAndSets);
        } else {
            console.log('sets not ');
            return _getSetsFromApi();
        }
    }

    function _getSetsFromApi() {
        return zooAPI.type('subject_sets').get({
                project_id: zooAPIConfig.project_id,
                page_size: 1200
            })
            .then(function (data) {
                var artistsList = _.clone(ArtistListConstants);
                _.forEach(artistsList, function (artist) {
                    artist.sets = _.filter(data, function (set) {
                        if (!set.metadata.artistId) {
                            return false
                        } else {
                            return artist.artistId === set.metadata.artistId.toString();
                        }
                    });
                });
                _artistsAndSets = _.filter(artistsList, function (artist) {
                    return artist.sets.length > 0;
                });
                localStorageService.set('artistsAndSets', _artistsAndSets);
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
