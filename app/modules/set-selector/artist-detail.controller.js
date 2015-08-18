'use strict';

require('./set-selector.module.js')
    .controller('ArtistDetailController', ArtistDetailController);

// @ngInject
function ArtistDetailController($state, $stateParams, ArtistsFactory, CopyrightFactory) {
    var vm = this;
    vm.go = go;

    ArtistsFactory.$getData()
        .then(function () {
            vm.artist = ArtistsFactory.get($stateParams.artistId);
            vm.moreArtists = ArtistsFactory.list(3);
            CopyrightFactory.set(ArtistsFactory.extractCopyright(vm.moreArtists.concat(vm.artist)));
        });

    function go(artist) {
        $state.go('ArtistDetail', { artistId: artist.artistId });
    }

}
