'use strict';

require('./auth.module.js')
    .directive('authHeader', authHeader);

function authHeader() {
    var directive = {
        controller: AuthHeaderController,
        controllerAs: 'vm',
        replace: true,
        restrict: 'A',
        scope: true,
        templateUrl: 'auth/auth-header.html'
    };
    return directive;
}

// @ngInject
function AuthHeaderController($scope, authFactory) {
    var vm = this;
    vm.signIn = authFactory.signIn;
    vm.signOut = authFactory.signOut;
    vm.user = authFactory.getUser();
    $scope.$on('auth:loginChange', function (event, data) {
        // Weirdly, the digest cycle is firing when the user logs out, but not
        // when we log in, so we're wrapping auth data in an `$apply` here. It's
        // not the most elegant solution, but it works.
        if (data && data.id) {
            $scope.$apply(function () {
                vm.user = data;
            });
        } else {
            vm.user = false;
        }
    });
}
