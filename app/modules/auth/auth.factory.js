'use strict';

require('./auth.module.js')
    .factory('authFactory', authFactory);

// @ngInject
function authFactory($rootScope, localStorageService, zooAPI) {

    var factory;

    if (localStorageService.get('user') === null) {
        localStorageService.set('user', null);
    }

    factory = {
        signIn: signIn,
        signOut: signOut,
        getUser: getUser
    };

    return factory;

    function getUser() {
        return localStorageService.get('user');
    }

    function signIn(args) {
        return zooAPI.auth.signIn(args)
            .then(function (response) {
                console.log(response)
                var user = response;
                return response.get('avatar')
                    .then(function (response) {
                        user.avatar = response;
                        localStorageService.set('user', user);
                        console.log(user);
                        $rootScope.$broadcast('auth:signin');
                    });
            });
    }

    function signOut() {
        localStorageService.set('user', null);
        $rootScope.$broadcast('auth:signout');
        return zooAPI.auth.signOut();
    }

}
