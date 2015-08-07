'use strict';

require('./static.module.js')
    .config(Routes);

// @ngInject
function Routes($stateProvider) {

    $stateProvider
        .state('Home', {
            parent: 'Base',
            url: '/',
            title: 'Home',
            views: {
                'main': {
                    templateUrl: 'static/home.html',
                    // @ngInject
                    controller: function (CopyrightFactory) {
                        CopyrightFactory.set(['TGA-200817-1-62-1, © The estate of Keith Vaughan.', 'TGA-9920-2-86-1, © The Kenneth Armitage Foundation.'])
                    }
                }
            },
            params: {
                overlap: true
            }
        })
        .state('About', {
            parent: 'Base',
            url: '/about',
            title: 'About AnnoTate',
            views: {
                'main': {
                    templateUrl: 'static/about.html'
                }
            }
        })
        .state('Team', {
            parent: 'Base',
            url: '/team',
            title: 'The Team',
            views: {
                'main': {
                    templateUrl: 'static/team.html'
                }
            }
        });

}
