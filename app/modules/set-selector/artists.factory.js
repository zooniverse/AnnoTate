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
function ArtistsFactory($q) {

    var factory;
    // var _artists;

    factory = {
        $getData: getData,
        list: list,
        get: get
    };

    return factory;

    function getData() {
        return $q.when(_artists)
    }

    function get(id) {
        id = parseInt(id, 10);
        return _.find(_artists, { id: id });
    }

    function list() {
        return _artists;
    }

}
