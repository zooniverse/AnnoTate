'use strict';

require('./auth.module.js')
    .config(Routes);

// @ngInject
function Routes($stateProvider, $urlRouterProvider, AuthFactory) {

    $urlRouterProvider.when(/\/access_token/, fixAuthUrl);

    $stateProvider.state('completeAuth', {
        url: '/auth',
        onEnter: completeAuth
    });

    // @ngInject
    function completeAuth($location) {
        AuthFactory.completeAuth($location.search());
    }

    // @ngInject
    function fixAuthUrl($match) {
        return '/auth?' + $match.input.substr(1);
    }
}
