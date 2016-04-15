'use strict';

var PanoptesClient = require('panoptes-client');

require('./auth.module.js')
    .factory('authFactory', authFactory);

// @ngInject
function authFactory($location, $rootScope, localStorageService, zooAPI) {

    var factory;

    var _user = {};

    PanoptesClient.oauth.checkCurrent()
      .then(function (user) {
        if (user) {
            _setUserData();
        }
      });

    factory = {
        signIn: signIn,
        signOut: signOut,
        getUser: getUser
    };

    return factory;


    function getUser() {
        return (_user.id) ? _user : false;
    }

    function _setUserData() {
        return zooAPI.type('me').get()
            .then(function (response) {
                var response = response[0];
                _user.id = response.id;
                _user.display_name = response.display_name;
                return response.get('avatar');
            })
            .then(function (response) {
                var response = response[0];
                _user.avatar = (response.src) ? response.src : null;
                $rootScope.$broadcast('auth:loginChange', _user);
                return _user;
            })
            .catch(function (error) {
                console.error('Error setting user data', error);
            });
    }

    function signIn() {
        PanoptesClient.oauth.signIn($location.absUrl())
    }

    function signOut() {
        _user = {};
        $rootScope.$broadcast('auth:loginChange');
        PanoptesClient.oauth.signOut();
    }

}
