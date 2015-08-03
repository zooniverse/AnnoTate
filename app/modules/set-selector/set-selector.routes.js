'use strict';

require('./set-selector.module.js')
    .config(Routes);

// @ngInject
function Routes($stateProvider) {

    $stateProvider
        .state('ArtistList', {
            url: '/artists',
            title: 'Choose an artist',
            parent: 'Base',
            views: {
                'main': {
                    templateUrl: 'set-selector/artist-list.html',
                    controller: 'ArtistListController as vm'
                },
                'lower-header': {
                    templateUrl: 'set-selector/artist-search.html',
                    controller: 'ArtistListController as vm'
                },
            },
            params: {
                overlap: true
            }
        })
        .state('ArtistDetail', {
            url: '/artists/:artistId',
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
