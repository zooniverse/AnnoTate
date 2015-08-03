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
                    templateUrl: 'static/home.html'
                }
            },
            params: {
                overlap: true
            }
        })
        .state('About', {
            parent: 'Base',
            url: '/about',
            title: 'About annoTate',
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
