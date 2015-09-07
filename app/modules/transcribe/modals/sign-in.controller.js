'use strict';

require('./modals.module.js')
    .controller('SignInController', SignInController);

// @ngInject
function SignInController($modalInstance, $scope, authFactory, hotkeys) {

    var vm = this;
    vm.cancel = cancel;
    vm.error = false;
    vm.loading = false;
    vm.signIn = signIn;
    vm.user = {
        login: '',
        password: ''
    };

    hotkeys.add({
        callback: signIn,
        combo: 'enter'
    });

    $scope.$on('$destroy', function() {
        hotkeys.del('enter');
    });

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
