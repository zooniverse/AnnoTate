(function (angular, _, zooAuth) {

    'use strict';

    var module = angular.module('transcribe');

    module.factory('AuthFactory', [
        'localStorageService',
        '$rootScope',
        function (storage, $rootScope) {

            var _auth = window.zooAuth;

            if (storage.get('user') === null) {
                storage.set('user', {});
            }

            var signIn = function (args) {
                return _auth.signIn(args)
                    .then(function (response) {
                        storage.set('user', response);
                    });
            };

            var signOut = function () {
                storage.set('user') = {};
                return _auth.signOut();
            };

            return {
                signIn: signIn,
                signOut: signOut,
                getUser: function () { return storage.get('user'); }
            }

        }]);

})(window.angular, window._, window.zooAuth);
