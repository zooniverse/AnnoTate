'use strict';

require('./modals.module.js')
    .controller('SignInController', SignInController);

// @ngInject
function SignInController($modalInstance, $scope, authFactory) {

    var vm = this;
    vm.cancel = cancel;
    vm.error = false;
    vm.signIn = signIn;
    vm.user = {
        login: '',
        password: ''
    };

    function cancel() {
        $modalInstance.close();
    }

    function signIn() {
        authFactory.signIn(vm.user)
            .then(function (res) {
                console.log('the', res)
                // $modalInstance.close();
            })
            .catch(function (res) {
                console.log('catch', res)
                // $modalInstance.close();
            });
    }
}
