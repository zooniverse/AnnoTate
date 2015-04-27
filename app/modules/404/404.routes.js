'use strict';

require('./404.module.js')
    .config(Routes);

/**
 * @ngInject
 */
function Routes($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('404', {
            url: '/404',
            templateUrl: '404/404.html',
            title: 'Not found'
        });

    $urlRouterProvider.otherwise('/404');

}
