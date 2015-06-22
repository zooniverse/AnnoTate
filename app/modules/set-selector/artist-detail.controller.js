'use strict';

require('./set-selector.module.js')
    .controller('ArtistDetailController', ArtistDetailController);

// @ngInject
function ArtistDetailController($stateParams, ArtistsFactory) {
    var vm = this;
    console.log(ArtistsFactory.get($stateParams.artistId))
}
