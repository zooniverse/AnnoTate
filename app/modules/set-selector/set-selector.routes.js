'use strict';

require('./set-selector.module.js')
    .config(Routes);

// @ngInject
function Routes($stateProvider) {
    $stateProvider
        .state('ArtistList', {
            parent: 'Base',
            title: 'Choose an artist',
            url: '/artists',
            views: {
                'lower-header': {
                    controller: 'ArtistListController as vm',
                    resolve: {
                        // @ngInject
                        'ArtistData': function(ArtistsFactory) {
                            return ArtistsFactory.$getData();
                        }
                    },
                    templateUrl: 'set-selector/artist-search.html'
                },
                'main': {
                    controller: 'ArtistListController as vm',
                    resolve: {
                        // @ngInject
                        'ArtistData': function(ArtistsFactory) {
                            return ArtistsFactory.$getData();
                        }
                    },
                    templateUrl: 'set-selector/artist-list.html'
                }
            },
            params: {
                overlap: true
            }
        })
        .state('ArtistDetail', {
            parent: 'Base',
            title: 'About the artist',
            url: '/artists/:artistId',
            views: {
                'main': {
                    controller: 'ArtistDetailController as vm',
                    resolve: {
                        // @ngInject
                        'ArtistData': function(ArtistsFactory) {
                            return ArtistsFactory.$getData();
                        }
                    },
                    templateUrl: 'set-selector/artist-detail.html'
                }
            }
        });
}
