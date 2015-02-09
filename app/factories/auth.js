(function (angular, _, zooAuth) {

    'use strict';

    var app = angular.module('app');

    app.factory('AuthFactory', [
        '$localStorage',
        '$rootScope',
        function ($localStorage, $rootScope) {

            var _auth = window.zooAuth;

            if (_.isUndefined($localStorage.user)) {
                $localStorage.user = {};
            }

            var loggingIn = false;

            var signIn = function (args) {
                loggingIn = true;
                return _auth.signIn(args)
                    .then(function (response) {
                        console.log(response)
                        $localStorage.user = response;
                        loggingIn = false;
                    });
            };

            var signOut = function () {
                $localStorage.user = {};
                $rootScope.apply();
                return _auth.signOut();
            };

            return {
                loggingIn: loggingIn,
                signIn: signIn,
                signOut: signOut,
                user: $localStorage.user
            }

        }]);

})(window.angular, window._, window.zooAuth);
