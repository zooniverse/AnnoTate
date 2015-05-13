'use strict';

require('./layout.module.js')
    .config(Routes);

// @ngInject
function Routes($stateProvider) {
    $stateProvider
        .state('Base', {
            templateUrl: 'layout/base.html',
            abstract: true
        });
}
