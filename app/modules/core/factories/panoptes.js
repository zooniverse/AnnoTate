(function (angular, zooAuth, zooAPI) {

    'use strict';

    var module = angular.module('transcribe');

    module.factory('PanoptesFactory', [
        function () {

            var _auth = window.zooAuth;
            var _api = window.zooAPI;

            return {
                auth: _auth,
                api: _api
            }

        }]);

})(window.angular, window.zooAuth, window.zooAPI);
