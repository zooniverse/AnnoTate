'use strict';

require('./404.module.js')
    .config(Routes);

// @ngInject
function Routes($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('404', {
            parent: 'Base',
            url: '/404',
            title: 'Not found',
            views: {
                'main': {
                    templateUrl: '404/404.html'
                }
            }
        });

    $urlRouterProvider.otherwise('/');

}
