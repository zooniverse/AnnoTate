'use strict';

require('./set-selector.module.js')
    .controller('ArtistDetailController', ArtistDetailController);

// @ngInject
function ArtistDetailController($stateParams, ArtistsFactory) {
    var vm = this;
    vm.artist = ArtistsFactory.get($stateParams.artistId)
}
