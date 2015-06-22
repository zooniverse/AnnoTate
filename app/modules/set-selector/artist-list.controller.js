'use strict';

require('./set-selector.module.js')
    .controller('ArtistListController', ArtistListController);

// @ngInject
function ArtistListController($state, ArtistsFactory) {
    var vm = this;
    vm.artists = ArtistsFactory.list();
    vm.go = go;

    function go(id) {
        $state.go('ArtistDetail', { artistId: id });
    }
}
