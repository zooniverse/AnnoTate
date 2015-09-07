'use strict';

require('./modals.module.js')
    .controller('SignInController', SignInController);

// @ngInject
function SignInController($modalInstance, $scope, authFactory) {

    var vm = this;
    vm.cancel = cancel;
    vm.error = false;
    vm.loading = false;
    vm.signIn = signIn;
    vm.user = {
        login: '',
        password: ''
    };

    function cancel() {
        $modalInstance.close();
    }

    function signIn() {
        vm.error = false;
        vm.loading = true;
        authFactory.signIn(vm.user)
            .then(function (res) {
                $modalInstance.close();
            }, function (error) {
                $scope.$apply(function () {
                    vm.error = error;
                    vm.loading = false;
                });
            });
    }
}
