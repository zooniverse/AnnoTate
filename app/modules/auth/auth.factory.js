'use strict';

require('./auth.module.js')
    .factory('authFactory', authFactory);

// @ngInject
function authFactory($q, $rootScope, localStorageService, zooAPI) {

    var factory;

    if (localStorageService.get('user') === null) {
        localStorageService.set('user', null);
    }

    zooAPI.auth.checkCurrent()
        .then(function (response) {
            if (response === null) {
                clearUser();
            } else {
                return setUser(response);
            }
        });

    factory = {
        signIn: signIn,
        signOut: signOut,
        getUser: getUser
    };

    return factory;

    function clearUser() {
        localStorageService.set('user', null);
        $rootScope.$broadcast('auth:signout');
    }

    function getUser() {
        return localStorageService.get('user');
    }

    function setUser(userData) {
        var user = userData;
        return userData.get('avatar')
            .then(function (response) {
                user.avatar = response[0];
                localStorageService.set('user', user);
                $rootScope.$broadcast('auth:signin');
            });
    }

    function signIn(signInObject) {
        return zooAPI.auth.signIn(signInObject)
            .then(setUser, function (response) {
                var error;
                if (response.message === 'null') {
                    error = 'There was an error logging in, please try again later.';
                } else {
                    error = 'Invalid username or password, please try again.';
                }
                return $q.reject(error)
            });
    }

    function signOut() {
        clearUser();
        return zooAPI.auth.signOut();
    }

}
