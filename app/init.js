(function (angular) {

    'use strict';

    var app = angular.module('app', [
        'ngRoute',
        'ui.bootstrap'
    ]);

    app.config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/', {
                    controller: 'HomeCtrl',
                    slug: 'home',
                    templateUrl: 'home.html'
                })
                .when('/about', {
                    slug: 'about',
                    templateUrl: 'about.html'
                })
                .otherwise({
                    redirectTo: '/'
                });
    }]);

    app.run([
        '$rootScope',
        function ($rootScope) {
            $rootScope.$on('$routeChangeSuccess', function (event, data) {
                $rootScope.slug = data.$$route.slug  || '';
            });
        }
    ]);

}(window.angular));
