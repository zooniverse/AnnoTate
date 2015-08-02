'use strict';

require('./set-selector.module.js')
    .controller('ArtistListController', ArtistListController);

// @ngInject
function ArtistListController($state, ArtistsFactory) {
    var vm = this;
    vm.loading = true;
    vm.go = go;

    ArtistsFactory.$getData()
        .then(function () {
            vm.artists = ArtistsFactory.list();
        })

    function go(artist) {
        $state.go('ArtistDetail', { artistId: artist.artistId });
    }
}
