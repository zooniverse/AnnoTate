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

    $scope.$on('LocalStorageModule.notification.setitem', function (event, data) {
        if (data.key === 'user') {
            vm.user = authFactory.getUser();
        }
    });
}
