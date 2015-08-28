'use strict';

require('./set-selector.module.js')
    .controller('ArtistListController', ArtistListController);

// @ngInject
function ArtistListController($scope, $state, ArtistsFactory, CopyrightFactory) {
    var vm = this;

    vm.go = go;

    ArtistsFactory.$getData()
        .then(function () {
            vm.artists = ArtistsFactory.list();
            CopyrightFactory.set(ArtistsFactory.extractCopyright(vm.artists));
            // TODO: fix this ugly business
            if (!$scope.$$phase) $scope.$digest();
        });

    function go(artist) {
        $state.go('ArtistDetail', { artistId: artist.artistId });
    }
}
