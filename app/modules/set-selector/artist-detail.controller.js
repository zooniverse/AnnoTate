'use strict';

require('./set-selector.module.js')
    .controller('ArtistDetailController', ArtistDetailController);

// @ngInject
function ArtistDetailController($scope, $state, $stateParams, ArtistsFactory, CopyrightFactory) {
    var vm = this;
    vm.loading = true;

    ArtistsFactory.detail($stateParams.artistId)
        .then(function (artist) {
            vm.artist = artist;
            vm.moreArtists = ArtistsFactory.list(3);
            CopyrightFactory.set(vm.artist, vm.moreArtists);
            vm.loading = false;
            // TODO: fix this ugly business
            if (!$scope.$$phase) $scope.$digest();
        });

    vm.go = go;

    function go(artist) {
        $state.go('ArtistDetail', { artistId: artist.artistId });
    }
}
