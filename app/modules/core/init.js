(function (angular) {

    'use strict';

    var module = angular.module('transcribe', [
        'ngRoute',
        'ui.bootstrap',
        'cfp.hotkeys',
        'ngLoad',
        'ngStorage',

        'transcribe.classify',
        'transcribe.static'
    ]);

    module.config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .otherwise({
                    redirectTo: '/'
                });
    }]);

    module.run([
        '$rootScope',
        'AuthFactory',
        function ($rootScope, Auth) {
            $rootScope.$on('$routeChangeSuccess', function (event, data) {
                if (data.$$route && data.$$route.slug) {
                    $rootScope.slug = data.$$route.slug  || '';
                }
            });
        }
    ]);

}(window.angular));
