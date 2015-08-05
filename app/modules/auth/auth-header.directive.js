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

    function authHeaderLink(scope, element) {

        // Setup
        scope.user = authFactory.getUser();
        scope.signIn = authFactory.signIn;
        scope.signOut = authFactory.signOut;

        // Events
        element.find('.login-form').on('click', preventClose);
        scope.$on('auth:signin', setUser);
        scope.$on('auth:signout', setUser);

        // Methods
        function preventClose(event) {
            event.stopPropagation();
        }

        function setUser() {
            scope.user = authFactory.getUser();
            scope.$digest();
        }

    }

}
