'use strict';

require('./set-selector.module.js')
    .controller('ArtistListController', ArtistListController);

// @ngInject
function ArtistListController($state, ArtistsFactory, CopyrightFactory) {
    var vm = this;
    vm.artists = ArtistsFactory.list();
    vm.go = go;

    CopyrightFactory.set(vm.artists);

    function go(artist) {
        $state.go('ArtistDetail', { artistId: artist.artistId });
    }
}
