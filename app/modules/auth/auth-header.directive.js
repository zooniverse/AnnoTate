'use strict';

require('./auth.module.js')
    .directive('authHeader', authHeader);

// @ngInject
function authHeader(authFactory, ModalsFactory) {
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
        scope.user = authFactory.getUser();
        scope.signIn = ModalsFactory.openSignIn //authFactory.signIn;
        scope.signOut = authFactory.signOut;

        // Events
        scope.$on('auth:signin', setUser);
        scope.$on('auth:signout', setUser);

        // Methods
        function setUser() {
            scope.$digest(function () {
                scope.user = authFactory.getUser();
            });
        }

    }

}
