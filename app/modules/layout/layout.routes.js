'use strict';

require('./layout.module.js')
    .config(Routes);

// @ngInject
function Routes($locationProvider, $stateProvider) {
    $locationProvider.hashPrefix('');
    $stateProvider
        .state('Base', {
            templateUrl: 'layout/base.html',
            abstract: true
        });
}
