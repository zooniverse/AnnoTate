'use strict';

require('./demo.module.js')
    .config(Routes);

/**
 * @ngInject
 */
function Routes($stateProvider, $locationProvider, $urlRouterProvider) {

    $stateProvider
        .state('Home', {
            url: '/',
            controller: 'ExampleCtrl as home',
            templateUrl: 'demo/home.html',
            title: 'Home'
        });

}
