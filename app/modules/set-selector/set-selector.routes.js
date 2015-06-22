'use strict';

require('./set-selector.module.js')
    .config(Routes);

// @ngInject
function Routes($stateProvider) {

    $stateProvider
        .state('ArtistList', {
            url: '/artist',
            title: 'Choose an artist',
            parent: 'Base',
            views: {
                'main': {
                    templateUrl: 'set-selector/artist-list.html',
                    controller: 'ArtistListController as vm'
                }
            }
        })
        .state('ArtistDetail', {
            url: '/artist/:artistId',
            title: 'About the artist',
            parent: 'Base',
            views: {
                'main': {
                    templateUrl: 'set-selector/artist-detail.html',
                    controller: 'ArtistDetailController as vm'
                }
            }
        });

}
