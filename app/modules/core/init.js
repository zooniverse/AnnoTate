(function (angular) {

    'use strict';

    var module = angular.module('transcribe', [
        'ngRoute',
        'ui.bootstrap',
        'cfp.hotkeys',
        'ngLoad',
        'ngStorage',
        'ui.router',

        'transcribe.classify',
        'transcribe.static'
    ]);

    module.config([
        '$urlRouterProvider',
        function ($urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
        }
    ]);

    module.run([
        '$rootScope',
        'AuthFactory',
        function ($rootScope, Auth) {

            $rootScope.Auth = Auth;

            $rootScope.$on('$stateChangeSuccess', function (event, data) {
                if (data && data.slug) {
                    $rootScope.slug = data.slug  || '';
                }
            });

        }
    ]);

}(window.angular));
