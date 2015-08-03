'use strict';

require('./set-selector.module.js')
    .controller('ArtistDetailController', ArtistDetailController);

// @ngInject
function ArtistDetailController($stateParams, ArtistsFactory) {
    var vm = this;
    vm.artist = ArtistsFactory.get($stateParams.artistId);
    vm.go = go;

    ArtistsFactory.$getData()
        .then(function () {
            vm.artists = ArtistsFactory.list(3);
        })

    function go(artist) {
        $state.go('ArtistDetail', { artistId: artist.artistId });
    }

}
