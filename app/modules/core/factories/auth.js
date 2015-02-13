(function (angular, _, zooAuth) {

    'use strict';

    var module = angular.module('transcribe');

    module.factory('AuthFactory', [
        '$localStorage',
        '$rootScope',
        function ($localStorage, $rootScope) {

            var _auth = window.zooAuth;

            if (_.isUndefined($localStorage.user)) {
                $localStorage.user = {};
            }

            var signIn = function (args) {
                return _auth.signIn(args)
                    .then(function (response) {
                        $localStorage.user = response;
                    });
            };

            var signOut = function () {
                $localStorage.user = {};
                return _auth.signOut();
            };

            return {
                signIn: signIn,
                signOut: signOut,
                getUser: function () { return $localStorage.user; }
            }

        }]);

})(window.angular, window._, window.zooAuth);
