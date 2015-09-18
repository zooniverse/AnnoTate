'use strict';

require('./auth.module.js')
    .factory('authFactory', authFactory);

// @ngInject
function authFactory($location, $window, localStorageService, zooAPI, zooAPIConfig) {

    var factory;

    if (localStorageService.get('user') === null) {
        localStorageService.set('user', null);
    }

    if (localStorageService.get('auth') === null) {
        localStorageService.set('auth', null);
    } else {
        var auth = localStorageService.get('auth');
        if ((Math.floor(Date.now() / 1000) - auth.token_start) < auth.expires_in) {
            _setToken(auth.access_token);
            _setUserData();
        } else {
            signOut();
        }
    }

    factory = {
        completeSignIn: completeSignIn,
        signIn: signIn,
        signOut: signOut,
        getUser: getUser
    };

    return factory;

    function completeSignIn(params) {
        localStorageService.set('auth', {
            access_token: params.access_token,
            token_start: Math.floor(Date.now() / 1000),
            expires_in: params.expires_in
        });
        _setToken(params.access_token);
        return _setUserData()
            .then(function () {
                $window.location.href = localStorageService.get('redirectOnSignIn');
            });
    }

    function getUser() {
        return localStorageService.get('user');
    }

    function _setToken(token) {
        zooAPI.headers.Authorization = 'Bearer ' + token;
    }

    function _setUserData() {
        return zooAPI.type('me').get()
            .then(function (response) {
                response = response[0];
                var user = {};
                user.display_name = response.display_name;
                return response.get('avatar')
                    .then(function (response) {
                        response = response[0];
                        if (response.src) {
                            user.avatar = response.src;
                        }
                    })
                    .then(function () {
                        localStorageService.set('user', user);
                    });
            }, function (error) {
                console.warn('Error logging in', error);
            });
    }

    function signIn() {
        localStorageService.set('redirectOnSignIn', $location.absUrl());
        $window.location.href = zooAPI.root.match(/^(.*)\/[^/]*$/)[1] +
            '/oauth/authorize' +
            '?response_type=token' +
            '&client_id=' +
            zooAPIConfig.app_id +
            '&redirect_uri=' +
            $location.absUrl();
    }

    function signOut() {
        delete zooAPI.headers.Authorization;
        localStorageService.set('auth', null);
        localStorageService.set('user', null);
    }

}
