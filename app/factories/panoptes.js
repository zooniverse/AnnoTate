(function (angular, zooAuth, zooAPI) {

    'use strict';

    var app = angular.module('app');

    app.factory('PanoptesFactory', [
        function () {

            var _auth = window.zooAuth;
            var _api = window.zooAPI;

            return {
                auth: _auth,
                api: _api
            }

        }]);

})(window.angular, window.zooAuth, window.zooAPI);
