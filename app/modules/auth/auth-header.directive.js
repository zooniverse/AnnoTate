'use strict';

require('./auth.module.js')
    .directive('authHeader', authHeader);

// @ngInject
function authHeader(authFactory) {
    var directive = {
        link: authHeaderLink,
        replace: true,
        restrict: 'A',
        scope: true,
        templateUrl: 'auth/auth-header.html'
    };
    return directive;

    function authHeaderLink(scope) {

        // Setup
        // scope.user = authFactory.getUser();
        scope.signInUrl = authFactory.signInUrl;
        scope.signOut = authFactory.signOut;

    }

}
