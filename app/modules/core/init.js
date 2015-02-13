(function (angular) {

    'use strict';

    var module = angular.module('transcribe', [
        'cfp.hotkeys',
        'firebase',
        'ngLoad',
        'ngStorage',
        'ui.bootstrap',
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
            $rootScope.$on('$stateChangeSuccess', function (event, data) {
                if (data && data.slug) {
                    $rootScope.slug = data.slug  || '';
                }
            });
        }
    ]);

}(window.angular));
