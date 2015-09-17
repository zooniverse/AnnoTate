'use strict';

require('./auth.module.js')
    .factory('authFactory', authFactory);

// @ngInject
function authFactory($location, $window, localStorageService, zooAPI, zooAPIConfig) {

    var factory;

    if (localStorageService.get('user') === null) {
        localStorageService.set('user', null);
    }

    factory = {
        signInUrl: signInUrl,
        signOut: signOut,
        getUser: getUser
    };

    return factory;

    function getUser() {
        return localStorageService.get('user');
    }

    function signInUrl() {
        return zooAPI.root.match(/^(.*)\/[^/]*$/)[1] +
            '/oauth/authorize' +
            '?response_type=token' +
            '&client_id=' +
            zooAPIConfig.app_id +
            '&redirect_uri=' +
            $location.absUrl();
    }

    function signOut() {
        console.log('Signing out');
    }

}
