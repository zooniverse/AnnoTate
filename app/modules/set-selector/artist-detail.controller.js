'use strict';

require('./set-selector.module.js')
    .controller('ArtistDetailController', ArtistDetailController);

// @ngInject
function ArtistDetailController($scope, $state, $stateParams, ArtistsFactory, CopyrightFactory) {
    var vm = this;
    vm.loading = true;

    ArtistsFactory.$getData()
        .then(function () {
            vm.artist = ArtistsFactory.get($stateParams.artistId);
            vm.moreArtists = ArtistsFactory.list(3);
            CopyrightFactory.set(ArtistsFactory.extractCopyright(vm.moreArtists.concat(vm.artist)));
            vm.loading = false;
            // TODO: fix this ugly business
            if (!$scope.$$phase) $scope.$digest();
        });

    vm.go = go;

    function go(artist) {
        $state.go('ArtistDetail', { artistId: artist.artistId });
    }
}
