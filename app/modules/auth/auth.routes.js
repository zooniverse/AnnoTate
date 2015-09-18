'use strict';

require('./auth.module.js')
    .config(Routes);

// @ngInject
function Routes($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when(/\/access_token/, fixAuthUrl);

    $stateProvider.state('completeAuth', {
        url: '/auth',
        template: 'Logging in...',
        controller: CompleteAuthController
    });

}

// @ngInject
function CompleteAuthController($location, authFactory) {
    authFactory.completeSignIn($location.search());
}

// @ngInject
function fixAuthUrl($match) {
    return '/auth?' + $match.input.substr(1);
}
