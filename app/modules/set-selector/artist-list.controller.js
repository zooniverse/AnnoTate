'use strict';

require('./set-selector.module.js')
    .controller('ArtistListController', ArtistListController);

// @ngInject
function ArtistListController($scope, $state, ArtistsFactory) {
    var vm = this;
    vm.artists = []
    vm.loading = true;
    vm.go = go;

    ArtistsFactory.$getData()
        .then(function () {
            vm.loading = false;
            vm.artists = ArtistsFactory.list();
            $scope.$digest();
        })

    function go(artist) {
        $state.go('ArtistDetail', { artistId: artist.artistId });
    }
}
